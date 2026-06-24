// ============================================================
//  WEEKLY MARKETS DATA — update this file every Monday
//  Last updated: 24 June 2026
// ============================================================

const MARKETS_DATA = {

  week: "24 June 2026",
  data_date: "Data: 23–24 Jun 2026",
  sources: "Robinhood, Google Finance, Morningstar, African-Markets.com, JSE",

  // ----------------------------------------------------------
  //  GLOBAL TOP 5 — by market capitalisation
  // ----------------------------------------------------------
  global: [
    {
      name: "NVIDIA",
      sector: "AI chips & GPUs",
      mcap: "Mkt cap: ~$5.2T",
      price: "$198.70",
      currency: "USD",
      exchange: "NASDAQ",
      prev_price: "~$196.00",
      variation: "+1.4%",
      news: "Stock testing key $200 support; market eyes Vera Rubin GPU launch for next leg higher."
    },
    {
      name: "Alphabet",
      sector: "Search, cloud, AI",
      mcap: "Mkt cap: ~$4.6T",
      price: "$346.13",
      currency: "USD",
      exchange: "NASDAQ",
      prev_price: "~$349.70",
      variation: "−1.0%",
      news: "Joining Dow Jones on Jun 29 replacing Verizon; Google Cloud backlog hits record $462B."
    },
    {
      name: "Apple",
      sector: "Consumer electronics",
      mcap: "Mkt cap: ~$4.5T",
      price: "$294.30",
      currency: "USD",
      exchange: "NASDAQ",
      prev_price: "~$298.01",
      variation: "−1.2%",
      news: "New CEO resets AI strategy: tools serve products, not the reverse. KGI downgraded to Hold."
    },
    {
      name: "Microsoft",
      sector: "Cloud, software, AI",
      mcap: "Mkt cap: ~$2.8T",
      price: "$373.20",
      currency: "USD",
      exchange: "NASDAQ",
      prev_price: "~$374.32",
      variation: "−0.3%",
      news: "AI run rate hits $37B; analysts see 33% upside. New Commvault partnership via Azure."
    },
    {
      name: "Amazon",
      sector: "E-commerce, cloud",
      mcap: "Mkt cap: ~$2.5T",
      price: "$240.72",
      currency: "USD",
      exchange: "NASDAQ",
      prev_price: "~$234.11",
      variation: "+2.8%",
      news: "Prime Day 2026 Day 1 beats Adobe forecast; BofA sees Q2 revenue beat ahead."
    }
  ],

  // ----------------------------------------------------------
  //  AFRICA TOP 5 — BRVM priority, then JSE / NGX / EGX
  // ----------------------------------------------------------
  africa: [
    {
      name: "Naspers",
      ticker: "NPN",
      sector: "Internet, e-commerce",
      price: "ZAR 82,884",
      currency: "ZAR",
      exchange: "JSE",
      prev_price: "ZAR 86,401",
      variation: "−4.1%",
      news: "FY2026 results released Jun 19; earnings +70%. Morgan Stanley upgraded to Overweight."
    },
    {
      name: "Standard Bank",
      ticker: "SBK",
      sector: "Pan-African banking",
      price: "ZAR 305.70",
      currency: "ZAR",
      exchange: "JSE",
      prev_price: "ZAR 306.00",
      variation: "−0.1%",
      news: "New Head of CIB appointed. Money Reels product turns financial data into personal narratives."
    },
    {
      name: "MTN Group",
      ticker: "MTN",
      sector: "Telecoms & fintech",
      price: "ZAR 22,505",
      currency: "ZAR",
      exchange: "JSE",
      prev_price: "ZAR 20,600",
      variation: "+9.2%",
      news: "Q1 2026: service revenue +21%, data +35%, fintech +20%. Guidance raised through 2028."
    },
    {
      name: "Sonatel",
      ticker: "SNTS",
      sector: "Telecom, mobile money",
      price: "XOF 28,150",
      currency: "XOF",
      exchange: "BRVM",
      prev_price: "XOF 27,750",
      variation: "+1.4%",
      news: "Activated 3,500km Lagos–Dakar terrestrial fibre with Phase3; latency as low as 32ms."
    },
    {
      name: "Ecobank TI",
      ticker: "ETI",
      sector: "Pan-African banking",
      price: "XOF 26.00",
      currency: "XOF",
      exchange: "BRVM",
      prev_price: "XOF 25.26",
      variation: "+2.9%",
      news: "Fitch revised outlook to Positive (from Stable), affirming B-. Highest BRVM volume Jun 22."
    }
  ],

  // ----------------------------------------------------------
  //  SNAPSHOT — global comparative rankings
  // ----------------------------------------------------------
  snapshot: {
    by_market_cap: [
      { name: "NVIDIA",    value: "~$5.2T" },
      { name: "Alphabet",  value: "~$4.6T" },
      { name: "Apple",     value: "~$4.5T" },
      { name: "Microsoft", value: "~$2.8T" },
      { name: "Amazon",    value: "~$2.5T" }
    ],
    by_revenue: [
      { name: "Amazon",       value: "$743B" },
      { name: "Walmart",      value: "$713B" },
      { name: "UnitedHealth", value: "$450B" },
      { name: "Apple",        value: "$416B" },
      { name: "Alphabet",     value: "$403B" }
    ],
    by_net_income: [
      { name: "Alphabet",  value: "$132B" },
      { name: "NVIDIA",    value: "~$120B" },
      { name: "Apple",     value: "$112B" },
      { name: "Microsoft", value: "~$105B" },
      { name: "Amazon",    value: "~$59B" }
    ]
  }

};
