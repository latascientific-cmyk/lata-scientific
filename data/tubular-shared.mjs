/* =========================================================
   LATA SCIENTIFIC — shared data for the tubular structure range,
   transcribed from the supplied "TUBULAR STRUCTURE" catalogue pages.

   The general data table, the structure-dimension guides and the
   grouting instructions apply to the whole range, so they live here
   and are shown once on the category page rather than repeated on
   fifteen product pages.
   ========================================================= */

export const MM = "All dimensions in mm, transcribed exactly from the catalogue page.";

export const TS_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Distillation &amp; solvent recovery", "Water &amp; effluent treatment",
  "Agrochemicals", "Research &amp; pilot plant",
];

/* Printed on the structure fitting page — applies to every cast iron fitting. */
export const FITTING_NOTE =
  "Cast iron fitting, suitable for the galvanised tubes in this range. Slidable, and provided with grub screws to fix it at the required position on a galvanised tube.";

export const FITTING_ADV = [
  "Slidable on the tube and locked with grub screws — position is set on site, not in the shop",
  "Provides flexibility for future modifications without any hammering or welding",
  "Cast iron construction, matched to the galvanised tube sizes in the range",
  "A structure can be extended, raised or re-spanned by moving fittings rather than rebuilding",
];

export const FITTING_APPS = [
  "Building a rectangular tubular structure to carry a glass plant",
  "Supporting glass columns, pipelines and vessels in compression",
  "Framing heating mantles, baths and vessel holders",
  "Modifying an existing structure as the process layout changes",
];

/* ---------- shared reference tables (category page) ---------- */

export const GENERAL_DATA = {
  caption: "Structure fitting — general data",
  cols: ["NB", "Tube dia.", "ID", "OD", "d"],
  rows: [
    ["25", "32.5", "35", "45", "1/2\""],
    ["30", "42.5", "45", "55", "1/2\""],
    ["40", "48.3", "51", "61", "1/2\""],
    ["50", "60.3", "63", "73", "1/2\""],
  ],
  note: MM + " d is the grub screw thread. These fittings are made of cast iron and are suitable for the galvanised tubes described in the tube size table.",
};

export const TUBE_SIZE = {
  caption: "Structure tube, galvanised — tube size",
  cols: ["NB (inch)", "NB (mm)", "Outside dia."],
  rows: [
    ["1/2\"", "15", "19.5"],
    ["1\"", "25", "32.5"],
    ["1 1/4\"", "30", "41.5"],
    ["1 1/2\"", "40", "48.3"],
    ["2\"", "50", "60.3"],
  ],
  note: MM + " Tubes are “B” class galvanised.",
};

export const CUT_LENGTHS = {
  caption: "Structure tube — available cut lengths",
  cols: ["Structure dimension", "NB 15", "NB 25", "NB 30", "NB 40", "NB 50"],
  rows: [
    ["For vertical installation — 2500", "—", "2500", "—", "—", "—"],
    ["For vertical installation — 3000", "—", "3000", "3000", "—", "—"],
    ["For vertical installation — 3500", "—", "3500", "3500", "—", "—"],
    ["For vertical installation — 4000", "—", "4000", "4000", "—", "—"],
    ["For vertical installation — 6000", "—", "6000", "6000", "6000", "6000"],
    ["For frames — 400", "—", "365", "355", "345", "335"],
    ["For frames — 500", "—", "465", "455", "445", "435"],
    ["For frames — 600", "—", "565", "555", "545", "535"],
    ["For frames — 800", "—", "765", "755", "745", "735"],
    ["For frames — 1000", "—", "965", "955", "945", "935"],
    ["For frames — 1200", "—", "1165", "1155", "1145", "1135"],
    ["For frames — 1500", "—", "1465", "1455", "1445", "1435"],
  ],
  note: MM + " Cut tubes are supplied with rubber plugs at both ends. Catalogue reference is formed as TBG (NB mm / cut length) — for example TBG 25/365. The catalogue also tabulates a “for supports” set of cut lengths (400 to 1500 structure dimension); its column alignment cannot be read reliably from the supplied page, so it is not reproduced here — ask us for the support cut length against your NB and structure dimension.",
};

export const STRUCT_COLUMN = {
  caption: "Structure dimension — for column",
  cols: ["DN", "Recommended tube size NB (mm)", "Minimum structure size, depth × width"],
  rows: [
    ["80", "25", "500 × 500"],
    ["100", "25", "500 × 500"],
    ["150", "25, 30", "600 × 600"],
    ["225", "30", "800 × 800"],
    ["300", "30", "800 × 800"],
    ["400", "30", "1000 × 1000"],
    ["450", "30, 40", "1000 × 1000"],
    ["600", "40, 50", "1200 × 1200"],
  ],
  note: MM,
};

export const STRUCT_EQUIPMENT = {
  caption: "Structure dimension — for heating mantle, heating bath and vessel holder",
  cols: [
    "Size (litres)", "Heating mantle — tube NB", "Heating mantle — min. structure",
    "Heating bath — tube NB", "Heating bath — min. structure",
    "Vessel holder — tube NB", "Vessel holder — min. structure",
  ],
  rows: [
    ["20", "25", "400 × 600", "25", "500 × 600", "25", "500 × 600"],
    ["50", "25", "600 × 800", "25", "600 × 800", "25", "600 × 800"],
    ["100", "25, 30", "800 × 800", "25, 30", "800 × 1000", "25, 30", "1000 × 1000"],
    ["200", "30", "800 × 1000", "30", "800 × 1200", "30", "1000 × 1000"],
  ],
  note: MM + " Structure size is given as depth × width. The catalogue prints these as three separate tables; they are combined here because they share the same size column.",
};

/* ---------- support-of-column rules, printed on the catalogue page ---------- */
export const SUPPORT_RULES = [
  "The structure must be rigid. To give lateral support, it must be braced back to the nearest wall or any rigid feature.",
  "All glass columns are built up from a fixed point on which the whole weight of the column should be taken. If the total load exceeds the permissible limits, counter balance supports should be used to relieve excessive weight.",
  "With change in temperature, the glass column and the tubular structure expand at different rates. Therefore the glass unit must be free for vertical movement above the fixed point. Hence, above the fixed point, guide supports should be used to give lateral support.",
];

export const GROUTING = [
  "Take one cast iron base and four foundation bolts, each with 2 nuts.",
  "Fit the bolts in the base so that the base is raised up to 150 mm from the head of the bolts.",
  "Put this assembly on the floor and prepare a rough surface for proper bonding of grouting.",
  "Make a concrete block over the bolts of about 200 × 200 mm up to the base of the base, i.e. 150 mm high.",
  "Prepare a separate block for each base instead of making one big common block for all bases.",
];
