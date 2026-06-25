// ============================================================
// WEEKLY MARKETS DASHBOARD — data.js
// Update this file every Monday. index.html never changes.
// Week of: June 23, 2026
// ============================================================

const WEEK_LABEL = "Week of June 23, 2026";
const PREV_WEEK_LABEL = "Week of June 16, 2026";

// ── OVERVIEW ────────────────────────────────────────────────
// Source: OECD Corporate Governance Factbook 2025 (end-2024 data)
// Global: ~44,000 listed companies worldwide (OECD, 2025)
// Africa: 1,141 listed companies (OECD Africa Capital Markets Report 2025)
const OVERVIEW = {
  global: {
    listed: 44152,
    prev_listed: 44100,   // update weekly from WFE / OECD data
    note: "Source: OECD Corporate Governance Factbook 2025 (end-2024)"
  },
  africa: {
    listed: 1141,
    prev_listed: 1138,    // update weekly
    mcap_bn: 564,         // Africa Top 250 total Mcap, March 2025 (African Business)
    prev_mcap_bn: 503,
    note: "Source: OECD Africa Capital Markets Report 2025 / African Business Top 250 (March 2025)"
  }
};

// ── GLOBAL TOP 5 by Market Cap ───────────────────────────────
// (keep your existing section — unchanged)
const GLOBAL_TOP5 = [
  { rank: 1, company: "Apple",     country: "USA",   exchange: "NASDAQ", mcap: 3180, sector: "Technology" },
  { rank: 2, company: "Microsoft", country: "USA",   exchange: "NASDAQ", mcap: 3120, sector: "Technology" },
  { rank: 3, company: "NVIDIA",    country: "USA",   exchange: "NASDAQ", mcap: 2950, sector: "Semiconductors" },
  { rank: 4, company: "Saudi Aramco", country: "KSA", exchange: "Tadawul", mcap: 1700, sector: "Energy" },
  { rank: 5, company: "Alphabet",  country: "USA",   exchange: "NASDAQ", mcap: 1960, sector: "Technology" }
];

// ── AFRICA TOP 10 — by Market Cap ───────────────────────────
// Source: African Business Top 250 (March 2025) + Shore Africa (May 2025)
// All figures in USD billion
const AFRICA_TOP10_MCAP = [
  { rank: 1,  company: "Naspers",           country: "South Africa", exchange: "JSE",   mcap: 40.4, sector: "Technology / Internet" },
  { rank: 2,  company: "FirstRand",         country: "South Africa", exchange: "JSE",   mcap: 21.9, sector: "Banking" },
  { rank: 3,  company: "Standard Bank",     country: "South Africa", exchange: "JSE",   mcap: 21.6, sector: "Banking" },
  { rank: 4,  company: "Gold Fields",       country: "South Africa", exchange: "JSE / NYSE", mcap: 19.7, sector: "Mining – Gold" },
  { rank: 5,  company: "Capitec Bank",      country: "South Africa", exchange: "JSE",   mcap: 19.6, sector: "Banking" },
  { rank: 6,  company: "AngloGold Ashanti", country: "South Africa", exchange: "JSE",   mcap: 18.7, sector: "Mining – Gold" },
  { rank: 7,  company: "Attijariwafa Bank", country: "Morocco",      exchange: "CSE",   mcap: 15.6, sector: "Banking" },
  { rank: 8,  company: "Vodacom Group",     country: "South Africa", exchange: "JSE",   mcap: 14.2, sector: "Telecoms" },
  { rank: 9,  company: "MTN Group",         country: "South Africa", exchange: "JSE",   mcap: 12.6, sector: "Telecoms" },
  { rank: 10, company: "Maroc Telecom",     country: "Morocco",      exchange: "CSE / Euronext", mcap: 10.8, sector: "Telecoms" }
];

