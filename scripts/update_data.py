#!/usr/bin/env python3
"""
Weekly Markets Dashboard — automated data refresh.

Fetches LIVE market capitalisation for:
  - Global Top 5 (from a candidate pool, re-ranked each run)
  - Africa Top 10 by Market Cap (JSE-listed candidate pool, re-ranked each run)

Revenue and net income figures, as well as the entire BRVM Snapshot section,
are NOT available live via free APIs and are updated manually from company
reports / BRVM sessions — they live in the static dictionaries/lists below
(REVENUE_BN, NET_INCOME_BN, COMPANY_META, BRVM_*_STATIC) and are simply
carried forward each week as-is. Update BRVM_*_STATIC whenever you get a
fresh BRVM session snapshot from Claude; update REVENUE_BN/NET_INCOME_BN
when new annual reports come out (once or twice a year). Neither needs to
change weekly.

Output: overwrites data.js at the repo root in the exact format index.html
expects (see field names: mcap, revenue, net_income).
"""

import datetime
import sys

import yfinance as yf

# ------------------------------------------------------------------
# CANDIDATE POOLS — add/remove tickers here if the ranking should
# consider a different company. The script always keeps only the
# top N by live market cap.
# ------------------------------------------------------------------

GLOBAL_CANDIDATES = ["NVDA", "AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSM", "AVGO", "2222.SR", "TSLA"]
GLOBAL_TOP_N = 5

AFRICA_CANDIDATES = [
    "ANG.JO",  # AngloGold Ashanti
    "NPN.JO",  # Naspers
    "GFI.JO",  # Gold Fields
    "FSR.JO",  # FirstRand
    "CPI.JO",  # Capitec Bank
    "SBK.JO",  # Standard Bank Group
    "MTN.JO",  # MTN Group
    "VOD.JO",  # Vodacom
    "IMP.JO",  # Impala Platinum
    "DSY.JO",  # Discovery Limited
    "SOL.JO",  # Sasol
    "BVT.JO",  # Bidvest Group
]
AFRICA_TOP_N = 10

# ------------------------------------------------------------------
# STATIC METADATA — company display info that rarely changes.
# ------------------------------------------------------------------

COMPANY_META = {
    "NVDA":   {"company": "NVIDIA",    "country": "🇺🇸 USA", "sector": "Semiconductors"},
    "AAPL":   {"company": "Apple",     "country": "🇺🇸 USA", "sector": "Technology"},
    "GOOGL":  {"company": "Alphabet",  "country": "🇺🇸 USA", "sector": "Technology"},
    "MSFT":   {"company": "Microsoft", "country": "🇺🇸 USA", "sector": "Technology"},
    "AMZN":   {"company": "Amazon",    "country": "🇺🇸 USA", "sector": "E-Commerce / Cloud"},
    "META":   {"company": "Meta Platforms", "country": "🇺🇸 USA", "sector": "Technology"},
    "TSM":    {"company": "TSMC",      "country": "🇹🇼 Taiwan", "sector": "Semiconductors"},
    "AVGO":   {"company": "Broadcom",  "country": "🇺🇸 USA", "sector": "Semiconductors"},
    "2222.SR":{"company": "Saudi Aramco", "country": "🇸🇦 Saudi Arabia", "sector": "Energy"},
    "TSLA":   {"company": "Tesla",     "country": "🇺🇸 USA", "sector": "Automotive"},

    "ANG.JO": {"company": "AngloGold Ashanti",   "country": "🇿🇦 South Africa", "sector": "Gold Mining", "exchange": "JSE"},
    "NPN.JO": {"company": "Naspers",             "country": "🇿🇦 South Africa", "sector": "Technology / Media", "exchange": "JSE"},
    "GFI.JO": {"company": "Gold Fields",         "country": "🇿🇦 South Africa", "sector": "Gold Mining", "exchange": "JSE"},
    "FSR.JO": {"company": "FirstRand",           "country": "🇿🇦 South Africa", "sector": "Banking", "exchange": "JSE"},
    "CPI.JO": {"company": "Capitec Bank",        "country": "🇿🇦 South Africa", "sector": "Banking", "exchange": "JSE"},
    "SBK.JO": {"company": "Standard Bank Group", "country": "🇿🇦 South Africa", "sector": "Banking", "exchange": "JSE"},
    "MTN.JO": {"company": "MTN Group",           "country": "🇿🇦 South Africa", "sector": "Telecommunications", "exchange": "JSE"},
    "VOD.JO": {"company": "Vodacom",             "country": "🇿🇦 South Africa", "sector": "Telecommunications", "exchange": "JSE"},
    "IMP.JO": {"company": "Impala Platinum",     "country": "🇿🇦 South Africa", "sector": "Platinum Mining", "exchange": "JSE"},
    "DSY.JO": {"company": "Discovery Limited",   "country": "🇿🇦 South Africa", "sector": "Insurance", "exchange": "JSE"},
    "SOL.JO": {"company": "Sasol",               "country": "🇿🇦 South Africa", "sector": "Chemicals / Energy", "exchange": "JSE"},
    "BVT.JO": {"company": "Bidvest Group",       "country": "🇿🇦 South Africa", "sector": "Diversified Services", "exchange": "JSE"},
}

