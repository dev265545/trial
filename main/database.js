const path = require("path");
const fs = require("fs");
const { app } = require("electron");
const sqlite3 = require("sqlite3").verbose();

// Build the database path and output to the console
const jsonData = [
  {
    Itemcode: "RD-180-6",
    "Item Name": "RD-180ML-6.0[1000pcs]",
    Weight: 6,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-200-6",
    "Item Name": "RD-200ML-6.0[1000pcs]",
    Weight: 6,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-300-7",
    "Item Name": "RD-300ML-7.0[1000pcs]",
    Weight: 7,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-400-8",
    "Item Name": "RD-400ML-8.0[1000pcs]",
    Weight: 8,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-500-9",
    "Item Name": "RD-500ML-9[1000pcs]",
    Weight: 9,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-750-12",
    "Item Name": "RD-750ML-12[1000pcs]",
    Weight: 12,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RD-1000-15",
    "Item Name": "RD-1000ML-15[1000pcs]",
    Weight: 15,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RD-1100-16",
    "Item Name": "RD-1100ML-16[1000pcs]",
    Weight: 16,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RD-1200-18",
    "Item Name": "RD-1200ML-18[1000pcs]",
    Weight: 18,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RD-LID-6",
    "Item Name": "RD-LID-6.0[2000pcs]",
    Weight: 12,
    "cu.ft": 5.41,
  },
  {
    Itemcode: "MD-3.6",
    "Item Name": "MD-3.6[2450pcs]",
    Weight: 8.82,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "RK-8",
    "Item Name": "RD-RAJ KACHORI[480ML]-8.0[1000pcs]",
    Weight: 8,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RK-B-8",
    "Item Name": "RD-RAJ KACHORI[480ML]-8.0[1000pcs]-BLACK",
    Weight: 8,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RCT-400-10",
    "Item Name": "RCT-400ML-32MM-10[1000pcs]",
    Weight: 10,
    "cu.ft": 6.53,
  },
  {
    Itemcode: "RCT-500-12",
    "Item Name": "RCT-500ML-42MM-12[1000pcs]",
    Weight: 12,
    "cu.ft": 5.52,
  },
  {
    Itemcode: "RCT-750-14",
    "Item Name": "RCT-750ML-52MM-14[1000 Pcs]",
    Weight: 14,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RCT-1000-15",
    "Item Name": "RCT-1000ML-62MM-15[1000pcs]",
    Weight: 15,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RCT-1200-16",
    "Item Name": "RCT-1200ML-72MM-16[1000pcs]",
    Weight: 16,
    "cu.ft": 7.25,
  },
  {
    Itemcode: "RCT-1500-18",
    "Item Name": "RCT-1500ML-82MM-18[1000pcs]",
    Weight: 18,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RCT-1800-20",
    "Item Name": "RCT-1800ML-90MM-20[1000pcs]",
    Weight: 20,
    "cu.ft": 7.25,
  },
  {
    Itemcode: "RCT-LID-10",
    "Item Name": "RCT-LID-10[1000pcs]",
    Weight: 10,
    "cu.ft": 5.83,
  },
  {
    Itemcode: "2CP-13",
    "Item Name": "RCT-2CP-13.0[1000pcs]",
    Weight: 13,
    "cu.ft": 6.53,
  },
  {
    Itemcode: "2CP-B-13",
    "Item Name": "RCT-2CP-13.0[1000pcs]-BLACK",
    Weight: 13,
    "cu.ft": 6.53,
  },
  {
    Itemcode: "3CP-13",
    "Item Name": "RCT-3CP-13.0[1000pcs]",
    Weight: 13,
    "cu.ft": 6.53,
  },
  {
    Itemcode: "RCT-1000H-16",
    "Item Name": "RCT-1000ML-62MM-16.0[1000pcs]HEAVY",
    Weight: 16,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RCT-1200H-18",
    "Item Name": "RCT-1200ML-72MM-18.0[1000pcs]HEAVY",
    Weight: 18,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RCT-1500H-20",
    "Item Name": "RCT-1500ML-82MM-20.0[1000pcs]HEAVY",
    Weight: 20,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RK-8-SMALL",
    "Item Name": "RD-RAJ KACHORI[400ML]-8.0[1000pcs]SMALL",
    Weight: 8,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RCT-500-20",
    "Item Name": "RCT-500ML-42MM-20.0[1000pcs]SPECIAL",
    Weight: 20,
    "cu.ft": 5.52,
  },
  {
    Itemcode: "OT-300-6",
    "Item Name": "OCTA-300ML-6.0[1000pcs]",
    Weight: 6,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "OT-500-9",
    "Item Name": "OCTA-500ML-9.0[1000pcs]",
    Weight: 9,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "OT-750-12",
    "Item Name": "OCTA-750ML-12.0[1000pcs]",
    Weight: 12,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "OT-1000-15",
    "Item Name": "OCTA-1000ML-15.0[1000pcs]",
    Weight: 15,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "5CP-300-24",
    "Item Name": "5CP-MEALBOX-24.0[300pcs]",
    Weight: 7.2,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-300-26",
    "Item Name": "5CP-MEALBOX-26.0[300pcs]",
    Weight: 7.8,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-B-300-24",
    "Item Name": "5CP-MEALBOX-24.0[300pcs]-BLACK",
    Weight: 7.2,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-B-300-26",
    "Item Name": "5CP-MEALBOX-26.0[300pcs]-BLACK",
    Weight: 7.8,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "8CP-300-24",
    "Item Name": "8CP-MEALBOX-24.0[300pcs]",
    Weight: 7.2,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "8CP-300-26",
    "Item Name": "8CP-MEALBOX-26.0[300pcs]",
    Weight: 7.8,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "8CP-B-300-24",
    "Item Name": "8CP-MEALBOX-24.0[300pcs]BLACK",
    Weight: 7.2,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "8CP-B-300-26",
    "Item Name": "8CP-MEALBOX-26.0[300pcs]BLACK",
    Weight: 7.8,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-600-24",
    "Item Name": "5CP-MEALBOX-24.0[600pcs]",
    Weight: 14.4,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "5CP-600-26",
    "Item Name": "5CP-MEALBOX-26.0[600pcs]",
    Weight: 15.6,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "8CP-600-24",
    "Item Name": "8CP-MEALBOX-24.0[600pcs]",
    Weight: 14.4,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "8CP-600-26",
    "Item Name": "8CP-MEALBOX-26.0[600pcs]",
    Weight: 15.6,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "5CP-LID-300-22",
    "Item Name": "LID-5CP-300pcs.22.0",
    Weight: 6.6,
    "cu.ft": 5.62,
  },
  {
    Itemcode: "8CP-LID-300-22",
    "Item Name": "LID-8CP-300pcs.22.0",
    Weight: 6.6,
    "cu.ft": 5.62,
  },
  {
    Itemcode: "PT-30",
    "Item Name": "PASTA-30MM-12.0[1000pcs]-BLACK ",
    Weight: 12,
    "cu.ft": 1.87,
  },
  {
    Itemcode: "PT-40",
    "Item Name": "PASTA-40MM-15.0[1000pcs]-BLACK ",
    Weight: 15,
    "cu.ft": 2.15,
  },
  {
    Itemcode: "PT-60",
    "Item Name": "PASTA-60MM-18.0[1000pcs]-BLACK ",
    Weight: 18,
    "cu.ft": 2.15,
  },
  {
    Itemcode: "51",
    "Item Name": "GOLDANA  (25 Kg)",
    Weight: 25,
    "cu.ft": null,
  },
  { Itemcode: "52", "Item Name": "AM 120", Weight: 25, "cu.ft": null },
  {
    Itemcode: "53",
    "Item Name": "BRIOWATI-3.0[2100pcs]",
    Weight: 6.3,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "54",
    "Item Name": "SC-1.8[2500pcs]",
    Weight: 4.5,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "55",
    "Item Name": "FC-1.9[2500pcs]",
    Weight: 4.75,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "56",
    "Item Name": "BRG-4.5[1750pcs]",
    Weight: 7.875,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "57",
    "Item Name": "BRG-3.25[1750pcs]",
    Weight: 5.7,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "58",
    "Item Name": "BRG-3.25[3500pcs]",
    Weight: 11.4,
    "cu.ft": 7.25,
  },
  {
    Itemcode: "59",
    "Item Name": "WG-2.3[2450pcs]",
    Weight: 5.7,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "60",
    "Item Name": "LG-2.6[2450pcs]",
    Weight: 6.4,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "MW-3.5",
    "Item Name": "MW-3.5[2450pcs]",
    Weight: 8.6,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "CH-3.6",
    "Item Name": "CH-3.6[2450pcs]",
    Weight: 8.82,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "8CP-300-30",
    "Item Name": "8CP-MEALBOX-30.0[300pcs]SPECIAL",
    Weight: 9,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-300-28",
    "Item Name": "5CP-MEALBOX-28.0[300pcs]SPECIAL",
    Weight: 8.4,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "5CP-300-30",
    "Item Name": "5CP-MEALBOX-30.0[300pcs]SPECIAL",
    Weight: 9,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "RD-750-14",
    "Item Name": "RD-750ML-14[1000pcs]-SPECIAL",
    Weight: 14,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RD-300-COMBO",
    "Item Name": "RD-COMBO PACK-300ML-5.5",
    Weight: 6,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-500-COMBO",
    "Item Name": "RD-COMBO PACK-500ML-7.5",
    Weight: 7.5,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-750-COMBO",
    "Item Name": "RD-COMBO PACK-750ML-9.0",
    Weight: 9,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-1000-COMBO",
    "Item Name": "RD-COMBO PACK-1000ML-10.5",
    Weight: 10.5,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RD-1200-COMBO",
    "Item Name": "RD-COMBO PACK-1200ML-11.5",
    Weight: 11.5,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "D-90-CUT",
    "Item Name": "90 dia 4800 pcs cut ",
    Weight: null,
    "cu.ft": null,
  },
  {
    Itemcode: "RCT-1000H-20-SP",
    "Item Name": "RCT-1000ML-62MM-20.0[1000pcs]SPECIAL",
    Weight: 20,
    "cu.ft": 6.48,
  },
  {
    Itemcode: "RD-LID-4.7GM",
    "Item Name": "RD-LID-4.7[2000pcs]",
    Weight: 9.4,
    "cu.ft": 5.41,
  },
  {
    Itemcode: "5CP-LID-600-22",
    "Item Name": "LID-5CP-600pcs.22.0",
    Weight: 13.2,
    "cu.ft": 11.69,
  },
  {
    Itemcode: "8CP-LID-600-22",
    "Item Name": "LID-8CP-600pcs.22.0",
    Weight: 13.2,
    "cu.ft": 11.69,
  },
  {
    Itemcode: "BT-15",
    "Item Name": "RCT-BISCUIT-15.0[1000pcs]",
    Weight: 15,
    "cu.ft": 7.25,
  },
  {
    Itemcode: "61",
    "Item Name": "BFC-3.0[2100pcs]",
    Weight: 6.3,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "50",
    "Item Name": "FD-1.85[1500pcs]",
    Weight: 2.6,
    "cu.ft": 1.032,
  },
  {
    Itemcode: "62",
    "Item Name": "BG-3.6[2450pcs]",
    Weight: 8.82,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "RCT-500-20",
    "Item Name": "RCT-500ML-42MM-20[1000pcs]-SPECIAL",
    Weight: 20,
    "cu.ft": 5.52,
  },
  {
    Itemcode: "SSB-250",
    "Item Name": "SSB-250ML-7.0[1000pcs]",
    Weight: 7,
    "cu.ft": 4.32,
  },
  {
    Itemcode: "SSB-250B",
    "Item Name": "SSB-250ML-7.0[1000pcs]BLACK",
    Weight: 7,
    "cu.ft": 4.32,
  },
  {
    Itemcode: "SSB-350",
    "Item Name": "SSB-350ML-7.0[1000pcs]",
    Weight: 7,
    "cu.ft": 4.32,
  },
  {
    Itemcode: "SSB-450",
    "Item Name": "SSB-450ML-9.0[1000pcs]",
    Weight: 9,
    "cu.ft": 4.32,
  },
  {
    Itemcode: "SSB-LID",
    "Item Name": "SSB-RCT-LID-5.0[1000pcs]",
    Weight: 5,
    "cu.ft": 2.69,
  },
  {
    Itemcode: "65",
    "Item Name": "FC-1.9[5000pcs]",
    Weight: 9.5,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "64",
    "Item Name": "BRIOWATI-3.0[3200pcs]",
    Weight: 9.6,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "RD-LID-7.8GM",
    "Item Name": "RD-LID-7.8[1500pcs] MILKY",
    Weight: 11.7,
    "cu.ft": 5.41,
  },
  {
    Itemcode: "RK-8-SMALL-2000",
    "Item Name": "RD-RAJ KACHORI[400ML]-8.0[2000pcs]",
    Weight: 16,
    "cu.ft": 10.54,
  },
  {
    Itemcode: "8CP-B-600-24",
    "Item Name": "8CP-MEALBOX-24.0[600pcs]-BLACK",
    Weight: 14.4,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "5CP-B-600-24",
    "Item Name": "5CP-MEALBOX-24.0[600pcs]-BLACK",
    Weight: 14.4,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "MD-2.5",
    "Item Name": "MD-2.5[3000pcs]",
    Weight: 7.5,
    "cu.ft": 5.79,
  },
  {
    Itemcode: "8CP-600-30",
    "Item Name": "8CP-MEALBOX-30.0[600pcs]",
    Weight: 18,
    "cu.ft": 9.35,
  },
  {
    Itemcode: "PT-30-13",
    "Item Name": "PASTA-30MM-13.0[1500pcs]-BLACK ",
    Weight: 19.5,
    "cu.ft": 2.69,
  },
  {
    Itemcode: "PT-60-19",
    "Item Name": "PASTA-60MM-19.0[1000pcs]-BLACK ",
    Weight: 19,
    "cu.ft": 2.15,
  },
  {
    Itemcode: "RD-300-M-8",
    "Item Name": "RD-300ML-8.0[1000pcs]MILKY",
    Weight: 8,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-500-M-11",
    "Item Name": "RD-500ML-11.0[1000pcs]MILKY",
    Weight: 11,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-750-M-14",
    "Item Name": "RD-750ML-14.0[1000pcs]MILKY",
    Weight: 14,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-1000-M-17",
    "Item Name": "RD-1000ML-17.0[1000pcs]MILKY",
    Weight: 17,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "8CP-300-28",
    "Item Name": "8CP-MEALBOX-28.0[300pcs]SPECIAL",
    Weight: 8.4,
    "cu.ft": 4.77,
  },
  {
    Itemcode: "SSB-LID-3800",
    "Item Name": "SSB-RCT-LID-5.0[3800pcs]",
    Weight: 19,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "RCT-LID-2000",
    "Item Name": "RCT-LID-10[2000pcs]",
    Weight: 20,
    "cu.ft": 11.66,
  },
  {
    Itemcode: "8CP-300-36",
    "Item Name": "8CP-MEALBOX-36.0[300pcs]special",
    Weight: 10.8,
    "cu.ft": 5.62,
  },
  {
    Itemcode: "RCT-750-14-1400pcs",
    "Item Name": "RCT-750ML-52MM-14[1400 Pcs]",
    Weight: 19.6,
    "cu.ft": 9.5,
  },
  {
    Itemcode: "OC-300-COMBO",
    "Item Name": "Octa Combo Pack-300ML-5.35",
    Weight: 5.35,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "OC-500-COMBO",
    "Item Name": "Octa Combo Pack-500ML-6.85",
    Weight: 6.85,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "OC-750-COMBO",
    "Item Name": "Octa Combo Pack-750ML-8.35",
    Weight: 8.35,
    "cu.ft": 4.16,
  },
  {
    Itemcode: " OC-1000-COMBO",
    "Item Name": "Octa Combo Pack-1000ML-9.85",
    Weight: 9.85,
    "cu.ft": 4.16,
  },
  {
    Itemcode: "RCT-500-14",
    "Item Name": "RCT-500ML-42MM-14[1000pcs]-SPECIAL",
    Weight: 14,
    "cu.ft": 5.52,
  },
  {
    Itemcode: "66",
    "Item Name": "LG-3.5[4900pcs]",
    Weight: 17.15,
    "cu.ft": 9.5,
  },
  {
    Itemcode: "5CP-300-36",
    "Item Name": "5CP-MEALBOX-36.0[300pcs]special",
    Weight: 10.8,
    "cu.ft": 5.62,
  },
  {
    Itemcode: "RD-1200-W-18",
    "Item Name": "RD-1200ML-18[1000pcs]MILKY",
    Weight: 18,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "PT-40-W",
    "Item Name": "PASTA-40MM-15.0[1000pcs]-MILKY",
    Weight: 15,
    "cu.ft": 2.5,
  },
  {
    Itemcode: "PT-60-W",
    "Item Name": "PASTA-60MM-18.0[1000pcs]-MILKY",
    Weight: 18,
    "cu.ft": 2.15,
  },
  {
    Itemcode: "RD-400-10",
    "Item Name": "RD-400ML-10.0[1000pcs]-SPECIAL",
    Weight: 10,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "3CP-B-13",
    "Item Name": "RCT-3CP-13.0[1000pcs]-BLACK",
    Weight: 13,
    "cu.ft": 6.53,
  },
  {
    Itemcode: "77",
    "Item Name": "WG-2.3[4900pcs]",
    Weight: 11.27,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "78",
    "Item Name": "BRG-4.5[3500pcs]",
    Weight: 15.75,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "RD-200-6-B",
    "Item Name": "RD-200ML-6.0[1000pcs]-BLACK",
    Weight: 6,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-300-7-B",
    "Item Name": "RD-300ML-7.0[1000pcs]-BLACK",
    Weight: 7,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "RD-500-10-B",
    "Item Name": "RD-500ML-10[1000pcs]-BLACK",
    Weight: 10,
    "cu.ft": 5.27,
  },
  {
    Itemcode: "MW-5.0",
    "Item Name": "MW-5.0[3000pcs]",
    Weight: 15,
    "cu.ft": 5.79,
  },
  {
    Itemcode: "SSB-350-DOUBLE",
    "Item Name": "SSB-350ML-7.0[2000PCS]-DOUBLE",
    Weight: 14,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "SSB-450-DOUBLE",
    "Item Name": "SSB-450ML-9.0[2000PCS]-DOUBLE",
    Weight: 18,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "RD-1000-16",
    "Item Name": "RD-1000ML-16[1000pcs]",
    Weight: 16,
    "cu.ft": 5.54,
  },
  {
    Itemcode: "RCT-500-M- 15",
    "Item Name": "RCT-500ML-15[1000] MILKY",
    Weight: 15,
    "cu.ft": 5.52,
  },
  {
    Itemcode: "KFC-4.5",
    "Item Name": "KFC-L-4.5[2000PCS]",
    Weight: 9,
    "cu.ft": 6.59,
  },
  {
    Itemcode: "KFC-4",
    "Item Name": "KFC-XL-4.0[2000PCS]",
    Weight: 8,
    "cu.ft": 6.59,
  },
  {
    Itemcode: "KFC-7",
    "Item Name": "KFC-LH-7.0[2000PCS]",
    Weight: 14,
    "cu.ft": 6.59,
  },
  {
    Itemcode: "JUMBO-200-95",
    "Item Name": "JUMBO-200-3.5[2000PCS]-95",
    Weight: 7,
    "cu.ft": 4.94,
  },
  {
    Itemcode: "KFC-8",
    "Item Name": "KFC-H-8.0 [2000PCS]",
    Weight: 16,
    "cu.ft": 6.59,
  },
  {
    Itemcode: "KFC-4.5-3000",
    "Item Name": "KFC-L-4.5[3000PCS]",
    Weight: 13.5,
    "cu.ft": 9.54,
  },
  {
    Itemcode: "FLAT LID-90-UNCUT",
    "Item Name": "FLAT LID 90 DIA[ UNCUT]7200PCS",
    Weight: null,
    "cu.ft": null,
  },
  {
    Itemcode: "JUMBO-110-95",
    "Item Name": "JUMBO-110 ML -3.0[2000PCS]-95",
    Weight: 6,
    "cu.ft": 4.94,
  },
  {
    Itemcode: "RD-LID-5.0GM",
    "Item Name": "RD-LID-5.0[2000pcs]",
    Weight: 10,
    "cu.ft": 5.41,
  },
];
const appDataPath = app.getPath("appData");
const databasePath = path.join(appDataPath, "inventory.db");
console.log(`Database Path: ${databasePath}`);

