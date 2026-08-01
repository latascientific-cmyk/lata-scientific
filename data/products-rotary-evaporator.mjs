/* =========================================================
   LATA SCIENTIFIC — rotary film evaporator (ARE series).

   Transcribed row-for-row from the supplied "ROTARY EVAPORATOR"
   catalogue page. The "Technical Information related to various
   models" table carries eight models, ARE1 to ARE100, and the
   eight numbered "Salient Features" are reproduced as printed.

   ⚠️  The catalogue page publishes no vacuum figure, no bath
   temperature range and no material of construction beyond the
   PTFE vacuum seal. None is claimed here.
   ========================================================= */

const RE_INDUSTRIES = [
  "Pharmaceutical", "Chemical processing", "Fine chemicals &amp; dyes",
  "Research &amp; development", "Pilot plant", "Food &amp; flavours",
  "Essential oils", "Distillation &amp; solvent recovery",
];

export const rotaryEvaporator = [
  {
    slug: "rotary-evaporator",
    name: "Rotary Film Evaporator",
    subtitle: "ARE series, 1 L to 100 L rotating flask",
    desc: "Thin-film rotary evaporator for gentle solvent recovery under full vacuum — eight models from a 1 L bench unit to a 100 L pilot unit, with a PTFE vacuum seal and IP-55 protected drive.",
    long: [
      "The rotary film evaporator is essentially a thin-film evaporator. The rotating flask continuously covers a large surface area with a thin film, which is ideal for rapid heat transfer. The film also ensures uniform heat distribution without local heating, so the batch never sees a hot spot at the wall.",
      "The facility to work the unit under full vacuum further assists evaporation at as low a temperature as possible. These features combined render the rotary film evaporator ideally suited to evaporation of heat sensitive material. It is equally successful for evaporation of suspension in crystallization processes, drying of powder and granules, and similar duties.",
      "The range runs from ARE1 through ARE100 — a 1 L rotating flask on a 0.25 HP drive at the small end, to a 100 L flask with a 1.0 m² condenser and an 8 kW bath at the pilot end. Everything on the range runs on a single-phase 230 V / 50 Hz supply.",
    ],
    features: [
      "Table top model — sleek, compact, with minimum footprint",
      "Continuous feed tube, and a high-efficiency vertical condenser for maximum recovery rates",
      "Provision for reflux distillation through a reflux valve as an additional feature",
      "Total recovery of product condensate to the recovery flask",
      "Designed specially for solvent separation — miscible and immiscible — and for crystallization",
      "Control panel on the front of the unit, keeping the operator away from the hot water bath",
      "Heating bath with non-slip handles for safe up and down movement; operable manually at the time of power failure",
      "Vacuum seal constructed in PTFE, which extends seal life and reduces down time",
      "Indigenously developed PTFE vacuum seal mechanism",
      "IP-55 insulation protection against dust and fumes",
    ],
    advantages: [
      "Thin rotating film gives rapid heat transfer over a large surface area",
      "Uniform heat distribution — no local overheating of the batch",
      "Full vacuum operation drops the boiling point, so heat sensitive product is not degraded",
      "Suited to crystallization suspensions and to drying powders and granules, not just clean solvents",
      "PTFE seal runs unlubricated and does not contaminate the distillate",
      "One supply specification across the whole range — 230 V, 50 Hz",
    ],
    applications: [
      "Solvent recovery and stripping after reaction or extraction",
      "Concentration of heat sensitive material at low temperature under vacuum",
      "Separation of miscible and immiscible solvents",
      "Evaporation of suspensions in crystallization processes",
      "Drying of powders and granules",
      "Reflux distillation, using the optional reflux valve",
    ],
    industries: RE_INDUSTRIES,
    spec: [
      ["Product type", "Rotary film (thin film) evaporator"],
      ["Model range", "ARE1 to ARE100 — eight models"],
      ["Rotating flask capacity", "1 L to 100 L"],
      ["Rotating speed", "0–80 rpm to 20–230 rpm, depending on model"],
      ["Electric motor rating", "0.25 HP to 0.5 HP"],
      ["Condenser cooling surface area", "0.10 m² to 1.0 m²"],
      ["Receiver flask capacity", "0.5 L to 20 L"],
      ["Bath rating", "2 kW to 8 kW"],
      ["Power supply", "230 V, 50 Hz"],
      ["Vacuum seal", "PTFE"],
      ["Ingress protection", "IP-55, against dust and fumes"],
      ["Catalogue reference", "ARE series"],
    ],
    dim: {
      caption: "Rotary Evaporator — technical information for the ARE range",
      cols: [
        "Model", "Rotating flask capacity (ltrs)", "Rotating speed (rpm)",
        "Electric motor rating (HP)", "Condenser cooling surface area (m²)",
        "Receiver flask capacity (ltrs)", "Power supply (Volt / Hz)", "Bath rating (kW)",
      ],
      rows: [
        ["ARE1", "1 L", "20–230", "0.25", "0.10", "0.5", "230 V / 50 Hz", "2"],
        ["ARE2", "2 L", "20–230", "0.25", "0.10", "1", "230 V / 50 Hz", "2"],
        ["ARE3", "3 L", "20–230", "0.25", "0.15", "1", "230 V / 50 Hz", "2"],
        ["ARE5", "5 L", "15–150", "0.25", "0.20", "2", "230 V / 50 Hz", "2"],
        ["ARE10", "10 L", "0–80", "0.25", "0.20", "6", "230 V / 50 Hz", "4"],
        ["ARE20", "20 L", "0–80", "0.5", "0.30", "10", "230 V / 50 Hz", "4"],
        ["ARE50", "50 L", "0–80", "0.5", "0.50", "20", "230 V / 50 Hz", "6"],
        ["ARE100", "100 L", "0–80", "0.5", "1.0", "20", "230 V / 50 Hz", "8"],
      ],
      note: "Transcribed exactly from the catalogue's technical information table. Condenser figures are cooling surface area in m². The catalogue page publishes no vacuum level or bath temperature range for this table — send us your duty and we will confirm it.",
    },
    options: [
      "Reflux valve for reflux distillation",
      "Continuous feed tube",
      "Manual bath lift operation during power failure",
    ],
    faqs: [
      ["What makes a rotary film evaporator gentler than a plain still?", "Two things. The rotating flask spreads the batch into a thin film over a large surface, so heat transfers quickly and evenly with no local overheating; and the unit runs under full vacuum, which drops the boiling point. Together they let heat sensitive material be concentrated without degrading it."],
      ["What is the vacuum seal made of?", "PTFE. The catalogue calls this out specifically — it is an indigenously developed mechanism, and PTFE is what extends seal life, cuts down time and keeps the distillate uncontaminated."],
      ["Can it handle more than clean solvent?", "Yes. The catalogue states it is equally successful for evaporation of suspension in crystallization processes and for drying of powder and granules."],
      ["What supply does it need?", "230 V, 50 Hz across the whole range. Bath rating rises from 2 kW on ARE1 to 8 kW on ARE100."],
      ["Which model suits my batch?", "Size on the rotating flask: ARE1 to ARE5 are bench units, ARE10 and ARE20 sit between lab and pilot, and ARE50 and ARE100 are pilot scale. Tell us the batch volume and the solvent and we will confirm the model and the condenser duty."],
    ],
    related: ["apps-chemical-reactor", "shell-and-tube-heat-exchanger", "line-bellow", "pipe-section"],
    keywords: "rotary evaporator, rotary film evaporator, ARE series rotary evaporator, thin film evaporator, solvent recovery evaporator, vacuum rotary evaporator, 100 litre rotary evaporator, PTFE vacuum seal rotavap",
    featured: true,
  },
];
