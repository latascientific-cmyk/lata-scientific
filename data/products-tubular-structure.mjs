/* =========================================================
   LATA SCIENTIFIC — tubular structure range.

   Every dimension table below is transcribed row-for-row from the
   supplied "TUBULAR STRUCTURE" catalogue pages. Catalogue references
   (TBG…, LSBS…, LSCL…, LSBN…, LST…, LSDBN…, LSDT…, LSEBT…, LSUBT…, LSX…,
   LSSPT…, LSPLUG…, LSSTUD…, LSFCSH…, LSLCB…) are the catalogue's own.

   Shared reference tables and the support-of-column rules live in
   tubular-shared.mjs and are shown once on the category page.

   ⚠️  The catalogue pages are dimensional. They publish no load
   rating for the individual fittings, so none is claimed here. The
   only load figures printed anywhere in the range are the counter
   balance support's permissible weight and sealing force, and they
   appear on that product only.
   ========================================================= */

import {
  MM, TS_INDUSTRIES, FITTING_NOTE, FITTING_ADV, FITTING_APPS,
  SUPPORT_RULES, GROUTING,
} from "./tubular-shared.mjs";

/* Every cast iron fitting shares the same spec skeleton; each product
   overrides the rows that differ. Empty values are dropped. */
const SPEC = (over = {}) => Object.entries({
  "Product type": "",
  "Material": "Cast iron",
  "Suits tube size": "",
  "Fixing": "Grub screws — slidable to any position on the tube",
  "Finish": "For use with “B” class galvanised structure tube",
  "Catalogue reference": "",
  ...over,
}).filter(([, v]) => v !== "" && v != null);