# STATIC ANNUAL FIGURES (USD bn) — update when new annual reports drop.
# Keyed by the same ticker used above so they merge automatically.
REVENUE_BN = {
    "NVDA": 215.9, "AAPL": 416.2, "GOOGL": 402.8, "MSFT": 281.7, "AMZN": 716.9,
    "NPN.JO": 10.9, "MTN.JO": 11.6, "SOL.JO": 9.7, "VOD.JO": 8.9, "BVT.JO": 8.3,
    "SBK.JO": 7.9, "FSR.JO": 7.2,
}
NET_INCOME_BN = {
    "NVDA": 120.1, "AAPL": 112.0, "GOOGL": 132.2, "MSFT": 101.8, "AMZN": 77.7,
    "ANG.JO": 2.7, "NPN.JO": 2.86, "SBK.JO": 2.1, "FSR.JO": 1.9, "GFI.JO": 1.7,
    "CPI.JO": 1.0, "SOL.JO": 0.9, "VOD.JO": 0.85,
}

OVERVIEW_STATIC = {
    "global": {"listed": 44152, "mcap_tn": 150.3, "note": "Source: CompaniesMarketCap.com"},
    "africa": {"listed": 1141, "mcap_bn": 795, "note": "Source: African Business Top 250, May 2026"},
}

