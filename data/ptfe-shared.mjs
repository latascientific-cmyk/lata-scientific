/* =========================================================
   Shared engineering constants for the fluoropolymer-lined range.
   Every value here is taken verbatim from the supplied lined
   pipe & fittings catalogue (technical information, steel parts,
   quality control and flange-standard pages). Nothing is inferred.

   Kept in one place so the ~44 product entries in products-ptfe.mjs
   state a fact once and reference it, rather than repeating it.
   ========================================================= */

export const T = "✓";   // catalogue: “•” Applicable
export const N = "—";   // catalogue: blank = Not Applicable

/* Materials of construction (catalogue: "Steel Parts" + per-product "Materials") */
export const MAT = {
  pipe: "ASTM A 106 Gr. B",
  flange: "IS 2062 plate / ASTM A 105",
  plate: "ASTM SA 516 Gr 60",
  castBody: "ASTM A 216 Gr. WCB",
  castFitting: "SG iron",
  weldFitting: "ASTM A 234 WPB",
  ptfe: "ASTM D 1457 / ASTM D 4894-19",
  pfa: "ASTM D 3307",
  fep: "ASTM D 2116",
  ss: "Stainless steel",
};

/* Lining options, per the "PTFE/PFA/FEP Polymers" page */
export const LINERS =
  "Virgin or anti-static (conductive black) PTFE to ASTM D 4894 &amp; D 4895, PFA to ASTM D 3307, FEP to ASTM D 2116";

/* Quality control, identical for the whole lined range */
export const QC = {
  spark: "Every lined component spark tested at 5000 × E volts (E = liner thickness in mm), to a maximum of 15 000 V",
  hydro: "Hydrostatic or pneumatic test according to the lining technique; hydrostatic test on components with vent holes",
  inspect: "Dimensional and visual examination of liner and steel parts — weld aspect, overall dimensions, collar size, liner thickness, surface flaws and paint thickness",
  standard: "ASTM F 1545",
  certs: "EN 10204 3.1 mill certificates and FDA certification for the fluoropolymer available on request",
};

/* Finish and detailing common to all lined steel parts */
export const FINISH = {
  paint: "Zinc epoxy primer, minimum 60 μm dry film, over steel sand-blasted to SA 2.5",
  vent: "3 mm diameter vent holes — one per fitting; spools under 500 mm get a single central hole, spools over 500 mm get two holes about 150 mm from each end",
  earthing: "Type A or B earthing lugs in stainless steel 304 or 316 on request for electrical continuity",
};

/* Service limits stated in the catalogue's fluoropolymer property pages */
export const SERVICE = {
  temp: "Continuous service to 260 °C (PTFE melting point 327 °C, PFA 306 °C, FEP 260 °C)",
  press: "ASME/ANSI B16.5 Class 150 flanges as standard; Class 300 available on request",
};

/* Dimensional tolerances table (catalogue: "Lined Components") — shared reference */
export const TOLERANCES = {
  caption: "Dimensional tolerances — all lined parts",
  cols: ["Dimension", "Range", "Dimensional tolerance", "Angular tolerance"],
  rows: [
    ["Lengths", "0 – 315 mm", "+0; −3 mm", "± 0.5°"],
    ["Lengths", "315 – 1000 mm", "+0; −4 mm", "± 0.5°"],
    ["Lengths", "1000 – 6000 mm", "+0; −5 mm", "± 0.5°"],
    ["Diameters", "NB 1\" – 4\"", "+0; −3 mm", "± 0.5°"],
    ["Diameters", "NB 5\" – 8\"", "+0; −4 mm", "± 0.5°"],
    ["Diameters", "NB 10\" – 24\"", "+0; −5 mm", "± 0.5°"],
  ],
};

/* ANSI B16.5 flange drilling + liner thickness (catalogue page "Flange Standard
   Dimensions As per ANSI B16.5"). Shared by every flanged lined product. */
export const FLANGE_TABLE = {
  caption: "Flange dimensions to ASME/ANSI B16.5 Class 150",
  cols: ["Size", "OD (±2)", "PCD (±2)", "R/F (±2)", "No. of holes", "Hole dia.", "Lining th."],
  rows: [
    ["0.5\"", "88.9", "60.3", "35", "4", "16", "3.2"],
    ["0.75\"", "98.4", "69.8", "43", "4", "16", "3.2"],
    ["1\"", "107.9", "79.4", "51", "4", "16", "3.2"],
    ["1.5\"", "127", "98.4", "73", "4", "16", "3.2"],
    ["2\"", "152.4", "120.6", "92", "4", "19", "3.5"],
    ["2.5\"", "177.8", "139.7", "105", "4", "19", "3.5"],
    ["3\"", "190.5", "152.4", "127", "4", "19", "4"],
    ["4\"", "228.6", "190.5", "158", "8", "19", "4.5"],
    ["6\"", "279.4", "241.3", "216", "8", "22", "5.5"],
    ["8\"", "342.9", "298.4", "270", "8", "22", "5.5"],
    ["10\"", "406.4", "361.9", "324", "12", "25", "6.5"],
    ["12\"", "482.6", "431.8", "381", "12", "25", "6.5"],
    ["14\"", "533.4", "476.2", "412", "12", "29", "6.5"],
    ["16\"", "596.9", "539.7", "470", "16", "29", "6.5"],
    ["18\"", "635", "577.8", "534", "16", "32", "6.5"],
    ["20\"", "698.5", "635", "585", "20", "32", "6.5"],
    ["24\"", "812.8", "749.3", "692", "20", "35", "6.5"],
  ],
  note: "All dimensions in mm. Applies to every flanged item in the lined range.",
};

