// ============================================================
// WEEKLY MARKETS DASHBOARD — data.js
// Updated: 2026-07-03 (Week of 3 July 2026)
// Sources: CompaniesMarketCap.com (live), African Business Top 250 (May 2026),
//          Accra Street Journal Africa profitability report (May 2026)
// ============================================================

const WEEK_LABEL = "Week of 3 July 2026";

const OVERVIEW = {
  global: {
    listed:    44152,
    mcap_tn:   150.3,
    note:      "Source: CompaniesMarketCap.com, live as of 3 July 2026"
  },
  africa: {
    listed:    1141,
    mcap_bn:   795,
    note:      "Source: African Business Top 250, May 2026 (+34% YoY, from $595bn to $795bn)"
  }
};

const GLOBAL_TOP5 = [
  { rank: 1, company: "NVIDIA",    ticker: "NVDA",  country: "🇺🇸 USA", sector: "Semiconductors",     mcap_tn: 5.11, note: "First company ever to reach $5T market cap; AI GPU dominance continues" },
  { rank: 2, company: "Apple",     ticker: "AAPL",  country: "🇺🇸 USA", sector: "Technology",         mcap_tn: 4.58, note: "Overtakes Alphabet for 2nd; services growth and product cycle support valuation" },
  { rank: 3, company: "Alphabet",  ticker: "GOOGL", country: "🇺🇸 USA", sector: "Technology",         mcap_tn: 4.56, note: "Essentially neck-and-neck with Apple; AI-linked ad recovery continues" },
  { rank: 4, company: "Microsoft", ticker: "MSFT",  country: "🇺🇸 USA", sector: "Technology",         mcap_tn: 3.34, note: "Azure cloud + Copilot AI integration driving sustained growth" },
  { rank: 5, company: "Amazon",    ticker: "AMZN",  country: "🇺🇸 USA", sector: "E-Commerce / Cloud", mcap_tn: 2.91, note: "AWS remains largest cloud provider; logistics automation ongoing" }
];

// Africa Top 10 by Market Capitalisation — live JSE data (proxy for continental ranking; South Africa = ~58% of Africa Top 250 value)
const AFRICA_TOP10_MCAP = [
  { rank: 1,  company: "AngloGold Ashanti",  country: "🇿🇦 South Africa", sector: "Gold Mining",         mcap_bn: 45.43, exchange: "JSE", note: "Gold's rally past $4,400/oz keeps miners at the top" },
  { rank: 2,  company: "Naspers",            country: "🇿🇦 South Africa", sector: "Technology / Media",  mcap_bn: 40.48, exchange: "JSE", note: "Prosus stake continues to anchor valuation" },
  { rank: 3,  company: "Gold Fields",        country: "🇿🇦 South Africa", sector: "Gold Mining",         mcap_bn: 33.93, exchange: "JSE", note: "Second gold miner in the top 3" },
  { rank: 4,  company: "FirstRand",          country: "🇿🇦 South Africa", sector: "Banking",             mcap_bn: 30.80, exchange: "JSE", note: "Up on stronger banking sector performance" },
  { rank: 5,  company: "Capitec Bank",       country: "🇿🇦 South Africa", sector: "Banking",             mcap_bn: 30.57, exchange: "JSE", note: "Continued retail banking growth" },
  { rank: 6,  company: "Standard Bank Group",country: "🇿🇦 South Africa", sector: "Banking",             mcap_bn: 30.20, exchange: "JSE", note: "Largest African bank by assets" },
  { rank: 7,  company: "MTN Group",          country: "🇿🇦 South Africa", sector: "Telecommunications",  mcap_bn: 24.12, exchange: "JSE", note: "Nigeria unit swung to profit on tariff hikes and FX gains" },
  { rank: 8,  company: "Vodacom",            country: "🇿🇦 South Africa", sector: "Telecommunications",  mcap_bn: 17.78, exchange: "JSE", note: "Egypt segment now most profitable unit" },
  { rank: 9,  company: "Impala Platinum",    country: "🇿🇦 South Africa", sector: "Platinum Mining",     mcap_bn: 12.07, exchange: "JSE", note: "Platinum prices above $2,700/oz on tight supply" },
  { rank: 10, company: "Discovery Limited",  country: "🇿🇦 South Africa", sector: "Insurance",           mcap_bn: 10.99, exchange: "JSE", note: "Steady growth in health and life insurance" }
];

