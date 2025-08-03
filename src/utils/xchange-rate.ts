// Mock exchange rates
export const mockExchangeRates: Record<string, Record<string, number>> = {
  USD: {
    NGN: 1500, // 1 USD ≈ 1500 NGN (parallel market rate in Nigeria)
    GHS: 12, // 1 USD ≈ 12 GHS (Ghanaian Cedi)
    KES: 150, // 1 USD ≈ 150 KES (Kenyan Shilling)
    UGX: 3700, // 1 USD ≈ 3700 UGX (Ugandan Shilling)
  },
  EUR: {
    NGN: 1650, // 1 EUR ≈ 1650 NGN (based on EUR-USD and USD-NGN rates)
    GHS: 13.5, // 1 EUR ≈ 13.5 GHS
    KES: 160, // 1 EUR ≈ 160 KES
    UGX: 4000, // 1 EUR ≈ 4000 UGX
  },
  GBP: {
    NGN: 1900, // 1 GBP ≈ 1900 NGN
    GHS: 15.5, // 1 GBP ≈ 15.5 GHS
    KES: 195, // 1 GBP ≈ 195 KES
    UGX: 4800, // 1 GBP ≈ 4800 UGX
  },
};
