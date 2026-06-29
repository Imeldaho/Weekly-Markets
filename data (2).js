// ============================================================
// WEEKLY MARKETS DASHBOARD — data.js
// Updated: 2026-06-29 (Week of 29 June 2026)
// Sources: AlphaSense, Visual Capitalist, African Business Top 250 (May 2026)
// ============================================================

const WEEK_LABEL = "Week of 29 June 2026";

const OVERVIEW = {
  global: {
    listed:    44152,
    mcap_tn:   125,
    note:      "Source: CompaniesMarketCap / OECD Corporate Governance Factbook 2025"
  },
  africa: {
    listed:    1141,
    mcap_bn:   795,
    note:      "Source: African Business Top 250, May 2026 (+34% YoY)"
  }
};

const GLOBAL_TOP5 = [
  { rank: 1, company: "NVIDIA",    ticker: "NVDA",  country: "🇺🇸 USA", sector: "Semiconductors", mcap_tn: 5.23, note: "First company to reach $5T market cap; AI GPU dominance" },
  { rank: 2, company: "Alphabet",  ticker: "GOOGL", country: "🇺🇸 USA", sector: "Technology",     mcap_tn: 4.63, note: "Solidly 2nd; AI-linked ad recovery + quantum computing" },
  { rank: 3, company: "Apple",     ticker: "AAPL",  country: "🇺🇸 USA", sector: "Technology",     mcap_tn: 4.53, note: "Services growth and AR product launches support valuation" },
  { rank: 4, company: "Microsoft", ticker: "MSFT",  country: "🇺🇸 USA", sector: "Technology",     mcap_tn: 3.11, note: "Azure cloud + Copilot AI; $190bn capex planned in 2026" },
  { rank: 5, company: "Amazon",    ticker: "AMZN",  country: "🇺🇸 USA", sector: "E-Commerce / Cloud", mcap_tn: 2.87, note: "AWS largest cloud provider; Prime 200M+ users" }
];

// Africa Top 10 by Market Capitalisation — African Business Top 250 (May 2026)
const AFRICA_TOP10_MCAP = [
  { rank: 1,  company: "AngloGold Ashanti",  country: "🇿🇦 South Africa", sector: "Gold Mining",      mcap_bn: 49.8,  exchange: "JSE" },
  { rank: 2,  company: "Gold Fields",         country: "🇿🇦 South Africa", sector: "Gold Mining",      mcap_bn: 39.8,  exchange: "JSE" },
  { rank: 3,  company: "Naspers",             country: "🇿🇦 South Africa", sector: "Internet / Media",  mcap_bn: 39.0,  exchange: "JSE" },
  { rank: 4,  company: "Standard Bank",       country: "🇿🇦 South Africa", sector: "Banking",           mcap_bn: 30.5,  exchange: "JSE" },
  { rank: 5,  company: "FirstRand",           country: "🇿🇦 South Africa", sector: "Banking",           mcap_bn: 27.8,  exchange: "JSE" },
  { rank: 6,  company: "Capitec Bank",        country: "🇿🇦 South Africa", sector: "Banking",           mcap_bn: 25.2,  exchange: "JSE" },
  { rank: 7,  company: "Valterra Platinum",   country: "🇿🇦 South Africa", sector: "Platinum / PGMs",   mcap_bn: 21.7,  exchange: "JSE" },
  { rank: 8,  company: "MTN Group",           country: "🇿🇦 South Africa", sector: "Telecoms",          mcap_bn: 21.0,  exchange: "JSE" },
  { rank: 9,  company: "BHP (Africa-listed)", country: "🇿🇦 South Africa", sector: "Diversified Mining", mcap_bn: 18.0, exchange: "JSE" },
  { rank: 10, company: "Attijariwafa Bank",   country: "🇲🇦 Morocco",       sector: "Banking",           mcap_bn: 15.7,  exchange: "Casablanca" }
];

// Africa Top 10 by Revenue — FY2024/25 Annual Reports
const AFRICA_TOP10_REVENUE = [
  { rank: 1,  company: "Shoprite",          country: "🇿🇦 South Africa", sector: "Retail",              revenue_bn: 13.8, exchange: "JSE" },
  { rank: 2,  company: "Naspers / Prosus",  country: "🇿🇦 South Africa", sector: "Internet / Media",     revenue_bn: 7.2,  exchange: "JSE" },
  { rank: 3,  company: "Standard Bank",     country: "🇿🇦 South Africa", sector: "Banking",              revenue_bn: 6.8,  exchange: "JSE" },
  { rank: 4,  company: "MTN Group",         country: "🇿🇦 South Africa", sector: "Telecoms",             revenue_bn: 6.5,  exchange: "JSE" },
  { rank: 5,  company: "FirstRand",         country: "🇿🇦 South Africa", sector: "Banking",              revenue_bn: 6.1,  exchange: "JSE" },
  { rank: 6,  company: "AngloGold Ashanti", country: "🇿🇦 South Africa", sector: "Gold Mining",           revenue_bn: 5.9,  exchange: "JSE" },
  { rank: 7,  company: "Gold Fields",       country: "🇿🇦 South Africa", sector: "Gold Mining",           revenue_bn: 5.4,  exchange: "JSE" },
  { rank: 8,  company: "Attijariwafa Bank", country: "🇲🇦 Morocco",       sector: "Banking",              revenue_bn: 4.8,  exchange: "Casablanca" },
  { rank: 9,  company: "Safaricom",         country: "🇰🇪 Kenya",         sector: "Telecoms",             revenue_bn: 3.1,  exchange: "NSE" },
  { rank: 10, company: "Dangote Cement",    country: "🇳🇬 Nigeria",       sector: "Construction Materials", revenue_bn: 2.6, exchange: "NGX" }
];

