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
    subtitle: "RGG / RMG series, 3 m² to 25 m²",
    desc: "Shell and tube heat exchanger in twelve models from 3 m² to 25 m² across 150, 225 and 300 DN shells — 14 mm tubes, with nozzles changed to the client's requirement.",
    long: [
      "The shell and tube heat exchanger is the workhorse of process heating, cooling and condensing duty. Process fluid passes through a bundle of tubes while the service fluid circulates in the shell around them, with baffles directing the shell-side flow across the bundle instead of straight along it.",
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
    ],
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