export const structureTube = [
  {
    slug: "structure-tube-galvanised",
    name: "Structure Tube, Galvanised",
    image: "assets/img/products/structure-tube-galvanised.svg",
    drawing: "assets/img/products/structure-tube-galvanised.svg",
    alt: "Dimension schematic of a galvanised structure tube with rubber plugs at both ends, showing outside diameter and cut length",
    subtitle: "TBG series, 1/2\" to 2\" NB",
    desc: "\"B\" class galvanised mild steel tube in five bore sizes, supplied in standard cut lengths with rubber plugs at both ends — the member every tubular structure is built from.",
    long: [
      "For forming the structure, “B” class galvanised tubes are used, in sizes of 1/2\", 1\", 1 1/4\", 1 1/2\" and 2\". Cut tubes are available in the required length to form a standard size structure, and cut tubes are provided with rubber plugs at both the ends.",
      "The cut length is not the same as the structure dimension it produces. A frame member has to sit between two fittings, so its cut length is shorter than the frame's nominal size — and by a different amount for each bore, since a larger fitting takes up more room. The table below gives the figure to order against, so the assembled structure lands on the nominal dimension.",
      "The catalogue reference is formed from the bore and the cut length: TBG (NB mm / cut length). A 25 NB tube cut to 365 mm is TBG 25/365.",
    ],
    features: [
      "“B” class galvanised mild steel tube",
      "Five bores — 1/2\", 1\", 1 1/4\", 1 1/2\" and 2\" NB",
      "Supplied cut to standard structure lengths",
      "Rubber plugs provided at both ends",
      "Vertical installation lengths from 2500 mm to 6000 mm",
      "Frame lengths from 335 mm to 1465 mm depending on bore",
    ],
    advantages: [
      "Galvanised finish suits the corrosive atmosphere around a chemical plant",
      "Standard cut lengths mean a structure can be ordered without a fabrication drawing",
      "Plugged ends keep water and debris out of the tube",
      "Works with the whole cast iron fitting range without welding or drilling",
    ],
    applications: [
      "Vertical members carrying the weight of a glass column",
      "Horizontal frame members spanning between columns",
      "Support members under mantles, baths and vessel holders",
      "Extending or re-spanning an existing structure",
    ],
    industries: TS_INDUSTRIES,
    spec: [
      ["Product type", "Galvanised structure tube"],
      ["Material", "Mild steel, “B” class galvanised"],
      ["Sizes", "1/2\" (15 NB) to 2\" (50 NB)"],
      ["Outside diameter", "19.5 mm to 60.3 mm"],
      ["Vertical installation lengths", "2500, 3000, 3500, 4000 and 6000 mm"],
      ["Supply", "Cut to length, with rubber plugs at both ends"],
      ["Catalogue reference", "TBG (NB mm / cut length) — e.g. TBG 25/365"],
    ],
    dim: {
      caption: "Structure tube — tube size",
      cols: ["NB (inch)", "NB (mm)", "Outside dia."],
      rows: [
        ["1/2\"", "15", "19.5"],
        ["1\"", "25", "32.5"],
        ["1 1/4\"", "30", "41.5"],
        ["1 1/2\"", "40", "48.3"],
        ["2\"", "50", "60.3"],
      ],
      note: MM,
    },
    matTable: {
      caption: "Structure tube — available cut lengths",
      cols: ["Structure dimension", "NB 15", "NB 25", "NB 30", "NB 40", "NB 50"],
      rows: [
        ["Vertical installation — 2500", "—", "2500", "—", "—", "—"],
        ["Vertical installation — 3000", "—", "3000", "3000", "—", "—"],
        ["Vertical installation — 3500", "—", "3500", "3500", "—", "—"],
        ["Vertical installation — 4000", "—", "4000", "4000", "—", "—"],
        ["Vertical installation — 6000", "—", "6000", "6000", "6000", "6000"],
        ["Frames — 400", "—", "365", "355", "345", "335"],
        ["Frames — 500", "—", "465", "455", "445", "435"],
        ["Frames — 600", "—", "565", "555", "545", "535"],
        ["Frames — 800", "—", "765", "755", "745", "735"],
        ["Frames — 1000", "—", "965", "955", "945", "935"],
        ["Frames — 1200", "—", "1165", "1155", "1145", "1135"],
        ["Frames — 1500", "—", "1465", "1455", "1445", "1435"],
      ],
      note: MM + " The catalogue also tabulates a “for supports” set of cut lengths over the same 400 to 1500 structure dimensions; the column alignment on the supplied page cannot be read with confidence, so it is not reproduced here. Ask us for the support cut length against your NB and structure dimension.",
    },
    faqs: [
      ["Why is the cut length shorter than the structure dimension?", "Because the fittings at each end take up room. A 400 mm frame in 25 NB needs a 365 mm tube; the same frame in 50 NB needs 335 mm, because the larger fitting is deeper. Order against the cut length table, not the nominal dimension."],
      ["What does TBG 25/365 mean?", "25 NB galvanised structure tube, cut to 365 mm — the reference is formed as TBG (NB mm / cut length)."],
      ["Why the rubber plugs?", "They close the open ends of the tube against water and debris. Permanent cast iron plugs are also available in the range if you want the end capped for good."],
      ["Which bore should I use?", "It depends on what the structure carries — see the structure dimension tables on the category page, which recommend a tube size against column DN and against mantle, bath or vessel holder size."],
    ],
    related: ["structure-base", "structure-bend"],
    keywords: "galvanised structure tube, TBG structure tube, B class galvanised tube, glass plant structure tube, tubular structure member, 50 NB galvanised tube",
    featured: true,
  },
];

