// ============================================================
// WEEKLY MARKETS DASHBOARD — data.js
// Auto-updated by GitHub Actions: 2026-07-06 (Week of 6 July 2026)
// Live market cap: Yahoo Finance via yfinance. Revenue/net income: static annual figures
// (see scripts/update_data.py — update those dictionaries when new annual reports are out).
// ============================================================

const WEEK_LABEL = "Week of 6 July 2026";

const OVERVIEW = {
  global: { listed: 44152, mcap_tn: 150.3, note: "Source: CompaniesMarketCap.com" },
  africa: { listed: 1141, mcap_bn: 795, note: "Source: African Business Top 250, May 2026" }
};

const BRVM_SESSION_DATE = "Séance du vendredi 3 juillet 2026";

const BRVM_TOP5_MCAP = [
  { rank: 1, company: "Sonatel", ticker: "SNTS", mcap_bn: 2950.00 },
  { rank: 2, company: "Orange Côte d'Ivoire", ticker: "ORAC", mcap_bn: 2546.08 },
  { rank: 3, company: "SGCI", ticker: "SGBC", mcap_bn: 1151.11 },
  { rank: 4, company: "Ecobank CI", ticker: "ECOC", mcap_bn: 950.72 },
  { rank: 5, company: "SIB", ticker: "SIBC", mcap_bn: 886.00 },
];

const BRVM_TOP5_GAINERS = [
  { rank: 1, company: "BIIC", ticker: "BICB", variation_pct: 5.37, price: 6275 },
  { rank: 2, company: "Ecobank CI", ticker: "ECOC", variation_pct: 4.67, price: 17270 },
  { rank: 3, company: "Sucrivoire", ticker: "SCRC", variation_pct: 3.14, price: 3610 },
  { rank: 4, company: "Sicor", ticker: "SICC", variation_pct: 2.97, price: 5200 },
  { rank: 5, company: "Ecobank Transnational", ticker: "ETIT", variation_pct: 2.17, price: 47 },
];

const BRVM_TOP5_LOSERS = [
  { rank: 1, company: "Unilever CI", ticker: "UNLC", variation_pct: -7.49, price: 51395 },
  { rank: 2, company: "SGCI", ticker: "SGBC", variation_pct: -5.1, price: 37000 },
  { rank: 3, company: "SAPH", ticker: "SPHC", variation_pct: -3.58, price: 7675 },
  { rank: 4, company: "Air Liquide - Eryum", ticker: "SIVC", variation_pct: -3.09, price: 2355 },
  { rank: 5, company: "Servair", ticker: "ABJC", variation_pct: -2.59, price: 3200 },
];

const BRVM_TOP5_VOLUME = [
  { rank: 1, company: "Ecobank Transnational", ticker: "ETIT", volume: 3915461 },
  { rank: 2, company: "Uniwax", ticker: "UNXC", volume: 111753 },
  { rank: 3, company: "BOA Niger", ticker: "BOAN", volume: 18123 },
  { rank: 4, company: "Bolloré - AGL", ticker: "SDSC", volume: 16554 },
  { rank: 5, company: "BOA Bénin", ticker: "BOAB", volume: 8139 },
];

const GLOBAL_TOP5 = [
  { rank: 1, company: "NVIDIA", ticker: "NVDA", country: "🇺🇸 USA", sector: "Semiconductors", mcap: 4747, note: "Live market cap via yfinance, 2026-07-06" },
  { rank: 2, company: "Apple", ticker: "AAPL", country: "🇺🇸 USA", sector: "Technology", mcap: 4589, note: "Live market cap via yfinance, 2026-07-06" },
  { rank: 3, company: "Alphabet", ticker: "GOOGL", country: "🇺🇸 USA", sector: "Technology", mcap: 4453, note: "Live market cap via yfinance, 2026-07-06" },
  { rank: 4, company: "Microsoft", ticker: "MSFT", country: "🇺🇸 USA", sector: "Technology", mcap: 2866, note: "Live market cap via yfinance, 2026-07-06" },
  { rank: 5, company: "Amazon", ticker: "AMZN", country: "🇺🇸 USA", sector: "E-Commerce / Cloud", mcap: 2639, note: "Live market cap via yfinance, 2026-07-06" },
];

