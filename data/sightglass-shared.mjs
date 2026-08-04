/* =========================================================
   Shared data for the sight flow indicator range, transcribed
   from the supplied sight glass catalogue.

   The catalogue publishes one flange/dimension pattern that most
   double-window models share, and a second that most tubular models
   share. They live here so each product references the pattern once
   instead of repeating fourteen rows.
   ========================================================= */

/* Flange OD / PCD / hole pattern used across the whole range.
   Rows: [size, OD ±3, PCD, holes, hole dia] */
const FLG = {
  "15NB": ["90", "60", "4", "16"],
  "20NB": ["100", "70", "4", "16"],
  "25NB": ["108", "79", "4", "16"],
  "40NB": ["127", "98", "4", "16"],
  "50NB": ["152", "121", "4", "19"],
  "65NB": ["180", "140", "4", "19"],
  "80NB": ["191", "152", "4", "19"],
  "100NB": ["229", "191", "8", "19"],
  "150NB": ["279", "241", "8", "22"],
  "200NB": ["343", "298", "8", "22"],
  "250NB": ["406", "362", "12", "25"],
  "300NB": ["483", "432", "12", "25"],
  "350NB": ["533", "476", "12", "29"],
  "400NB": ["597", "540", "16", "29"],
};

export const DIM_COLS = ["Size", "OD (±3)", "PCD", "H (No.)", "H dia.", "L (±3)"];

/* Build a dimension table from a {size: L} map, in the catalogue's order. */
export function dimTable(caption, lengths, note) {
  return {
    caption,
    cols: DIM_COLS,
    rows: Object.entries(lengths).map(([size, L]) => {
      const f = FLG[size];
      if (!f) throw new Error(`sightglass-shared: no flange pattern for ${size}`);
      return [size, ...f, L];
    }),
    note: note || "All dimensions in mm. Flange drilling to ANSI B-16.5; BS-10 Table E, BS-10 Table F and PN 10 drilling are also available — see the flange standards table.",
  };
}

/* Face-to-face sets reused by several models */
export const L_JACKETED = {
  "25NB": "160", "40NB": "200", "50NB": "230", "80NB": "310", "100NB": "350",
  "150NB": "480", "200NB": "650", "250NB": "780", "300NB": "900",
  "350NB": "1090", "400NB": "1400",
};

export const L_DOUBLE_WINDOW = {
  "25NB": "127", "40NB": "165", "50NB": "178", "80NB": "203", "100NB": "229",
  "150NB": "267", "200NB": "520", "250NB": "600", "300NB": "650",
  "350NB": "760", "400NB": "850",
};

export const L_LINED_DW = {
  "25NB": "131", "40NB": "169", "50NB": "182", "80NB": "207", "100NB": "233",
  "150NB": "274", "200NB": "610", "250NB": "742", "300NB": "862",
  "350NB": "994", "400NB": "1114",
};

export const L_TUBULAR_LINED = {
  "15NB": "175", "20NB": "175", "25NB": "180", "40NB": "185", "50NB": "190",
  "65NB": "195", "80NB": "200", "100NB": "200", "150NB": "210", "200NB": "210",
  "250NB": "220", "300NB": "220", "350NB": "230", "400NB": "230",
};

export const L_ALLEN_KEY = {
  "15NB": "175", "20NB": "175", "25NB": "175", "40NB": "175", "50NB": "175",
  "65NB": "175", "80NB": "175", "100NB": "175", "150NB": "175", "200NB": "185",
  "250NB": "185", "300NB": "190", "350NB": "195", "400NB": "200",
};

export const L_T_BUSH = {
  "15NB": "185", "20NB": "185", "25NB": "185", "40NB": "185", "50NB": "185",
  "65NB": "185", "80NB": "185", "100NB": "185", "150NB": "185", "200NB": "195",
  "250NB": "200", "300NB": "205", "350NB": "210", "400NB": "215",
};

export const L_PP_DW = {
  "25NB": "183", "40NB": "190", "50NB": "213", "80NB": "245",
  "100NB": "260", "150NB": "320",
};

export const L_PP_TUBULAR = {
  "25NB": "190", "40NB": "190", "50NB": "190", "65NB": "200",
  "80NB": "200", "100NB": "200", "150NB": "200",
};

