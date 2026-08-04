/* =========================================================
   LATA SCIENTIFIC — borosilicate glass valves.

   Every dimension table below is transcribed row-for-row from the supplied
   catalogue pages. Catalogue references (LSPV…, LSPVD…, LSPVE…, LSPVL…,
   LSBAL…, LSPVT…) are the catalogue's own.

   ⚠️  The catalogue pages are dimensional only. They state no pressure or
   temperature rating for this range, so none is claimed here. The one
   material fact printed is "Spindle is made of PTFE" on the straight
   through valve. Material is given as borosilicate 3.3, this site's stated
   house standard for glass components.

   All dimensions are in mm, with one exception noted in the data: the
   Angle Valve's D column is an ANGLE in degrees, not a diameter.
   ========================================================= */

const img = (s) => `assets/img/products/glass-valve-${s}.svg`;

export const GV = {
  material: "Borosilicate 3.3",
  ends: "Beaded glass ends with backing flanges and PTFE-envelope gaskets",
  drilling: "See the drilling table — BS 10 Table E, BS 10 Table F and ASA drilling available",
};

const SPEC = (over = {}) => Object.entries({
  "Product type": "Borosilicate glass valve",
  "Material": GV.material,
  "Spindle": "PTFE",
  "Nominal bore range": "",
  "End connection": GV.ends,
  "Flange drilling": GV.drilling,
  "Pressure rating": "Not published on the valve catalogue page — confirm with us for your duty",
  "Temperature rating": "Not published on the valve catalogue page — confirm with us for your duty",
  "Catalogue reference": "",
  ...over,
}).filter(([, v]) => v !== "" && v != null);

const GV_ADV = [
  "Fully transparent — the operator can see the valve position and the media through the body",
  "Inert to almost all process media; no metal in the wetted path",
  "PTFE spindle: no lubrication, no seizing, no contamination of the batch",
  "Bolts straight into the borosilicate pipeline range with the same beaded ends and backing flanges",
  "Smooth bore resists fouling and cleans down easily",
];

const GV_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Water &amp; effluent treatment", "Distillation &amp; solvent recovery",
  "Research &amp; pilot plant", "Agrochemicals",
];

const MM = "All dimensions in mm, transcribed exactly from the catalogue page.";

