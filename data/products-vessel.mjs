/* =========================================================
   LATA SCIENTIFIC — spherical vessels.

   Every table below is transcribed row-for-row from the supplied catalogue
   pages: "SPHERICAL VESSEL - GENERAL DATA", "SPHERICAL VESSEL WITH SINGLE
   NECK" (AVSA series) and "SPHERICAL VESSEL WITH THREE NECK & BOTTOM OUTLET"
   (AVSM series). Catalogue references are the catalogue's own.

   ⚠️  The one rating the catalogue does publish for this range is maximum
   pressure, in the general data table — it FALLS as capacity rises, from
   1.0 bar at 5 L to 0.2 bar at 200 L. That figure is reproduced exactly and
   nothing beyond it is claimed. No temperature rating is printed, so none is
   given. Material is borosilicate 3.3, this site's stated house standard for
   glass components.

   The general data applies to every vessel in the range regardless of neck
   arrangement, so it is shown once on the category page as an engineering
   reference rather than repeated per build.

   All dimensions are in mm; capacities in litres and pressures in bar as
   printed.
   ========================================================= */

const MM = "All dimensions in mm, transcribed exactly from the catalogue page.";

/* ---------- shared reference table (category page) ---------- */
export const SPHERICAL_GENERAL_DATA = {
  caption: "Spherical vessel — general data",
  cols: ["Nominal Capacity (Ltrs.)", "Bulb Cap (Ltrs.)", "Working Cap (Ltrs.)", "Maximum Pressure (Bar)"],
  rows: [
    ["5", "5", "4", "1.0"],
    ["10", "10", "9", "0.7"],
    ["20", "21", "20", "0.6"],
    ["50", "62", "58", "0.4"],
    ["100", "118", "111", "0.3"],
    ["200", "212", "200", "0.2"],
  ],
  note: "Transcribed exactly from the catalogue's general data page. It governs both neck builds — the figures depend on capacity, not on the neck arrangement. Note that <strong>bulb capacity and working capacity are not the same as the nominal size</strong>, and that <strong>maximum pressure falls as capacity rises</strong>, from 1.0 bar at 5 L to 0.2 bar at 200 L. Size the vessel on the working capacity, and check the pressure figure against your duty.",
};

const VESSEL_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Distillation &amp; solvent recovery", "Water &amp; effluent treatment",
  "Agrochemicals", "Research &amp; pilot plant",
];