# Revenue/net income top-10 tables are annual and static; carried forward as-is.
AFRICA_TOP10_REVENUE_STATIC = [
    {"rank": 1,  "company": "Shoprite",            "country": "🇿🇦 South Africa", "sector": "Retail",              "revenue": 13.8, "exchange": "JSE", "note": "Africa's largest food retailer by revenue"},
    {"rank": 2,  "company": "MTN Group",           "country": "🇿🇦 South Africa", "sector": "Telecommunications",  "revenue": 11.6, "exchange": "JSE", "note": "Pan-African footprint across 19 markets"},
    {"rank": 3,  "company": "Naspers",             "country": "🇿🇦 South Africa", "sector": "Technology / Media",  "revenue": 10.9, "exchange": "JSE", "note": "Consolidated Prosus e-commerce and classifieds revenue"},
    {"rank": 4,  "company": "Sasol",               "country": "🇿🇦 South Africa", "sector": "Chemicals / Energy",  "revenue": 9.7,  "exchange": "JSE", "note": "Synthetic fuels revenue benefits from high crude prices"},
    {"rank": 5,  "company": "Vodacom",             "country": "🇿🇦 South Africa", "sector": "Telecommunications",  "revenue": 8.9,  "exchange": "JSE", "note": "Egypt and DRC growth offsetting SA maturity"},
    {"rank": 6,  "company": "Bidvest Group",       "country": "🇿🇦 South Africa", "sector": "Diversified Services","revenue": 8.3,  "exchange": "JSE", "note": "Diversified services and logistics conglomerate"},
    {"rank": 7,  "company": "Standard Bank Group", "country": "🇿🇦 South Africa", "sector": "Banking",             "revenue": 7.9,  "exchange": "JSE", "note": "Largest bank by total income"},
    {"rank": 8,  "company": "FirstRand",           "country": "🇿🇦 South Africa", "sector": "Banking",             "revenue": 7.2,  "exchange": "JSE", "note": "Strong net interest income growth"},
    {"rank": 9,  "company": "Bid Corp",            "country": "🇿🇦 South Africa", "sector": "Food Services",       "revenue": 6.8,  "exchange": "JSE", "note": "International foodservice distribution"},
    {"rank": 10, "company": "Pepkor",              "country": "🇿🇦 South Africa", "sector": "Retail",              "revenue": 4.9,  "exchange": "JSE", "note": "Value retail across Southern Africa"},
]
AFRICA_TOP10_NETINCOME_STATIC = [
    {"rank": 1,  "company": "AngloGold Ashanti",   "country": "🇿🇦 South Africa", "sector": "Gold Mining",         "net_income": 2.7,  "exchange": "JSE", "note": "Gold supercycle drives record profitability"},
    {"rank": 2,  "company": "Naspers",             "country": "🇿🇦 South Africa", "sector": "Technology / Media",  "net_income": 2.86, "exchange": "JSE", "note": "Prosus/Tencent stake gains flow through"},
    {"rank": 3,  "company": "Standard Bank Group", "country": "🇿🇦 South Africa", "sector": "Banking",             "net_income": 2.1,  "exchange": "JSE", "note": "Steady banking sector earnings"},
    {"rank": 4,  "company": "FirstRand",           "country": "🇿🇦 South Africa", "sector": "Banking",             "net_income": 1.9,  "exchange": "JSE", "note": "Strong return on equity"},
    {"rank": 5,  "company": "Gold Fields",         "country": "🇿🇦 South Africa", "sector": "Gold Mining",         "net_income": 1.7,  "exchange": "JSE", "note": "Benefiting from elevated gold prices"},
    {"rank": 6,  "company": "MTN Nigeria",         "country": "🇳🇬 Nigeria",       "sector": "Telecommunications",  "net_income": 1.1,  "exchange": "NGX",  "note": "Dramatic turnaround: shareholders' equity swung from -N458bn to +N548.7bn"},
    {"rank": 7,  "company": "Capitec Bank",        "country": "🇿🇦 South Africa", "sector": "Banking",             "net_income": 1.0,  "exchange": "JSE", "note": "Continued retail banking momentum"},
    {"rank": 8,  "company": "Sasol",               "country": "🇿🇦 South Africa", "sector": "Chemicals / Energy",  "net_income": 0.9,  "exchange": "JSE", "note": "Improved margins on high oil prices"},
    {"rank": 9,  "company": "Vodacom",             "country": "🇿🇦 South Africa", "sector": "Telecommunications",  "net_income": 0.85, "exchange": "JSE", "note": "Egypt segment driving profitability"},
    {"rank": 10, "company": "Safaricom",           "country": "🇰🇪 Kenya",        "sector": "Telecommunications",  "net_income": 0.73, "exchange": "NSE",  "note": "KSh 95.6bn profit; M-Pesa Ethiopia narrowing losses"},
]

# BRVM Snapshot — STATIC, carried forward as-is each run. No free live API
# exists for BRVM. Update this block manually (ask Claude for a fresh
# session snapshot) whenever you want it refreshed — not necessarily weekly.
BRVM_SESSION_DATE_STATIC = "Séance du vendredi 3 juillet 2026"