export const glassValves = [
  {
    slug: "straight-through-valve",
    name: "Straight Through Valve",
    subtitle: "Glass straight through valve, DN 15 to DN 50",
    image: "assets/img/products/straight-through-valve-photo.jpg",
    drawing: img("straight-through"),
    alt: "Dimension schematic of a borosilicate glass straight through valve showing DN, DN1, d, L and H",
    desc: "Borosilicate glass straight through valve with a PTFE spindle — full-bore isolation in a glass line, DN 15 to DN 50, in five catalogue sizes.",
    long: [
      "The straight through valve is the general-purpose isolation valve of a glass pipeline. Flow passes through the body in line, and the PTFE spindle closes onto the seat to shut it off. Because the body is borosilicate, the operator can see both the media and the state of the valve without opening anything.",
      "The catalogue prints one line under this table that matters more than it looks: <strong>the spindle is made of PTFE</strong>. That is what lets the valve run unlubricated on aggressive media without seizing, galling or contaminating the batch — the two materials in contact with the process are glass and PTFE, nothing else.",
      "Five references cover DN 15 to DN 50. Note LSPV1.5/1, which is a reducing build: a DN 40 line connection with a DN 25 branch, at the same 225 mm length as the full-bore DN 40.",
    ],
    features: [
      "PTFE spindle — the catalogue's own note for this valve",
      "Borosilicate 3.3 body; wetted parts are glass and PTFE only",
      "DN 15 to DN 50 in five catalogue references",
      "Face to face 125 mm to 300 mm",
      "Reducing build available (LSPV1.5/1: DN 40 line, DN 25 branch)",
    ],
    advantages: GV_ADV,
    applications: [
      "Primary isolation on borosilicate glass process lines",
      "Batch charging and discharge on glass reactors",
      "Corrosive acid, alkali and solvent service",
      "Pilot plant and kilo-lab lines where the process must stay visible",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass straight through valve",
      "Nominal bore range": "DN 15 to DN 50",
      "Face to face": "125 mm to 300 mm",
      "Catalogue reference": "LSPV series, e.g. LSPV1.5 = DN 40",
    }),
    dim: {
      caption: "Straight Through Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "DN1", "d", "L", "H"],
      rows: [
        ["LSPV07", "15", "15", "12", "125", "90"],
        ["LSPV1", "25", "25", "18", "175", "175"],
        ["LSPV1.5/1", "40", "25", "18", "225", "175"],
        ["LSPV1.5", "40", "40", "26", "225", "200"],
        ["LSPV2", "50", "50", "38", "300", "220"],
      ],
      note: MM + " The catalogue adds one note to this table: “Spindle is made of PTFE.”",
    },
    faqs: [
      ["What is the spindle made of?", "PTFE — the catalogue states it explicitly for this valve. It runs unlubricated, will not seize on aggressive media, and keeps the wetted path to glass and PTFE only."],
      ["What is LSPV1.5/1?", "A reducing build: DN 40 on the line side and DN 25 on the branch, at the same 225 mm face-to-face as the full-bore DN 40 (LSPV1.5)."],
      ["What pressure is it rated for?", "The catalogue page is dimensional and publishes no pressure or temperature figure, so we do not quote one. Send us your duty and we will confirm it against the drawing."],
    ],
    related: ["angle-valve", "three-way-valve", "drain-valve", "pipe-section"],
    keywords: "borosilicate glass straight through valve, glass isolation valve, PTFE spindle glass valve, LSPV valve, DN 15 to DN 50 glass valve",
    featured: true,
  },

  {
    slug: "drain-valve",
    name: "Drain Valve",
    subtitle: "Glass drain valve, DN 15 to DN 50",
    image: img("drain"),
    drawing: img("drain"),
    alt: "Dimension schematic of a borosilicate glass drain valve showing DN, DN1, d, L, H and outlet diameter D",
    desc: "Borosilicate glass drain valve for emptying the low point of a glass line or vessel — DN 15 to DN 50 with a tapered drain outlet from 14 mm to 50 mm.",
    long: [
      "A drain valve sits at the low point of a run or under a vessel and empties it completely. It shares the body, bore and face-to-face dimensions of the straight through valve, but adds a tapered drain leg below the seat — the D dimension in the table — so the contents fall clear instead of pooling above a horizontal outlet.",
      "That D dimension is the one to check when setting out: it grows from 14 mm at DN 15 to 50 mm at DN 50, and it determines both the discharge rate and the clearance you need below the valve for a receiver.",
    ],
    features: [
      "Tapered drain leg — no pooling above the outlet",
      "Outlet diameter D from 14 mm at DN 15 to 50 mm at DN 50",
      "Dimensionally matched to the straight through valve on DN, d, L and H",
      "Borosilicate 3.3 body with PTFE spindle",
      "DN 15 to DN 50 in five catalogue references",
    ],
    advantages: [
      "Empties the line or vessel completely between batches",
      "Visible discharge — the operator can see when it has run clear",
      ...GV_ADV.slice(1, 5),
    ],
    applications: [
      "Draining the low point of a glass pipeline",
      "Vessel and receiver bottom discharge",
      "Sampling from the base of a run",
      "Emptying between batches to prevent cross-contamination",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass drain valve",
      "Nominal bore range": "DN 15 to DN 50",
      "Face to face": "125 mm to 300 mm",
      "Drain outlet D": "14 mm to 50 mm, size dependent",
      "Catalogue reference": "LSPVD series, e.g. LSPVD2 = DN 50",
    }),
    dim: {
      caption: "Drain Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "DN1", "d", "L", "H", "D"],
      rows: [
        ["LSPVD07", "15", "15", "12", "125", "90", "14"],
        ["LSPVD1", "25", "25", "18", "175", "175", "28"],
        ["LSPVD1.5/1", "40", "25", "18", "225", "175", "28"],
        ["LSPVD1.5", "40", "40", "26", "225", "200", "42"],
        ["LSPVD2", "50", "50", "38", "300", "220", "50"],
      ],
      note: MM + " D is the drain outlet diameter — allow clearance below the valve for a receiver.",
    },
    faqs: [
      ["How does this differ from the straight through valve?", "DN, DN1, d, L and H are identical size for size. The drain valve adds the tapered drain leg and its outlet diameter D, so the low point empties completely."],
      ["How much clearance do I need underneath?", "Enough for the D outlet plus your receiver — D runs from 14 mm at DN 15 to 50 mm at DN 50. Send us the arrangement and we will check it against the drawing."],
    ],
    related: ["straight-through-valve", "bottom-outlet-valve", "angle-valve", "u-bend-bottom-outlet"],
    keywords: "borosilicate glass drain valve, glass low point drain, LSPVD valve, glass pipeline drain valve",
  },

  {
    slug: "angle-valve",
    name: "Angle Valve",
    subtitle: "Glass angle valve, DN 15 to DN 50, 90° and 80°",
    image: img("angle"),
    drawing: img("angle"),
    alt: "Dimension schematic of a borosilicate glass angle valve showing DN, DN1, d, L, H and the included angle D",
    desc: "Borosilicate glass angle valve combining a direction change and isolation in one body — DN 15 to DN 50, in 90° and 80° builds.",
    long: [
      "An angle valve turns the line and shuts it off in a single component, which removes a bend, a joint and a length of pipe from the layout. On a glass line that matters twice over: fewer joints means fewer potential leak paths and less glass to support.",
      "Read the D column carefully — on this table it is <strong>an angle in degrees, not a diameter</strong>. DN 15 and DN 25 are each listed twice, once at 90° and once at 80°, with identical dimensions otherwise. The 80° build is what gives a horizontal run a slight fall so it drains, exactly as the 80° bends in the pipeline range do.",
      "Face-to-face is short for the bore — 50 mm at DN 15 and 150 mm at DN 50 — so the valve fits where a separate bend plus valve would not.",
    ],
    features: [
      "Direction change and isolation in one body",
      "Available in 90° and 80° at DN 15 and DN 25",
      "Short face to face: 50 mm at DN 15 to 150 mm at DN 50",
      "Borosilicate 3.3 body with PTFE spindle",
      "DN 15 to DN 50",
    ],
    advantages: [
      "Removes a bend, a joint and a pipe length from the layout",
      "The 80° build gives a run a fall to drain",
      ...GV_ADV.slice(0, 4),
    ],
    applications: [
      "Isolation at a corner in a glass line",
      "Take-offs from a header where space is tight",
      "Vessel and column connections that need a turn",
      "Runs that must fall to drain, using the 80° build",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass angle valve",
      "Nominal bore range": "DN 15 to DN 50",
      "Face to face": "50 mm to 150 mm",
      "Angle (D)": "90° standard; 80° at DN 15 and DN 25",
      "Catalogue reference": "LSPVE series, e.g. LSPVE1.5 = DN 40",
    }),
    dim: {
      caption: "Angle Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "DN1", "d", "L", "H", "D"],
      rows: [
        ["LSPVE07", "15", "15", "12", "50", "80", "90°"],
        ["LSPVE07", "15", "15", "12", "50", "80", "80°"],
        ["LSPVE1", "25", "25", "18", "100", "175", "90°"],
        ["LSPVE1", "25", "25", "18", "100", "175", "80°"],
        ["LSPVE1.5", "40", "40", "26", "150", "200", "90°"],
        ["LSPVE2", "50", "50", "38", "150", "200", "90°"],
      ],
      note: MM + " On this table <strong>D is the included angle in degrees, not a diameter</strong>. LSPVE07 and LSPVE1 are each listed twice — the same reference and dimensions in a 90° and an 80° build — and both rows are reproduced exactly as printed. Quote the angle with the reference when ordering.",
    },
    faqs: [
      ["Why is LSPVE07 listed twice?", "Because the catalogue prints it twice — once at 90° and once at 80°, with identical DN, d, L and H. The reference alone does not distinguish them, so state the angle you need on the order."],
      ["Is D a diameter?", "No. On this table D is the included angle in degrees. The diameter columns here are DN, DN1 and d."],
      ["What is the 80° version for?", "The same purpose as the 80° bends in the pipeline range: it puts a slight fall into a horizontal run so it drains."],
    ],
    related: ["straight-through-valve", "three-way-valve", "bend-45", "drain-valve"],
    keywords: "borosilicate glass angle valve, 90 degree glass valve, 80 degree glass valve, LSPVE valve, glass corner isolation valve",
    featured: true,
  },

  {
    slug: "vent-valve",
    name: "Vent Valve",
    subtitle: "Glass vent valve, DN 15 to DN 40, Type A and Type B",
    image: img("vent"),
    drawing: img("vent"),
    alt: "Dimension schematic of a borosilicate glass vent valve Type A showing DN, D, d and L",
    desc: "Borosilicate glass vent valve for releasing or admitting air at the high point of a glass system — DN 15 to DN 40 in Type A and Type B builds.",
    long: [
      "A vent valve sits at the high point of a glass system and lets air out as it fills, or in as it drains. Without one, a closed glass line will either hold an air lock that stops flow, or pull a vacuum on drain-down that can stress the glass.",
      "The catalogue lists two builds. Type A covers DN 15, 25 and 40 under the LSPVL references; Type B covers DN 25 and 40 under LSPVLR. Every size shares the same small vent bore — D 11 mm and d 10 mm — because the vent only has to pass air, not process fluid.",
      "Note that this table has no DN1 and no H column: the vent valve is a single-connection item, so it is dimensioned by its line size DN and its overall length L only.",
    ],
    features: [
      "Type A (LSPVL) and Type B (LSPVLR) builds",
      "DN 15, 25 and 40 line connections",
      "Common vent bore across all sizes — D 11 mm, d 10 mm",
      "Length L 125 mm at DN 15, 150 mm at DN 25 and DN 40",
      "Borosilicate 3.3 body",
    ],
    advantages: [
      "Prevents air locks that stall flow in a filling line",
      "Prevents vacuum forming on drain-down, which stresses glass",
      ...GV_ADV.slice(0, 4),
    ],
    applications: [
      "High-point venting on glass pipelines",
      "Air admission on drain-down",
      "Column and receiver vents",
      "Breaking vacuum before opening a system",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass vent valve",
      "Nominal bore range": "DN 15 to DN 40",
      "Vent bore": "D 11 mm, d 10 mm — common to every size",
      "Length": "125 mm at DN 15; 150 mm at DN 25 and DN 40",
      "Builds": "Type A (LSPVL series) and Type B (LSPVLR series)",
      "Catalogue reference": "LSPVL / LSPVLR series, e.g. LSPVLR1 = DN 25 Type B",
    }),
    dim: {
      caption: "Vent Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "D", "d", "L", "Type"],
      rows: [
        ["LSPVL07", "15", "11", "10", "125", "A"],
        ["LSPVL1", "25", "11", "10", "150", "A"],
        ["LSPVL1.5", "40", "11", "10", "150", "A"],
        ["LSPVLR1", "25", "11", "10", "150", "B"],
        ["LSPVLR1.5", "40", "11", "10", "150", "B"],
      ],
      note: MM + " This table carries no DN1 and no H column — the vent valve is a single-connection item. The schematic shows the Type A build, which is the one drawn in the catalogue.",
    },
    faqs: [
      ["What is the difference between Type A and Type B?", "The catalogue separates them by reference — LSPVL is Type A, LSPVLR is Type B — and gives both the same DN, D, d and L. It does not describe the constructional difference, so tell us your duty and we will confirm which build suits it."],
      ["Why is the vent bore the same on every size?", "Because the vent only passes air, not process fluid. D 11 mm and d 10 mm are common to DN 15, 25 and 40."],
      ["Is there a DN 50 vent valve?", "The catalogue lists DN 15, 25 and 40 only. Ask us if you need a larger line vented."],
    ],
    related: ["straight-through-valve", "closure", "blind", "drain-valve"],
    keywords: "borosilicate glass vent valve, glass air vent, LSPVL valve, LSPVLR valve, high point vent glass pipeline",
  },

  {
    slug: "bottom-outlet-valve",
    name: "Bottom Outlet Valve",
    subtitle: "Glass bottom outlet valve, DN 40 and DN 50",
    image: img("bottom-outlet"),
    drawing: img("bottom-outlet"),
    alt: "Dimension schematic of a borosilicate glass bottom outlet valve showing DN, DN1, DN2, d, L, L1 and B",
    desc: "Borosilicate glass bottom outlet valve that prevents solids or liquid accumulating in a vessel's bottom outlet — for spherical or cylindrical vessels, DN 40 and DN 50.",
    long: [
      "The catalogue is explicit about what this valve is for: it <em>prevents the accumulation of solid or liquid in the bottom outlet of a vessel</em>, and it <em>can be incorporated in any spherical or cylindrical vessel</em>.",
      "That is the problem it solves. Fit an ordinary valve below a vessel's bottom nozzle and the nozzle plus the valve body above the closure form a pocket that never drains. Product sits there between batches, settles, degrades, and contaminates the next charge. A bottom outlet valve closes at the vessel floor instead, so there is no pocket to accumulate in.",
      "Two references are listed. Both share the same L, L1 and B, and both take a DN 25 bottom outlet (DN2) — what changes is the vessel connection DN and the side outlet DN1.",
    ],
    features: [
      "Closes at the vessel floor — no dead pocket below the outlet",
      "Fits any spherical or cylindrical vessel, per the catalogue",
      "Three connections: vessel DN, side outlet DN1, bottom outlet DN2",
      "DN 40 and DN 50 vessel connections, both with a DN 25 bottom outlet",
      "Common L 260 mm, L1 105 mm and B 190 mm across both sizes",
    ],
    advantages: [
      "Complete drainage between batches — no residue, no cross-contamination",
      "No dead leg for solids to settle in or product to degrade",
      ...GV_ADV.slice(0, 4),
    ],
    applications: [
      "Reactor and receiver bottom outlets",
      "Batch processing requiring complete drainage between charges",
      "Duties where settled solids would block a conventional outlet",
      "Bottom sampling from a glass vessel",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass bottom outlet valve",
      "Nominal bore range": "DN 40 and DN 50 vessel connection",
      "Bottom outlet (DN2)": "DN 25 on both sizes",
      "Overall length L": "260 mm",
      "Seat length L1": "105 mm",
      "Width across B": "190 mm",
      "Vessel compatibility": "Any spherical or cylindrical vessel",
      "Catalogue reference": "LSBAL series, e.g. LSBAL2 = DN 50",
    }),
    dim: {
      caption: "Bottom Outlet Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "DN1", "DN2", "d", "L", "L1", "B"],
      rows: [
        ["LSBAL1.5", "40", "25", "25", "26", "260", "105", "190"],
        ["LSBAL2", "50", "40", "25", "38", "260", "105", "190"],
      ],
      note: MM + " DN is the vessel connection, DN1 the side outlet and DN2 the bottom outlet. L, L1 and B are identical on both references.",
    },
    faqs: [
      ["What does this valve actually do?", "In the catalogue's own words, it prevents the accumulation of solid or liquid in the bottom outlet of a vessel. It seats at the vessel floor so there is no pocket below the outlet for product to sit in."],
      ["Can it be fitted to my vessel?", "The catalogue states it can be incorporated in any spherical or cylindrical vessel. Send us the vessel drawing and nozzle detail and we will confirm the arrangement."],
      ["Why is the bottom outlet DN 25 on both sizes?", "That is how the table is printed — DN2 is 25 for both LSBAL1.5 and LSBAL2. The vessel connection DN and side outlet DN1 are what change between them."],
    ],
    related: ["drain-valve", "straight-through-valve", "u-bend-bottom-outlet", "ptfe-lined-flush-bottom-valve"],
    keywords: "borosilicate glass bottom outlet valve, glass vessel outlet valve, LSBAL valve, flush bottom glass valve, reactor bottom outlet",
    featured: true,
  },

  {
    slug: "three-way-valve",
    name: "Three Way Valve",
    subtitle: "Glass three way valve, DN 25 to DN 50",
    image: img("three-way"),
    drawing: img("three-way"),
    alt: "Dimension schematic of a borosilicate glass three way valve showing DN, DN1, d, L, L1, L2 and H",
    desc: "Borosilicate glass three way valve for diverting flow between two routes without breaking the line — DN 25 to DN 50, with 80° and 10° branch options.",
    long: [
      "A three way valve sends flow down one of two paths from a single inlet, so a line can be switched between a receiver and a recycle leg, or between duty and standby equipment, without breaking a joint or fitting a second valve and a tee.",
      "Four dimensions are published for each size and all four are needed to set the valve out: L along the straight run, L1 and L2 locating the branch, and H to the top of the handwheel. The catalogue also notes that <em>DN is also available in 80° and 10°</em>, so the branch angle can be varied from the standard build.",
      "Three references cover DN 25 to DN 50, all full-bore — DN and DN1 are equal on every row.",
    ],
    features: [
      "Diverts flow between two routes from one inlet",
      "Full bore — DN and DN1 equal on every size",
      "Branch also available in 80° and 10°, per the catalogue note",
      "Four setting-out dimensions published: L, L1, L2 and H",
      "DN 25 to DN 50, borosilicate 3.3 with PTFE spindle",
    ],
    advantages: [
      "One valve instead of two plus a tee — fewer joints and less glass to support",
      "Switch routes without breaking the line",
      ...GV_ADV.slice(0, 4),
    ],
    applications: [
      "Diverting between receivers on a distillation train",
      "Duty and standby equipment changeover",
      "Recycle and product take-off selection",
      "Sampling without interrupting the main flow",
    ],
    industries: GV_INDUSTRIES,
    spec: SPEC({
      "Product type": "Glass three way valve",
      "Nominal bore range": "DN 25 to DN 50, full bore",
      "Face to face L": "180 mm to 250 mm",
      "Branch angle": "Standard build; also available in 80° and 10°",
      "Catalogue reference": "LSPVT series, e.g. LSPVT1.5 = DN 40",
    }),
    dim: {
      caption: "Three Way Valve — dimensions",
      cols: ["Cat. Ref.", "DN", "DN1", "d", "L", "L1", "L2", "H"],
      rows: [
        ["LSPVT1", "25", "25", "18", "180", "170", "100", "175"],
        ["LSPVT1.5", "40", "40", "26", "220", "215", "150", "200"],
        ["LSPVT2", "50", "50", "38", "250", "250", "150", "220"],
      ],
      note: MM + " The catalogue adds a note to this table: “dn is also available in 80° &amp; 10°”, reproduced here as printed.",
    },
    faqs: [
      ["What do L1 and L2 measure?", "They locate the branch relative to the straight run — L1 down the branch and L2 along the run to it. Both are needed with L and H to set the valve out in an isometric."],
      ["Can the branch angle be changed?", "Yes. The catalogue notes the item is also available in 80° and 10°. State the angle you need on the enquiry."],
      ["Is it full bore?", "Yes — DN and DN1 are equal on all three references, so the branch is the same size as the run."],
    ],
    related: ["straight-through-valve", "angle-valve", "y-piece", "equal-tee"],
    keywords: "borosilicate glass three way valve, glass diverter valve, LSPVT valve, glass changeover valve, DN 50 three way glass valve",
  },
];