const AFRICA_TOP10_MCAP = [
  { rank: 1, company: "AngloGold Ashanti", country: "🇿🇦 South Africa", sector: "Gold Mining", mcap: 42.71, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 2, company: "Naspers", country: "🇿🇦 South Africa", sector: "Technology / Media", mcap: 37.75, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 3, company: "Capitec Bank", country: "🇿🇦 South Africa", sector: "Banking", mcap: 34.27, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 4, company: "FirstRand", country: "🇿🇦 South Africa", sector: "Banking", mcap: 33.94, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 5, company: "Standard Bank Group", country: "🇿🇦 South Africa", sector: "Banking", mcap: 32.47, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 6, company: "Gold Fields", country: "🇿🇦 South Africa", sector: "Gold Mining", mcap: 31.16, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 7, company: "MTN Group", country: "🇿🇦 South Africa", sector: "Telecommunications", mcap: 25.65, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 8, company: "Vodacom", country: "🇿🇦 South Africa", sector: "Telecommunications", mcap: 18.21, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 9, company: "Discovery Limited", country: "🇿🇦 South Africa", sector: "Insurance", mcap: 10.96, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
  { rank: 10, company: "Impala Platinum", country: "🇿🇦 South Africa", sector: "Platinum Mining", mcap: 10.12, exchange: "JSE", note: "Live JSE market cap, converted to USD" },
];

const AFRICA_TOP10_REVENUE = [
  { rank: 1, company: "Shoprite", country: "🇿🇦 South Africa", sector: "Retail", revenue: 13.8, exchange: "JSE", note: "Africa's largest food retailer by revenue" },
  { rank: 2, company: "MTN Group", country: "🇿🇦 South Africa", sector: "Telecommunications", revenue: 11.6, exchange: "JSE", note: "Pan-African footprint across 19 markets" },
  { rank: 3, company: "Naspers", country: "🇿🇦 South Africa", sector: "Technology / Media", revenue: 10.9, exchange: "JSE", note: "Consolidated Prosus e-commerce and classifieds revenue" },
  { rank: 4, company: "Sasol", country: "🇿🇦 South Africa", sector: "Chemicals / Energy", revenue: 9.7, exchange: "JSE", note: "Synthetic fuels revenue benefits from high crude prices" },
  { rank: 5, company: "Vodacom", country: "🇿🇦 South Africa", sector: "Telecommunications", revenue: 8.9, exchange: "JSE", note: "Egypt and DRC growth offsetting SA maturity" },
  { rank: 6, company: "Bidvest Group", country: "🇿🇦 South Africa", sector: "Diversified Services", revenue: 8.3, exchange: "JSE", note: "Diversified services and logistics conglomerate" },
  { rank: 7, company: "Standard Bank Group", country: "🇿🇦 South Africa", sector: "Banking", revenue: 7.9, exchange: "JSE", note: "Largest bank by total income" },
  { rank: 8, company: "FirstRand", country: "🇿🇦 South Africa", sector: "Banking", revenue: 7.2, exchange: "JSE", note: "Strong net interest income growth" },
  { rank: 9, company: "Bid Corp", country: "🇿🇦 South Africa", sector: "Food Services", revenue: 6.8, exchange: "JSE", note: "International foodservice distribution" },
  { rank: 10, company: "Pepkor", country: "🇿🇦 South Africa", sector: "Retail", revenue: 4.9, exchange: "JSE", note: "Value retail across Southern Africa" },
];

const AFRICA_TOP10_NETINCOME = [
  { rank: 1, company: "AngloGold Ashanti", country: "🇿🇦 South Africa", sector: "Gold Mining", net_income: 2.7, exchange: "JSE", note: "Gold supercycle drives record profitability" },
  { rank: 2, company: "Naspers", country: "🇿🇦 South Africa", sector: "Technology / Media", net_income: 2.86, exchange: "JSE", note: "Prosus/Tencent stake gains flow through" },
  { rank: 3, company: "Standard Bank Group", country: "🇿🇦 South Africa", sector: "Banking", net_income: 2.1, exchange: "JSE", note: "Steady banking sector earnings" },
  { rank: 4, company: "FirstRand", country: "🇿🇦 South Africa", sector: "Banking", net_income: 1.9, exchange: "JSE", note: "Strong return on equity" },
  { rank: 5, company: "Gold Fields", country: "🇿🇦 South Africa", sector: "Gold Mining", net_income: 1.7, exchange: "JSE", note: "Benefiting from elevated gold prices" },
  { rank: 6, company: "MTN Nigeria", country: "🇳🇬 Nigeria", sector: "Telecommunications", net_income: 1.1, exchange: "NGX", note: "Dramatic turnaround: shareholders' equity swung from -N458bn to +N548.7bn" },
  { rank: 7, company: "Capitec Bank", country: "🇿🇦 South Africa", sector: "Banking", net_income: 1.0, exchange: "JSE", note: "Continued retail banking momentum" },
  { rank: 8, company: "Sasol", country: "🇿🇦 South Africa", sector: "Chemicals / Energy", net_income: 0.9, exchange: "JSE", note: "Improved margins on high oil prices" },
  { rank: 9, company: "Vodacom", country: "🇿🇦 South Africa", sector: "Telecommunications", net_income: 0.85, exchange: "JSE", note: "Egypt segment driving profitability" },
  { rank: 10, company: "Safaricom", country: "🇰🇪 Kenya", sector: "Telecommunications", net_income: 0.73, exchange: "NSE", note: "KSh 95.6bn profit; M-Pesa Ethiopia narrowing losses" },
];

const GLOBAL_SNAPSHOT = [
  { rank: 1, company: "NVIDIA", mcap: 4747, revenue: 215.9, net_income: 120.1 },
  { rank: 2, company: "Apple", mcap: 4589, revenue: 416.2, net_income: 112.0 },
  { rank: 3, company: "Alphabet", mcap: 4453, revenue: 402.8, net_income: 132.2 },
  { rank: 4, company: "Microsoft", mcap: 2866, revenue: 281.7, net_income: 101.8 },
  { rank: 5, company: "Amazon", mcap: 2639, revenue: 716.9, net_income: 77.7 },
];