BRVM_TOP5_MCAP_STATIC = [
    {"rank": 1, "company": "Sonatel",              "ticker": "SNTS", "mcap_bn": 2950.00},
    {"rank": 2, "company": "Orange Côte d'Ivoire", "ticker": "ORAC", "mcap_bn": 2546.08},
    {"rank": 3, "company": "SGCI",                 "ticker": "SGBC", "mcap_bn": 1151.11},
    {"rank": 4, "company": "Ecobank CI",           "ticker": "ECOC", "mcap_bn": 950.72},
    {"rank": 5, "company": "SIB",                  "ticker": "SIBC", "mcap_bn": 886.00},
]
BRVM_TOP5_GAINERS_STATIC = [
    {"rank": 1, "company": "BIIC",                 "ticker": "BICB", "variation_pct": 5.37, "price": 6275},
    {"rank": 2, "company": "Ecobank CI",           "ticker": "ECOC", "variation_pct": 4.67, "price": 17270},
    {"rank": 3, "company": "Sucrivoire",           "ticker": "SCRC", "variation_pct": 3.14, "price": 3610},
    {"rank": 4, "company": "Sicor",                "ticker": "SICC", "variation_pct": 2.97, "price": 5200},
    {"rank": 5, "company": "Ecobank Transnational","ticker": "ETIT", "variation_pct": 2.17, "price": 47},
]
BRVM_TOP5_LOSERS_STATIC = [
    {"rank": 1, "company": "Unilever CI",          "ticker": "UNLC", "variation_pct": -7.49, "price": 51395},
    {"rank": 2, "company": "SGCI",                 "ticker": "SGBC", "variation_pct": -5.10, "price": 37000},
    {"rank": 3, "company": "SAPH",                 "ticker": "SPHC", "variation_pct": -3.58, "price": 7675},
    {"rank": 4, "company": "Air Liquide - Eryum",  "ticker": "SIVC", "variation_pct": -3.09, "price": 2355},
    {"rank": 5, "company": "Servair",              "ticker": "ABJC", "variation_pct": -2.59, "price": 3200},
]
BRVM_TOP5_VOLUME_STATIC = [
    {"rank": 1, "company": "Ecobank Transnational", "ticker": "ETIT", "volume": 3915461},
    {"rank": 2, "company": "Uniwax",                "ticker": "UNXC", "volume": 111753},
    {"rank": 3, "company": "BOA Niger",             "ticker": "BOAN", "volume": 18123},
    {"rank": 4, "company": "Bolloré - AGL",         "ticker": "SDSC", "volume": 16554},
    {"rank": 5, "company": "BOA Bénin",             "ticker": "BOAB", "volume": 8139},
]


_FX_CACHE = {}

# Known currency codes → the FX pair to fetch. Yahoo Finance sometimes
# quotes certain exchanges in "minor units" (e.g. SA cents instead of Rand)
# and the exact code string it returns for that is inconsistent, so this
# maps every variant we might see back to the major-unit FX pair. Whether
# a /100 adjustment is ALSO needed is resolved separately by the
# self-calibrating plausibility check below, not guessed from the string.
FX_PAIR_FOR_CURRENCY = {
    "USD": "USD",
    "ZAR": "ZAR", "ZAC": "ZAR", "ZAc": "ZAR",
    "SAR": "SAR", "SAC": "SAR", "SAc": "SAR",
    "GBP": "GBP", "GBX": "GBP", "GBp": "GBP",
    "EUR": "EUR",
    "NGN": "NGN",
    "KES": "KES",
}


def get_fx_rate(fx_pair):
    """Return units of `fx_pair` per 1 USD (e.g. ZAR -> ~18.3)."""
    if fx_pair == "USD":
        return 1.0
    if fx_pair in _FX_CACHE:
        return _FX_CACHE[fx_pair]
    rate = None
    try:
        fx = yf.Ticker(f"{fx_pair}=X")
        rate = fx.fast_info.get("last_price")
        if not rate:
            hist = fx.history(period="5d")
            rate = float(hist["Close"].iloc[-1])
    except Exception as e:
        print(f"WARNING: FX fetch failed for {fx_pair}: {e}", file=sys.stderr)
    _FX_CACHE[fx_pair] = rate
    return rate


# Fallback currency inference from ticker suffix, used only when the API
# doesn't return a currency field at all (observed to happen intermittently
# for some exchanges, e.g. Saudi Tadawul, JSE).
SUFFIX_CURRENCY_FALLBACK = {
    ".JO": "ZAR",
    ".SR": "SAR",
    ".NGX": "NGN",
    ".NR": "KES",
}


def infer_currency_from_suffix(ticker):
    for suffix, currency in SUFFIX_CURRENCY_FALLBACK.items():
        if ticker.endswith(suffix):
            return currency
    return None


# Plausible range for a single listed company's market cap, in USD billions.
# Used to self-calibrate away from Yahoo Finance's inconsistent minor-unit
# (cents) quoting on certain exchanges, instead of guessing from the
# currency string.
PLAUSIBLE_MCAP_BN = (0.05, 20000)