// Africa Top 10 by Net Income — FY2024/25 Annual Reports
const AFRICA_TOP10_NETINCOME = [
  { rank: 1,  company: "AngloGold Ashanti", country: "🇿🇦 South Africa", sector: "Gold Mining",    netincome_bn: 2.70,  exchange: "JSE" },
  { rank: 2,  company: "Gold Fields",       country: "🇿🇦 South Africa", sector: "Gold Mining",    netincome_bn: 3.57,  exchange: "JSE" },
  { rank: 3,  company: "Naspers",           country: "🇿🇦 South Africa", sector: "Internet/Media", netincome_bn: 2.86,  exchange: "JSE" },
  { rank: 4,  company: "Standard Bank",     country: "🇿🇦 South Africa", sector: "Banking",        netincome_bn: 2.50,  exchange: "JSE" },
  { rank: 5,  company: "FirstRand",         country: "🇿🇦 South Africa", sector: "Banking",        netincome_bn: 2.30,  exchange: "JSE" },
  { rank: 6,  company: "Attijariwafa Bank", country: "🇲🇦 Morocco",       sector: "Banking",        netincome_bn: 1.40,  exchange: "Casablanca" },
  { rank: 7,  company: "Safaricom",         country: "🇰🇪 Kenya",         sector: "Telecoms",       netincome_bn: 0.68,  exchange: "NSE" },
  { rank: 8,  company: "MTN Nigeria",       country: "🇳🇬 Nigeria",       sector: "Telecoms",       netincome_bn: 0.80,  exchange: "NGX" },
  { rank: 9,  company: "Capitec Bank",      country: "🇿🇦 South Africa", sector: "Banking",        netincome_bn: 1.10,  exchange: "JSE" },
  { rank: 10, company: "Dangote Cement",    country: "🇳🇬 Nigeria",       sector: "Construction",   netincome_bn: 0.55,  exchange: "NGX" }
];

// Global Snapshot — Top companies across mcap / revenue / net income
const GLOBAL_SNAPSHOT = [
  { company: "NVIDIA",       ticker: "NVDA",  country: "🇺🇸",  mcap_tn: 5.23, revenue_bn: 130.5, netincome_bn: 72.9,  sector: "Semiconductors" },
  { company: "Alphabet",     ticker: "GOOGL", country: "🇺🇸",  mcap_tn: 4.63, revenue_bn: 350.0, netincome_bn: 94.2,  sector: "Technology" },
  { company: "Apple",        ticker: "AAPL",  country: "🇺🇸",  mcap_tn: 4.53, revenue_bn: 400.0, netincome_bn: 97.0,  sector: "Technology" },
  { company: "Microsoft",    ticker: "MSFT",  country: "🇺🇸",  mcap_tn: 3.11, revenue_bn: 270.0, netincome_bn: 88.0,  sector: "Technology" },
  { company: "Amazon",       ticker: "AMZN",  country: "🇺🇸",  mcap_tn: 2.87, revenue_bn: 637.9, netincome_bn: 59.2,  sector: "E-Commerce/Cloud" },
  { company: "TSMC",         ticker: "TSM",   country: "🇹🇼",  mcap_tn: 2.30, revenue_bn: 90.5,  netincome_bn: 36.7,  sector: "Semiconductors" },
  { company: "SpaceX",       ticker: "—",     country: "🇺🇸",  mcap_tn: 2.10, revenue_bn: 15.0,  netincome_bn: 1.5,   sector: "Aerospace" },
  { company: "Saudi Aramco", ticker: "2222",  country: "🇸🇦",  mcap_tn: 1.90, revenue_bn: 440.0, netincome_bn: 110.0, sector: "Energy" },
  { company: "Meta",         ticker: "META",  country: "🇺🇸",  mcap_tn: 1.40, revenue_bn: 185.0, netincome_bn: 62.4,  sector: "Social Media" },
  { company: "Broadcom",     ticker: "AVGO",  country: "🇺🇸",  mcap_tn: 1.80, revenue_bn: 54.0,  netincome_bn: 14.1,  sector: "Semiconductors" }
];
