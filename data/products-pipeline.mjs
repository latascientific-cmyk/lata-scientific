/* =========================================================
   LATA SCIENTIFIC — borosilicate glass pipeline components.

   Every dimension table is transcribed row-for-row from the supplied
   component datasheets in LS_PDFs. Catalogue references (LSPS…, LSPB…,
   LSPT…) are the datasheets' own.

   ⚠️  Those datasheets are dimensional only. They state no pressure or
   temperature rating for the general pipeline range, so none is claimed
   here — the one exception is the glass jacket, whose sheet does publish
   a maximum jacket pressure. Material is given as borosilicate 3.3,
   which is this site's stated house standard, not an inference.
   ========================================================= */

const img = (s) => `assets/img/products/${s}.png`;
const pdf = (s) => `assets/pdfs/${s}.pdf`;

/* Shared facts for the glass range */
export const GLASS = {
  material: "Borosilicate 3.3",
  ends: "Beaded pipe ends with backing flanges and PTFE-envelope gaskets",
  drilling: "See the drilling table — BS 10 Table E, BS 10 Table F and ASA drilling available",
};

const SPEC_BASE = (over = {}) => Object.entries({
  "Product type": "Borosilicate glass pipeline component",
  "Material": GLASS.material,
  "Nominal bore range": "",
  "End connection": GLASS.ends,
  "Flange drilling": GLASS.drilling,
  "Pressure rating": "Not published on the component datasheet — confirm with us for your duty",
  "Temperature rating": "Not published on the component datasheet — confirm with us for your duty",
  "Dimensional standard": "As per the Lata Scientific component datasheet",
  "Catalogue reference": "",
  ...over,
}).filter(([, v]) => v !== "" && v != null);

const GLASS_ADV = [
  "Completely inert to almost all process media — no metal pick-up and no contamination of the batch",
  "Full visibility of the process along the whole line",
  "Smooth, non-wetting bore that resists fouling and cleans easily",
  "Excellent thermal shock resistance from borosilicate 3.3",
  "Modular flanged construction — sections can be swapped without cutting or welding",
];

const GLASS_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Food &amp; beverage", "Water &amp; effluent treatment",
  "Distillation &amp; solvent recovery", "Research &amp; pilot plant",
];

const GLASS_APPS = [
  "Corrosive acid and solvent transfer lines",
  "Distillation, absorption and scrubbing pipework",
  "Pilot plant and kilo-lab process lines",
  "Duties where the operator must see the product flowing",
];

/* Datasheet tables --------------------------------------------------- */

const T = (caption, cols, rows, note) => ({ caption, cols, rows, note });
const DIM_NOTE = "All dimensions in mm, transcribed exactly from the component datasheet.";

/* ---------------------------------------------------------
   PIPE SECTIONS AND STRAIGHT LENGTHS
   --------------------------------------------------------- */