export const structureFittings = [
  {
    slug: "structure-base",
    name: "Structure Base",
    image: "assets/img/products/structure-base-photo.jpg",
    drawing: "assets/img/products/structure-base.svg",
    alt: "Dimension schematic of a cast iron structure base showing socket, foundation holes, F1F, ID, H and PCD",
    subtitle: "LSBS series, 25 to 50 NB",
    desc: "Cast iron base for the foot of a vertical structure tube — drilled for four foundation bolts and designed to be grouted into a concrete block.",
    long: [
      "The base is to be used with vertical tubes. Holes are provided for foundation, so the base can be bolted down and grouted into the floor.",
      "This is the fixed point of the whole structure. The catalogue's grouting instructions are specific: fit the four foundation bolts so the base stands 150 mm clear of the bolt heads, prepare a rough surface for proper bonding, and cast a concrete block roughly 200 × 200 mm up to the underside of the base.",
      "Prepare a separate block for each base rather than one big common block for all bases — separate blocks let each leg settle and move independently instead of transmitting load through a shared slab.",
    ],
    features: [
      "For use with vertical structure tubes",
      "Holes provided for foundation bolts — 4 × 14 mm on all sizes",
      "Cast iron construction",
      "25 to 50 NB in four catalogue references",
      "Designed to be grouted into a concrete block",
    ],
    advantages: FITTING_ADV,
    applications: [
      "Footing a vertical structure tube to the floor",
      "Establishing the fixed point a glass column is built up from",
      "Anchoring a tubular structure against lateral movement",
    ],
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure base for vertical tubes",
      "Suits tube size": "25 to 50 NB",
      "Foundation drilling": "4 × 14 mm",
      "Fixing": "Bolted to foundation and grouted into a concrete block",
      "Catalogue reference": "LSBS series",
    }),
    dim: {
      caption: "Base — dimensions",
      cols: ["Cat. Ref.", "NB", "F1F", "ID", "H", "PCD"],
      rows: [
        ["LSBS25", "25", "150", "75", "110", "4 × 14"],
        ["LSBS30", "30", "150", "75", "110", "4 × 14"],
        ["LSBS40", "40", "150", "75", "110", "4 × 14"],
        ["LSBS50", "50", "175", "75", "125", "4 × 14"],
      ],
      note: MM + " The PCD column gives the foundation hole pattern as number of holes × hole diameter.",
    },
    options: GROUTING.map((s, i) => `Grouting step ${i + 1} — ${s}`),
    faqs: [
      ["How is the base grouted in?", "Fit four foundation bolts with two nuts each so the base sits 150 mm above the bolt heads, stand the assembly on a roughened floor for bonding, then cast a concrete block about 200 × 200 mm up to the underside of the base."],
      ["Can I cast one slab for all the bases?", "The catalogue says not to. Prepare a separate block for each base instead of one big common block for all bases."],
      ["What drilling do the foundation holes take?", "4 × 14 mm on every size in the range, 25 through 50 NB."],
    ],
    related: ["structure-tube-galvanised", "structure-support"],
    keywords: "structure base, LSBS structure base, cast iron tube base, foundation base glass plant, grouted structure base, vertical tube base",
  },


  {
    slug: "structure-bend",
    name: "Structure Bend",
    image: "assets/img/products/structure-bend-photo.jpg",
    drawing: "assets/img/products/structure-bend.svg",
    alt: "Dimension schematic of a cast iron structure bend forming a corner, showing NB, H and H1",
    subtitle: "LSBN series, 25 to 50 NB",
    desc: "Cast iron corner fitting used to build frames on vertical tubes — joins a horizontal member to a vertical at a right angle.",
    long: [
      "The bend is used to build frames on vertical tubes. It is the corner of the rectangle: one socket takes the vertical member, the other takes a horizontal, and the frame is closed by repeating it at each corner.",
      "Cast iron, slidable, fixed with grub screws at the required position — so the frame height is set on site and can be changed later without cutting anything.",
      "Four sizes cover 25 to 50 NB, with H and H1 growing from 50/55 mm to 85/95 mm as the tube gets larger.",
    ],
    features: [
      "Builds frames on vertical tubes",
      "Right-angle corner fitting",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure bend (corner fitting)",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "LSBN series",
    }),
    dim: {
      caption: "Bend — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["LSBN 25", "25", "50", "55"],
        ["LSBN 30", "30", "65", "70"],
        ["LSBN 40", "40", "70", "80"],
        ["LSBN 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["Can I move it after assembly?", "Yes. It is slidable on the tube and held by grub screws, so the frame can be repositioned without hammering or welding."],
    ],
    related: ["structure-double-bend", "structure-support", "structure-tube-galvanised"],
    keywords: "structure bend, LSBN bend fitting, cast iron corner fitting, tubular structure elbow, frame corner fitting glass plant",
  },

  /* "Structure Tee" (LST series) was withdrawn from the range. Its entry,
     page, drawing and inbound related-product links were removed together so
     nothing links to a product that no longer exists. */

  {
    slug: "structure-double-bend",
    name: "Structure Double Bend",
    image: "assets/img/products/structure-double-bend-photo.jpg",
    drawing: "assets/img/products/structure-double-bend.svg",
    alt: "Dimension schematic of a cast iron structure double bend taking two members off a vertical at a corner",
    subtitle: "LSDBN series, 25 to 50 NB",
    desc: "Cast iron fitting taking two members off a vertical at a corner — a bend with a second socket, for framing in two planes at once.",
    long: [
      "The double bend takes two members off a vertical tube at a corner, rather than one. It is what turns a flat frame into a three-dimensional structure: at the corner post of a rectangular structure, two horizontal members leave in two different planes, and the double bend carries both.",
      "Cast iron and slidable, fixed with grub screws at the required position, in common with the rest of the fitting range.",
      "Dimensions match the single bend size for size — 50/55 mm at 25 NB through 85/95 mm at 50 NB.",
    ],
    features: [
      "Takes two members off a vertical at a corner",
      "Frames in two planes from one fitting",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure double bend",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "LSDBN series",
    }),
    dim: {
      caption: "Double Bend — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["LSDBN 25", "25", "50", "55"],
        ["LSDBN 30", "30", "65", "70"],
        ["LSDBN 40", "40", "70", "80"],
        ["LSDBN 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["When would I use a double bend instead of two single bends?", "At a corner post where members leave in two planes. One double bend does the work of two bends clamped at the same height, and keeps both members on the same centre."],
    ],
    related: ["structure-bend", "structure-tube-galvanised"],
    keywords: "structure double bend, LSDBN fitting, cast iron double bend, corner post fitting, three dimensional frame fitting",
  },



  {
    slug: "structure-equal-bracket",
    name: "Structure Equal Bracket",
    image: "assets/img/products/structure-equal-bracket-photo.jpg",
    drawing: "assets/img/products/structure-equal-bracket.svg",
    alt: "Dimension schematic of a cast iron equal bracket showing h, L and L1 with its fixing eye",
    subtitle: "LSEBT series, 25 to 50 NB",
    desc: "Cast iron bracket joining two structure tubes of the same bore at a right angle, with a bolt hole for hanging or fixing.",
    long: [
      "The equal bracket joins two tubes of the same nominal bore. It carries a fixing point as well as a clamp, so it both holds the members together and gives somewhere to hang a support, a stud or a piece of equipment.",
      "Cast iron and slidable, fixed with grub screws at the required position on the tube.",
      "Four sizes, 25 to 50 NB, with h growing from 40 mm to 72 mm and L from 65 mm to 95 mm. L1 holds at 60 mm from 30 NB upward.",
    ],
    features: [
      "Joins two tubes of the same bore",
      "Provides a fixing point as well as a clamp",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure equal bracket",
      "Suits tube size": "25 to 50 NB, same bore both sides",
      "Catalogue reference": "LSEBT series",
    }),
    dim: {
      caption: "Equal Bracket — dimensions",
      cols: ["Cat. Ref.", "NB", "h", "L", "L1"],
      rows: [
        ["LSEBT 25", "25", "40", "65", "50"],
        ["LSEBT 30", "30", "52", "75", "60"],
        ["LSEBT 40", "40", "62", "85", "60"],
        ["LSEBT 50", "50", "72", "95", "60"],
      ],
      note: MM,
    },
    faqs: [
      ["When do I need an unequal bracket instead?", "When the two tubes are different bores — a 40 NB member picking up a 25 NB one, for instance. The unequal bracket carries an NB and an NB1 socket for exactly that."],
    ],
    related: ["structure-unequal-bracket", "structure-support"],
    keywords: "equal bracket, LSEBT bracket, cast iron tube bracket, structure bracket fitting, tubular structure clamp bracket",
  },

  {
    slug: "structure-unequal-bracket",
    name: "Structure Unequal Bracket",
    image: "assets/img/products/structure-unequal-bracket-photo.jpg",
    drawing: "assets/img/products/structure-unequal-bracket.svg",
    alt: "Dimension schematic of a cast iron unequal bracket showing NB, NB1, h, L and L1",
    subtitle: "LSUBT series, 25/15 to 50/25 NB",
    desc: "Cast iron bracket joining two structure tubes of different bore — a heavier main member picking up a lighter secondary one.",
    long: [
      "The unequal bracket joins two tubes of different nominal bore. The main socket takes the larger tube, NB; the second socket, NB1, takes the smaller. That is the usual arrangement where a heavy vertical or frame member has to pick up lighter secondary framing.",
      "Four references cover the practical pairings: 25/15, 30/15, 40/25 and 50/25.",
      "Cast iron and slidable, fixed with grub screws in common with the rest of the range.",
    ],
    features: [
      "Joins two tubes of different bore",
      "Four pairings — 25/15, 30/15, 40/25 and 50/25",
      "Cast iron, fixed with grub screws",
      "Provides a fixing point as well as a clamp",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure unequal bracket",
      "Suits tube size": "25/15, 30/15, 40/25 and 50/25 NB",
      "Catalogue reference": "LSUBT series",
    }),
    dim: {
      caption: "Unequal Bracket — dimensions",
      cols: ["Cat. Ref.", "NB", "NB1", "h", "L", "L1"],
      rows: [
        ["LSUBT25/15", "25", "15", "35", "65", "50"],
        ["LSUBT30/15", "30", "15", "40", "75", "60"],
        ["LSUBT40/25", "40", "25", "50", "85", "60"],
        ["LSUBT50/25", "50", "25", "55", "95", "60"],
      ],
      note: MM + " NB is the main tube, NB1 the secondary tube.",
    },
    faqs: [
      ["Which way round do the sockets go?", "NB is the larger, main tube; NB1 is the smaller secondary one. LSUBT40/25 takes a 40 NB main member and a 25 NB branch."],
    ],
    related: ["structure-equal-bracket", "structure-support"],
    keywords: "unequal bracket, LSUBT bracket, reducing tube bracket, cast iron unequal bracket, structure reducing clamp",
  },

  {
    slug: "structure-support",
    name: "Structure Support",
    image: "assets/img/products/structure-support-photo.jpg",
    drawing: "assets/img/products/structure-support.svg",
    alt: "Dimension schematic of a cast iron structure support with threaded eye, showing H, L and d",
    subtitle: "LSSPT series, 15 to 50 NB",
    desc: "Cast iron support clamp with a 13 mm threaded eye, used with studs to hang or carry glass pipeline and equipment off the structure.",
    long: [
      "The support clamps onto a structure tube and presents a threaded hole — 13 mm on every size in the range — for a stud. That is how a glass line or a piece of equipment is actually hung from the structure rather than resting on it.",
      "Cast iron and slidable, fixed with grub screws, so the support can be positioned at exactly the height the pipeline needs and adjusted later.",
      "Five sizes cover 15 to 50 NB. Note that this is the one fitting family in the range that goes down to 15 NB.",
    ],
    features: [
      "Clamps to a structure tube and takes a stud",
      "13 mm threaded hole on every size",
      "15 to 50 NB — five catalogue references",
      "Cast iron, fixed with grub screws",
      "H stays at 55 mm from 25 NB upward",
    ],
    advantages: FITTING_ADV,
    applications: [
      "Hanging glass pipeline off a tubular structure",
      "Carrying guide supports above a column's fixed point",
      "Suspending small equipment and instruments from the frame",
      "Adjusting pipeline height during commissioning",
    ],
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure support with threaded eye",
      "Suits tube size": "15 to 50 NB",
      "Thread / hole (d)": "13 mm on every size in the range",
      "Catalogue reference": "LSSPT series",
    }),
    dim: {
      caption: "Support — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "L", "d"],
      rows: [
        ["LSSPT 15", "15", "40", "35", "13"],
        ["LSSPT 25", "25", "55", "50", "13"],
        ["LSSPT 30", "30", "55", "57", "13"],
        ["LSSPT 40", "40", "55", "62", "13"],
        ["LSSPT 50", "50", "55", "67", "13"],
      ],
      note: MM + " d is 13 mm on every size in the range.",
    },
    faqs: [
      ["What goes into the 13 mm hole?", "A stud. The range offers 5/16\", 3/8\" and 1/2\" screwed rods at 150 to 200 mm long for exactly this."],
      ["Where should supports go on a glass column?", "Above the fixed point, as guide supports. The catalogue is explicit: the glass unit must be free for vertical movement above the fixed point, because glass and the steel structure expand at different rates — so supports above it guide laterally rather than carry weight."],
    ],
    related: ["structure-equal-bracket", "structure-tube-galvanised"],
    keywords: "structure support, LSSPT support, cast iron pipe support clamp, glass pipeline hanger, tubular structure support fitting",
  },
];

/* `columnSupports` removed — Column Base Support Frame and Counter Balance
   Support were both withdrawn, so the subcategory no longer exists. */

/* Re-exported so the category page can show the erection rules and the
   grouting procedure without repeating them on every product. */
export { SUPPORT_RULES, GROUTING };