/* Bolt torque + stud length tables (catalogue "Bolt Tightening" / "Bolt Lengths") */
export const TORQUE_TABLE = {
  caption: "Table 1 — flange bolting and tightening torque",
  cols: ["NB", "Bolts", "Torque (N·m)"],
  rows: [
    ["1/2\"", "4 × 1/2\"", "20"], ["3/4\"", "4 × 1/2\"", "20"],
    ["1\"", "4 × 1/2\"", "30"], ["1.1/2\"", "4 × 1/2\"", "30"],
    ["2\"", "4 × 5/8\"", "60"], ["3\"", "4 × 5/8\"", "60"],
    ["4\"", "8 × 5/8\"", "60"], ["6\"", "8 × 3/4\"", "110"],
    ["8\"", "8 × 3/4\"", "110"], ["10\"", "12 × 7/8\"", "160"],
    ["12\"", "12 × 7/8\"", "180"], ["14\"", "12 × 1\"", "200"],
    ["16\"", "16 × 1\"", "190"], ["18\"", "16 × 1\"1/2", "370"],
    ["20\"", "20 × 1\"1/8", "370"], ["24\"", "20 × 1\"1/4", "530"],
  ],
  note: "Values are for ANSI 150 lb flanges at room temperature. Cross-tighten as with any flange joint, re-check after 24 hours of operation and then at regular intervals. Torque may vary with lubrication and the condition of nuts and bolts.",
};

export const STUD_TABLE = {
  caption: "Table 2 — recommended threaded stud lengths (mm)",
  cols: ["NB", "L1 — fixed / fixed", "L2 — loose / loose", "L3 — fixed / loose"],
  rows: [
    ["1/2\"", "75", "95", "85"], ["3/4\"", "80", "100", "90"],
    ["1\"", "80", "105", "90"], ["1.1/2\"", "90", "115", "100"],
    ["2\"", "100", "125", "110"], ["2.5\"", "100", "130", "115"],
    ["3\"", "110", "140", "125"], ["4\"", "110", "140", "125"],
    ["6\"", "125", "165", "145"], ["8\"", "135", "175", "155"],
    ["10\"", "150", "195", "175"], ["12\"", "155", "205", "175"],
    ["14\"", "170", "220", "195"], ["16\"", "175", "225", "195"],
    ["18\"", "185", "235", "215"], ["20\"", "195", "245", "220"],
    ["24\"", "205", "260", "230"],
  ],
  note: "Based on a tightening torque equivalent to 1/3 the diameter of the threaded stems and a nut height equal to the stem diameter.",
};

/* Liner thickness by process, exactly as printed. The catalogue prints two
   rows labelled “V” and “P” and does not expand the abbreviations. */
export const LINER_THICKNESS = {
  caption: "Liner thickness (mm) by nominal bore",
  cols: ["Process", "1/2\"", "3/4\"", "1\"", "1.1/4\"", "1.1/2\"", "2\"", "2.1/2\"", "3\"", "4\"", "5\"", "6\"", "8\"", "10\"", "12\"", "14\"", "16\""],
  rows: [
    ["V", "3", "3", "3", "3", "4", "4", "4", "4", "4.5", "6", "6", "6", "7.5", "7.5", "—", "—"],
    ["P", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "7.5", "7.5"],
  ],
  note: "Reproduced as printed in the catalogue, which lists two lining processes (“V” and “P”) without expanding the abbreviations. Confirm the process against your duty when ordering.",
};

/* Reusable copy blocks */
export const APPS_GENERAL = [
  "Handling of highly corrosive acids, alkalis and solvents",
  "High-purity and ultra-pure process transfer",
  "Effluent and process-waste lines",
  "Duties across a wide pH range where exotic alloys are uneconomic",
  "Services where process temperature and pressure aggravate corrosion",
];

export const INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Petrochemical",
  "Oil &amp; gas", "Power generation", "Pulp &amp; paper",
  "Mining &amp; metallurgy", "Agrochemicals &amp; dyes",
];

export const ADV_GENERAL = [
  "Outstanding corrosion resistance to aggressive organic and inorganic chemicals across a wide temperature range",
  "Non-stick, non-wetting bore — low surface energy keeps product moving and simplifies cleaning",
  "Chemically inert and pure; no additives, plasticisers, stabilisers or lubricants to contaminate the process fluid",
  "The lowest coefficient of friction of any solid, reducing pressure drop and deposit build-up",
  "Completely resistant to hydrolysis with an excellent barrier to water permeation",
  "Steel strength on the outside, fluoropolymer chemistry on the inside — at a fraction of the cost of solid exotic alloys",
];

/* Standard technical-data rows shared by lined steel components.
   `over` lets a product replace or add rows without repeating the list. */
export function specRows(over = {}) {
  const base = {
    "Product type": "Fluoropolymer lined carbon steel component",
    "Body / steel grade": `${MAT.pipe} pipe, ${MAT.flange} flanges`,
    "Lining material": "PTFE / PFA / FEP",
    "Liner standard": `${MAT.ptfe} (PTFE), ${MAT.pfa} (PFA), ${MAT.fep} (FEP)`,
    "Lining options": LINERS,
    "Flange standard": "ASME/ANSI B16.5",
    "Flange class": "Class 150 standard; Class 300 on request",
    "Size range": "",
    "Temperature range": SERVICE.temp,
    "Pressure rating": SERVICE.press,
    "Manufacturing standard": QC.standard,
    "Spark testing": QC.spark,
    "Hydro testing": QC.hydro,
    "Inspection": QC.inspect,
    "Vent holes": FINISH.vent,
    "External protection": FINISH.paint,
    "Certification": QC.certs,
  };
  const merged = { ...base, ...over };
  return Object.entries(merged).filter(([, v]) => v !== "" && v != null);
}
