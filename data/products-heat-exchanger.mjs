/* =========================================================
   LATA SCIENTIFIC — shell & tube heat exchanger (RGG/RMG series).

   Transcribed from the supplied "HEAT EXCHANGER — DIMENSION DETAIL
   OF SHELL & TUBE HEAT EXCHANGER" catalogue page.

   The catalogue prints this table with one COLUMN per model and one
   ROW per dimension. It is transposed here to one row per model,
   which is how every other table on this site reads and what lets it
   scroll cleanly on a phone. No value is changed by the transpose.

   The catalogue groups the twelve models into three shells — 150 DN
   (6"), 225 DN (9") and 300 DN (12") — and the reference is formed as
   shell inch / heat transfer area m². So 9/12 is a 9" shell with
   12 m² of area.

   ⚠️  Two facts are printed as notes on the page and are reproduced
   as such: tube diameter is 14 mm, and nozzles can be changed as per
   the client's requirement.
   ========================================================= */

const MM = "All dimensions in mm, transcribed from the catalogue page and transposed to one row per model.";

export const heatExchangers = [
  {
    slug: "shell-and-tube-heat-exchanger",
    name: "Shell & Tube Heat Exchanger",
    image: "assets/img/products/shell-and-tube-heat-exchanger-photo.jpg",
    drawing: "assets/img/products/shell-and-tube-heat-exchanger.svg",
    alt: "Dimension schematic of a shell and tube heat exchanger with baffled tube bundle, showing DN, DN1 to DN4 and L",
    subtitle: "RGG / RMG series, 3 m² to 25 m²",
    desc: "Shell and tube heat exchanger in twelve models from 3 m² to 25 m² across 150, 225 and 300 DN shells — 14 mm tubes, with nozzles changed to the client's requirement.",
    long: [
      "The glass shell and tube heat exchanger is a recent development in the range. It can be used for condensation of vapours, vapourisation, and cooling and heating of liquid, and it is available in various combinations of glass, metal and FRP in the shell or the tube. Process fluid passes through a bundle of tubes while the service fluid circulates in the shell around them, with baffles directing the shell-side flow across the bundle instead of straight along it.",
      "The range covers twelve models on three shell sizes. A 150 DN (6\") shell carries 37 tubes and gives 3 to 6 m²; a 225 DN (9\") shell carries 73 tubes for 6 to 12 m²; a 300 DN (12\") shell carries 151 tubes for 12 to 25 m². Within each shell, area is increased by lengthening the exchanger rather than widening it — which is why L runs from 2500 mm at the smallest model to 4550 mm at the largest.",
      "The catalogue reference reads directly as shell size over area: <strong>RGG/RMG 9/12</strong> is a 9-inch shell with 12 m² of heat transfer area. Tube diameter is 14 mm throughout, and the baffle count rises with length so shell-side velocity is maintained as the exchanger gets longer.",
    ],
    features: [
      "Twelve models from 3 m² to 25 m² of heat transfer area",
      "Three shell sizes — 150 DN, 225 DN and 300 DN",
      "37, 73 or 151 tubes depending on shell size",
      "14 mm tube diameter throughout the range",
      "Baffle count from 5 to 23, rising with exchanger length",
      "Nozzles can be changed as per the client's requirement",
      "Four nozzle connections — DN1 through DN4 — on every model",
    ],
    advantages: [
      "Large transfer area in a compact shell — 25 m² inside a 300 DN body",
      "Baffled shell side drives cross-flow over the bundle for a better transfer coefficient",
      "Area is increased by length, so the plot footprint barely changes across a shell size",
      "Nozzle sizes and positions adapted to the client's pipework rather than fixed",
      "Overlapping ranges — 6 m² and 12 m² are each available on two shell sizes, so the choice can be made on pressure drop rather than area alone",
    ],
    applications: [
      "Condensing overheads from a distillation column",
      "Heating or cooling a process stream against steam, water or thermic fluid",
      "Interchanger duty between feed and product streams",
      "Solvent recovery and vapour condensing",
      "Reactor jacket and reflux cooling service",
    ],
    industries: [
      "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
      "Distillation &amp; solvent recovery", "Petrochemical",
      "Agrochemicals", "Water &amp; effluent treatment",
    ],
    spec: [
      ["Product type", "Shell and tube heat exchanger"],
      ["Model range", "RGG/RMG 6/3 to 12/25 — twelve models"],
      ["Heat transfer area", "3 m² to 25 m²"],
      ["Shell sizes", "150 DN (6\"), 225 DN (9\") and 300 DN (12\")"],
      ["Number of tubes", "37 (150 DN), 73 (225 DN), 151 (300 DN)"],
      ["Tube diameter", "14 mm"],
      ["Number of baffles", "5 to 23, depending on model"],
      ["Overall length", "2500 mm to 4550 mm"],
      ["Nozzles", "DN1 to DN4; can be changed as per client's requirement"],
      ["Catalogue reference", "RGG / RMG series — shell inch / area m²"],
    ],
    dim: {
      caption: "Shell &amp; Tube Heat Exchanger — dimension detail",
      cols: [
        "Cat. Ref. (RGG/RMG)", "Area (m²)", "DN", "DN1", "DN2", "DN3", "DN4",
        "H1", "H2", "L", "L1", "L2", "L3", "C", "C1", "C2", "T", "E",
        "No. of tubes", "No. of baffles",
      ],
      rows: [
        ["6/3", "3", "150", "80", "50", "25", "50", "175", "125", "2500", "1900", "1600", "1990", "250", "125", "125", "300", "50", "37", "11"],
        ["6/4", "4", "150", "80", "50", "25", "50", "175", "125", "3100", "2500", "2200", "2590", "250", "125", "125", "300", "50", "37", "15"],
        ["6/5", "5", "150", "80", "50", "25", "50", "175", "125", "3700", "3100", "2800", "3190", "250", "125", "125", "300", "50", "37", "19"],
        ["6/6", "6", "150", "80", "50", "25", "50", "175", "125", "4300", "3700", "3400", "3790", "250", "125", "125", "300", "50", "37", "23"],
        ["9/6", "6", "225", "100", "50", "40", "50", "250", "200", "2620", "1900", "1450", "2000", "300", "175", "125", "450", "60", "73", "7"],
        ["9/8", "8", "225", "100", "50", "40", "50", "250", "200", "3220", "2500", "2050", "2600", "300", "175", "125", "450", "60", "73", "9"],
        ["9/10", "10", "225", "100", "50", "40", "50", "250", "200", "3820", "3100", "2650", "3200", "300", "175", "125", "450", "60", "73", "13"],
        ["9/12", "12", "225", "100", "50", "40", "50", "250", "200", "4520", "3800", "3350", "3900", "300", "175", "125", "450", "60", "73", "17"],
        ["12/12", "12", "300", "150", "80", "40", "50", "300", "250", "2550", "1800", "1350", "1930", "300", "225", "75", "450", "75", "151", "5"],
        ["12/16", "16", "300", "150", "80", "40", "50", "300", "250", "3150", "2400", "1950", "2530", "300", "225", "75", "450", "75", "151", "7"],
        ["12/21", "21", "300", "150", "80", "40", "50", "300", "250", "3950", "3200", "2750", "3330", "300", "225", "75", "450", "75", "151", "9"],
        ["12/25", "25", "300", "150", "80", "40", "50", "300", "250", "4550", "3800", "3350", "3930", "300", "225", "75", "450", "75", "151", "11"],
      ],
      note: MM + " The catalogue prints this table with one column per model; it is transposed here to one row per model, with no value altered. Two notes are printed on the page and apply to every model: <strong>tube diameter is 14 mm</strong>, and <strong>nozzles can be changed as per client's requirement</strong>. DN, DN1 to DN4, H1, H2, C, C1, C2, T, E, the tube count and the shell size are constant within each shell group; L, L1, L2, L3 and the baffle count vary by model.",
    },
    options: [
      "Nozzle sizes and orientation changed to suit the client's pipework",
      "Area selected across shell sizes — 6 m² and 12 m² are each available on two shells",
      "Shell and tube available in various combinations of glass, metal and FRP",
      "PTFE bellow on all nozzles — recommended accessory",
      "Pressure relief valve — recommended accessory",
      "Supporting clamp for horizontal installation — recommended accessory",
    ],
    matTable: {
      caption: "Shell &amp; Tube Heat Exchanger — spares supplied with the exchanger",
      cols: ["Shell size", "Tubes", "Plugs", "Bushes", "“O” rings", "Key"],
      rows: [
        ["DN 150", "5", "4", "4", "4", "1"],
        ["DN 225", "10", "6", "6", "6", "1"],
        ["DN 300", "15", "8", "8", "8", "1"],
      ],
      note: "The heat exchanger is supplied with these spares as standard, transcribed from the catalogue page. Three accessories are recommended for use with it: a PTFE bellow on all nozzles, a pressure relief valve, and a supporting clamp.",
    },
    faqs: [
      ["How do I read the catalogue reference?", "Shell size in inches over heat transfer area in m². RGG/RMG 9/12 is a 9-inch (225 DN) shell with 12 m² of area. 12/25 is a 12-inch (300 DN) shell with 25 m²."],
      ["What is the tube diameter?", "14 mm across the whole range — the catalogue states it as a note on the table rather than as a per-model column."],
      ["Can the nozzles be changed?", "Yes. The catalogue states directly that nozzles can be changed as per client's requirement. The DN1 to DN4 figures in the table are the standard arrangement."],
      ["Why are 6 m² and 12 m² listed twice?", "Because they are available on two different shells. 6 m² comes as 6/6 on a 150 DN shell or 9/6 on a 225 DN shell; 12 m² comes as 9/12 or 12/12. Same area, different shell diameter, different shell-side velocity and pressure drop — pick on the hydraulics, not the area."],
      ["How does area increase within one shell size?", "By length. The tube count is fixed by the shell — 37, 73 or 151 — so more area means a longer exchanger. L runs from 2500 mm to 4300 mm inside the 150 DN shell alone, and the baffle count rises with it to keep shell-side velocity up."],
    ],
    related: ["apps-chemical-reactor", "rotary-evaporator", "line-bellow", "pipe-section"],
    keywords: "shell and tube heat exchanger, RGG RMG heat exchanger, 25 m2 heat exchanger, process condenser, glass plant heat exchanger, 14 mm tube heat exchanger, baffled shell and tube exchanger",
    featured: true,
  },
];