def get_market_cap_usd(ticker, zar_rate=None):
    """Return market cap in USD billions for a ticker, converting any non-USD currency."""
    t = yf.Ticker(ticker)
    mcap = None
    currency = None
    try:
        info = t.get_info()
        mcap = info.get("marketCap")
        currency = info.get("currency")
    except Exception as e:
        print(f"WARNING: get_info failed for {ticker}: {e}", file=sys.stderr)

    if mcap is None:
        try:
            fi = t.fast_info
            mcap = fi.get("market_cap")
            currency = currency or fi.get("currency")
        except Exception as e:
            print(f"WARNING: fast_info failed for {ticker}: {e}", file=sys.stderr)

    if mcap is None:
        print(f"ERROR: no market cap for {ticker}, skipping", file=sys.stderr)
        return None

    mcap_bn_raw = mcap / 1e9

    if not currency:
        currency = infer_currency_from_suffix(ticker)
        if currency:
            print(f"INFO {ticker}: currency missing from API, inferred '{currency}' from ticker suffix", file=sys.stderr)

    print(f"DEBUG {ticker}: raw_mcap_bn={mcap_bn_raw:.4f} currency={currency}", file=sys.stderr)

    if not currency or currency.upper() == "USD" or currency == "USD":
        candidate = mcap_bn_raw
    else:
        fx_pair = FX_PAIR_FOR_CURRENCY.get(currency, currency.upper()[:3])
        rate = get_fx_rate(fx_pair)
        if not rate:
            print(f"WARNING: no FX rate for '{currency}' -> {fx_pair} ({ticker}), skipping", file=sys.stderr)
            return None
        candidate = mcap_bn_raw / rate

    # Self-calibrate for possible minor-unit (cents) quoting: try the direct
    # conversion first, then /100 and *100, and keep whichever value actually
    # falls in a plausible market-cap range instead of assuming a format.
    for factor, label in ((1, "direct"), (0.01, "/100"), (100, "x100")):
        value = candidate * factor
        if PLAUSIBLE_MCAP_BN[0] <= value <= PLAUSIBLE_MCAP_BN[1]:
            if factor != 1:
                print(f"INFO {ticker}: applied {label} correction to reach a plausible market cap (${value:.2f}bn)", file=sys.stderr)
            return round(value, 2)

    print(f"WARNING: no plausible market cap for {ticker} after conversion (raw candidate ${candidate:.2f}bn) — skipping", file=sys.stderr)
    return None


def build_ranked_list(candidates, top_n, zar_rate=None):
    rows = []
    for ticker in candidates:
        mcap_bn = get_market_cap_usd(ticker, zar_rate)
        if mcap_bn is None:
            continue
        meta = COMPANY_META.get(ticker, {"company": ticker, "country": "", "sector": ""})
        rows.append({"ticker": ticker, "mcap": mcap_bn, **meta})

    rows.sort(key=lambda r: r["mcap"], reverse=True)
    rows = rows[:top_n]
    for i, r in enumerate(rows, start=1):
        r["rank"] = i
    return rows


def js_str(v):
    return '"' + str(v).replace('"', '\\"') + '"'


def format_global_top5(rows):
    lines = ["const GLOBAL_TOP5 = ["]
    for r in rows:
        note = r.get("note", f"Live market cap via yfinance, {datetime.date.today().isoformat()}")
        lines.append(
            f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, ticker: {js_str(r["ticker"])}, '
            f'country: {js_str(r["country"])}, sector: {js_str(r["sector"])}, mcap: {round(r["mcap"], 0):.0f}, '
            f'note: {js_str(note)} }},'
        )
    lines.append("];")
    return "\n".join(lines)


def format_africa_mcap(rows):
    lines = ["const AFRICA_TOP10_MCAP = ["]
    for r in rows:
        note = r.get("note", "Live JSE market cap, converted to USD")
        lines.append(
            f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, country: {js_str(r["country"])}, '
            f'sector: {js_str(r["sector"])}, mcap: {r["mcap"]:.2f}, exchange: {js_str(r.get("exchange","JSE"))}, '
            f'note: {js_str(note)} }},'
        )
    lines.append("];")
    return "\n".join(lines)


def format_static_table(name, rows, value_key):
    lines = [f"const {name} = ["]
    for r in rows:
        lines.append(
            f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, country: {js_str(r["country"])}, '
            f'sector: {js_str(r["sector"])}, {value_key}: {r[value_key]}, exchange: {js_str(r["exchange"])}, '
            f'note: {js_str(r["note"])} }},'
        )
    lines.append("];")
    return "\n".join(lines)


def format_brvm_mcap(rows):
    lines = ["const BRVM_TOP5_MCAP = ["]
    for r in rows:
        lines.append(f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, ticker: {js_str(r["ticker"])}, mcap_bn: {r["mcap_bn"]:.2f} }},')
    lines.append("];")
    return "\n".join(lines)