// Creates a new SQLite database instance and add an error handler;
var db = null;

// Initialize the database module
const init = (appWindow) => {
  if (fs.existsSync(databasePath)) {
    console.log("Database file already exists.");

    // Create a new database instance and adds a error handler
    db = new sqlite3.Database(databasePath);
    db.on("error", (err) => {
      console.error(`Database error: ${err.message}`);
      db.close();
    });

    // Notify the front-end that database is ready
    appWindow.webContents.send("databaseReady");
  } else {
    // If the database file doesn't exists, create it
    build(appWindow);
  }
};

const build = (appWindow) => {
  console.log("Building database file");

  // Create a new database instance and adds a error handler
  db = new sqlite3.Database(databasePath);
  db.on("error", (err) => {
    console.error(`Database error: ${err.message}`);
    db.close();
  });

  db.serialize(() => {
    // Create the table for storing items
    db.run(`CREATE TABLE IF NOT EXISTS OrderDetails (
  StationName TEXT,
  SerialNo TEXT,
  PartyName TEXT,
  Date DATE,
  TotalQuantity INTEGER,
  TotalCubicFeet REAL,
  TotalFeet REAL,
  ItemsArray TEXT
)`);
    db.run(`CREATE TABLE IF NOT EXISTS items (
  Itemcode TEXT,
  ItemName TEXT,
  Weight INTEGER,
  cubicft REAL
)`);
    const insertStatement = db.prepare(
      "INSERT INTO items (Itemcode, ItemName, Weight, cubicft) VALUES (?, ?, ?, ?)"
    );
    jsonData.forEach((item) => {
      insertStatement.run(
        item.Itemcode,
        item["Item Name"],
        item.Weight,
        item["cu.ft"]
      );
    });

    insertStatement.finalize();
    // Notify the front-end that database is ready
    appWindow.webContents.send("databaseReady");
  });
};