const HX_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Distillation &amp; solvent recovery", "Petrochemical",
  "Agrochemicals", "Water &amp; effluent treatment",
];

export const coilExchangers = [
  {
    slug: "boiler",
    name: "Boiler",
    image: "assets/img/products/boiler.svg",
    drawing: "assets/img/products/boiler.svg",
    alt: "Dimension schematic of a coil boiler with parallel coils fused in a glass shell, showing DN, DN1, DN2, L and L1",
    subtitle: "LSHEB series, 0.15 m² to 1.30 m²",
    desc: "Coil boiler for vapourising liquids with steam — parallel coils fused into a glass shell, sized on a 350 Kcal/m²hr·°C average heat transfer at 3.5 bar steam.",
    long: [
      "The boiler is used for vapourisation of liquids by passing steam in the coil. It is made by fusing a number of parallel coils in a glass shell, so the heating surface sits directly in the liquid being boiled and the whole process stays visible.",
      "In the boiler, coils are designed to provide a bigger cross section on the shell side as compared to a condenser. That matters because the shell side has to carry vapour away as it is generated — too small a cross section and the boiler chokes on its own product.",
      "The average heat transfer in a boiler is considered as <strong>350 Kcal/m²hr·°C at a steam pressure of 3.5 bar</strong>. The catalogue's note on use is specific: steam should be passed in the coil at a maximum pressure of 3.5 bar, which is equivalent to a temperature of 147 °C.",
    ],
    features: [
      "Vapourises liquid by passing steam through the coil",
      "Made by fusing a number of parallel coils in a glass shell",
      "Bigger shell-side cross section than a condenser, to carry vapour away",
      "Free actual heat transfer area 0.15 m² to 1.30 m²",
      "Jacket capacity 2 to 40 litres",
      "Type A and Type B builds — small side inlet or full-bore DN1",
      "Seven catalogue references from DN 100 to DN 300",
    ],
    advantages: [
      "Glass shell keeps the boiling process visible throughout",
      "Parallel coils put a large heating surface into a compact shell",
      "Shell-side cross section sized for vapour, not just liquid",
      "Published heat transfer figure allows duty to be checked before ordering",
      "Full-bore Type B outlet available where vapour load is high",
    ],
    applications: [
      "Vapourising solvent at the base of a distillation column",
      "Reboiler duty on a glass distillation assembly",
      "Steam-heated evaporation of corrosive liquids",
      "Pilot plant and kilo-lab vapourisation duty",
    ],
    industries: HX_INDUSTRIES,
    spec: [
      ["Product type", "Coil boiler (vapouriser) in glass shell"],
      ["Construction", "Number of parallel coils fused in a glass shell"],
      ["Heating medium", "Steam through the coil"],
      ["Maximum steam pressure", "3.5 bar, equivalent to 147 °C"],
      ["Average heat transfer", "350 Kcal/m²hr·°C at 3.5 bar steam pressure"],
      ["Free actual H.T.A.", "0.15 m² to 1.30 m²"],
      ["Shell size range", "DN 100 to DN 300"],
      ["Cross area", "40 cm² to 330 cm²"],
      ["Jacket capacity", "2 to 40 litres"],
      ["Catalogue reference", "LSHEB series"],
    ],
    dim: {
      caption: "Boiler — dimensions and duty",
      cols: [
        "Cat. Ref.", "DN", "DN1", "DN2", "L", "L1", "Type",
        "Free actual H.T.A. (m²)", "Cross area (cm²)", "Jacket cap. (litre)",
      ],
      rows: [
        ["LSHEB4", "100", "25", "25", "375", "100", "A", "0.15", "40", "2"],
        ["LSHEB4/4", "100", "100", "25", "400", "100", "B", "0.15", "40", "3"],
        ["LSHEB6", "150", "40", "25", "450", "100", "A", "0.35", "50", "5"],
        ["LSHEB6/6", "150", "150", "25", "500", "100", "B", "0.35", "50", "7"],
        ["LSHEB9", "225", "40", "25", "700", "100", "A", "1.00", "150", "16"],
        ["LSHEB9/9", "225", "225", "25", "700", "100", "B", "1.00", "180", "20"],
        ["LSHEB12/12", "300", "300", "25", "700", "125", "B", "1.30", "330", "40"],
      ],
      note: MM + " Type A carries a reduced DN1 side connection; Type B carries a full-bore DN1 equal to the shell. Heat transfer area is the free actual figure printed in the catalogue.",
    },
    options: [
      "Type A build — reduced DN1 side connection",
      "Type B build — full-bore DN1 matching the shell",
    ],
    faqs: [
      ["What steam pressure can I use?", "3.5 bar maximum, which the catalogue notes is equivalent to a temperature of 147 °C. The published heat transfer figure of 350 Kcal/m²hr·°C is quoted at that same pressure."],
      ["Why is the shell cross section bigger than a condenser's?", "Because a boiler has to carry vapour away from the shell side as fast as it is generated. The catalogue states the coils are designed to provide a bigger cross section in the shell side compared to a condenser for exactly this reason."],
      ["What is the difference between Type A and Type B?", "The DN1 connection. Type A has a reduced side connection — 25 mm on LSHEB4, 40 mm on LSHEB6 and LSHEB9. Type B has a full-bore DN1 equal to the shell, which suits a higher vapour load."],
      ["How do I size one?", "On duty. Take the average heat transfer as 350 Kcal/m²hr·°C at 3.5 bar steam, and pick the free actual H.T.A. that meets it — 0.15 m² at the smallest to 1.30 m² on LSHEB12/12. Send us the vapourisation rate and we will confirm."],
    ],
    related: ["product-cooler", "shell-and-tube-heat-exchanger", "supporting-clamp", "apps-chemical-reactor"],
    keywords: "glass boiler, LSHEB boiler, coil boiler glass shell, reboiler distillation glass, steam coil vapouriser, 350 kcal heat transfer boiler",
    featured: true,
  },

  {
    slug: "product-cooler",
    name: "Product Cooler",
    image: "assets/img/products/product-cooler.svg",
    drawing: "assets/img/products/product-cooler.svg",
    alt: "Dimension schematic of a product cooler with the product in the coil battery, showing DN, DN1, DN2 and L",
    subtitle: "LSHEC series, 0.10 m² to 1.25 m²",
    desc: "Coil battery cooler for distillate and product liquids — product runs through the coil and coolant through the shell, giving longer residence time, with 25 DN distillate connections.",
    long: [
      "The product cooler is used for cooling of liquids, typically for the cooling of distillate from the distillation column. It is the unit that takes hot product leaving a condenser and brings it down to a temperature at which it can be collected or stored.",
      "Unlike a coil condenser, in a product cooler the <strong>product travels through the coil battery and the coolant through the shell</strong> — the reverse of the usual arrangement. This provides more residence time to the product to be cooled, which is the whole point: a thin stream held longer against a cool surface leaves at a lower temperature than a fast one.",
      "For direct connection with distillate lines, all the product coolers are provided with a 25 DN connection. The range covers seven references from a 50 DN shell up to 150 DN.",
    ],
    features: [
      "Cools liquids, typically distillate from a distillation column",
      "Product through the coil battery, coolant through the shell",
      "More residence time for the product than a coil condenser gives",
      "All models provided with 25 DN connection for direct distillate line connection",
      "Shell sizes DN 50 to DN 150",
      "Seven catalogue references",
    ],
    advantages: [
      "Reversed flow arrangement gives longer contact time and a colder outlet",
      "Standard 25 DN connection bolts straight to distillate lines",
      "Glass construction keeps the product visible while it cools",
      "Coil battery packs substantial area into a small shell",
    ],
    applications: [
      "Cooling distillate leaving a condenser before collection",
      "Product cooling ahead of storage or drumming",
      "Any duty where a liquid must be cooled with generous residence time",
      "Corrosive product streams unsuited to metal coolers",
    ],
    industries: HX_INDUSTRIES,
    spec: [
      ["Product type", "Product cooler (coil battery)"],
      ["Flow arrangement", "Product through the coil battery, coolant through the shell"],
      ["Distillate connection", "25 DN on every model, for direct connection to distillate lines"],
      ["Shell size range", "DN 50 to DN 150"],
      ["Actual H.T.A.", "0.10 m² to 1.25 m²"],
      ["Length", "450 mm to 850 mm"],
      ["Catalogue reference", "LSHEC series"],
    ],
    dim: {
      caption: "Product Cooler — dimensions and duty",
      cols: ["Cat. Ref.", "DN", "DN1", "DN2", "L", "Actual H.T.A. (m²)"],
      rows: [
        ["LSHEC 2/1", "50", "25", "16", "450", "0.10"],
        ["LSHEC 2/1.5", "50", "25", "16", "600", "0.15"],
        ["LSHEC 2/2", "50", "25", "16", "600", "0.20"],
        ["LSHEC 3/3.5", "80", "25", "16", "600", "0.35"],
        ["LSHEC 4/5", "100", "25", "19", "600", "0.50"],
        ["LSHEC 6/10", "150", "25", "25", "600", "2.70"],
        ["LSHEC 6/15", "150", "25", "25", "850", "1.25"],
      ],
      note: MM + " ⚠️ The H.T.A. figure for LSHEC 6/10 reads as 2.70 on the supplied page, which is inconsistent both with the reference pattern (where the figure after the slash is ten times the area, giving 1.00) and with LSHEC 6/15, which is a longer unit at 1.25 m². Confirm this one figure with us before sizing against it. Every other row follows the pattern exactly.",
    },
    faqs: [
      ["How is this different from a coil condenser?", "The flow is reversed. In a coil condenser the coolant runs in the coil; in a product cooler the product runs through the coil battery and the coolant runs through the shell. That gives the product more residence time and a colder outlet."],
      ["What connection does it come with?", "25 DN on every model in the range, so it connects directly to distillate lines without an adaptor."],
      ["Why is one area figure flagged?", "LSHEC 6/10 prints as 2.70 m², but the reference numbering implies 1.00 m² and the longer LSHEC 6/15 is listed at 1.25 m². A shorter unit cannot have more than twice the area of a longer one in the same shell, so we have flagged it rather than publish it as fact. Ask us and we will confirm against the master drawing."],
      ["Which model do I need?", "Size on the heat load and the outlet temperature you want. Send us the distillate rate, its inlet temperature and your coolant, and we will confirm the reference."],
    ],
    related: ["boiler", "shell-and-tube-heat-exchanger", "angled-hose-connector-assembly", "rotary-evaporator"],
    keywords: "product cooler, LSHEC product cooler, distillate cooler glass, coil battery cooler, glass liquid cooler, 25 DN distillate cooler",
  },
];