def format_brvm_variation(name, rows):
    lines = [f"const {name} = ["]
    for r in rows:
        lines.append(
            f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, ticker: {js_str(r["ticker"])}, '
            f'variation_pct: {r["variation_pct"]}, price: {r["price"]} }},'
        )
    lines.append("];")
    return "\n".join(lines)


def format_brvm_volume(rows):
    lines = ["const BRVM_TOP5_VOLUME = ["]
    for r in rows:
        lines.append(f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, ticker: {js_str(r["ticker"])}, volume: {r["volume"]} }},')
    lines.append("];")
    return "\n".join(lines)


def format_snapshot(rows):
    lines = ["const GLOBAL_SNAPSHOT = ["]
    for r in rows[:5]:
        revenue = REVENUE_BN.get(r["ticker"], 0)
        net_income = NET_INCOME_BN.get(r["ticker"], 0)
        lines.append(
            f'  {{ rank: {r["rank"]}, company: {js_str(r["company"])}, mcap: {round(r["mcap"],0):.0f}, '
            f'revenue: {revenue}, net_income: {net_income} }},'
        )
    lines.append("];")
    return "\n".join(lines)


def main():
    today = datetime.date.today()
    week_label = f"Week of {today.strftime('%-d %B %Y')}"

    zar_rate = None  # kept for backward-compat signature; FX now auto-detected per ticker

    global_rows = build_ranked_list(GLOBAL_CANDIDATES, GLOBAL_TOP_N, zar_rate)
    africa_rows = build_ranked_list(AFRICA_CANDIDATES, AFRICA_TOP_N, zar_rate)

    if not global_rows or not africa_rows:
        print("ERROR: failed to fetch enough live data, aborting without overwriting data.js", file=sys.stderr)
        sys.exit(1)

    out = []
    out.append("// ============================================================")
    out.append("// WEEKLY MARKETS DASHBOARD — data.js")
    out.append(f"// Auto-updated by GitHub Actions: {today.isoformat()} ({week_label})")
    out.append("// Live market cap: Yahoo Finance via yfinance. Revenue/net income: static annual figures")
    out.append("// (see scripts/update_data.py — update those dictionaries when new annual reports are out).")
    out.append("// ============================================================")
    out.append("")
    out.append(f'const WEEK_LABEL = "{week_label}";')
    out.append("")
    out.append("const OVERVIEW = {")
    out.append(f'  global: {{ listed: {OVERVIEW_STATIC["global"]["listed"]}, mcap_tn: {OVERVIEW_STATIC["global"]["mcap_tn"]}, note: {js_str(OVERVIEW_STATIC["global"]["note"])} }},')
    out.append(f'  africa: {{ listed: {OVERVIEW_STATIC["africa"]["listed"]}, mcap_bn: {OVERVIEW_STATIC["africa"]["mcap_bn"]}, note: {js_str(OVERVIEW_STATIC["africa"]["note"])} }}')
    out.append("};")
    out.append("")
    out.append(f'const BRVM_SESSION_DATE = {js_str(BRVM_SESSION_DATE_STATIC)};')
    out.append("")
    out.append(format_brvm_mcap(BRVM_TOP5_MCAP_STATIC))
    out.append("")
    out.append(format_brvm_variation("BRVM_TOP5_GAINERS", BRVM_TOP5_GAINERS_STATIC))
    out.append("")
    out.append(format_brvm_variation("BRVM_TOP5_LOSERS", BRVM_TOP5_LOSERS_STATIC))
    out.append("")
    out.append(format_brvm_volume(BRVM_TOP5_VOLUME_STATIC))
    out.append("")
    out.append(format_global_top5(global_rows))
    out.append("")
    out.append(format_africa_mcap(africa_rows))
    out.append("")
    out.append(format_static_table("AFRICA_TOP10_REVENUE", AFRICA_TOP10_REVENUE_STATIC, "revenue"))
    out.append("")
    out.append(format_static_table("AFRICA_TOP10_NETINCOME", AFRICA_TOP10_NETINCOME_STATIC, "net_income"))
    out.append("")
    out.append(format_snapshot(global_rows))
    out.append("")

    with open("data.js", "w", encoding="utf-8") as f:
        f.write("\n".join(out))

    print("data.js written successfully.")


if __name__ == "__main__":
    main()