export const L_CHECK_NUT = {
  "15NB": "192", "20NB": "192", "25NB": "192", "40NB": "192", "50NB": "192",
  "65NB": "192", "80NB": "200", "100NB": "200", "150NB": "200",
};

/* The IC model uses its own hole pattern, so it carries a full table */
export const IC_TABLE = {
  caption: "IC Tubular Sight Flow Indicators — dimensional table",
  cols: DIM_COLS,
  rows: [
    ["15NB", "90", "60", "4", "16", "175"],
    ["20NB", "100", "70", "4", "16", "175"],
    ["25NB", "108", "79", "4", "16", "175"],
    ["40NB", "127", "98", "4", "16", "175"],
    ["50NB", "152", "121", "4", "16", "175"],
    ["65NB", "180", "140", "4", "16", "175"],
    ["80NB", "191", "152", "4", "16", "175"],
    ["100NB", "229", "191", "4", "16", "175"],
    ["150NB", "279", "241", "8", "19", "175"],
  ],
  note: "All dimensions in mm. Note that this model uses a 16 mm hole up to 100NB, unlike the rest of the range.",
};

/* Tri-clamp model is dimensioned by tube OD, not flange drilling */
export const TC_TABLE = {
  caption: "TC End Tubular Sight Flow Indicators — dimensional table",
  cols: ["Size", "OD (±3)", "L (±3)"],
  rows: [
    ["15NB", "25", "225"], ["20NB", "25", "225"], ["25NB", "50", "225"],
    ["40NB", "50", "225"], ["50NB", "63", "225"], ["65NB", "76", "225"],
    ["80NB", "90", "225"], ["100NB", "118", "225"], ["150NB", "168", "210"],
    ["200NB", "217", "210"],
  ],
  note: "All dimensions in mm. Tri-clover ends are dimensioned by tube OD rather than flange drilling.",
};

/* Flange drilling standards table — shared reference for the whole range */
export const FLANGE_STANDARDS = {
  caption: "Different drilling standards for flanges",
  cols: ["Size NB", "Dimension", "ANSI B-16.5", "BS-10 T-'E'", "BS-10 T-'F'", "PN 10"],
  rows: [
    ["15", "OD", "90", "83", "95", "95"], ["15", "PCD", "60", "67", "67", "65"],
    ["15", "Hole dia. / no. of holes", "16/4", "13/4", "13/4", "14/4"],
    ["20", "OD", "100", "102", "102", "105"], ["20", "PCD", "70", "73", "73", "75"],
    ["20", "Hole dia. / no. of holes", "16/4", "13/4", "13/4", "14/4"],
    ["25", "OD", "110", "114", "121", "115"], ["25", "PCD", "79", "83", "87", "85"],
    ["25", "Hole dia. / no. of holes", "16/4", "13/4", "16/4", "14/4"],
    ["40", "OD", "125", "133", "140", "150"], ["40", "PCD", "98", "98", "105", "110"],
    ["40", "Hole dia. / no. of holes", "16/4", "13/4", "16/4", "14/4"],
    ["50", "OD", "150", "152", "165", "165"], ["50", "PCD", "121", "114", "127", "125"],
    ["50", "Hole dia. / no. of holes", "19/4", "16/4", "16/4", "18/4"],
    ["65", "OD", "180", "165", "184", "185"], ["65", "PCD", "140", "127", "146", "145"],
    ["65", "Hole dia. / no. of holes", "19/4", "16/4", "16/8", "18/4"],
    ["80", "OD", "190", "184", "203", "200"], ["80", "PCD", "152", "146", "165", "160"],
    ["80", "Hole dia. / no. of holes", "19/4", "16/4", "16/8", "18/4"],
    ["100", "OD", "230", "216", "229", "220"], ["100", "PCD", "190", "184", "190", "180"],
    ["100", "Hole dia. / no. of holes", "19/8", "16/8", "16/8", "18/4"],
    ["150", "OD", "280", "279", "305", "285"], ["150", "PCD", "241", "235", "260", "240"],
    ["150", "Hole dia. / no. of holes", "22/8", "19/8", "19/12", "22/8"],
    ["200", "OD", "345", "337", "368", "340"], ["200", "PCD", "298", "292", "324", "295"],
    ["200", "Hole dia. / no. of holes", "22/8", "19/8", "19/12", "22/8"],
    ["250", "OD", "405", "406", "432", "395"], ["250", "PCD", "362", "256", "381", "350"],
    ["250", "Hole dia. / no. of holes", "25/12", "19/12", "25/12", "22/12"],
    ["300", "OD", "485", "457", "489", "445"], ["300", "PCD", "432", "406", "438", "400"],
    ["300", "Hole dia. / no. of holes", "25/12", "22/12", "25/16", "22/12"],
    ["350", "OD", "535", "527", "552", "505"], ["350", "PCD", "476", "470", "495", "460"],
    ["350", "Hole dia. / no. of holes", "29/12", "22/12", "25/16", "22/16"],
    ["400", "OD", "595", "578", "610", "565"], ["400", "PCD", "540", "521", "552", "515"],
    ["400", "Hole dia. / no. of holes", "29/16", "22/12", "25/20", "26/16"],
  ],
  note: "All dimensions in mm, reproduced as printed in the catalogue. The 250NB BS-10 Table E PCD is printed as 256 — confirm it with us before drilling to that figure.",
};