export const hxAccessories = [
  {
    slug: "supporting-clamp",
    name: "Supporting Clamp",
    image: "assets/img/products/supporting-clamp.svg",
    drawing: "assets/img/products/supporting-clamp.svg",
    alt: "Dimension schematic of a supporting clamp for a horizontal shell and tube heat exchanger, showing DN, L, H, T and d",
    subtitle: "LSRSP series, DN 150 to DN 300",
    desc: "Clamp for horizontal installation of a shell and tube heat exchanger — three sizes covering DN 150, 225 and 300 glass shells.",
    long: [
      "This clamp is used for horizontal installations of shell and tube heat exchanger with a glass shell. A horizontal exchanger has to be carried along its length rather than hung from its nozzles, and the clamp is what takes that weight without loading the glass at the flanges.",
      "It is one of three accessories the catalogue recommends for use with the shell and tube heat exchanger, alongside a PTFE bellow on all nozzles and a pressure relief valve.",
      "Three references cover the three shell sizes in the range — DN 150, DN 225 and DN 300. Plate thickness T is 10 mm and bolt size d is 30 mm across all three; L and H grow with the shell.",
    ],
    features: [
      "For horizontal installation of shell and tube heat exchangers",
      "Suits glass shells DN 150, DN 225 and DN 300",
      "10 mm plate thickness across the range",
      "Recommended accessory for the shell and tube range",
    ],
    advantages: [
      "Carries the exchanger along its length instead of loading the nozzle flanges",
      "Sized directly to the three shell diameters — no selection beyond DN",
      "Allows a horizontal installation where headroom is limited",
    ],
    applications: [
      "Horizontal mounting of a glass shell and tube heat exchanger",
      "Supporting an exchanger inside a tubular structure",
      "Retrofitting support to a horizontally installed exchanger",
    ],
    industries: HX_INDUSTRIES,
    spec: [
      ["Product type", "Supporting clamp for shell and tube heat exchanger"],
      ["Application", "Horizontal installations, glass shell"],
      ["Shell sizes", "DN 150, DN 225 and DN 300"],
      ["Plate thickness (T)", "10 mm"],
      ["Bolt size (d)", "30 mm"],
      ["Catalogue reference", "LSRSP series"],
    ],
    dim: {
      caption: "Supporting Clamp — dimensions",
      cols: ["Cat. Ref.", "DN", "L", "H", "T", "d"],
      rows: [
        ["LSRSP6/30", "150", "150", "487", "10", "30"],
        ["LSRSP9/30", "225", "220", "525", "10", "30"],
        ["LSRSP12/30", "300", "300", "565", "10", "30"],
      ],
      note: MM,
    },
    faqs: [
      ["Do I need one for a vertical exchanger?", "The catalogue specifies this clamp for horizontal installations. For a vertical installation, ask us what support arrangement suits your structure."],
      ["What else is recommended with a shell and tube exchanger?", "A PTFE bellow on all nozzles and a pressure relief valve, alongside this clamp — those are the three accessories the catalogue recommends."],
    ],
    related: ["shell-and-tube-heat-exchanger", "line-bellow", "structure-support", "boiler"],
    keywords: "supporting clamp, LSRSP clamp, heat exchanger support clamp, horizontal shell and tube support, glass shell clamp",
  },

  {
    slug: "angled-hose-connector-assembly",
    name: "Angled Hose Connector Assembly",
    image: "assets/img/products/angled-hose-connector-assembly.svg",
    drawing: "assets/img/products/angled-hose-connector-assembly.svg",
    alt: "Dimension schematic of an angled hose connector assembly with metal flange and rubber gasket, showing DN, d and L",
    subtitle: "LSPMC series, 25 DN",
    desc: "Metal or plastic angled hose connector for joining flexible hose to a condenser — supplied complete with metal flange, rubber gasket and nut bolt.",
    long: [
      "A metal or plastic angled hose connector assembly is available to connect the flexible hose to the condenser. Coolant lines are almost always flexible hose, and this is the fitting that takes them onto a glass nozzle at an angle rather than straight out.",
      "It is provided with a metal flange, a rubber gasket and nut bolt — a complete assembly, so nothing else has to be sourced to make the connection.",
      "One reference covers the range: LSPMC1/1.75, a 25 DN connection with a 22 mm hose spigot and 70 mm length.",
    ],
    features: [
      "Connects flexible hose to a condenser",
      "Available in metal or plastic",
      "Angled, for hose runs that cannot leave straight off the nozzle",
      "Supplied with metal flange, rubber gasket and nut bolt",
      "25 DN connection with 22 mm hose spigot",
    ],
    advantages: [
      "Complete assembly — flange, gasket and bolt included",
      "Angled outlet keeps hose runs tidy and unkinked",
      "Metal or plastic option to suit the coolant and the environment",
    ],
    applications: [
      "Connecting coolant hose to a glass condenser",
      "Cooling water supply and return on heat exchangers",
      "Flexible service connections on a glass process line",
    ],
    industries: HX_INDUSTRIES,
    spec: [
      ["Product type", "Angled hose connector assembly"],
      ["Material", "Metal or plastic"],
      ["Connection", "25 DN"],
      ["Hose spigot (d)", "22 mm"],
      ["Length (L)", "70 mm"],
      ["Supplied with", "Metal flange, rubber gasket and nut bolt"],
      ["Catalogue reference", "LSPMC series"],
    ],
    dim: {
      caption: "Angled Hose Connector Assembly — dimensions",
      cols: ["Cat. Ref.", "DN", "d", "L"],
      rows: [
        ["LSPMC1/1.75", "25", "22", "70"],
      ],
      note: MM,
    },
    faqs: [
      ["What comes with it?", "A metal flange, a rubber gasket and nut bolt — it is supplied as a complete assembly ready to make the connection."],
      ["Metal or plastic?", "Both are available. Choose on the coolant and the surrounding environment; tell us the duty and we will advise."],
    ],
    related: ["product-cooler", "shell-and-tube-heat-exchanger", "boiler", "supporting-clamp"],
    keywords: "angled hose connector, LSPMC hose connector, condenser hose connector, flexible hose glass connector, coolant hose fitting glass",
  },
];