const insertData = (payload, cb) => {
  // Get fields from the payload
  let { name, description } = payload;

  // Insert the fields into the database
  db.run(
    `INSERT INTO items (name, description) VALUES (?, ?)`,
    [name, description],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};
const insertDataOrder = (payload, cb) => {
  // Get fields from the payload
  let {
    StationName,
    SerialNo,
    PartyName,
    Date,
    TotalQuantity,
    TotalCubicFeet,
    TotalFeet,
    ItemsArray,
  } = payload;

  // Convert ItemsArray to a JSON string
  const serializedItemsArray = JSON.stringify(ItemsArray);

  // Insert the fields into the database
  db.run(
    `INSERT INTO OrderDetails (StationName, SerialNo, PartyName, Date, TotalQuantity, TotalCubicFeet, TotalFeet, ItemsArray) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      StationName,
      SerialNo,
      PartyName,
      Date,
      TotalQuantity,
      TotalCubicFeet,
      TotalFeet,
      serializedItemsArray,
    ],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true, message: "Success" });
      }
    }
  );
};
const getData = (id = null, cb) => {
  // Build the query to fetch all items. If an ID is passed,
  // the query will search for items with corresponding id.
  let query = `SELECT * FROM items ${id ? `WHERE id = ${id}` : ""}`;

  // Run the query
  db.all(query, (err, rows) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true, data: rows });
    }
  });
};

const updateData = (payload, db) => {
  // Get fields from the payload
  let { id, name, description } = payload;

  // Update the item
  db.run(
    `UPDATE items SET name = ?, description = ? WHERE id = ?`,
    [name, description, id],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

const deleteData = (id, cb) => {
  // Delete the item from the database
  db.run(`DELETE FROM items WHERE id = ?`, [id], (err) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true });
    }
  });
};
const getDataOrder = (id = null, cb) => {
  // Build the query to fetch all records. If a StationName is passed,
  // the query will search for records with the corresponding StationName.
  let query = `SELECT * FROM OrderDetails`;

  // Run the query
  db.all(query, (err, rows) => {
    if (err) {
      cb({ success: false, error: err.message });
    } else {
      cb({ success: true, data: rows });
    }
  });
};

const updateDataOrder = (payload, cb) => {
  // Get fields from the payload
  let {
    StationName,
    SerialNo,
    PartyName,
    Date,
    TotalQuantity,
    TotalCubicFeet,
    TotalFeet,
    ItemsArray,
  } = payload;

  // Convert ItemsArray to a JSON string
  const serializedItemsArray = JSON.stringify(ItemsArray);

  // Update the record
  db.run(
    `UPDATE OrderDetails SET SerialNo = ?, PartyName = ?, Date = ?, TotalQuantity = ?, 
    TotalCubicFeet = ?, TotalFeet = ?, ItemsArray = ? WHERE StationName = ?`,
    [
      SerialNo,
      PartyName,
      Date,
      TotalQuantity,
      TotalCubicFeet,
      TotalFeet,
      serializedItemsArray,
      StationName,
    ],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

const deleteDataOrder = (StationName, cb) => {
  // Delete the record from the database
  db.run(
    `DELETE FROM OrderDetails WHERE StationName = ?`,
    [StationName],
    (err) => {
      if (err) {
        cb({ success: false, error: err.message });
      } else {
        cb({ success: true });
      }
    }
  );
};

module.exports = {
  init,
  insertData,
  getData,
  updateData,
  deleteData,
  insertDataOrder,
  deleteDataOrder,
  getDataOrder,
  updateDataOrder,
};