// Africa Top 10 by Revenue — FY2025 annual reports / African Business Top 250
const AFRICA_TOP10_REVENUE = [
  { rank: 1,  company: "Shoprite",           country: "🇿🇦 South Africa", sector: "Retail",             revenue_bn: 13.8, exchange: "JSE", note: "Africa's largest food retailer by revenue" },
  { rank: 2,  company: "MTN Group",          country: "🇿🇦 South Africa", sector: "Telecommunications", revenue_bn: 11.6, exchange: "JSE", note: "Pan-African footprint across 19 markets" },
  { rank: 3,  company: "Naspers",            country: "🇿🇦 South Africa", sector: "Technology / Media",  revenue_bn: 10.9, exchange: "JSE", note: "Consolidated Prosus e-commerce and classifieds revenue" },
  { rank: 4,  company: "Sasol",              country: "🇿🇦 South Africa", sector: "Chemicals / Energy",  revenue_bn: 9.7,  exchange: "JSE", note: "Synthetic fuels revenue benefits from high crude prices" },
  { rank: 5,  company: "Vodacom",            country: "🇿🇦 South Africa", sector: "Telecommunications", revenue_bn: 8.9,  exchange: "JSE", note: "Egypt and DRC growth offsetting SA maturity" },
  { rank: 6,  company: "Bidvest Group",      country: "🇿🇦 South Africa", sector: "Diversified Services", revenue_bn: 8.3,  exchange: "JSE", note: "Diversified services and logistics conglomerate" },
  { rank: 7,  company: "Standard Bank Group",country: "🇿🇦 South Africa", sector: "Banking",             revenue_bn: 7.9,  exchange: "JSE", note: "Largest bank by total income" },
  { rank: 8,  company: "FirstRand",          country: "🇿🇦 South Africa", sector: "Banking",             revenue_bn: 7.2,  exchange: "JSE", note: "Strong net interest income growth" },
  { rank: 9,  company: "Bid Corp",           country: "🇿🇦 South Africa", sector: "Food Services",       revenue_bn: 6.8,  exchange: "JSE", note: "International foodservice distribution" },
  { rank: 10, company: "Pepkor",             country: "🇿🇦 South Africa", sector: "Retail",             revenue_bn: 4.9,  exchange: "JSE", note: "Value retail across Southern Africa" }
];

// Africa Top 10 by Net Income — FY2025 annual reports / Accra Street Journal profitability report (May 2026)
const AFRICA_TOP10_NETINCOME = [
  { rank: 1,  company: "AngloGold Ashanti",  country: "🇿🇦 South Africa", sector: "Gold Mining",         netincome_bn: 2.7,  exchange: "JSE", note: "Gold supercycle drives record profitability" },
  { rank: 2,  company: "Naspers",            country: "🇿🇦 South Africa", sector: "Technology / Media",  netincome_bn: 2.86, exchange: "JSE", note: "Prosus/Tencent stake gains flow through" },
  { rank: 3,  company: "Standard Bank Group",country: "🇿🇦 South Africa", sector: "Banking",             netincome_bn: 2.1,  exchange: "JSE", note: "Steady banking sector earnings" },
  { rank: 4,  company: "FirstRand",          country: "🇿🇦 South Africa", sector: "Banking",             netincome_bn: 1.9,  exchange: "JSE", note: "Strong return on equity" },
  { rank: 5,  company: "Gold Fields",        country: "🇿🇦 South Africa", sector: "Gold Mining",         netincome_bn: 1.7,  exchange: "JSE", note: "Benefiting from elevated gold prices" },
  { rank: 6,  company: "MTN Nigeria",        country: "🇳🇬 Nigeria",       sector: "Telecommunications", netincome_bn: 1.1,  exchange: "NGX",  note: "Dramatic turnaround: shareholders' equity swung from -N458bn to +N548.7bn" },
  { rank: 7,  company: "Capitec Bank",       country: "🇿🇦 South Africa", sector: "Banking",             netincome_bn: 1.0,  exchange: "JSE", note: "Continued retail banking momentum" },
  { rank: 8,  company: "Sasol",              country: "🇿🇦 South Africa", sector: "Chemicals / Energy",  netincome_bn: 0.9,  exchange: "JSE", note: "Improved margins on high oil prices" },
  { rank: 9,  company: "Vodacom",            country: "🇿🇦 South Africa", sector: "Telecommunications", netincome_bn: 0.85, exchange: "JSE", note: "Egypt segment driving profitability" },
  { rank: 10, company: "Safaricom",          country: "🇰🇪 Kenya",        sector: "Telecommunications", netincome_bn: 0.73, exchange: "NSE",  note: "KSh 95.6bn profit; M-Pesa Ethiopia narrowing losses" }
];

const GLOBAL_SNAPSHOT = [
  { rank: 1, company: "NVIDIA",     mcap_tn: 5.11 },
  { rank: 2, company: "Apple",      mcap_tn: 4.58 },
  { rank: 3, company: "Alphabet",   mcap_tn: 4.56 },
  { rank: 4, company: "Microsoft",  mcap_tn: 3.34 },
  { rank: 5, company: "Amazon",     mcap_tn: 2.91 },
  { rank: 6, company: "TSMC",       mcap_tn: 2.17 },
  { rank: 7, company: "Broadcom",   mcap_tn: 2.12 },
  { rank: 8, company: "Saudi Aramco", mcap_tn: 1.78 },
  { rank: 9, company: "Tesla",      mcap_tn: 1.64 },
  { rank: 10, company: "Meta Platforms", mcap_tn: 1.61 }
];
