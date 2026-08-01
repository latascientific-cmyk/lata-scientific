/* =========================================================
   LATA SCIENTIFIC — tubular structure range.

   Every dimension table below is transcribed row-for-row from the
   supplied "TUBULAR STRUCTURE" catalogue pages. Catalogue references
   (TBG…, ABS…, ACL…, ABN…, AT…, ADBN…, ADT…, AEBT…, AUBT…, AX…,
   ASPT…, APLUG…, ASTUD…, AFCSH…, ALCB…) are the catalogue's own.

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
    related: ["structure-base", "structure-coupler", "structure-bend", "structure-plug"],
    keywords: "galvanised structure tube, TBG structure tube, B class galvanised tube, glass plant structure tube, tubular structure member, 50 NB galvanised tube",
    featured: true,
  },
];

export const structureFittings = [
  {
    slug: "structure-base",
    name: "Structure Base",
    subtitle: "ABS series, 25 to 50 NB",
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
      "Catalogue reference": "ABS series",
    }),
    dim: {
      caption: "Base — dimensions",
      cols: ["Cat. Ref.", "NB", "F1F", "ID", "H", "PCD"],
      rows: [
        ["ABS25", "25", "150", "75", "110", "4 × 14"],
        ["ABS30", "30", "150", "75", "110", "4 × 14"],
        ["ABS40", "40", "150", "75", "110", "4 × 14"],
        ["ABS50", "50", "175", "75", "125", "4 × 14"],
      ],
      note: MM + " The PCD column gives the foundation hole pattern as number of holes × hole diameter.",
    },
    options: GROUTING.map((s, i) => `Grouting step ${i + 1} — ${s}`),
    faqs: [
      ["How is the base grouted in?", "Fit four foundation bolts with two nuts each so the base sits 150 mm above the bolt heads, stand the assembly on a roughened floor for bonding, then cast a concrete block about 200 × 200 mm up to the underside of the base."],
      ["Can I cast one slab for all the bases?", "The catalogue says not to. Prepare a separate block for each base instead of one big common block for all bases."],
      ["What drilling do the foundation holes take?", "4 × 14 mm on every size in the range, 25 through 50 NB."],
    ],
    related: ["structure-tube-galvanised", "structure-coupler", "column-base-support-frame", "structure-support"],
    keywords: "structure base, ABS structure base, cast iron tube base, foundation base glass plant, grouted structure base, vertical tube base",
  },

  {
    slug: "structure-coupler",
    name: "Structure Coupler",
    subtitle: "ACL series, 25 to 50 NB",
    desc: "Cast iron sleeve for joining two vertical structure tubes end to end where more length is required than a single cut tube provides.",
    long: [
      "The coupler is generally used to couple vertical tubes where more length is required. Vertical installation tube is supplied up to 6000 mm; beyond that, or where a shorter stock length has to be extended, the coupler joins two tubes into one continuous member.",
      "Like every fitting in the range it is cast iron and slidable, fixed with grub screws at the required position, so a joint can be made at whatever height the structure needs rather than at a fixed interval.",
      "All four sizes share the same 150 mm coupling length and 200 mm overall height.",
    ],
    features: [
      "Couples two vertical tubes end to end",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
      "150 mm coupling length across the range",
    ],
    advantages: FITTING_ADV,
    applications: [
      "Extending a vertical structure tube beyond stock length",
      "Joining tube where a run exceeds 6000 mm",
      "Repairing or lengthening an erected structure without rebuilding",
    ],
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure coupler for vertical tubes",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "ACL series",
    }),
    dim: {
      caption: "Coupler — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["ACL 25", "25", "150", "200"],
        ["ACL 30", "30", "150", "200"],
        ["ACL 40", "40", "150", "200"],
        ["ACL 50", "50", "150", "200"],
      ],
      note: MM,
    },
    faqs: [
      ["When do I need a coupler?", "When a vertical member has to be longer than the tube you have. Vertical installation cut lengths run to 6000 mm; the coupler joins two tubes where more length is required."],
      ["Does it need welding?", "No. It is slidable and fixed with grub screws, like every fitting in the range — no hammering and no welding."],
    ],
    related: ["structure-tube-galvanised", "structure-base", "structure-bend", "structure-tee"],
    keywords: "structure coupler, ACL coupler, cast iron tube coupler, vertical tube coupling, galvanised tube joiner",
  },

  {
    slug: "structure-bend",
    name: "Structure Bend",
    subtitle: "ABN series, 25 to 50 NB",
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
      "Catalogue reference": "ABN series",
    }),
    dim: {
      caption: "Bend — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["ABN 25", "25", "50", "55"],
        ["ABN 30", "30", "65", "70"],
        ["ABN 40", "40", "70", "80"],
        ["ABN 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["What is the difference between a bend and a tee?", "A bend closes a corner — two members meeting at a right angle. A tee lets a third member branch off a continuous run. Their dimensions are identical size for size."],
      ["Can I move it after assembly?", "Yes. It is slidable on the tube and held by grub screws, so the frame can be repositioned without hammering or welding."],
    ],
    related: ["structure-tee", "structure-double-bend", "structure-cross", "structure-tube-galvanised"],
    keywords: "structure bend, ABN bend fitting, cast iron corner fitting, tubular structure elbow, frame corner fitting glass plant",
  },

  {
    slug: "structure-tee",
    name: "Structure Tee",
    subtitle: "AT series, 25 to 50 NB",
    desc: "Cast iron tee fitting for branching a member off a continuous structure tube without cutting or welding the run.",
    long: [
      "The tee lets a member branch off a continuous run of tube. Where the bend closes a corner, the tee keeps the main tube running through and takes a third member at right angles to it.",
      "Cast iron and slidable, fixed with grub screws — the branch can be positioned anywhere along the run and moved later if the layout changes.",
      "Dimensions match the bend size for size, so tees and bends can be mixed on the same frame without any change in setting-out.",
    ],
    features: [
      "Branches a member off a continuous tube run",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
      "Dimensionally matched to the bend",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure tee",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "AT series",
    }),
    dim: {
      caption: "Tee — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["AT 25", "25", "50", "55"],
        ["AT 30", "30", "65", "70"],
        ["AT 40", "40", "70", "80"],
        ["AT 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["Do I have to cut the main tube to fit a tee?", "No. The tee slides onto the running tube and clamps with grub screws; the run stays continuous."],
      ["Are tee and bend dimensions the same?", "Yes, size for size — H and H1 are identical, so the two can be mixed on one frame without re-setting out."],
    ],
    related: ["structure-bend", "structure-double-tee", "structure-cross", "structure-tube-galvanised"],
    keywords: "structure tee, AT tee fitting, cast iron tee tubular structure, branch fitting galvanised tube, glass plant frame tee",
  },

  {
    slug: "structure-double-bend",
    name: "Structure Double Bend",
    subtitle: "ADBN series, 25 to 50 NB",
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
      "Catalogue reference": "ADBN series",
    }),
    dim: {
      caption: "Double Bend — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["ADBN 25", "25", "50", "55"],
        ["ADBN 30", "30", "65", "70"],
        ["ADBN 40", "40", "70", "80"],
        ["ADBN 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["When would I use a double bend instead of two single bends?", "At a corner post where members leave in two planes. One double bend does the work of two bends clamped at the same height, and keeps both members on the same centre."],
    ],
    related: ["structure-bend", "structure-double-tee", "structure-cross", "structure-tube-galvanised"],
    keywords: "structure double bend, ADBN fitting, cast iron double bend, corner post fitting, three dimensional frame fitting",
  },

  {
    slug: "structure-double-tee",
    name: "Structure Double Tee",
    subtitle: "ADT series, 25 to 50 NB",
    desc: "Cast iron fitting branching two members off a continuous tube run in two planes — the double-sided equivalent of the structure tee.",
    long: [
      "The double tee branches two members off a continuous run of tube, in two planes, without breaking the run. Where the double bend serves a corner, this serves an intermediate post that has to carry framing on more than one face.",
      "Cast iron and slidable, fixed with grub screws — position is set on site and can be changed later.",
      "Dimensions match the tee and the bend size for size, so all four fittings share one setting-out.",
    ],
    features: [
      "Branches two members off a continuous run",
      "Frames in two planes from one fitting",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
    ],
    advantages: FITTING_ADV,
    applications: FITTING_APPS,
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure double tee",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "ADT series",
    }),
    dim: {
      caption: "Double Tee — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "H1"],
      rows: [
        ["ADT 25", "25", "50", "55"],
        ["ADT 30", "30", "65", "70"],
        ["ADT 40", "40", "70", "80"],
        ["ADT 50", "50", "85", "95"],
      ],
      note: MM,
    },
    faqs: [
      ["How does this differ from a cross?", "A double tee takes two branches off a running tube in two planes. A cross joins two tubes crossing each other in one plane. Different geometry, different job."],
    ],
    related: ["structure-tee", "structure-double-bend", "structure-cross", "structure-tube-galvanised"],
    keywords: "structure double tee, ADT fitting, cast iron double tee, two plane branch fitting, tubular structure double tee",
  },

  {
    slug: "structure-cross",
    name: "Structure Cross",
    subtitle: "AX series, 25 to 50 NB",
    desc: "Cast iron cross fitting clamping two structure tubes where they cross, so a continuous member can carry another through the same point.",
    long: [
      "The cross clamps two tubes at the point where they cross one another. Neither tube is cut — both run continuous through the fitting, which holds them square and takes the load between them.",
      "Cast iron and slidable, fixed with grub screws, so the intersection can be positioned anywhere along either member.",
      "Four sizes cover 25 to 50 NB. Note that the L dimension grows steadily with bore, 45 mm to 85 mm, while H stays at 65 mm from 30 NB upward.",
    ],
    features: [
      "Clamps two tubes at a crossing point",
      "Neither member has to be cut",
      "Cast iron, fixed with grub screws",
      "25 to 50 NB in four catalogue references",
    ],
    advantages: FITTING_ADV,
    applications: [
      "Bracing a structure diagonally across two members",
      "Carrying a run of tube across another without breaking either",
      "Stiffening a frame at mid-span",
      "Adding intermediate members to an erected structure",
    ],
    industries: TS_INDUSTRIES,
    spec: SPEC({
      "Product type": "Structure cross",
      "Suits tube size": "25 to 50 NB",
      "Catalogue reference": "AX series",
    }),
    dim: {
      caption: "Cross — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "L"],
      rows: [
        ["AX 25", "25", "50", "45"],
        ["AX 30", "30", "65", "55"],
        ["AX 40", "40", "65", "70"],
        ["AX 50", "50", "65", "85"],
      ],
      note: MM,
    },
    faqs: [
      ["Does the cross cut into either tube?", "No. Both tubes run continuous through the fitting; the cross clamps them together where they meet."],
    ],
    related: ["structure-tee", "structure-bend", "structure-equal-bracket", "structure-tube-galvanised"],
    keywords: "structure cross, AX cross fitting, cast iron cross clamp, tube crossover fitting, tubular structure bracing cross",
  },

  {
    slug: "structure-equal-bracket",
    name: "Structure Equal Bracket",
    subtitle: "AEBT series, 25 to 50 NB",
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
      "Catalogue reference": "AEBT series",
    }),
    dim: {
      caption: "Equal Bracket — dimensions",
      cols: ["Cat. Ref.", "NB", "h", "L", "L1"],
      rows: [
        ["AEBT 25", "25", "40", "65", "50"],
        ["AEBT 30", "30", "52", "75", "60"],
        ["AEBT 40", "40", "62", "85", "60"],
        ["AEBT 50", "50", "72", "95", "60"],
      ],
      note: MM,
    },
    faqs: [
      ["When do I need an unequal bracket instead?", "When the two tubes are different bores — a 40 NB member picking up a 25 NB one, for instance. The unequal bracket carries an NB and an NB1 socket for exactly that."],
    ],
    related: ["structure-unequal-bracket", "structure-support", "structure-cross", "structure-stud"],
    keywords: "equal bracket, AEBT bracket, cast iron tube bracket, structure bracket fitting, tubular structure clamp bracket",
  },

  {
    slug: "structure-unequal-bracket",
    name: "Structure Unequal Bracket",
    subtitle: "AUBT series, 25/15 to 50/25 NB",
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
      "Catalogue reference": "AUBT series",
    }),
    dim: {
      caption: "Unequal Bracket — dimensions",
      cols: ["Cat. Ref.", "NB", "NB1", "h", "L", "L1"],
      rows: [
        ["AUBT25/15", "25", "15", "35", "65", "50"],
        ["AUBT30/15", "30", "15", "40", "75", "60"],
        ["AUBT40/25", "40", "25", "50", "85", "60"],
        ["AUBT50/25", "50", "25", "55", "95", "60"],
      ],
      note: MM + " NB is the main tube, NB1 the secondary tube.",
    },
    faqs: [
      ["Which way round do the sockets go?", "NB is the larger, main tube; NB1 is the smaller secondary one. AUBT40/25 takes a 40 NB main member and a 25 NB branch."],
    ],
    related: ["structure-equal-bracket", "structure-support", "structure-cross", "structure-stud"],
    keywords: "unequal bracket, AUBT bracket, reducing tube bracket, cast iron unequal bracket, structure reducing clamp",
  },

  {
    slug: "structure-support",
    name: "Structure Support",
    subtitle: "ASPT series, 15 to 50 NB",
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
      "Catalogue reference": "ASPT series",
    }),
    dim: {
      caption: "Support — dimensions",
      cols: ["Cat. Ref.", "NB", "H", "L", "d"],
      rows: [
        ["ASPT 15", "15", "40", "35", "13"],
        ["ASPT 25", "25", "55", "50", "13"],
        ["ASPT 30", "30", "55", "57", "13"],
        ["ASPT 40", "40", "55", "62", "13"],
        ["ASPT 50", "50", "55", "67", "13"],
      ],
      note: MM + " d is 13 mm on every size in the range.",
    },
    faqs: [
      ["What goes into the 13 mm hole?", "A stud. The range offers 5/16\", 3/8\" and 1/2\" screwed rods at 150 to 200 mm long for exactly this."],
      ["Where should supports go on a glass column?", "Above the fixed point, as guide supports. The catalogue is explicit: the glass unit must be free for vertical movement above the fixed point, because glass and the steel structure expand at different rates — so supports above it guide laterally rather than carry weight."],
    ],
    related: ["structure-stud", "structure-equal-bracket", "counter-balance-support", "structure-tube-galvanised"],
    keywords: "structure support, ASPT support, cast iron pipe support clamp, glass pipeline hanger, tubular structure support fitting",
  },

  {
    slug: "structure-plug",
    name: "Structure Plug",
    subtitle: "APLUG series, 15 to 50 NB",
    desc: "Plug for closing the open ends of galvanised structure tube, in all five bores from 15 to 50 NB.",
    long: [
      "The plug is used to plug the open ends of galvanised tubes. An open tube end collects water, dust and process spillage, and in a wash-down area that is exactly where corrosion starts on the inside of a galvanised member.",
      "Cut tubes are supplied with rubber plugs at both ends as standard. This range covers the permanent replacements, and the sizes where a tube has been cut on site.",
      "Five references, one for each bore in the tube range — 15, 25, 30, 40 and 50 NB.",
    ],
    features: [
      "Closes the open ends of galvanised structure tube",
      "Five sizes — 15, 25, 30, 40 and 50 NB",
      "Covers every bore in the structure tube range",
    ],
    advantages: [
      "Keeps water and debris out of the inside of a galvanised member",
      "Finishes an exposed cut end neatly",
      "Sized directly to the tube range — no selection required beyond NB",
    ],
    applications: [
      "Capping cut tube ends after site modification",
      "Replacing the rubber plugs supplied with cut tube",
      "Closing exposed ends in a wash-down area",
    ],
    industries: TS_INDUSTRIES,
    spec: [
      ["Product type", "Structure tube plug"],
      ["Suits tube size", "15 to 50 NB"],
      ["Application", "Plugs the open ends of galvanised tubes"],
      ["Catalogue reference", "APLUG series"],
    ],
    dim: {
      caption: "Plug — sizes",
      cols: ["Cat. Ref.", "NB"],
      rows: [
        ["APLUG 15", "15"],
        ["APLUG 25", "25"],
        ["APLUG 30", "30"],
        ["APLUG 40", "40"],
        ["APLUG 50", "50"],
      ],
      note: "Sizes in mm nominal bore, as printed in the catalogue.",
    },
    faqs: [
      ["Aren't cut tubes already plugged?", "Yes — cut tubes are provided with rubber plugs at both ends. These are for tube cut on site, and for replacing plugs that have been lost or perished."],
    ],
    related: ["structure-tube-galvanised", "structure-stud", "structure-support", "structure-coupler"],
    keywords: "structure plug, APLUG tube plug, galvanised tube end plug, tube end cap structure, glass plant tube plug",
  },

  {
    slug: "structure-stud",
    name: "Structure Stud",
    subtitle: "ASTUD series, 5/16\" to 1/2\"",
    desc: "Screwed rod used with structure supports to hang pipeline and equipment — three references from 5/16\" × 150 mm to 1/2\" × 200 mm.",
    long: [
      "The stud is used as a screwed rod with supports. It threads into the support's 13 mm eye and carries whatever is being hung below it, with the height set by where the nuts land.",
      "Three references cover the range: 5/16\" and 3/8\" at 150 mm long, and 1/2\" at 200 mm.",
      "Studs and supports are ordered together — a support without a stud has nothing to hang from, and the stud without a support has nothing to thread into.",
    ],
    features: [
      "Screwed rod for use with structure supports",
      "5/16\" and 3/8\" at 150 mm; 1/2\" at 200 mm",
      "Height adjustable by nut position",
    ],
    advantages: [
      "Fine height adjustment during pipeline commissioning",
      "Standard threads — nuts and washers are off the shelf",
      "Works directly with the ASPT support's 13 mm eye",
    ],
    applications: [
      "Hanging glass pipeline from a structure support",
      "Suspending equipment beneath a frame member",
      "Setting and adjusting pipeline fall during commissioning",
    ],
    industries: TS_INDUSTRIES,
    spec: [
      ["Product type", "Screwed rod (stud) for supports"],
      ["Diameters", "5/16\", 3/8\" and 1/2\""],
      ["Lengths", "150 mm and 200 mm"],
      ["Used with", "ASPT structure supports"],
      ["Catalogue reference", "ASTUD series"],
    ],
    dim: {
      caption: "Stud — dimensions",
      cols: ["Cat. Ref.", "D", "L"],
      rows: [
        ["ASTUD5/16-150", "5/16\"", "150"],
        ["ASTUD3/8-150", "3/8\"", "150"],
        ["ASTUD1/2-200", "1/2\"", "200"],
      ],
      note: "Length L in mm; diameter D in inches, as printed in the catalogue.",
    },
    faqs: [
      ["Which stud goes with which support?", "All ASPT supports carry a 13 mm hole, so any of the three studs will pass through. Pick the diameter on the load being hung and the length on the drop you need."],
    ],
    related: ["structure-support", "structure-equal-bracket", "structure-plug", "structure-tube-galvanised"],
    keywords: "structure stud, ASTUD screwed rod, threaded rod support, tubular structure stud, pipeline hanger rod",
  },
];

export const columnSupports = [
  {
    slug: "column-base-support-frame",
    name: "Column Base Support Frame",
    subtitle: "AFCSH series, PCD 310 to 710",
    desc: "Channel frame used as the fixed support in erection of a glass column — supplied with fully threaded jacking rods and U bolts, PCD 310 to 710.",
    long: [
      "This channel frame is used as fixed support in erection of a column. It is the fixed point the catalogue's support rules refer to: all glass columns are built up from a fixed point on which the whole weight of the column should be taken.",
      "It is supplied with full threaded jacking rods and U bolts. The jacking rods are what let the column be brought exactly to level during erection, and held there while the rest of the structure is built around it.",
      "Five references cover PCD 310 through 710, matching the column DN range served by the counter balance support. Frame height H steps from 75 mm to 100 mm on the two largest sizes.",
    ],
    features: [
      "Channel frame, used as fixed support in column erection",
      "Supplied with fully threaded jacking rods",
      "Supplied with U bolts",
      "PCD 310 to 710 in five catalogue references",
      "Frame 800 × 1000 mm to 1200 × 1400 mm",
    ],
    advantages: [
      "Takes the whole weight of the column at one designed point",
      "Jacking rods allow the column to be levelled precisely during erection",
      "Sized by PCD, so it matches the column's own backing flange",
      "Pairs with counter balance supports where the column exceeds the permissible weight",
    ],
    applications: [
      "Fixed support at the base of a glass distillation or absorption column",
      "Erecting and levelling a column inside a tubular structure",
      "Establishing the fixed point from which a column is built up",
    ],
    industries: TS_INDUSTRIES,
    spec: [
      ["Product type", "Column base support frame (channel frame)"],
      ["Function", "Fixed support in erection of a column"],
      ["PCD range", "310 to 710 mm"],
      ["Supplied with", "Full threaded jacking rods and U bolts"],
      ["Frame size", "800 × 1000 mm to 1200 × 1400 mm"],
      ["Catalogue reference", "AFCSH series"],
    ],
    dim: {
      caption: "Column Base Support Frame — dimensions",
      cols: ["Cat. Ref.", "PCD", "L1", "L", "H"],
      rows: [
        ["AFCSH 225", "310", "1000", "800", "75"],
        ["AFCSH 300", "395", "1000", "800", "75"],
        ["AFCSH 400", "495", "1200", "1000", "75"],
        ["AFCSH 450", "585", "1200", "1000", "100"],
        ["AFCSH 600", "710", "1400", "1200", "100"],
      ],
      note: MM + " The catalogue reference number corresponds to the column DN it serves — AFCSH 225 for a DN 225 column, and so on.",
    },
    faqs: [
      ["What are the jacking rods for?", "Levelling. The frame is supplied with fully threaded jacking rods so the column can be brought exactly to position during erection and held there while the structure is completed around it."],
      ["What happens if the column is too heavy for it?", "Counter balance supports are added. The permissible weight on a fixed support runs from 200 kg at DN 225 to 1000 kg at DN 600 — beyond that, the excess is relieved by counter balance support."],
      ["How do I pick a size?", "By column DN. AFCSH 225 through AFCSH 600 match DN 225 through DN 600, with the PCD given in the table."],
    ],
    related: ["counter-balance-support", "structure-base", "structure-support", "structure-tube-galvanised"],
    keywords: "column base support frame, AFCSH support frame, glass column fixed support, channel frame column support, jacking rod column frame, U bolt column support",
  },

  {
    slug: "counter-balance-support",
    name: "Counter Balance Support",
    subtitle: "ALCB series, DN 225 to DN 600",
    desc: "Lever-and-counterweight support that relieves excess column weight from the fixed support — 1:10 maximum lever ratio, DN 225 to DN 600.",
    long: [
      "When the total weight of the column is more than the fixed support at the bottom can carry, the excessive weight is relieved by counter balance support. The counter weight acts through two levers on the lower backing flange, and the maximum lever ratio is 1:10.",
      "More than one counter balance support can be used to relieve the excessive load — but only down to a point. A coupling still needs a minimum force on it to seal, so the counterweights must be set to relieve the excess while keeping the minimum force required to support the sealing of the coupling. Both figures are tabulated below.",
      "The permissible weight on a fixed support runs from 200 kg at DN 225 to 1000 kg at DN 600; the force required for sealing runs from 25 kg to 110 kg over the same range.",
    ],
    features: [
      "Relieves excess column weight from the fixed support",
      "Counter weight acts through two levers on the lower backing flange",
      "Maximum lever ratio 1:10",
      "More than one support may be used on a single column",
      "DN 225 to DN 600 in four catalogue references",
    ],
    advantages: [
      "Lets a column exceed the permissible weight of its fixed support",
      "Load is relieved without over-relieving the coupling seal",
      "Lever ratio up to 1:10 keeps the counterweight itself manageable",
      "Can be multiplied — several supports share a very heavy column",
    ],
    applications: [
      "Tall glass columns whose weight exceeds the fixed support limit",
      "Multi-section distillation and absorption columns",
      "Relieving load on a lower backing flange coupling",
      "Retrofitting a column that has been extended in service",
    ],
    industries: TS_INDUSTRIES,
    spec: [
      ["Product type", "Counter balance support for glass columns"],
      ["Function", "Relieves excessive column weight from the fixed support"],
      ["Action", "Counter weight acting through two levers on the lower backing flange"],
      ["Maximum lever ratio", "1:10"],
      ["Column DN range", "DN 225 to DN 600"],
      ["Permissible weight on fixed support", "200 kg at DN 225 to 1000 kg at DN 600"],
      ["Force required for sealing", "25 kg at DN 225 to 110 kg at DN 600"],
      ["Catalogue reference", "ALCB series"],
    ],
    dim: {
      caption: "Counter Balance Support — permissible weight and sealing force",
      cols: ["DN of column", "Permissible weight (kg)", "Force required for sealing (kg)"],
      rows: [
        ["225", "200", "25"],
        ["300", "380", "35"],
        ["400", "500", "55"],
        ["450", "700", "70"],
        ["600", "1000", "110"],
      ],
      note: "Permissible weight is the maximum load that can be supported on the fixed support. Force required for sealing is the minimum load that must remain on the coupling — counterweights must not relieve below this figure.",
    },
    matTable: {
      caption: "Counter Balance Support — dimensions",
      cols: ["Cat. Ref.", "PCD", "L"],
      rows: [
        ["ALCB 225", "310", "800"],
        ["ALCB 300", "395", "800"],
        ["ALCB 400", "495", "1000"],
        ["ALCB 600", "710", "1200"],
      ],
      note: MM,
    },
    faqs: [
      ["How much weight can one counter balance support take off?", "It works on a lever ratio of up to 1:10, so a given counterweight relieves up to ten times its own mass. More than one support can be used where a single one is not enough."],
      ["Can I relieve all of the column's weight?", "No — and this is the point that matters. The coupling needs a minimum force on it to seal, tabulated as 25 kg at DN 225 through 110 kg at DN 600. Relieve past that and the joint leaks."],
      ["When do I need one at all?", "When the total column weight exceeds what the fixed support can carry — 200 kg at DN 225 rising to 1000 kg at DN 600."],
      ["Why is there no ALCB 450?", "The dimension table prints four references — 225, 300, 400 and 600 — while the load table covers five column sizes including 450. Ask us which reference to use for a DN 450 column."],
    ],
    related: ["column-base-support-frame", "structure-support", "structure-base", "structure-tube-galvanised"],
    keywords: "counter balance support, ALCB support, glass column counterweight, column load relief support, lever counterbalance glass column, column sealing force",
  },
];

/* Re-exported so the category page can show the erection rules and the
   grouting procedure without repeating them on every product. */
export { SUPPORT_RULES, GROUTING };
