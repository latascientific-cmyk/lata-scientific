/* =========================================================
   LATA SCIENTIFIC — pilot plant series (LSPPS).

   Transcribed from the supplied "PILOT PLANT SERIES" catalogue
   page. Two reactors are published there, each with its own
   four-column table (Volume / Temp / Pressure / Wetted Material),
   plus shared notes on agitation and on heating and cooling.

   ⚠️  The catalogue prints the high-pressure reactor's wetted
   material as "Glass/PTEF" — a typo for PTFE. It is given as PTFE
   here; nothing else on the page is altered.
   ========================================================= */

const PP_INDUSTRIES = [
  "Pharmaceutical", "Chemical processing", "Fine chemicals &amp; dyes",
  "Agrochemicals", "Research &amp; development", "Pilot plant",
  "Specialty chemicals",
];

/* Printed once on the catalogue page, applies to both reactors. */
const AGITATION = "Lower to higher Reynolds mixing — anchor type, tubular type, propeller type and others, selected for the duty";
const HEATING = "Heating mantles, oil bath, thermic fluid, steam or hot condensate through a glass jacket or glass coils";

export const pilotPlant = [
  {
    slug: "apps-chemical-reactor",
    name: "LSPPS Chemical Reactor",
    image: "assets/img/products/apps-chemical-reactor.svg",
    drawing: "assets/img/products/apps-chemical-reactor.svg",
    alt: "Assembly schematic of an LSPPS pilot plant chemical reactor with jacketed glass vessel, stirrer, condenser and receiver",
    subtitle: "See-through pilot plant reactor, 15 L to 250 L",
    desc: "Pilot plant reaction assembly with a see-through borosilicate glass or glass lined steel vessel — 15 L to 250 L, −25 °C to +200 °C, full vacuum to +0.5 bar.",
    long: [
      "Ablaze pilot plant reactors are equipped with see-through reaction vessels made of borosilicate glass or glass lined steel. Contrary to conventional reaction vessels, the glass used for the upper section enables the chemist to observe the process taking place inside. It also prevents residues from adhering on to the smooth, unheated glass surface.",
      "The reactor is supplied as a working assembly rather than a bare vessel. Stirrer, condenser, reflux divider and feed arrangement are fitted as the duty requires, and further attachments are available for distillation. Instrumentation — pH controller, temperature controller and a speed regulator for the stirrer — is part of the same single-window supply.",
      "The vision behind the LSPPS range is to provide a single window source for all equipment and instrumentation of the highest quality, for research and development as well as for pilot plants. The range is also available in spherical vessel options and with auto control.",
    ],
    features: [
      "See-through reaction vessel — the chemist watches the process, not a gauge",
      "Unheated, smooth glass upper section that residues do not adhere to",
      "Borosilicate glass vessel, or glass lined steel for the higher capacities",
      "Stirrer, condenser, reflux divider and feed arrangement fitted to the duty",
      "pH controller, temperature controller and stirrer speed regulator",
      "Further attachments available for distillation",
      "Spherical vessel options available",
      "Available with auto control",
    ],
    advantages: [
      "Single window source for the whole assembly — vessel, attachments and instrumentation",
      "Process visibility that a steel reactor cannot give",
      "Full vacuum through +0.5 bar on one vessel",
      "Wide thermal window, −25 °C to +200 °C",
      "Glass lined steel available where capacity rules out plain glass",
      "Agitator selected for the actual mixing regime rather than fitted as standard",
    ],
    applications: [
      "Process development and scale-up from lab to plant",
      "Pilot batch manufacture of fine chemicals and intermediates",
      "Reactions requiring visual observation of colour, phase or solids",
      "Distillation duty, using the available attachments",
      "Crystallization and solvent exchange at pilot scale",
      "Corrosive service where a metal wetted path is unacceptable",
    ],
    industries: PP_INDUSTRIES,
    spec: [
      ["Product type", "Pilot plant chemical reactor assembly"],
      ["Volume", "15 to 250 litres"],
      ["Temperature", "−25 °C to +200 °C"],
      ["Pressure", "+0.5 bar to full vacuum"],
      ["Wetted material", "Borosilicate glass; glass lined steel for higher capacity"],
      ["Vessel options", "Cylindrical or spherical; auto control available"],
      ["Agitation", AGITATION],
      ["Heating and cooling", HEATING],
      ["Instrumentation", "pH controller, temperature controller, stirrer speed regulator"],
      ["Attachments", "Stirrer, condenser, reflux divider, feed arrangement; distillation attachments available"],
      ["Catalogue reference", "LSPPS Chemical Reactor"],
    ],
    dim: {
      caption: "LSPPS Chemical Reactor — operating conditions",
      cols: ["Volume", "Temp", "Pressure", "Wetted Material"],
      rows: [
        ["15 to 250 Ltrs.", "−25 to +200 °C", "+0.5 bar to Full Vacuum", "glass / glass lined steel for higher capacity"],
      ],
      note: "Transcribed exactly from the catalogue table. The page adds that this is also available in spherical options and with auto control.",
    },
    options: [
      "Spherical vessel in place of cylindrical",
      "Auto control package",
      "Distillation attachments",
      "Reflux divider and feed arrangement",
      "pH controller, temperature controller and stirrer speed regulator",
      "Anchor, tubular or propeller agitator to suit the mixing duty",
      "Heating by mantle, oil bath, thermic fluid, steam or hot condensate through jacket or coils",
    ],
    faqs: [
      ["Why a glass upper section rather than all steel?", "Two reasons the catalogue gives directly: the chemist can observe the process taking place inside, and residues do not adhere to the smooth, unheated glass surface the way they do to a heated steel wall."],
      ["What sizes are available?", "15 to 250 litres. Borosilicate glass is used for the vessel, with glass lined steel offered for the higher capacities in the range."],
      ["What pressure and temperature can it take?", "+0.5 bar down to full vacuum, over −25 °C to +200 °C. If you need to react at higher pressure, that is the LSPPS High Pressure Reactor in Glass instead — or a metal reactor for very high pressure."],
      ["Which agitator do I get?", "Whichever suits the mixing regime. The range covers lower to higher Reynolds mixing with anchor, tubular and propeller types among others — tell us the viscosity and the duty."],
      ["How is it heated?", "Through heating mantles, oil bath, thermic fluid, steam or hot condensate passed through a glass jacket or glass coils."],
    ],
    related: ["apps-high-pressure-glass-reactor", "rotary-evaporator", "shell-and-tube-heat-exchanger", "glass-to-metal-adaptor-plate"],
    keywords: "pilot plant reactor, LSPPS chemical reactor, glass reactor, see through reaction vessel, glass lined steel reactor, 250 litre pilot reactor, borosilicate reactor, pilot plant series",
    featured: true,
  },

  {
    slug: "apps-high-pressure-glass-reactor",
    name: "LSPPS High Pressure Reactor in Glass",
    image: "assets/img/products/apps-high-pressure-glass-reactor.svg",
    drawing: "assets/img/products/apps-high-pressure-glass-reactor.svg",
    alt: "Assembly schematic of an LSPPS high pressure glass reactor with bolted closure, stirrer drive and pressure gauge",
    subtitle: "Glass reactor for pressure duty, 1 L to 5 L",
    desc: "High pressure reaction vessel in glass for duty a normal glass reactor cannot hold — 1 to 5 litres, −5 °C to +150 °C, up to +5 bar, with only glass and PTFE wetted.",
    long: [
      "The Ablaze high-pressure reactor is used to carry out reaction at higher pressure, which is generally not possible with a normal glass reactor. It keeps the visibility of a glass vessel at a pressure the standard pilot plant reactor is not rated for.",
      "The range covers 1 to 5 litres at up to +5 bar, over −5 °C to +150 °C. Only glass and PTFE come into contact with the process, so the chemistry sees an inert wetted path throughout.",
      "Where the reaction needs pressure beyond this, metal reactors are also available to complement the range at very high pressure.",
    ],
    features: [
      "Carries out reaction at pressure a normal glass reactor cannot hold",
      "Up to +5 bar, 1 to 5 litre working volume",
      "Wetted path is glass and PTFE only",
      "−5 °C to +150 °C operating window",
      "Retains the process visibility of a glass vessel under pressure",
      "Metal reactors available alongside for very high pressure duty",
    ],
    advantages: [
      "Pressure reactions stay visible instead of disappearing into an autoclave",
      "Inert wetted path — no metal in contact with the batch",
      "Bridges the gap between an atmospheric glass reactor and a metal pressure vessel",
      "Same agitation and heating options as the rest of the pilot plant range",
    ],
    applications: [
      "Reactions requiring moderate positive pressure at pilot scale",
      "Pressure duty on corrosive media where metal is unacceptable",
      "Process development where the reaction must remain observable",
      "Small-batch specialty and fine chemical synthesis under pressure",
    ],
    industries: PP_INDUSTRIES,
    spec: [
      ["Product type", "High pressure reactor in glass"],
      ["Volume", "1 to 5 litres"],
      ["Temperature", "−5 °C to +150 °C"],
      ["Pressure", "up to +5 bar"],
      ["Wetted material", "Glass / PTFE"],
      ["Agitation", AGITATION],
      ["Heating and cooling", HEATING],
      ["Higher pressure duty", "Metal reactors available for reactions at very high pressure"],
      ["Catalogue reference", "LSPPS High Pressure Reactor in Glass"],
    ],
    dim: {
      caption: "LSPPS High Pressure Reactor in Glass — operating conditions",
      cols: ["Volume", "Temp.", "Pressure", "Wetted Material"],
      rows: [
        ["1 to 5 Ltrs.", "−5 to +150 °C", "up to +5 bar", "Glass / PTFE"],
      ],
      note: "Transcribed exactly from the catalogue table. The catalogue sets the wetted material as “Glass/PTEF”, which is a typographical error for PTFE. Metal reactors are also available to complement reactions at very high pressure.",
    },
    options: [
      "Anchor, tubular or propeller agitator to suit the mixing duty",
      "Heating by mantle, oil bath, thermic fluid, steam or hot condensate through jacket or coils",
      "Metal reactor for pressure beyond +5 bar",
    ],
    faqs: [
      ["How is this different from the standard pilot plant reactor?", "Pressure. The LSPPS Chemical Reactor runs from full vacuum to +0.5 bar; this one carries out reaction at higher pressure — up to +5 bar — which the catalogue notes is generally not possible with a normal glass reactor."],
      ["What touches the process?", "Glass and PTFE only. There is no metal in the wetted path."],
      ["What if I need more than 5 bar?", "Metal reactors are available for reactions at very high pressure. Send us the pressure, temperature and media and we will tell you which side of the line your duty falls."],
      ["What sizes does it come in?", "1 to 5 litres, over −5 °C to +150 °C."],
    ],
    related: ["apps-chemical-reactor", "rotary-evaporator", "glass-to-metal-adaptor-plate", "line-bellow"],
    keywords: "high pressure glass reactor, LSPPS high pressure reactor, 5 bar glass reactor, pressure reaction vessel glass, PTFE wetted reactor, pilot plant high pressure reactor",
  },
];