export const pipeSection = [
  {
    slug: "pipe-section",
    name: "Pipe Section",
    subtitle: "Straight glass pipe section, DN 15 to DN 600",
    image: img("pipe-section"),
    alt: "Borosilicate glass straight pipe section with beaded ends",
    desc: "Straight borosilicate glass pipe section — the run element of a glass pipeline, DN 15 to DN 600 in standard lengths from 100 mm to 1500 mm.",
    long: [
      "The pipe section is the building block of a glass process line. Borosilicate 3.3 gives it near-universal chemical resistance and full visibility of the product, while beaded ends and backing flanges let a line be assembled, extended or reconfigured without cutting or welding anything.",
      "The datasheet lists standard lengths against each nominal bore, and every combination carries its own catalogue reference — for example LSPS1/500 is a DN 25 section 500 mm long. Bores from DN 15 to DN 600 are covered, with lengths to 1000 mm on the smaller bores and 1500 mm from DN 225 upward.",
    ],
    features: [
      "Borosilicate 3.3 throughout — inert and fully transparent",
      "DN 15 to DN 600 nominal bore",
      "Standard lengths 100 mm to 1500 mm, bore dependent",
      "Beaded ends with backing flanges — no cutting or welding to assemble",
      "Individual catalogue reference for every bore and length",
    ],
    advantages: GLASS_ADV,
    applications: GLASS_APPS,
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Straight glass pipe section",
      "Nominal bore range": "DN 15 to DN 600",
      "Standard lengths": "100, 150, 200, 250, 300, 400, 500, 600, 750, 900, 1000, 1200, 1500 mm — bore dependent",
      "Catalogue reference": "LSPS series, e.g. LSPS1/500 = DN 25 × 500 mm",
    }),
    dim: T(
      "Pipe Section — catalogue references by bore and length",
      ["Length L", "DN 15", "DN 25", "DN 40", "DN 50", "DN 80", "DN 100", "DN 150", "DN 225", "DN 300", "DN 400", "DN 450", "DN 600"],
      [
        ["100", "LSPS07/100", "LSPS1/100", "LSPS1.5/100", "LSPS2/100", "—", "—", "—", "—", "—", "—", "—", "—"],
        ["150", "LSPS07/150", "LSPS1/150", "LSPS1.5/150", "LSPS2/150", "LSPS3/150", "LSPS4/150", "LSPS6/150", "—", "—", "—", "—", "—"],
        ["200", "LSPS07/200", "LSPS1/200", "LSPS1.5/200", "LSPS2/200", "LSPS3/200", "LSPS4/200", "LSPS6/200", "—", "—", "—", "—", "—"],
        ["250", "LSPS07/250", "LSPS1/250", "LSPS1.5/250", "LSPS2/250", "LSPS3/250", "LSPS4/250", "LSPS6/250", "—", "—", "—", "—", "—"],
        ["300", "LSPS07/300", "LSPS1/300", "LSPS1.5/300", "LSPS2/300", "LSPS3/300", "LSPS4/300", "LSPS6/300", "LSPS9/300", "LSPS12/300", "LSPS16/300", "LSPS18/300", "LSPS24/300"],
        ["400", "LSPS07/400", "LSPS1/400", "LSPS1.5/400", "LSPS2/400", "LSPS3/400", "LSPS4/400", "LSPS6/400", "LSPS9/400", "LSPS12/400", "—", "—", "—"],
        ["500", "LSPS07/500", "LSPS1/500", "LSPS1.5/500", "LSPS2/500", "LSPS3/500", "LSPS4/500", "LSPS6/500", "LSPS9/500", "LSPS12/500", "LSPS16/500", "LSPS18/500", "LSPS24/500"],
        ["600", "LSPS07/600", "LSPS1/600", "LSPS1.5/600", "LSPS2/600", "LSPS3/600", "LSPS4/600", "LSPS6/600", "LSPS9/600", "LSPS12/600", "—", "—", "—"],
        ["750", "LSPS07/750", "LSPS1/750", "LSPS1.5/750", "LSPS2/750", "LSPS3/750", "LSPS4/750", "LSPS6/750", "LSPS9/750", "LSPS12/750", "LSPS16/750", "LSPS18/750", "LSPS24/750"],
        ["900", "LSPS07/900", "LSPS1/900", "LSPS1.5/900", "LSPS2/900", "LSPS3/900", "LSPS4/900", "LSPS6/900", "LSPS9/900", "LSPS12/900", "—", "—", "—"],
        ["1000", "LSPS07/1000", "LSPS1/1000", "LSPS1.5/1000", "LSPS2/1000", "LSPS3/1000", "LSPS4/1000", "LSPS6/1000", "LSPS9/1000", "LSPS12/1000", "LSPS16/1000", "LSPS18/1000", "LSPS24/1000"],
        ["1200", "—", "—", "—", "—", "—", "—", "—", "LSPS9/1200", "LSPS12/1200", "LSPS16/1200", "LSPS18/1200", "LSPS24/1200"],
        ["1500", "—", "—", "—", "—", "—", "—", "—", "LSPS9/1500", "LSPS12/1500", "LSPS16/1500", "LSPS18/1500", "LSPS24/1500"],
      ],
      "Lengths in mm. The datasheet publishes this range as four separate bore groups; they are combined here into one grid, with “—” where the datasheet lists no reference for that bore and length."
    ),
    downloads: [{ label: "Pipe Section datasheet (PDF)", file: pdf("pipe-section") }],
    faqs: [
      ["How do I read the catalogue reference?", "LSPS is the pipe-section series, the first number is the bore in inches (07 = 3/4\", 1 = 1\", 1.5 = 1.1/2\", 12 = 12\") and the number after the slash is the length in mm. LSPS4/500 is therefore a DN 100 section 500 mm long."],
      ["Can I get a length that is not listed?", "Yes — the table gives the standard stocked lengths. Non-standard lengths are cut to order; send the dimension with your enquiry."],
      ["What holds the sections together?", "Beaded glass ends clamped by backing flanges onto PTFE-envelope gaskets. Nothing is cut or welded, so a line can be extended or reconfigured later."],
    ],
    related: ["spacer", "equal-tee", "bend-90", "reducer"],
    keywords: "borosilicate glass pipe section, glass pipeline, DN 15 to DN 600 glass pipe, process glass pipework, LSPS pipe section",
    featured: true,
  },

  {
    slug: "spacer",
    name: "Spacer",
    subtitle: "Glass spacer for small length increments, DN 15 to DN 50",
    image: img("spacer"),
    alt: "Borosilicate glass spacer ring for making up small increments in pipeline length",
    desc: "Short glass spacer used to make up small increments in line length — DN 15 to DN 50 in 5, 15, 25 and 50 mm.",
    long: [
      "When a glass line is set out, the standard section lengths rarely add up to the exact distance between two fixed points. The spacer closes that gap. It is supplied in four lengths — 5, 15, 25 and 50 mm — so a run can be trimmed to the millimetre without cutting glass on site.",
      "The datasheet also assigns a type letter to each length: the 5, 15 and 25 mm spacers are Type A, and the 50 mm spacer is Type B.",
    ],
    features: [
      "Makes up small increments in line length — 5, 15, 25 and 50 mm",
      "DN 15, 25, 40 and 50",
      "Type A up to 25 mm, Type B at 50 mm",
      "Borosilicate 3.3, same bore and end detail as the pipe sections",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Trimming a glass run to its as-built dimension",
      "Filling the gap left when a valve or instrument is removed",
      "Adjusting for gasket and flange stack-up",
      "Commissioning make-up between fixed equipment",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass spacer",
      "Nominal bore range": "DN 15 to DN 50",
      "Available lengths": "5, 15, 25 and 50 mm",
      "Catalogue reference": "LSSS series, e.g. LSSS1/25 = DN 25 × 25 mm",
    }),
    dim: T(
      "Spacer — catalogue references by bore and length",
      ["Length L", "Type", "DN 15", "DN 25", "DN 40", "DN 50"],
      [
        ["5", "A", "LSSS07/5", "LSSS1/5", "LSSS1.5/5", "LSSS2/5"],
        ["15", "A", "LSSS07/15", "LSSS1/15", "LSSS1.5/15", "LSSS2/15"],
        ["25", "A", "LSSS07/25", "LSSS1/25", "LSSS1.5/25", "LSSS2/25"],
        ["50", "B", "LSSS07/50", "LSSS1/50", "LSSS1.5/50", "LSSS2/50"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Spacer datasheet (PDF)", file: pdf("spacer") }],
    faqs: [
      ["What is the difference between Type A and Type B?", "The datasheet marks the 5, 15 and 25 mm spacers as Type A and the 50 mm spacer as Type B. Quote the type with the catalogue reference when ordering."],
      ["Is there a PTFE version?", "Yes — see the PTFE spacer, which covers 5, 10, 15 and 20 mm in the same bores."],
    ],
    related: ["ptfe-spacer", "pipe-section", "blind", "closure"],
    keywords: "glass spacer, borosilicate spacer ring, pipeline length make-up, LSSS spacer",
  },

  {
    slug: "ptfe-spacer",
    name: "PTFE Spacer",
    subtitle: "PTFE spacer, DN 15 to DN 50, 5 to 20 mm",
    image: img("ptfe-spacer"),
    alt: "PTFE spacer ring for glass pipeline length adjustment",
    desc: "PTFE spacer for fine length adjustment in a glass line — DN 15 to DN 50 in 5, 10, 15 and 20 mm.",
    long: [
      "The PTFE spacer does the same job as the glass spacer but in solid PTFE, which makes it more forgiving where a joint is repeatedly broken and remade, and where a glass spacer would be vulnerable to chipping.",
      "It is offered in finer steps than the glass version — 5, 10, 15 and 20 mm — so a line can be trimmed more precisely, across DN 15 to DN 50.",
    ],
    features: [
      "Solid PTFE — tolerant of repeated assembly and dismantling",
      "Finer length steps than the glass spacer: 5, 10, 15 and 20 mm",
      "DN 15, 25, 40 and 50",
      "Chemically inert to virtually all process media",
    ],
    advantages: [
      "More robust than glass where a joint is opened often",
      "Fine 5 mm increments for precise line make-up",
      ...GLASS_ADV.slice(0, 3),
    ],
    applications: [
      "Fine trimming of a glass run",
      "Joints that are regularly broken for cleaning or sampling",
      "Taking up gasket compression across a long run",
      "Isolating glass from a dissimilar mating face",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "PTFE spacer",
      "Material": "PTFE",
      "Nominal bore range": "DN 15 to DN 50",
      "Available lengths": "5, 10, 15 and 20 mm",
      "Catalogue reference": "LSSST series, e.g. LSSST2/20 = DN 50 × 20 mm",
    }),
    dim: T(
      "PTFE Spacer — catalogue references by bore and length",
      ["Length L", "DN 15", "DN 25", "DN 40", "DN 50"],
      [
        ["5", "LSSST07/5", "LSSST1/5", "LSSST1.5/5", "LSSST2/5"],
        ["10", "LSSST07/10", "LSSST1/10", "LSSST1.5/10", "LSSST2/10"],
        ["15", "LSSST07/15", "LSSST1/15", "LSSST1.5/15", "LSSST2/15"],
        ["20", "LSSST07/20", "LSSST1/20", "LSSST1.5/20", "LSSST2/20"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "PTFE Spacer datasheet (PDF)", file: pdf("ptfe-spacer") }],
    faqs: [
      ["Glass spacer or PTFE spacer?", "PTFE where the joint is opened frequently or where a chipped glass face would be a problem, and where you need 10 or 20 mm — steps the glass spacer does not offer. Glass keeps the bore fully transparent."],
      ["Does it need a separate gasket?", "Tell us the joint you are making it up into and we will confirm the gasket arrangement for that bore."],
    ],
    related: ["spacer", "pipe-section", "ptfe-lined-spacer", "blind"],
    keywords: "PTFE spacer, PTFE ring glass pipeline, LSSST spacer, fine length adjustment spacer",
  },

  {
    slug: "equal-tee",
    name: "Equal Tee",
    subtitle: "Glass equal tee, DN 15 to DN 300",
    image: img("equal-tee"),
    alt: "Borosilicate glass equal tee with three branches of the same bore",
    desc: "Glass tee with all three branches at the same bore — DN 15 to DN 300, centre-to-face 50 mm to 450 mm.",
    long: [
      "The equal tee takes a full-bore branch off a glass run for a parallel train, a recirculation leg or a feed point. All three faces carry the same beaded end and backing flange as the pipe sections, so it drops straight into the line.",
      "The datasheet gives one dimension L per bore — the centre-to-face — running from 50 mm at DN 15 to 450 mm at DN 300.",
    ],
    features: [
      "Three branches at the same nominal bore",
      "DN 15 to DN 300",
      "Centre to face 50 mm at DN 15 to 450 mm at DN 300",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Full-bore branch connections on a glass header",
      "Recirculation and bypass legs",
      "Feed and sampling take-offs at line size",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass equal tee",
      "Nominal bore range": "DN 15 to DN 300",
      "Centre to face": "50 mm to 450 mm, bore dependent",
      "Catalogue reference": "LSPT series, e.g. LSPT4 = DN 100",
    }),
    dim: T(
      "Equal Tee — dimensions",
      ["Cat. Ref.", "DN", "L"],
      [
        ["LSPT07", "15", "50"], ["LSPT1", "25", "100"], ["LSPT1.5", "40", "150"],
        ["LSPT2", "50", "150"], ["LSPT3", "80", "200"], ["LSPT4", "100", "250"],
        ["LSPT6", "150", "250"], ["LSPT9", "225", "375"], ["LSPT12", "300", "450"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Equal Tee datasheet (PDF)", file: pdf("equal-tee") }],
    faqs: [
      ["What does L measure?", "The centre-to-face dimension — from the centre line of the tee to each flange face. Use it to set the fitting out in an isometric."],
      ["Can the branch be a smaller bore?", "Then you want the unequal tee, which lists DN and DN1 separately along with its own L and L1 dimensions."],
    ],
    related: ["unequal-tee", "cross", "bend-90", "y-piece"],
    keywords: "borosilicate glass equal tee, glass pipeline tee, LSPT tee, DN 15 to DN 300 glass tee",
    featured: true,
  },

  {
    slug: "unequal-tee",
    name: "Unequal Tee",
    subtitle: "Glass reducing tee, DN 25×15 to DN 600×300",
    image: img("unequal-tee"),
    alt: "Borosilicate glass unequal tee with a smaller branch than the run",
    desc: "Glass tee with a smaller branch than the run — 51 size combinations from DN 25×15 to DN 600×300, with separate L and L1 dimensions.",
    long: [
      "The unequal tee takes a reduced branch straight off a glass run without needing a separate reducer, which saves a joint and a length of pipe. The datasheet covers 51 combinations from DN 25×15 up to DN 600×300.",
      "Two dimensions are published for every combination: L, the centre-to-face along the run, and L1, the centre-to-face on the branch. Both are needed to set the fitting out — and note that unlike many ranges, L here does vary with the branch size on the larger bores.",
    ],
    features: [
      "51 size combinations, DN 25×15 to DN 600×300",
      "Reduced branch without a separate reducer",
      "Separate L and L1 setting-out dimensions for every combination",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Reduced branch take-offs from a glass header",
      "Feeding smaller distribution lines from a main run",
      "Drain, vent and instrument connections below line size",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass unequal (reducing) tee",
      "Nominal bore range": "DN 25×15 to DN 600×300 (51 combinations)",
      "Catalogue reference": "LSPTU series, e.g. LSPTU4/2 = DN 100 run × DN 50 branch",
    }),
    dim: T(
      "Unequal Tee — dimensions",
      ["Cat. Ref.", "DN", "DN1", "L", "L1"],
      [
        ["LSPTU1/07", "25", "15", "150", "75"], ["LSPTU1.5/07", "40", "15", "200", "75"],
        ["LSPTU1.5/1", "40", "25", "200", "75"], ["LSPTU2/07", "50", "15", "200", "80"],
        ["LSPTU2/1", "50", "25", "200", "80"], ["LSPTU2/1.5", "50", "40", "200", "100"],
        ["LSPTU3/07", "80", "15", "250", "100"], ["LSPTU3/1", "80", "25", "250", "100"],
        ["LSPTU3/1.5", "80", "40", "250", "100"], ["LSPTU3/2", "80", "50", "250", "115"],
        ["LSPTU4/07", "100", "15", "250", "100"], ["LSPTU4/1", "100", "25", "250", "110"],
        ["LSPTU4/1.5", "100", "40", "250", "125"], ["LSPTU4/2", "100", "50", "250", "125"],
        ["LSPTU4/3", "100", "80", "300", "150"], ["LSPTU6/1", "150", "25", "250", "150"],
        ["LSPTU6/1.5", "150", "40", "250", "150"], ["LSPTU6/2", "150", "50", "250", "150"],
        ["LSPTU6/3", "150", "100", "300", "200"], ["LSPTU6/4", "150", "100", "300", "200"],
        ["LSPTU9/1", "225", "25", "300", "185"], ["LSPTU9/1.5", "225", "40", "300", "185"],
        ["LSPTU9/2", "225", "50", "300", "185"], ["LSPTU9/3", "225", "80", "300", "210"],
        ["LSPTU9/4", "225", "100", "450", "250"], ["LSPTU9/6", "225", "150", "450", "275"],
        ["LSPTU12/1", "300", "25", "400", "230"], ["LSPTU12/1.5", "300", "40", "400", "230"],
        ["LSPTU12/2", "300", "50", "400", "230"], ["LSPTU12/3", "300", "80", "400", "275"],
        ["LSPTU12/4", "300", "100", "400", "275"], ["LSPTU12/6", "300", "150", "450", "300"],
        ["LSPTU12/9", "300", "225", "600", "300"], ["LSPTU16/1.5", "400", "40", "400", "275"],
        ["LSPTU16/2", "400", "50", "400", "275"], ["LSPTU16/3", "400", "80", "400", "300"],
        ["LSPTU16/4", "400", "100", "400", "300"], ["LSPTU16/6", "400", "150", "500", "350"],
        ["LSPTU16/9", "400", "225", "800", "450"], ["LSPTU16/12", "400", "300", "800", "450"],
        ["LSPTU18/1.5", "450", "40", "400", "300"], ["LSPTU18/2", "450", "50", "400", "300"],
        ["LSPTU18/3", "450", "80", "400", "320"], ["LSPTU18/4", "450", "100", "400", "320"],
        ["LSPTU18/6", "450", "150", "600", "380"], ["LSPTU18/9", "450", "225", "800", "400"],
        ["LSPTU18/12", "450", "300", "800", "400"], ["LSPTU24/4", "600", "100", "600", "450"],
        ["LSPTU24/6", "600", "150", "600", "450"], ["LSPTU24/9", "600", "225", "800", "525"],
        ["LSPTU24/12", "600", "300", "800", "525"],
      ],
      DIM_NOTE + " The datasheet lists LSPTU6/3 with DN1 = 100 and LSPTU6/4 with DN1 = 100; both are reproduced as printed — confirm the DN1 you need on the enquiry."
    ),
    downloads: [{ label: "Unequal Tee datasheet (PDF)", file: pdf("unequal-tee") }],
    faqs: [
      ["What are L and L1?", "L is the centre-to-face along the run, L1 the centre-to-face on the reduced branch. A reducing tee needs both to be positioned correctly."],
      ["LSPTU6/3 and LSPTU6/4 both show DN1 100 — is that right?", "That is how the datasheet prints it. We have reproduced the table exactly rather than correcting it; please confirm the branch bore with us before you fabricate pipework against that row."],
    ],
    related: ["equal-tee", "reducer", "unequal-cross", "pipe-section"],
    keywords: "borosilicate glass unequal tee, glass reducing tee, LSPTU tee, glass pipeline branch fitting",
  },

  {
    slug: "reducer",
    name: "Reducer",
    subtitle: "Glass reducer, DN 25×15 to DN 600×300",
    image: img("reducer"),
    alt: "Borosilicate glass reducer joining two different nominal bores",
    desc: "Glass reducer joining two bores — 51 combinations from DN 25×15 to DN 600×300, face-to-face 75 mm to 425 mm.",
    long: [
      "The reducer steps a glass line from one bore to another. It is used wherever the line changes size — into or out of a pump, a column, a filter, or simply where flow velocity needs to change.",
      "The datasheet publishes 51 combinations with a single face-to-face dimension L for each, from 75 mm on the smallest step up to 425 mm on the largest.",
    ],
    features: [
      "51 size combinations, DN 25×15 to DN 600×300",
      "Face to face 75 mm to 425 mm",
      "Borosilicate 3.3 with beaded ends",
      "Same end detail as the pipe sections — drops straight into a run",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Bore changes in a glass process line",
      "Equipment connections of a different size to the line",
      "Velocity control where a line steps down",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass reducer",
      "Nominal bore range": "DN 25×15 to DN 600×300 (51 combinations)",
      "Face to face": "75 mm to 425 mm",
      "Catalogue reference": "LSPR series, e.g. LSPR4/2 = DN 100 to DN 50",
    }),
    dim: T(
      "Reducer — dimensions",
      ["Cat. Ref.", "DN", "DN1", "L"],
      [
        ["LSPR1/07", "25", "15", "75"], ["LSPR1.5/07", "40", "15", "100"], ["LSPR1.5/1", "40", "25", "100"],
        ["LSPR2/07", "50", "15", "100"], ["LSPR2/1", "50", "25", "100"], ["LSPR2/1.5", "50", "40", "100"],
        ["LSPR3/07", "80", "15", "100"], ["LSPR3/1", "80", "25", "125"], ["LSPR3/1.5", "80", "40", "125"],
        ["LSPR3/2", "80", "50", "125"], ["LSPR4/07", "100", "15", "125"], ["LSPR4/1", "100", "25", "150"],
        ["LSPR4/1.5", "100", "40", "150"], ["LSPR4/2", "100", "50", "150"], ["LSPR4/3", "100", "80", "150"],
        ["LSPR6/1", "150", "25", "200"], ["LSPR6/1.5", "150", "40", "200"], ["LSPR6/2", "150", "50", "200"],
        ["LSPR6/3", "150", "80", "200"], ["LSPR6/4", "150", "100", "200"], ["LSPR9/1", "225", "25", "250"],
        ["LSPR9/1.5", "225", "40", "250"], ["LSPR9/2", "225", "50", "250"], ["LSPR9/3", "225", "80", "250"],
        ["LSPR9/4", "225", "100", "250"], ["LSPR9/6", "225", "150", "250"], ["LSPR12/1", "300", "25", "300"],
        ["LSPR12/1.5", "300", "40", "300"], ["LSPR12/2", "300", "50", "300"], ["LSPR12/3", "300", "80", "300"],
        ["LSPR12/4", "300", "100", "300"], ["LSPR12/6", "300", "150", "300"], ["LSPR12/9", "300", "225", "300"],
        ["LSPR16/1.5", "400", "40", "350"], ["LSPR16/2", "400", "50", "350"], ["LSPR16/3", "400", "80", "350"],
        ["LSPR16/4", "400", "100", "350"], ["LSPR16/6", "400", "150", "350"], ["LSPR16/9", "400", "225", "350"],
        ["LSPR16/12", "400", "300", "350"], ["LSPR18/1.5", "450", "40", "375"], ["LSPR18/2", "450", "50", "375"],
        ["LSPR18/3", "450", "80", "375"], ["LSPR18/4", "450", "100", "375"], ["LSPR18/6", "450", "150", "375"],
        ["LSPR18/9", "450", "225", "375"], ["LSPR18/12", "450", "300", "375"], ["LSPR24/4", "600", "100", "400"],
        ["LSPR24/6", "600", "150", "400"], ["LSPR24/9", "600", "225", "425"], ["LSPR24/12", "600", "300", "425"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Reducer datasheet (PDF)", file: pdf("reducer") }],
    faqs: [
      ["Is the reducer concentric?", "The datasheet publishes a single face-to-face dimension per combination and does not distinguish a concentric from an eccentric pattern. Tell us if you need the bore offset — for example so a horizontal line drains — and we will confirm what can be supplied."],
      ["How do I read the reference?", "LSPR is the reducer series; the first figure is the large bore in inches and the figure after the slash is the small bore. LSPR6/3 is DN 150 down to DN 80."],
    ],
    related: ["pipe-section", "unequal-tee", "bend-reducer-90", "equal-tee"],
    keywords: "borosilicate glass reducer, glass pipeline reducer, LSPR reducer, DN 600 glass reducer",
  },

  {
    slug: "cross",
    name: "Cross",
    subtitle: "Glass equal cross, DN 15 to DN 100",
    image: img("cross"),
    alt: "Borosilicate glass four-way cross with equal branches",
    desc: "Glass four-way cross with all branches at the same bore — DN 15 to DN 100, centre-to-face 50 mm to 250 mm.",
    long: [
      "A cross takes two opposed branches off a glass run at a single point, saving a length of pipe and a pair of joints compared with two separate tees.",
      "The datasheet covers DN 15 to DN 100 with one centre-to-face dimension L per bore, matching the equal tee of the same size.",
    ],
    features: [
      "Four branches at the same nominal bore",
      "DN 15 to DN 100",
      "Centre to face 50 mm to 250 mm",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Distribution manifolds with opposed branches",
      "Mixing junctions on a glass line",
      "Combined feed and return at one point",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass equal cross",
      "Nominal bore range": "DN 15 to DN 100",
      "Centre to face": "50 mm to 250 mm",
      "Catalogue reference": "LSPX series, e.g. LSPX3 = DN 80",
    }),
    dim: T(
      "Cross — dimensions",
      ["Cat. Ref.", "DN", "L"],
      [
        ["LSPX07", "15", "50"], ["LSPX1", "25", "100"], ["LSPX1.5", "40", "150"],
        ["LSPX2", "50", "150"], ["LSPX3", "80", "200"], ["LSPX4", "100", "250"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Cross datasheet (PDF)", file: pdf("cross") }],
    faqs: [
      ["What is the largest cross available?", "The datasheet lists up to DN 100. For larger manifolds we would normally build the junction from tees — send your layout and we will advise."],
      ["Does L match the equal tee?", "Yes — the centre-to-face figures are identical to the equal tee at every shared bore, so the two are interchangeable on setting out."],
    ],
    related: ["equal-tee", "unequal-cross", "unequal-tee", "y-piece"],
    keywords: "borosilicate glass cross, glass four way cross, LSPX cross, glass manifold fitting",
  },

  {
    slug: "y-piece",
    name: "Y Piece",
    subtitle: "Glass Y piece, DN 15 to DN 100",
    image: img("y-piece"),
    alt: "Borosilicate glass Y piece merging two streams at an angle",
    desc: "Glass Y piece merging two streams at an angle with low turbulence — DN 15 to DN 100, with L, L1 and L2 setting-out dimensions.",
    long: [
      "A Y piece brings two streams together at an angle rather than square, which merges them with far less turbulence and pressure loss than a tee. On a glass line that also means less disturbance to observe through.",
      "Three dimensions are published for each bore — L overall, L1 and L2 — all of which are needed to set the fitting out in an isometric.",
    ],
    features: [
      "Angled merge — lower turbulence than a square tee",
      "DN 15 to DN 100",
      "Three setting-out dimensions L, L1 and L2 for every bore",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: [
      "Lower pressure drop and turbulence than a square branch",
      "Cleaner visual observation of the merged stream",
      ...GLASS_ADV.slice(0, 3),
    ],
    applications: [
      "Merging two glass lines with minimum disturbance",
      "Combining reactor and recycle streams",
      "Feed points where turbulence must be limited",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass Y piece",
      "Nominal bore range": "DN 15 to DN 100",
      "Catalogue reference": "LSPY series, e.g. LSPY4/2 = DN 50",
    }),
    dim: T(
      "Y Piece — dimensions",
      ["Cat. Ref.", "DN", "L", "L1", "L2"],
      [
        ["LSPY407", "15", "125", "50", "100"], ["LSPY4/1", "25", "200", "75", "150"],
        ["LSPY4/1.5", "40", "250", "100", "175"], ["LSPY4/2", "50", "300", "125", "200"],
        ["LSPY4/3", "80", "350", "150", "250"], ["LSPY9/4", "100", "450", "150", "350"],
      ],
      DIM_NOTE + " The DN 15 reference is printed as LSPY407 without a slash; reproduced as shown."
    ),
    downloads: [{ label: "Y Piece datasheet (PDF)", file: pdf("y-piece") }],
    faqs: [
      ["What angle is the Y?", "The datasheet gives the L, L1 and L2 setting-out dimensions but does not state the included angle. Send us your layout and we will confirm it against the drawing."],
      ["Y piece or tee?", "A Y merges streams with less turbulence and pressure loss, but it is longer. Use a tee where the run is tight."],
    ],
    related: ["equal-tee", "cross", "bend-45", "unequal-tee"],
    keywords: "borosilicate glass Y piece, glass Y branch, LSPY Y piece, low turbulence glass fitting",
  },

  {
    slug: "bend-90",
    name: "Bend 90°",
    subtitle: "Glass 90° bend, DN 15 to DN 300",
    image: img("bend-90"),
    alt: "Borosilicate glass 90 degree bend with beaded ends",
    desc: "Glass 90° bend turning a line through a right angle — DN 15 to DN 300, L 100 mm to 450 mm. 80° bends available to the same dimensions.",
    long: [
      "The 90° bend turns a glass run through a right angle. The datasheet lists nine bores from DN 15 to DN 300, each with a centre-to-face dimension L and a type letter — Type A up to DN 50, Type B from DN 80 upward.",
      "The datasheet also notes that bends in 80° are available with the same dimensions, which is how a line is given a slight fall for drainage without changing any setting-out figures.",
    ],
    features: [
      "DN 15 to DN 300 with type A / B construction",
      "Centre to face 100 mm at DN 15 to 450 mm at DN 300",
      "80° bends available with the same dimensions — gives a line fall to drain",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Right-angle direction changes in a glass line",
      "Routing around equipment and structure",
      "Giving a run a fall to drain, using the 80° variant",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass 90° bend",
      "Nominal bore range": "DN 15 to DN 300",
      "Centre to face": "100 mm to 450 mm, bore dependent",
      "Variants": "80° bend available with the same dimensions",
      "Catalogue reference": "LSPB series, e.g. LSPB4/90 = DN 100",
    }),
    dim: T(
      "Bend 90° — dimensions",
      ["Cat. Ref.", "DN", "L", "Type"],
      [
        ["LSPB07/90", "15", "100", "A"], ["LSPB1/90", "25", "100", "A"],
        ["LSPB1.5/90", "40", "150", "A"], ["LSPB2/90", "50", "150", "A"],
        ["LSPB3/90", "80", "200", "B"], ["LSPB4/90", "100", "250", "B"],
        ["LSPB6/90", "150", "250", "B"], ["LSPB9/90", "225", "375", "B"],
        ["LSPB12/90", "300", "450", "B"],
      ],
      DIM_NOTE + " The datasheet notes: bends in 80° are also available with the same dimensions."
    ),
    downloads: [{ label: "Bend 90° datasheet (PDF)", file: pdf("bend-90") }],
    faqs: [
      ["Why would I use an 80° bend?", "To give a horizontal run a slight fall so it drains. Because the dimensions are identical to the 90°, no other setting-out figure changes."],
      ["What do Type A and Type B mean?", "The datasheet marks DN 15–50 as Type A and DN 80–300 as Type B. Quote the type with the reference when ordering."],
    ],
    related: ["bend-45", "bend-90-thermometer-branch", "bend-reducer-90", "pipe-section"],
    keywords: "borosilicate glass 90 degree bend, glass elbow, LSPB bend, glass pipeline bend",
    featured: true,
  },

  {
    slug: "bend-45",
    name: "Bend 45°",
    subtitle: "Glass 45° bend, DN 15 to DN 100",
    image: img("bend-45"),
    alt: "Borosilicate glass 45 degree bend with beaded ends",
    desc: "Glass 45° bend for gentle direction changes — DN 15 to DN 100, L 50 mm to 175 mm. 10° and 80° bends available to the same dimensions.",
    long: [
      "A 45° bend changes direction with less turbulence and pressure drop than a right angle, and two of them offset a run neatly around an obstruction.",
      "The datasheet covers DN 15 to DN 100, and notes that bends in 10° and 80° are also available with the same dimensions — the 10° being the usual way to introduce a shallow fall into a long horizontal run.",
    ],
    features: [
      "Gentler turn than a 90° bend — lower pressure drop",
      "DN 15 to DN 100, Type A up to DN 50 and Type B from DN 80",
      "Centre to face 50 mm to 175 mm",
      "10° and 80° bends available with the same dimensions",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Offsets and gentle direction changes",
      "Introducing a shallow fall with the 10° variant",
      "Runs where fitting pressure drop matters",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass 45° bend",
      "Nominal bore range": "DN 15 to DN 100",
      "Centre to face": "50 mm to 175 mm, bore dependent",
      "Variants": "10° and 80° bends available with the same dimensions",
      "Catalogue reference": "LSPBD series, e.g. LSPBD3/45 = DN 80",
    }),
    dim: T(
      "Bend 45° — dimensions",
      ["Cat. Ref.", "DN", "L", "Type"],
      [
        ["LSPBD07/45", "15", "50", "A"], ["LSPBD1/45", "25", "75", "A"],
        ["LSPBD1.5/45", "40", "100", "A"], ["LSPBD2/45", "50", "100", "A"],
        ["LSPBD3/45", "80", "125", "B"], ["LSPBD4/45", "100", "175", "B"],
      ],
      DIM_NOTE + " The datasheet notes: bends in 10° and 80° are also available with the same dimensions."
    ),
    downloads: [{ label: "Bend 45° datasheet (PDF)", file: pdf("bend-45") }],
    faqs: [
      ["Is a 10° bend really the same dimensions?", "That is what the datasheet states. It is used to put a shallow, controlled fall into a long horizontal run so it drains."],
      ["What is the largest 45° bend?", "DN 100. Above that the range moves to 90° bends — send your layout if you need a large-bore shallow turn."],
    ],
    related: ["bend-90", "y-piece", "pipe-section", "u-bend"],
    keywords: "borosilicate glass 45 degree bend, glass elbow 45, LSPBD bend, shallow glass bend",
  },

  {
    slug: "u-bend",
    name: "U Bend",
    subtitle: "Glass U bend, DN 15 to DN 80",
    image: img("u-bend"),
    alt: "Borosilicate glass U bend returning a line through 180 degrees",
    desc: "Glass U bend returning a line through 180° — DN 15 to DN 80, L 50 mm to 225 mm.",
    long: [
      "A U bend turns a glass run back on itself through 180°, which is how a line is routed up and back down a column, or how a seal leg is formed at the bottom of a run.",
      "The datasheet covers five bores from DN 15 to DN 80 with a single dimension L for each.",
    ],
    features: [
      "180° return in a single component",
      "DN 15 to DN 80",
      "L 50 mm to 225 mm",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Returning a line back on itself around a column",
      "Forming a seal leg at the foot of a run",
      "Compact routing in tight plant space",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass U bend",
      "Nominal bore range": "DN 15 to DN 80",
      "Catalogue reference": "LSPU series, e.g. LSPU2 = DN 50",
    }),
    dim: T(
      "U Bend — dimensions",
      ["Cat. Ref.", "DN", "L"],
      [
        ["LSPU07", "15", "50"], ["LSPU1", "25", "150"], ["LSPU1.5", "40", "175"],
        ["LSPU2", "50", "175"], ["LSPU3", "80", "225"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "U Bend datasheet (PDF)", file: pdf("u-bend") }],
    faqs: [
      ["Is there a version with a drain?", "Yes — see the U bend with bottom outlet, which adds a branch at the base of the U so the leg can be drained or sampled."],
      ["What is the largest U bend?", "DN 80. For larger returns we would build the turn from two 90° bends and a section."],
    ],
    related: ["u-bend-bottom-outlet", "bend-90", "pipe-section", "bend-45"],
    keywords: "borosilicate glass U bend, glass 180 degree return bend, LSPU bend, glass seal leg",
  },

  {
    slug: "u-bend-bottom-outlet",
    name: "U Bend with Bottom Outlet",
    subtitle: "Glass U bend with drain branch, DN 15 to DN 80",
    image: img("u-bend-bottom-outlet"),
    alt: "Borosilicate glass U bend with a bottom outlet branch for draining",
    desc: "Glass U bend with a branch at the base so the leg can be drained or sampled — seven combinations from DN 15 to DN 80.",
    long: [
      "A plain U bend traps liquid at its lowest point. Adding a bottom outlet turns that trap into a usable feature: the leg can be drained down, sampled, or fitted with an instrument.",
      "The datasheet lists seven combinations with separate DN and DN1 bores and two dimensions, L and L1. Note that some combinations reduce the outlet — LSPUO2/1, for example, is a DN 50 U bend with a DN 25 outlet.",
    ],
    features: [
      "180° return with a drain or sampling branch at the base",
      "Seven combinations, DN 15 to DN 80, with reduced outlet options",
      "Separate L and L1 setting-out dimensions",
      "Borosilicate 3.3 with beaded ends",
    ],
    advantages: [
      "Removes the un-drainable trap of a plain U bend",
      "Gives a natural low-point sampling position",
      ...GLASS_ADV.slice(0, 3),
    ],
    applications: [
      "Draining the low point of a glass run",
      "Low-point sampling and instrument connections",
      "Seal legs that must be emptied between batches",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass U bend with bottom outlet",
      "Nominal bore range": "DN 15 to DN 80, outlet DN 15 to DN 50",
      "Catalogue reference": "LSPUO series, e.g. LSPUO2/1 = DN 50 with DN 25 outlet",
    }),
    dim: T(
      "U Bend with Bottom Outlet — dimensions",
      ["Cat. Ref.", "DN", "DN1", "L", "L1"],
      [
        ["LSPUO07", "15", "15", "125", "75"], ["LSPUO1", "25", "25", "250", "150"],
        ["LSPUO1.5", "40", "40", "275", "175"], ["LSPUO1.5/1", "40", "25", "275", "175"],
        ["LSPUO2", "50", "50", "275", "175"], ["LSPUO2/1", "50", "25", "275", "175"],
        ["LSPUO3/1", "80", "25", "350", "225"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "U Bend with Bottom Outlet datasheet (PDF)", file: pdf("u-bend-bottom-outlet") }],
    faqs: [
      ["Can I get a full-bore outlet at DN 80?", "The datasheet lists DN 80 only with a DN 25 outlet (LSPUO3/1). Tell us if you need a larger outlet at that bore and we will confirm what can be made."],
      ["What does L1 measure?", "The dimension down to the bottom outlet face. Use it with L to set the fitting out and to check the drain height above the floor or receiver."],
    ],
    related: ["u-bend", "unequal-tee", "closure", "bend-90"],
    keywords: "glass U bend with bottom outlet, glass drain bend, LSPUO bend, glass seal leg with drain",
  },

  {
    slug: "bend-90-thermometer-branch",
    name: "Bend 90° with Thermometer Branch",
    subtitle: "Glass 90° bend with DN 25 instrument branch, DN 40 to DN 300",
    image: img("bend-90-thermometer-branch"),
    alt: "Borosilicate glass 90 degree bend with a thermometer branch on the elbow",
    desc: "Glass 90° bend with a DN 25 branch for a thermometer or probe — DN 40 to DN 300, with L and L1 dimensions.",
    long: [
      "Putting a temperature probe into a bend rather than a straight section saves a fitting and puts the sensor where the flow is well mixed. This bend carries a DN 25 branch on the elbow for exactly that.",
      "The branch is DN 25 across the whole range from DN 40 to DN 300, so one probe size fits every line. Two dimensions are given: L for the run and L1 to the branch face.",
    ],
    features: [
      "DN 25 instrument branch at every bore from DN 40 to DN 300",
      "Combines a direction change and an instrument point in one fitting",
      "Type A at DN 40–50, Type B from DN 80 upward",
      "Separate L and L1 setting-out dimensions",
    ],
    advantages: [
      "One fitting instead of a bend plus a tee — fewer joints",
      "Probe sits where the flow is well mixed by the turn",
      ...GLASS_ADV.slice(0, 3),
    ],
    applications: [
      "Temperature measurement on a glass process line",
      "Probe and thermowell points at a direction change",
      "Retrofitting instrumentation without adding a tee",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass 90° bend with thermometer branch",
      "Nominal bore range": "DN 40 to DN 300 with DN 25 branch",
      "Catalogue reference": "LSPBT series, e.g. LSPBT4 = DN 100",
    }),
    dim: T(
      "Bend 90° with Thermometer Branch — dimensions",
      ["Cat. Ref.", "DN", "DN1", "L", "L1", "Type"],
      [
        ["LSPBT1.5", "40", "25", "150", "225", "A"], ["LSPBT2", "50", "25", "150", "225", "A"],
        ["LSPBT3", "80", "25", "200", "275", "B"], ["LSPBT4", "100", "25", "250", "350", "B"],
        ["LSPBT6", "150", "25", "250", "375", "B"], ["LSPBT9", "225", "25", "375", "525", "B"],
        ["LSPBT12", "300", "25", "450", "550", "B"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Bend 90° with Thermometer Branch datasheet (PDF)", file: pdf("bend-90-thermometer-branch") }],
    faqs: [
      ["Is the branch always DN 25?", "Yes — the datasheet lists DN 25 for the branch at every bore from DN 40 to DN 300."],
      ["Is a thermometer pocket included?", "No, the branch is the connection. See the thermometer pocket for bend, which is the pocket that fits into it."],
    ],
    related: ["thermometer-pocket-for-bend", "bend-90", "unequal-tee", "pipe-section"],
    keywords: "glass bend with thermometer branch, glass instrument bend, LSPBT bend, glass temperature probe fitting",
  },
];

/* ---------------------------------------------------------
   JACKETED PIPE SECTIONS
   --------------------------------------------------------- */
export const jacketed = [
  {
    slug: "glass-jacket",
    name: "Glass Jacket",
    subtitle: "Glass jacketed pipe section, DN 80 to DN 300",
    image: img("glass-jacket"),
    alt: "Borosilicate glass jacketed pipe section with glass outer jacket and service connections",
    desc: "Glass jacketed pipe section for heating or temperature control along a line — DN 80 to DN 300, 1000 mm long, jacket rated to 1.0 bar.",
    long: [
      "For heating a line, or for holding temperature along the length of a column, the pipe section is supplied inside a glass jacket. Because the jacket is glass too, the process fluid stays fully visible — which a metal jacket cannot offer.",
      "The datasheet describes the seal: the glass jacket is sealed to the pipe section with a Viton 'O' ring and other sealing compositions, and the seal is what prevents impermissibly high expansion between the two.",
      "This is the one component in the pipeline range with a published pressure rating. Maximum operating pressure in the jacket is 1.0 bar for DN 80 to DN 150, and 0.5 bar for DN 225 to DN 300.",
    ],
    features: [
      "Glass jacket — the process fluid stays visible while heated",
      "DN 80 to DN 300, 1000 mm standard length",
      "Viton 'O' ring seal between jacket and pipe section",
      "DN 25 service connections",
      "Jacket rated 1.0 bar to DN 150, 0.5 bar from DN 225",
    ],
    advantages: [
      "Full visibility of the product even through a heated section",
      "Holds temperature along the whole run, not just at the vessels",
      "Sealed to accommodate differential expansion between jacket and core",
      ...GLASS_ADV.slice(0, 2),
    ],
    applications: [
      "Heating a glass process line",
      "Temperature control along a column",
      "Products that crystallise or thicken if they cool",
      "Cooling duty on exothermic transfer",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass jacketed pipe section",
      "Nominal bore range": "DN 80 to DN 300",
      "Standard length": "1000 mm",
      "Service connection": "DN 25",
      "Jacket seal": "Viton 'O' ring and sealing compositions",
      "Pressure rating": "Maximum operating pressure in the jacket — 1.0 bar for DN 80 to DN 150; 0.5 bar for DN 225 to DN 300",
      "Catalogue reference": "LSPSD series, e.g. LSPSD6/1000 = DN 150 × 1000 mm",
    }),
    dim: T(
      "Glass Jacket — dimensions",
      ["Cat. Ref.", "DN", "L", "d", "DN1", "J", "J1"],
      [
        ["LSPSD3/1000", "80", "1000", "100", "25", "850", "750"],
        ["LSPSD4/1000", "100", "1000", "150", "25", "850", "750"],
        ["LSPSD6/1000", "150", "1000", "225", "25", "850", "700"],
        ["LSPSD9/1000", "225", "1000", "300", "25", "850", "700"],
        ["LSPSD12/1000", "300", "1000", "400", "25", "850", "650"],
      ],
      DIM_NOTE + " d is the jacket outside bore, DN1 the service connection, J and J1 the jacket and service-connection lengths."
    ),
    matTable: {
      caption: "Maximum operating pressure in the jacket",
      cols: ["Bore range", "Maximum jacket pressure"],
      rows: [["DN 80 – DN 150", "1.0 bar"], ["DN 225 – DN 300", "0.5 bar"]],
    },
    downloads: [{ label: "Glass Jacket datasheet (PDF)", file: pdf("glass-jacket") }],
    faqs: [
      ["What pressure can the jacket take?", "1.0 bar for DN 80 to DN 150 and 0.5 bar for DN 225 to DN 300, as published on the datasheet. Do not exceed it — the jacket is glass."],
      ["Why a Viton 'O' ring?", "The jacket and the inner pipe expand at slightly different rates when heated. The 'O' ring seal accommodates that movement; the datasheet notes it prevents impermissibly high expansion."],
      ["Glass jacket or metal jacket?", "Glass keeps the product visible through the heated section. A metal jacket is more robust and has a smaller outside diameter at the same bore, but you lose the view."],
    ],
    related: ["metal-jacket", "pipe-section", "bend-90", "equal-tee"],
    keywords: "glass jacketed pipe section, borosilicate glass jacket, LSPSD jacket, heated glass pipeline",
    featured: true,
  },

  {
    slug: "metal-jacket",
    name: "Metal Jacket",
    subtitle: "Metal jacketed pipe section, DN 80 to DN 300",
    image: img("metal-jacket"),
    alt: "Metal jacketed borosilicate glass pipe section with service connections",
    desc: "Metal jacketed pipe section for heating a glass line where visibility through the jacket is not required — DN 80 to DN 300, 1000 mm long.",
    long: [
      "The metal jacket does the same job as the glass jacket — circulating a heating or cooling service around the pipe section — in a more robust and more compact form. At every bore its outside dimension d is smaller than the glass equivalent, which matters where jacketed sections run close together.",
      "The trade-off is visibility: you can no longer see the product through the jacketed length. Where that matters, use the glass jacket.",
    ],
    features: [
      "More robust and more compact than the glass jacket",
      "DN 80 to DN 300, 1000 mm standard length",
      "DN 25 service connections",
      "Smaller outside dimension than the glass jacket at every bore",
    ],
    advantages: [
      "Mechanically tougher than a glass jacket",
      "Smaller outside diameter — jacketed runs can sit closer together",
      ...GLASS_ADV.slice(0, 3),
    ],
    applications: [
      "Heating or cooling a glass line where the jacketed length need not be visible",
      "Congested pipe runs where jacket outside diameter matters",
      "Steam or thermic fluid tracing of a glass process line",
      "Temperature control along a column",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Metal jacketed pipe section",
      "Nominal bore range": "DN 80 to DN 300",
      "Standard length": "1000 mm",
      "Service connection": "DN 25",
      "Pressure rating": "Not published on the metal jacket datasheet — confirm the service pressure with us",
      "Catalogue reference": "LSPSJ series, e.g. LSPSJ6/1000 = DN 150 × 1000 mm",
    }),
    dim: T(
      "Metal Jacket — dimensions",
      ["Cat. Ref.", "DN", "L", "d", "DN1", "J", "J1"],
      [
        ["LSPSJ3/1000", "80", "1000", "100", "25", "850", "750"],
        ["LSPSJ4/1000", "100", "1000", "135", "25", "850", "750"],
        ["LSPSJ6/1000", "150", "1000", "188", "25", "850", "700"],
        ["LSPSJ9/1000", "225", "1000", "262", "25", "850", "700"],
        ["LSPSJ12/1000", "300", "1000", "345", "25", "850", "650"],
      ],
      DIM_NOTE + " Compare d against the glass jacket: the metal jacket is smaller at every bore from DN 100 upward."
    ),
    downloads: [{ label: "Metal Jacket datasheet (PDF)", file: pdf("metal-jacket") }],
    faqs: [
      ["What pressure can the metal jacket take?", "The metal jacket datasheet publishes no pressure figure, so none is quoted here. Send us the service medium, pressure and temperature and we will confirm the design."],
      ["Is the wetted bore still glass?", "Yes. The jacket is metal; the pipe section inside it is borosilicate 3.3, so the product still only touches glass."],
    ],
    related: ["glass-jacket", "pipe-section", "bend-90", "equal-tee"],
    keywords: "metal jacketed glass pipe section, LSPSJ jacket, jacketed borosilicate pipeline, steam jacketed glass line",
  },
];

/* ---------------------------------------------------------
   OTHER PIPELINE COMPONENTS
   --------------------------------------------------------- */
export const otherComponents = [
  {
    slug: "hose-connector",
    name: "Hose Connector",
    subtitle: "Glass hose connector, DN 15 to DN 40",
    image: img("hose-connector"),
    alt: "Borosilicate glass hose connector with barbed tail",
    desc: "Glass hose connector ending a line in a barbed tail — DN 15 to DN 40 with hose diameters from 11 mm to 28 mm.",
    long: [
      "The hose connector terminates a glass line in a tail so flexible hose can be clamped on, for drumming off, temporary transfer or connection to portable equipment.",
      "Seven combinations are listed. Note that a single bore can take several hose sizes — DN 25 is offered with 28, 22, 15 and 11 mm tails — so specify the hose diameter d as well as the bore.",
    ],
    features: [
      "Terminates a glass line in a barbed hose tail",
      "DN 15, 25 and 40 with hose diameters 11 mm to 28 mm",
      "Several hose sizes available on the same bore",
      "Length L 70 mm to 100 mm",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Drum and carboy filling from a glass line",
      "Temporary transfer connections",
      "Connection to portable and mobile equipment",
      "Laboratory and pilot plant hook-ups",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass hose connector",
      "Nominal bore range": "DN 15 to DN 40",
      "Hose diameter d": "11, 15, 20, 22 and 28 mm",
      "Catalogue reference": "LSPHC series, e.g. LSPHC1/.75 = DN 25 with 22 mm tail",
    }),
    dim: T(
      "Hose Connector — dimensions",
      ["Cat. Ref.", "DN", "d", "L"],
      [
        ["LSPHC7/7.5", "15", "20", "70"], ["LSPHC1/1", "25", "28", "90"],
        ["LSPHC1/.75", "25", "22", "90"], ["LSPHC1/.5", "25", "15", "90"],
        ["LSPHC1/.25", "25", "11", "90"], ["LSPHC1.5/1", "40", "28", "100"],
        ["LSPHC1.5/.75", "40", "22", "100"],
      ],
      DIM_NOTE + " d is the hose tail diameter — quote it as well as the bore when ordering."
    ),
    downloads: [{ label: "Hose Connector datasheet (PDF)", file: pdf("hose-connector") }],
    faqs: [
      ["Which hose diameter should I choose?", "Match d to your hose bore: 11, 15, 22 or 28 mm on DN 25. The bore of the connector and the hose size are specified separately."],
      ["Is there an angled version?", "Yes — see the bend hose connector, which turns the tail through a bend."],
    ],
    related: ["bend-hose-connector", "closure", "pipe-section", "blind"],
    keywords: "glass hose connector, borosilicate hose tail, LSPHC connector, glass pipeline hose adapter",
  },

  {
    slug: "bend-hose-connector",
    name: "Bend Hose Connector",
    subtitle: "Glass bend hose connector, DN 15 to DN 50",
    image: img("bend-hose-connector"),
    alt: "Borosilicate glass bend hose connector with angled barbed tail",
    desc: "Glass hose connector with a bend, turning the hose tail away from the line — DN 15 to DN 50, hose diameters 20 mm to 28 mm.",
    long: [
      "Where a straight hose tail would foul structure or force a tight bend radius in the hose, the bend hose connector turns the outlet through an angle first. That protects the hose and makes the connection easier to reach.",
      "Five combinations are listed from DN 15 to DN 50, with hose diameters of 20, 22 and 28 mm and lengths from 40 mm to 100 mm.",
    ],
    features: [
      "Angled outlet — protects the hose from a tight bend radius",
      "DN 15 to DN 50 with hose diameters 20, 22 and 28 mm",
      "Length L 40 mm to 100 mm",
      "Borosilicate 3.3 with beaded end",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Hose connections in confined spaces",
      "Drumming off where the hose must turn immediately",
      "Temporary transfer from a wall-mounted line",
      "Pilot plant hook-ups",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass bend hose connector",
      "Nominal bore range": "DN 15 to DN 50",
      "Hose diameter d": "20, 22 and 28 mm",
      "Catalogue reference": "LSPBHC series, e.g. LSPBHC2/.75 = DN 50 with 22 mm tail",
    }),
    dim: T(
      "Bend Hose Connector — dimensions",
      ["Cat. Ref.", "DN", "d", "L"],
      [
        ["LSPBHC7/7.5", "15", "20", "40"], ["LSPBHC1/1", "25", "28", "60"],
        ["LSPBHC1/.75", "25", "22", "60"], ["LSPBHC1.5/.75", "40", "22", "75"],
        ["LSPBHC2/.75", "50", "22", "100"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Bend Hose Connector datasheet (PDF)", file: pdf("bend-hose-connector") }],
    faqs: [
      ["Why not just bend the hose?", "A tight radius kinks the hose, restricts flow and shortens its life. Turning the outlet in glass first lets the hose leave on a natural sweep."],
      ["What hose sizes are available at DN 50?", "The datasheet lists DN 50 with a 22 mm tail only. Tell us if you need a larger tail at that bore."],
    ],
    related: ["hose-connector", "bend-90", "closure", "pipe-section"],
    keywords: "glass bend hose connector, angled glass hose tail, LSPBHC connector, glass pipeline hose bend",
  },

  {
    slug: "closure",
    name: "Closure",
    subtitle: "Glass closure, DN 15 to DN 300",
    image: img("closure"),
    alt: "Borosilicate glass domed closure for ending a pipeline run",
    desc: "Domed glass closure ending a run — DN 15 to DN 300, L 40 mm to 150 mm.",
    long: [
      "A closure caps the end of a glass line with a domed glass end rather than a flat plate. The dome keeps the bore fully visible right to the end of the run and avoids the sharp internal corner a flat blank creates, which matters where product could otherwise settle.",
      "Nine bores are listed from DN 15 to DN 300, with L from 40 mm to 150 mm.",
    ],
    features: [
      "Domed glass end — no sharp internal corner for product to settle in",
      "DN 15 to DN 300",
      "L 40 mm to 150 mm",
      "Keeps the end of the run fully visible",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Terminating a glass pipeline run",
      "Capping a spare branch on a manifold",
      "Future tie-in points left closed during construction",
      ...GLASS_APPS.slice(1, 2),
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass closure",
      "Nominal bore range": "DN 15 to DN 300",
      "Catalogue reference": "LSPBE series, e.g. LSPBE4 = DN 100",
    }),
    dim: T(
      "Closure — dimensions",
      ["Cat. Ref.", "DN", "L"],
      [
        ["LSPBE07", "15", "40"], ["LSPBE1", "25", "50"], ["LSPBE1.5", "40", "75"],
        ["LSPBE2", "50", "75"], ["LSPBE3", "80", "100"], ["LSPBE4", "100", "125"],
        ["LSPBE6", "150", "125"], ["LSPBE9", "225", "150"], ["LSPBE12", "300", "150"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Closure datasheet (PDF)", file: pdf("closure") }],
    faqs: [
      ["Closure or blind?", "A closure is a domed glass end that adds 40–150 mm to the run and keeps the bore visible. A blind is a flat plate only 8–9 mm thick that seals against a flange face. Use a blind where length is tight."],
      ["Can a closure be removed later?", "Yes — it bolts up like any other component, so a run can be extended by unbolting it."],
    ],
    related: ["blind", "pipe-section", "u-bend", "hose-connector"],
    keywords: "glass closure, borosilicate domed end, LSPBE closure, glass pipeline end cap",
  },

  {
    slug: "blind",
    name: "Blind",
    subtitle: "Glass blind, DN 15 to DN 300, 8–9 mm",
    image: img("blind"),
    alt: "Borosilicate glass blind plate for sealing off a flange face",
    desc: "Flat glass blind sealing off a flange face in only 8–9 mm — DN 15 to DN 300.",
    long: [
      "A blind seals a flange face flat, adding almost nothing to the length of the run — 8 mm up to DN 100 and 9 mm from DN 150 upward. That makes it the right choice for blanking a branch or isolating a section where a domed closure would not fit.",
      "Nine bores are covered from DN 15 to DN 300.",
    ],
    features: [
      "Only 8–9 mm thick — negligible addition to run length",
      "DN 15 to DN 300",
      "Seals flat against a flange face",
      "Borosilicate 3.3",
    ],
    advantages: GLASS_ADV,
    applications: [
      "Blanking a spare branch on a tee or cross",
      "Isolating a section for maintenance or hydrotest",
      "Capping a run where length is tight",
      "Future tie-in points left blanked during construction",
    ],
    industries: GLASS_INDUSTRIES,
    spec: SPEC_BASE({
      "Product type": "Glass blind",
      "Nominal bore range": "DN 15 to DN 300",
      "Thickness": "8 mm to DN 100; 9 mm from DN 150",
      "Catalogue reference": "LSPBF series, e.g. LSPBF6 = DN 150",
    }),
    dim: T(
      "Blind — dimensions",
      ["Cat. Ref.", "DN", "L"],
      [
        ["LSPBF07", "15", "8"], ["LSPBF1", "25", "8"], ["LSPBF1.5", "40", "8"],
        ["LSPBF2", "50", "8"], ["LSPBF3", "80", "8"], ["LSPBF4", "100", "8"],
        ["LSPBF6", "150", "9"], ["LSPBF9", "225", "9"], ["LSPBF12", "300", "9"],
      ],
      DIM_NOTE
    ),
    downloads: [{ label: "Blind datasheet (PDF)", file: pdf("blind") }],
    faqs: [
      ["How much length does a blind add?", "8 mm up to DN 100 and 9 mm from DN 150 — effectively nothing. Allow for it plus the gasket when setting out."],
      ["Blind or closure?", "Blind where length is tight or you are blanking a branch; closure where you want a domed, fully visible end to the run."],
    ],
    related: ["closure", "spacer", "pipe-section", "equal-tee"],
    keywords: "glass blind, borosilicate blind plate, LSPBF blind, glass pipeline blanking plate",
  },
];

/* ---------------------------------------------------------
   Components the supplied datasheets do not cover.
   These keep their place in the catalogue and carry the range's
   shared specification, but NO dimension table is published for
   them because none was supplied — nothing has been invented.
   --------------------------------------------------------- */
const noSheet = (slug, name, subtitle, desc, long, apps, related, keywords) => ({
  slug, name, subtitle,
  image: img(slug),
  alt: `Borosilicate glass ${name.toLowerCase()}`,
  desc,
  long,
  features: [
    "Borosilicate 3.3 with beaded ends and backing flanges",
    "Dimensionally matched to the rest of the pipeline range",
    "Drilling to BS 10 Table E, BS 10 Table F or ASA",
    "Made to your dimensions where a standard size does not fit",
  ],
  advantages: GLASS_ADV,
  applications: apps,
  industries: GLASS_INDUSTRIES,
  spec: SPEC_BASE({
    "Product type": `Glass ${name.toLowerCase()}`,
    "Nominal bore range": "Confirm with us for this item",
    "Dimensional standard": "No component datasheet supplied for this item — dimensions confirmed on enquiry",
  }),
  dim: {
    caption: `${name} — dimensions`,
    cols: ["Parameter", "Value"],
    rows: [
      ["Material", GLASS.material],
      ["End connection", GLASS.ends],
      ["Flange drilling", GLASS.drilling],
      ["Bore, length and setting-out dimensions", "Confirmed on enquiry"],
    ],
    note: "No dimensional datasheet was supplied for this component, so no dimension table is published here. Send us your bore and setting-out requirement and we will issue a dimensioned drawing for approval — we have deliberately not estimated figures from the neighbouring products.",
  },
  faqs: [
    ["Why is there no dimension table on this page?", "Because no datasheet was supplied for this item. Rather than estimate dimensions from similar products, we confirm them against a drawing on enquiry."],
    ["Can you make it to my dimensions?", "Yes. Send a sketch or an isometric with the bore and setting-out dimensions and we will return a drawing for sign-off before fabrication."],
  ],
  related, keywords,
});

export const madeToOrder = [
  noSheet(
    "bend-reducer-90", "Bend Reducer 90°",
    "Glass 90° bend with an integral bore change",
    "Glass 90° bend that changes bore through the turn — combining a bend and a reducer in one component.",
    [
      "A bend reducer turns the line and changes its bore in a single component, saving a joint and a length of pipe against fitting a separate bend and reducer.",
      "No dimensional datasheet was supplied for this item, so its bore combinations and setting-out dimensions are confirmed on enquiry rather than estimated here.",
    ],
    ["Direction and bore change at a single point", "Pump and equipment connections at a corner", "Congested runs where a bend plus reducer will not fit", ...GLASS_APPS.slice(1, 2)],
    ["bend-90", "reducer", "bend-45", "pipe-section"],
    "glass bend reducer, 90 degree reducing bend, borosilicate reducing elbow"
  ),
  noSheet(
    "thermometer-pocket-for-bend", "Thermometer Pocket for Bend",
    "Glass thermometer pocket for a bend branch",
    "Glass thermometer pocket that fits the DN 25 branch of a bend, holding a probe in the flow without wetting it.",
    [
      "The thermometer pocket is the closed glass sheath that goes into the DN 25 branch of a bend with thermometer branch. It holds the probe in the flow while keeping it dry, so the instrument can be withdrawn or replaced without breaking containment.",
      "No dimensional datasheet was supplied for this item, so its dimensions are confirmed on enquiry rather than estimated here.",
    ],
    ["Temperature measurement on a glass line", "Probe protection in corrosive service", "Instrument replacement without opening the line", ...GLASS_APPS.slice(1, 2)],
    ["bend-90-thermometer-branch", "bend-90", "pipe-section", "equal-tee"],
    "glass thermometer pocket, borosilicate thermowell, glass probe pocket"
  ),
  noSheet(
    "unequal-cross", "Unequal Cross",
    "Glass four-way cross with reduced branches",
    "Glass cross with branches smaller than the run — two reduced take-offs at a single point.",
    [
      "The unequal cross takes two reduced branches off a glass run at one point, doing in a single component what would otherwise need two reducing tees and a length of pipe between them.",
      "No dimensional datasheet was supplied for this item, so its bore combinations and setting-out dimensions are confirmed on enquiry rather than estimated here.",
    ],
    ["Reduced distribution manifolds", "Opposed sampling or dosing points", "Combined feed and drain below line size", ...GLASS_APPS.slice(1, 2)],
    ["cross", "unequal-tee", "equal-tee", "reducer"],
    "glass unequal cross, reducing glass cross, borosilicate manifold cross"
  ),
  noSheet(
    "full-view-inline-sight-glass", "Full View Inline Sight Glass",
    "Full-bore inline glass sight section",
    "Full-view inline sight glass giving unobstructed 360° observation of the flow in a line.",
    [
      "A full view inline sight glass replaces a length of line with a clear section, giving unobstructed observation of the product right around the bore — used to confirm flow, watch for phase separation and check that a line has drained.",
      "No dimensional datasheet was supplied for this specific item. Our tubular sight flow indicator range covers the same duty in metallic, lined and polypropylene construction from 15NB to 400NB with full published dimensions — see the related products below.",
    ],
    ["Confirming that a line is flowing", "Watching for colour change, cloudiness or phase separation", "Spotting entrained gas or cavitation", "Verifying a line has drained before maintenance"],
    ["lined-ss-tubular-sfi", "ss-allen-key-tubular-sfi", "ic-tubular-sfi", "ss-double-window-sfi"],
    "full view inline sight glass, glass sight section, borosilicate sight glass, inline flow observation"
  ),
];