// ── AFRICA TOP 10 — by Revenue ──────────────────────────────
// Source: African Business Top 250 (2025) / company annual reports FY2024
// MTN revenue: ~$12.2B (FY2024). Shoprite: ~$13.8B (R252.7B ÷ 18.3).
// Standard Bank: ~$9.9B. FirstRand: ~$7.8B. Vodacom: ~$8.2B.
// Bid Corp: ~$7.5B. Sasol: ~$7.0B. Sanlam: ~$6.5B.
// Absa Group: ~$6.0B. Anglo American Platinum: ~$5.5B.
// All figures in USD billion (FY2024 annual reports)
const AFRICA_TOP10_REVENUE = [
  { rank: 1,  company: "Shoprite Holdings",      country: "South Africa", exchange: "JSE", revenue: 13.8, sector: "Retail" },
  { rank: 2,  company: "MTN Group",              country: "South Africa", exchange: "JSE", revenue: 12.2, sector: "Telecoms" },
  { rank: 3,  company: "Standard Bank Group",    country: "South Africa", exchange: "JSE", revenue: 9.9,  sector: "Banking" },
  { rank: 4,  company: "Vodacom Group",          country: "South Africa", exchange: "JSE", revenue: 8.2,  sector: "Telecoms" },
  { rank: 5,  company: "FirstRand",              country: "South Africa", exchange: "JSE", revenue: 7.8,  sector: "Banking" },
  { rank: 6,  company: "Bid Corporation",        country: "South Africa", exchange: "JSE", revenue: 7.5,  sector: "Food Services" },
  { rank: 7,  company: "Sasol",                  country: "South Africa", exchange: "JSE / NYSE", revenue: 7.0, sector: "Chemicals / Energy" },
  { rank: 8,  company: "Sanlam",                 country: "South Africa", exchange: "JSE", revenue: 6.5,  sector: "Insurance" },
  { rank: 9,  company: "Absa Group",             country: "South Africa", exchange: "JSE", revenue: 6.0,  sector: "Banking" },
  { rank: 10, company: "Valterra Platinum",      country: "South Africa", exchange: "JSE", revenue: 5.5,  sector: "Mining – PGMs" }
];

// ── AFRICA TOP 10 — by Net Income ───────────────────────────
// Source: African Business Top 250 (2025) / company annual reports FY2024
// All figures in USD billion. Negative = net loss.
const AFRICA_TOP10_NETINCOME = [
  { rank: 1,  company: "Standard Bank Group",    country: "South Africa", exchange: "JSE",        net_income: 2.39,   sector: "Banking" },
  { rank: 2,  company: "FirstRand",              country: "South Africa", exchange: "JSE",        net_income: 2.13,   sector: "Banking" },
  { rank: 3,  company: "Naspers",                country: "South Africa", exchange: "JSE",        net_income: 2.86,   sector: "Technology" },
  { rank: 4,  company: "Gold Fields",            country: "South Africa", exchange: "JSE / NYSE", net_income: 1.25,   sector: "Mining – Gold" },
  { rank: 5,  company: "Capitec Bank",           country: "South Africa", exchange: "JSE",        net_income: 0.55,   sector: "Banking" },
  { rank: 6,  company: "Attijariwafa Bank",      country: "Morocco",      exchange: "CSE",        net_income: 0.99,   sector: "Banking" },
  { rank: 7,  company: "Vodacom Group",          country: "South Africa", exchange: "JSE",        net_income: 0.89,   sector: "Telecoms" },
  { rank: 8,  company: "Shoprite Holdings",      country: "South Africa", exchange: "JSE",        net_income: 0.70,   sector: "Retail" },
  { rank: 9,  company: "MTN Group",              country: "South Africa", exchange: "JSE",        net_income: -0.53,  sector: "Telecoms" },
  { rank: 10, company: "Maroc Telecom",          country: "Morocco",      exchange: "CSE / Euronext", net_income: 0.55, sector: "Telecoms" }
];

// ── GLOBAL COMPARATIVE SNAPSHOT ─────────────────────────────
// (keep your existing section)
const GLOBAL_SNAPSHOT = [
  { company: "Apple",        mcap: 3180, revenue: 391, net_income: 94  },
  { company: "Microsoft",   mcap: 3120, revenue: 245, net_income: 88  },
  { company: "NVIDIA",      mcap: 2950, revenue: 130, net_income: 55  },
  { company: "Saudi Aramco",mcap: 1700, revenue: 440, net_income: 81  },
  { company: "Alphabet",    mcap: 1960, revenue: 350, net_income: 94  }
];