/* Tubular sight glass (LSSG series) drilling table, from the supplied
   DRILLING_TABLE datasheet. Its "Special Feature" notes — 360° viewing and
   a frame in MS / 304–316 S.S. / P.P. / HDPE — identify it as a tubular
   sight glass sheet rather than a pipeline one, so it lives here. */
export const ASG_DRILLING = {
  caption: "LSSG tubular sight glass — drilling table (BS 10 Table E, Table F and ASA)",
  cols: [
    "Cat. Ref.", "Size", "L1", "L",
    "E — D", "E — P.C.D.", "E — Holes",
    "F — D", "F — P.C.D.", "F — Holes",
    "ASA — D", "ASA — P.C.D.", "ASA — Holes",
  ],
  rows: [
    ["LSSG07", "07", "152", "192", "96", "67", "120 X 4", "96", "67", "120 X 4", "89", "60", "120 X 4"],
    ["LSSG1", "25", "152", "192", "120", "82", "120 X 4", "120", "87", "160 X 4", "120", "79", "160 X 4"],
    ["LSSG1.5", "40", "152", "192", "140", "98", "120 X 4", "140", "105", "160 X 4", "140", "98", "190 X 4"],
    ["LSSG2", "50", "152", "192", "165", "114", "160 X 4", "165", "127", "160 X 4", "165", "121", "190 X 4"],
    ["LSSG3", "80", "152", "192", "205", "146", "160 X 4", "205", "165", "160 X 4", "205", "152", "190 X 4"],
    ["LSSG4", "100", "152", "192", "205", "178", "160 X 4", "225", "190", "160 X 8", "225", "190", "190 X 8"],
    ["LSSG6", "150", "152", "192", "305", "235", "190 X 8", "305", "260", "190 X 8", "305", "241", "190 X 8"],
  ],
  note: "All dimensions in mm, transcribed exactly from the datasheet. The Holes column is printed in the form shown — the leading group is the hole diameter with the diameter symbol set as a zero (so “120 X 4” reads as Ø12 × 4 holes, “190 X 8” as Ø19 × 8 holes). Confirm the drilling against your mating flange before manufacture.",
};

export const ASG_FEATURES = [
  "It can be used both in horizontal as well as vertical installation",
  "It provides 360° viewing of material flow through a line, which saves time and energy",
  "The M.O.C. of frame available in MS, 304/316 S.S., P.P. &amp; HDPE",
];

export const SG_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Dairy &amp; food",
  "Water &amp; effluent treatment", "Agrochemicals", "Paper &amp; bleaching",
  "Petrochemical", "Distillation &amp; solvent recovery",
];

export const SG_APPS = [
  "Confirming that a line is actually flowing",
  "Watching for colour change, cloudiness or phase separation",
  "Spotting entrained gas or cavitation at a pump",
  "Verifying that a line has drained before maintenance",
];