export const vessels = [
  {
    slug: "spherical-vessel",
    name: "Spherical Vessel",
    subtitle: "Borosilicate spherical vessel, 5 L to 200 L",
    image: "assets/img/products/spherical-vessel-photo.jpg",
    drawing: "assets/img/products/spherical-vessel.svg",
    alt: "Dimension schematic of a borosilicate spherical vessel in both catalogue builds — single neck with DN and overall height L, and three neck with bottom outlet showing DN, DN1, DN2 and L",
    photoAlt: "Borosilicate spherical vessel with three necks, graduated to 10 litres, shown on a Lata Scientific product information sheet",
    desc: "Borosilicate spherical vessel from 5 to 200 litres, in a single neck build and a three neck build with bottom outlet — for reaction, receiving and storage duty on a glass plant.",
    long: [
      "The sphere is the strongest shape glass can be blown into, and it is why the vessels in this range hold more pressure for their wall thickness than any cylindrical equivalent. There is no corner to concentrate stress and no flat end to bow, so the load spreads evenly through the whole wall. That is also why the catalogue's maximum pressure figure falls as the vessels get bigger — the same wall has to carry a much larger sphere.",
      "Two builds are listed. The <strong>single neck</strong> vessel (AVSA series) is the simpler item: one top connection, used as a receiver, a feed vessel or a storage bulb. The <strong>three neck with bottom outlet</strong> vessel (AVSM series) is the process build — a large centre neck for the main connection, two smaller necks for a charge line, a thermometer pocket, a reflux return or an instrument, and a bottom outlet to empty the vessel completely rather than pumping it out through the top.",
      "Read the general data table before the dimension tables. Nominal capacity is the range name, but <em>bulb capacity</em> and <em>working capacity</em> are the figures that matter in practice: a 50 L vessel has a 62 L bulb and 58 L of working volume, and a 200 L vessel works at exactly 200 L against a 212 L bulb. Size the vessel on working capacity and confirm the pressure figure for that size against your duty.",
      "Both builds share the same six nominal sizes — 5, 10, 20, 50, 100 and 200 litres — so the general data applies to either. What changes between them is overall height L and the neck arrangement: the AVSM build is taller at every size because the bottom outlet adds to the overall height.",
    ],
    features: [
      "Spherical body — the strongest form for a glass pressure vessel",
      "Six nominal sizes from 5 L to 200 L, common to both builds",
      "Single neck build (AVSA) and three neck with bottom outlet build (AVSM)",
      "Bottom outlet on the AVSM build empties the vessel completely",
      "Maximum pressure published for every size, 1.0 bar at 5 L to 0.2 bar at 200 L",
      "Borosilicate 3.3 throughout — fully transparent, the batch stays visible",
    ],
    advantages: [
      "Even stress distribution — no corners or flat ends to concentrate load",
      "The whole batch is visible: colour, phase separation and level, without instrumentation",
      "Inert to almost all process media; no metal in the wetted path",
      "Bolts into the borosilicate pipeline range on the same beaded ends and backing flanges",
      "Smooth internal surface resists fouling and cleans down between batches",
      "Bottom outlet build drains without a transfer pump and leaves no residual heel to speak of",
    ],
    applications: [
      "Reaction and receiving vessels on a glass process line",
      "Distillate receivers under a fractionating column",
      "Feed and charge vessels for a pilot plant train",
      "Solvent recovery and intermediate storage",
      "Batch processes that must stay visible from charge to discharge",
      "Corrosive acid, alkali and solvent service where metal is unacceptable",
    ],
    industries: VESSEL_INDUSTRIES,
    spec: [
      ["Product type", "Borosilicate spherical vessel"],
      ["Material", "Borosilicate 3.3"],
      ["Nominal capacity range", "5 L to 200 L in six sizes"],
      ["Working capacity range", "4 L to 200 L — see the general data table"],
      ["Maximum pressure", "1.0 bar at 5 L, falling to 0.2 bar at 200 L"],
      ["Builds", "Single neck (AVSA series); three neck with bottom outlet (AVSM series)"],
      ["Neck size range", "DN 40 to DN 225, capacity dependent"],
      ["Side neck / outlet sizes", "DN 25 or DN 40 on the AVSM build, capacity dependent"],
      ["Overall height", "300 mm to 1000 mm single neck; 425 mm to 1175 mm three neck"],
      ["End connection", "Beaded glass ends with backing flanges and PTFE-envelope gaskets"],
      ["Flange drilling", "See the drilling table — BS 10 Table E, BS 10 Table F and ASA drilling available"],
      ["Temperature rating", "Not published on the catalogue page — confirm with us for your duty"],
      ["Catalogue reference", "AVSA series (single neck), AVSM series (three neck &amp; bottom outlet)"],
    ],
    dim: {
      caption: "Spherical Vessel with Single Neck — dimensions",
      cols: ["Cat. Ref.", "Nominal Capacity", "L", "DN"],
      rows: [
        ["AVSA5", "5 L", "300", "40"],
        ["AVSA10", "10 L", "375", "40"],
        ["AVSA20", "20 L", "450", "80"],
        ["AVSA50", "50 L", "650", "100"],
        ["AVSA100", "100 L", "750", "150"],
        ["AVSA200", "200 L", "1000", "225"],
      ],
      note: MM + " L is the overall height and DN the single top neck. The left-hand view on the drawing is this build.",
    },
    matTable: {
      caption: "Spherical Vessel with Three Neck &amp; Bottom Outlet — dimensions",
      cols: ["Cat. Ref.", "Nominal Capacity", "L", "DN", "DN1", "DN2"],
      rows: [
        ["AVSM5", "5 L", "425", "40", "25", "25"],
        ["AVSM10", "10 L", "500", "40", "25", "25"],
        ["AVSM20", "20 L", "575", "80", "25", "25"],
        ["AVSM50", "50 L", "825", "100", "40", "40"],
        ["AVSM100", "100 L", "925", "150", "40", "40"],
        ["AVSM200", "200 L", "1175", "225", "40", "40"],
      ],
      note: MM + " L is the overall height and DN the centre neck. DN1 and DN2 are the smaller connections, and the catalogue prints them with <strong>identical values on every row</strong> — 25 mm up to 20 L and 40 mm from 50 L up. The right-hand view on the drawing shows the arrangement; state which connection you need each size on when ordering. This build is taller than the single neck vessel at every capacity because the bottom outlet adds to the overall height.",
    },
    faqs: [
      ["What is the difference between nominal, bulb and working capacity?", "Nominal capacity is the size the vessel is sold as. Bulb capacity is the volume the sphere actually holds, and working capacity is what you can use — 58 L on a 50 L vessel, 111 L on a 100 L. All three are printed in the general data table on the category page. Size on working capacity."],
      ["Why does the maximum pressure fall as the vessel gets bigger?", "Because the same wall has to carry a much larger sphere. The catalogue publishes 1.0 bar at 5 L and 0.2 bar at 200 L, and every size in between. Check the figure for your size against your duty before ordering."],
      ["Which build should I specify?", "The single neck AVSA build is a receiver, feed or storage vessel. The three neck AVSM build is the process build — centre neck for the main connection, two smaller necks for charging, instrumentation or reflux, and a bottom outlet to drain it. If you need to empty the vessel completely, you need the bottom outlet."],
      ["Is there a valve for the bottom outlet?", "Yes — the Bottom Outlet Valve in the Glass Valves range is made for exactly this. The catalogue notes it can be incorporated in any spherical or cylindrical vessel, and it seats at the vessel floor so nothing accumulates in the outlet."],
      ["What temperature can it run at?", "The catalogue page for this range is dimensional apart from the pressure column, and publishes no temperature figure, so we do not quote one. Send us your duty and we will confirm it against the drawing."],
    ],
    related: ["triple-wall-jacket", "bottom-outlet-valve", "pipe-section", "apps-chemical-reactor"],
    keywords: "borosilicate spherical vessel, glass spherical vessel, AVSA single neck vessel, AVSM three neck bottom outlet vessel, 5 to 200 litre glass vessel, glass reaction vessel, glass receiver vessel",
    featured: true,
  },

  /* ⚠️  No dimension drawing has been supplied for this item yet, so it carries
     no `dim` table and no `drawing`. Everything below is taken from the supplied
     product photograph and its own printed copy, or is a description of what
     triple wall construction is — no capacity, bore, pressure or temperature
     figure is claimed. Add `drawing` + `dim` when the drawing arrives and the
     dimension section appears automatically, exactly as on every other product. */
  {
    slug: "triple-wall-jacket",
    name: "Triple Wall Jacket",
    subtitle: "Triple wall jacketed glass vessel for heating, cooling and mixing",
    image: "assets/img/products/triple-wall-jacket-photo.jpg",
    alt: "Triple wall jacketed borosilicate glass vessel graduated to 50 litres, with a bolted top flange, stirrer shaft, bottom outlet valve and stainless steel support frame",
    desc: "Triple wall jacketed borosilicate glass vessel — an inner process chamber, an intermediate jacket for the heat transfer fluid and an outer insulating wall, for heating, cooling and mixing duty in laboratory and industrial processes.",
    long: [
      "A jacketed vessel is how a process gets held at temperature. Heat transfer fluid circulates in a jacket around the process chamber, so the batch is heated or cooled through the vessel wall itself rather than by an external bath — the whole charge sees the same wall temperature, and the rate is set by the fluid, not by how the vessel happens to be sitting.",
      "The <strong>triple wall</strong> build adds a third, outer wall around that jacket. The annulus between the jacket and the outer wall is the insulation: it cuts the heat the jacket loses to the room, so the circulator holds temperature with less work and the process stays stable. It also keeps the outside of the vessel closer to room temperature — which on cold duty is what stops the outer surface fogging or frosting over and hiding the batch from the operator.",
      "That is the practical argument for the third wall. A twin wall jacketed vessel run at low temperature ices up and you lose the one thing glass was chosen for: being able to see what is happening. A triple wall vessel stays clear.",
      "In the supplier's own words, this is a <em>high quality borosilicate glass vessel with jacketed design, ideal for heating, cooling and mixing applications in laboratory and industrial processes, built for performance, durability and long lasting use</em>. The unit shown is graduated to 50 litres and is supplied complete with its bolted top flange and nozzles, stirrer shaft and impellers, a bottom outlet valve and a stainless steel support frame.",
    ],
    features: [
      "Three concentric borosilicate walls — process chamber, heat transfer jacket, outer insulating annulus",
      "Heating, cooling and mixing duty from one vessel",
      "Outer wall insulates the jacket, so temperature holds with less circulator load",
      "Stays clear on cold duty — no fogging or frosting of the outer surface",
      "Graduated body, so the charge can be read off directly",
      "Bolted top flange with multiple nozzles for stirrer, charging, instrumentation and reflux",
      "Bottom outlet valve — the vessel drains completely rather than being pumped out",
      "Supplied on a stainless steel support frame",
    ],
    advantages: [
      "Strong and durable — high strength construction for long lasting use",
      "Precisely engineered for consistent performance and reliable results",
      "Corrosion resistant to a wide range of chemicals, for extended service life",
      "Easy to install, with secure and reliable connections",
      "Tested for reliability in demanding laboratory and industrial environments",
      "Fully transparent: the batch stays visible from charge to discharge",
    ],
    applications: [
      "Temperature-controlled reaction and synthesis",
      "Heating, cooling and mixing of process batches",
      "Crystallisation and other duties needing a controlled cooling ramp",
      "Low temperature work where an uninsulated jacket would frost over",
      "Pilot and kilo-lab scale-up ahead of plant",
      "Any process that must be held at temperature and stay visible",
    ],
    industries: VESSEL_INDUSTRIES,
    spec: [
      ["Product type", "Triple wall jacketed glass vessel"],
      ["Material", "Borosilicate 3.3"],
      ["Wall construction", "Three concentric walls — inner process chamber, intermediate heat transfer jacket, outer insulating annulus"],
      ["Duty", "Heating, cooling and mixing"],
      ["Unit shown", "Graduated to 50 litres, with bolted top flange, stirrer shaft, bottom outlet valve and stainless steel support frame"],
      ["Capacity", "Built to order — tell us your working volume"],
      ["Jacket service connections", "Confirm with us for your circulator and heat transfer fluid"],
      ["Pressure rating", "Not published for this item — confirm with us for your duty"],
      ["Temperature rating", "Not published for this item — confirm with us for your duty"],
      ["Dimensions", "Supplied on the general arrangement drawing for your capacity — request it with your enquiry"],
    ],
    faqs: [
      ["What does the third wall actually do?", "It insulates. The annulus between the jacket and the outer wall cuts the heat the jacket loses to the room, so the circulator holds temperature with less work — and it keeps the outer surface near room temperature, which is what stops the vessel fogging or frosting over on cold duty."],
      ["Why not just use a twin wall jacketed vessel?", "For ambient and warm duty, you often can. The triple wall earns its place at low temperature: a twin wall vessel ices up on the outside and you lose visibility of the batch, which is usually the reason glass was specified in the first place."],
      ["What capacities are available?", "It is built to order. The unit shown is graduated to 50 litres; tell us your working volume and duty and we will confirm the build."],
      ["What are the dimensions?", "Dimensions come on the general arrangement drawing for your capacity rather than from a standard table, because the vessel is made to order. Send us your requirement and we will issue the drawing with the quotation."],
      ["Can it be supplied with the frame and the drive?", "The unit shown is supplied complete with its stainless steel support frame, stirrer shaft and impellers, bolted top flange and bottom outlet valve. Tell us what agitation and instrumentation you need and we will quote the assembly."],
    ],
    related: ["spherical-vessel", "apps-chemical-reactor", "apps-high-pressure-glass-reactor", "bottom-outlet-valve"],
    keywords: "triple wall jacket, triple wall jacketed glass vessel, jacketed reaction vessel, borosilicate jacketed vessel, insulated jacketed glass reactor, heating cooling mixing vessel, 50 litre jacketed vessel",
    featured: true,
  },
];
