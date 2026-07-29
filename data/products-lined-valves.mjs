/* =========================================================
   LATA SCIENTIFIC — PFA/FEP lined valves and lined sight flow
   indicators, transcribed from the supplied lined product catalogue.

   Dimension tables are the catalogue's own, row for row; the ✓ / —
   columns reproduce its “Applicable / Not Applicable” marks exactly.
   ========================================================= */

import {
  T, N, MAT, SERVICE, INDUSTRIES, ADV_GENERAL, specRows,
} from "./ptfe-shared.mjs";

const img = (s) => `assets/img/products/${s}.jpg`;

/* Face-to-face figures shared by the quarter-turn and check valve family */
const VALVE_FTF = [
  ["1\"", "127"], ["1.5\"", "165"], ["2\"", "178"], ["2.5\"", "190"],
  ["3\"", "203"], ["4\"", "229"], ["6\"", "267"], ["8\"", "292"], ["10\"", "300"],
];

const VALVE_APPS = [
  "Isolation and control of strong acids, alkalis and solvents",
  "High-purity duties where metal pick-up is unacceptable",
  "Effluent, scrubber and process-waste service",
  "Lines where exotic alloy valves are uneconomic",
];

const VALVE_ADV = [
  "Fluoropolymer wetted path — body, seats and closure member all isolated from the process",
  "Cast steel body strength with fluoropolymer chemistry inside",
  ...ADV_GENERAL.slice(0, 4),
];

export const linedValves = [
  {
    slug: "ptfe-lined-ball-valve",
    name: "PTFE Lined Ball Valve",
    subtitle: "Lined quarter-turn ball valve, NB 1\" to 10\"",
    image: img("ptfe-lined-ball-valve"),
    alt: "PTFE lined ball valve with cast steel body, lever handle and fluoropolymer lined bore",
    desc: "Quarter-turn lined ball valve for tight shut-off on corrosive service — NB 1\" to 10\", face to face 127 mm to 300 mm, lined in PFA or FEP.",
    long: [
      "A lined ball valve gives full-bore, quarter-turn isolation with the ball, seats and body cavity all presenting fluoropolymer to the process. It is the default isolation valve on lined pipework because it shuts off tightly, opens to a nearly unobstructed bore and has no cavity where corrosive product can stagnate against bare metal.",
      "The body is a casting to ASTM A 216 Gr. WCB, lined and flanged to ASME/ANSI B16.5 Class 150. Face-to-face dimensions follow the standard pattern for the range, from 127 mm at NB 1\" to 300 mm at NB 10\", so the valve interchanges with the lined non-return and plug valves of the same bore.",
      "The catalogue marks PFA and FEP as applicable for this item and gives the liner specification as ASTM D 3307 and ASTM D 4894-19.",
    ],
    features: [
      "Quarter-turn operation with tight bi-directional shut-off",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "NB 1\" to 10\", face to face 127 mm to 300 mm",
      "Interchangeable face-to-face with the lined non-return and plug valves",
      "Stainless steel body on request",
    ],
    advantages: VALVE_ADV,
    applications: [
      "Primary isolation on lined process lines",
      "Batch charging and discharge on reactors",
      ...VALVE_APPS.slice(1, 4),
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined ball valve, quarter-turn",
      "Size range": "NB 1\" to NB 10\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "127 mm to 300 mm, tolerance ±3 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Ball Valve — face to face and lining availability",
      cols: ["Size", "Face to face L (±3)", "PTFE", "PFA", "FEP"],
      rows: VALVE_FTF.map(([s, l]) => [s, l, N, T, T]),
      note: "All dimensions in mm. ✓ = applicable, — = not applicable, exactly as marked in the catalogue.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Is the valve full bore?", "The lined ball valve gives a quarter-turn, near-unobstructed bore when open. Confirm the exact bore for your size with us if you intend to pig or rod the line."],
      ["Can it be actuated?", "Yes — it is a standard quarter-turn valve. Tell us the actuator type, supply pressure and any fail position required with your enquiry."],
      ["What torque should the flange bolts be tightened to?", "Use the tightening torque table for the flange size — 30 N·m at NB 1\", 60 N·m at NB 2\"–4\", 110 N·m at NB 6\"–8\" and 160 N·m at NB 10\" — cross-tightening as with any flange joint."],
    ],
    related: ["ptfe-lined-plug-valve", "ptfe-lined-butterfly-valve", "ptfe-lined-non-return-valve", "ptfe-lined-y-type-strainer"],
    keywords: "PTFE lined ball valve, PFA lined ball valve, FEP lined valve, fluoropolymer lined isolation valve, corrosion resistant ball valve",
    featured: true,
  },

  {
    slug: "ptfe-lined-butterfly-valve",
    name: "PTFE Lined Butterfly Valve",
    subtitle: "Lined butterfly valve, NB 2\" to 12\"",
    image: img("ptfe-lined-butterfly-valve"),
    alt: "PTFE lined butterfly valve showing disc, stem heights H1 and H2 and lined body",
    desc: "Compact lined butterfly valve for isolation and throttling on larger bores — NB 2\" to 12\", available in PTFE, PFA and FEP across the whole range.",
    long: [
      "A butterfly valve puts a lined disc across the flow in a short, wafer-thin body. On larger bores it is far lighter, cheaper and shorter than a ball valve, which is why it dominates NB 4\" and above, and its disc position gives usable throttling control as well as isolation.",
      "This is the one valve in the range where the catalogue marks all three linings — PTFE, PFA and FEP — as applicable across every size. Its liner specification lists ASTM D 1457, ASTM D 3307 and ASTM D 4894-19.",
      "Two height dimensions are published for each size: H1 to the top of the body and H2 overall, the latter being what you need for headroom and handwheel or actuator clearance.",
    ],
    features: [
      "Short, light body — a fraction of the weight and length of a ball valve at the same bore",
      "PTFE, PFA and FEP all available across the full NB 2\" to 12\" range",
      "Disc position gives throttling control as well as isolation",
      "Cast body to ASTM A 216 Gr. WCB",
      "H1 and H2 heights published for headroom and actuator clearance",
    ],
    advantages: [
      "Lightest and most compact lined isolation option on larger bores",
      "Usable for throttling as well as on/off duty",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Isolation and throttling on larger lined lines",
      "Tank and vessel outlet isolation",
      ...VALVE_APPS.slice(1, 4),
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined butterfly valve",
      "Size range": "NB 2\" to NB 12\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.ptfe} (PTFE), ${MAT.pfa} (PFA)`,
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Butterfly Valve — heights and lining availability",
      cols: ["Size", "H1", "H2 (±2)", "PTFE", "PFA", "FEP"],
      rows: [
        ["2\"", "61", "120", T, T, T], ["2.5\"", "74", "128", T, T, T],
        ["3\"", "78", "135", T, T, T], ["4\"", "90", "145", T, T, T],
        ["6\"", "126", "176.5", T, T, T], ["8\"", "152", "234", T, T, T],
        ["10\"", "186", "274", T, T, T], ["12\"", "214", "299", T, T, T],
      ],
      note: "All dimensions in mm. H2 is the overall height — allow for it plus handwheel or actuator clearance above the pipe.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Why is this the only valve offered in all three linings?", "That is how the catalogue marks it — PTFE, PFA and FEP are all shown applicable across NB 2\" to 12\", and the materials list gives ASTM D 1457, D 3307 and D 4894-19."],
      ["Can it throttle?", "Yes. Disc position gives proportional control, which a ball valve does not do well. For fine control confirm the flow range with us so the disc characteristic suits the duty."],
      ["How much headroom do I need?", "At least the H2 dimension — 120 mm at NB 2\" to 299 mm at NB 12\" — plus clearance for the handwheel, lever or actuator above it."],
    ],
    related: ["ptfe-lined-ball-valve", "ptfe-lined-diaphragm-valve", "ptfe-lined-plug-valve", "ptfe-lined-swing-check-valve"],
    keywords: "PTFE lined butterfly valve, PFA lined butterfly valve, FEP lined butterfly valve, fluoropolymer lined throttling valve",
    featured: true,
  },

  {
    slug: "ptfe-lined-non-return-valve",
    name: "PTFE Lined Non Return Valve",
    subtitle: "Lined check valve, NB 1\" to 10\"",
    image: img("ptfe-lined-non-return-valve"),
    alt: "PTFE lined non return valve with flanged body and lined bore preventing reverse flow",
    desc: "Lined non-return valve preventing reverse flow on corrosive lines — NB 1\" to 10\", face to face 127 mm to 300 mm, lined in PFA or FEP.",
    long: [
      "A non-return valve stops flow reversing when a pump trips or a line is depressurised. On corrosive duty that matters twice over: it protects the pump, and it stops aggressive product being pushed back into a section that is not rated for it.",
      "The body is a casting to ASTM A 216 Gr. WCB, lined and flanged to ASME/ANSI B16.5 Class 150. Its face-to-face dimensions match the lined ball and plug valves exactly, so the three are interchangeable in a pipework layout at the same bore.",
    ],
    features: [
      "Automatic prevention of reverse flow — no operator action needed",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "NB 1\" to 10\", face to face 127 mm to 300 mm",
      "Face-to-face interchangeable with the lined ball and plug valves",
      "Stainless steel body on request",
    ],
    advantages: [
      "Protects pumps from reverse rotation and damage on trip",
      "Prevents aggressive product backflowing into unrated sections",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Pump discharge protection on corrosive service",
      "Preventing backflow between process sections",
      "Common headers fed by more than one pump",
      ...VALVE_APPS.slice(1, 2),
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined non-return (check) valve",
      "Size range": "NB 1\" to NB 10\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "127 mm to 300 mm, tolerance ±3 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Non Return Valve — face to face and lining availability",
      cols: ["Size", "Face to face L (±3)", "PTFE", "PFA", "FEP"],
      rows: VALVE_FTF.map(([s, l]) => [s, l, N, T, T]),
      note: "All dimensions in mm. Face-to-face matches the lined ball and plug valves of the same bore.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Which way up should it be installed?", "Check the flow arrow on the body and confirm the mounting orientation with us — some check valve patterns are horizontal-only while others will work vertically with upward flow."],
      ["What is the difference between this and the swing check valve?", "Both prevent reverse flow. This item is listed NB 1\" to 10\" with face-to-face 127–300 mm; the swing check valve is listed NB 3\" to 14\" with a much shorter face-to-face of 38–88 mm, so it suits a wafer-style installation between flanges."],
    ],
    related: ["ptfe-lined-swing-check-valve", "ptfe-lined-ball-valve", "ptfe-lined-y-type-strainer", "ptfe-lined-plug-valve"],
    keywords: "PTFE lined non return valve, lined check valve, PFA lined NRV, fluoropolymer lined backflow prevention valve",
  },

  {
    slug: "ptfe-lined-plug-valve",
    name: "PTFE Lined Plug Valve",
    subtitle: "Lined quarter-turn plug valve, NB 1\" to 10\"",
    image: img("ptfe-lined-plug-valve"),
    alt: "PTFE lined plug valve with tapered plug, stem height H and flanged lined body",
    desc: "Lined quarter-turn plug valve with a wiping seating action that suits slurries and crystallising media — NB 1\" to 10\", lined in PFA or FEP.",
    long: [
      "A plug valve rotates a tapered plug across the bore. That quarter-turn action wipes the seat as it moves, which clears the deposits that would gradually prevent a ball valve from seating on slurry, crystallising or precipitating service.",
      "The lined version presents fluoropolymer on the plug, the seat and the body cavity. Body is a casting to ASTM A 216 Gr. WCB, flanged to ASME/ANSI B16.5 Class 150, with face-to-face matching the lined ball and non-return valves at every bore.",
    ],
    features: [
      "Wiping quarter-turn seating action clears deposits from the seat",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "NB 1\" to 10\", face to face 127 mm to 300 mm",
      "Face-to-face interchangeable with the lined ball and non-return valves",
      "Stainless steel body on request",
    ],
    advantages: [
      "Seats reliably on slurry and crystallising duties that foul a ball valve",
      "Simple quarter-turn operation with positive shut-off",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Slurry, crystallising and precipitating service",
      "Lines carrying suspended solids or scale",
      "Isolation where a ball valve fouls in service",
      ...VALVE_APPS.slice(1, 2),
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined plug valve, quarter-turn",
      "Size range": "NB 1\" to NB 10\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "127 mm to 300 mm, tolerance ±3 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Plug Valve — face to face and lining availability",
      cols: ["Size", "Face to face L (±3)", "PTFE", "PFA", "FEP"],
      rows: VALVE_FTF.map(([s, l]) => [s, l, N, T, T]),
      note: "All dimensions in mm. Face-to-face matches the lined ball and non-return valves of the same bore.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Plug valve or ball valve?", "Choose a plug valve where the medium carries solids, crystallises or precipitates — the wiping action keeps the seat clean. A ball valve is the better general-purpose isolator on clean service."],
      ["Can it be actuated?", "Yes, it is a quarter-turn valve. Note that plug valves generally need higher operating torque than ball valves, so size the actuator accordingly."],
    ],
    related: ["ptfe-lined-ball-valve", "ptfe-lined-butterfly-valve", "ptfe-lined-diaphragm-valve", "ptfe-lined-non-return-valve"],
    keywords: "PTFE lined plug valve, PFA lined plug valve, lined slurry valve, fluoropolymer lined quarter turn valve",
  },

  {
    slug: "ptfe-lined-diaphragm-valve",
    name: "PTFE Lined Diaphragm Valve",
    subtitle: "Lined diaphragm valve, NB 1\" to 8\"",
    image: img("ptfe-lined-diaphragm-valve"),
    alt: "PTFE lined diaphragm valve with bonnet, handwheel height H and lined weir body",
    desc: "Lined diaphragm valve isolating the stem and bonnet completely from the process — NB 1\" to 8\", face to face 133 mm to 527 mm, lined in PFA or FEP.",
    long: [
      "A diaphragm valve closes by pressing a flexible diaphragm onto a weir in the body. Because the diaphragm separates the process from the stem, bonnet and all moving parts, there is no stem seal to leak and no packing to maintain — the two things that most often fail on aggressive or hazardous service.",
      "Combined with a fluoropolymer lined body, that gives a valve with no metallic wetted parts at all and no leak path to atmosphere through the stem. It is the usual choice for toxic and fugitive-emission-controlled duties.",
      "Face-to-face runs longer than the quarter-turn valves — 133 mm at NB 1\" to 527 mm at NB 8\" — because of the weir body, so allow for it when replacing a ball valve.",
    ],
    features: [
      "Diaphragm isolates stem, bonnet and all moving parts from the process",
      "No stem packing — no leak path to atmosphere",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "NB 1\" to 8\", face to face 133 mm to 527 mm",
      "Stainless steel body on request",
    ],
    advantages: [
      "No stem seal to leak — suits toxic and fugitive-emission-controlled service",
      "Throttling capability with a simple, maintainable closure",
      "Diaphragm can be replaced without removing the valve body from the line",
      ...ADV_GENERAL.slice(0, 3),
    ],
    applications: [
      "Toxic and hazardous media where stem leakage is unacceptable",
      "Fugitive-emission-controlled duties",
      "Throttling on corrosive service",
      ...VALVE_APPS.slice(1, 2),
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined diaphragm valve",
      "Size range": "NB 1\" to NB 8\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "133 mm to 527 mm, tolerance ±3 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Diaphragm Valve — face to face and lining availability",
      cols: ["Size", "Face to face L (±3)", "PTFE", "PFA", "FEP"],
      rows: [
        ["1\"", "133", N, T, T], ["1.5\"", "166", N, T, T],
        ["2\"", "196", N, T, T], ["2.5\"", "222", N, T, T],
        ["3\"", "260", N, T, T], ["4\"", "311", N, T, T],
        ["6\"", "412", N, T, T], ["8\"", "527", N, T, T],
      ],
      note: "All dimensions in mm. Face-to-face is longer than the quarter-turn valves because of the weir body — allow for it when replacing a ball valve.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Can the diaphragm be replaced in situ?", "The bonnet assembly is designed to be removed for diaphragm replacement without cutting the body out of the line. Confirm the maintenance clearance above the valve when setting out."],
      ["Why is it so much longer than a ball valve?", "The weir body needs the length. At NB 8\" it is 527 mm face to face against 292 mm for the lined ball valve, so the two are not interchangeable without a spacer or a pipework change."],
    ],
    related: ["ptfe-lined-butterfly-valve", "ptfe-lined-ball-valve", "ptfe-lined-flush-bottom-valve", "ptfe-lined-plug-valve"],
    keywords: "PTFE lined diaphragm valve, PFA lined diaphragm valve, lined weir valve, fluoropolymer lined valve no stem seal",
  },

  {
    slug: "ptfe-lined-flush-bottom-valve",
    name: "PTFE Lined Flush Bottom Valve",
    subtitle: "Lined tank bottom outlet valve, 2\"×1\" to 6\"×4\"",
    image: img("ptfe-lined-flush-bottom-valve"),
    alt: "PTFE lined flush bottom valve with 45 degree outlet, heights H and H2 and lined vessel connection",
    desc: "Lined vessel bottom outlet valve that seats flush with the vessel floor, leaving no dead pocket — four combinations from 2\"×1\" to 6\"×4\".",
    long: [
      "A flush bottom valve mounts on the bottom outlet of a reactor or storage vessel with its closure member sitting flush against the inside of the vessel floor. That leaves no pocket below the outlet where product can stagnate, degrade or fail to drain — the problem with fitting an ordinary valve below a bottom nozzle.",
      "For batch processing that means complete drainage between batches, no cross-contamination and no dead leg for solids to settle into. The lined version keeps the whole wetted path, including the seat face presented to the batch, in fluoropolymer.",
      "The item is specified by two bores: the vessel connection and the outlet. Two heights are given, H overall and H₂, and the outlet is arranged at 45°.",
    ],
    features: [
      "Closure seats flush with the vessel floor — no dead pocket",
      "Four combinations from 2\"×1\" to 6\"×4\"",
      "45° outlet arrangement",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "Stainless steel body on request",
    ],
    advantages: [
      "Complete drainage between batches — no residue and no cross-contamination",
      "No dead leg for solids to settle or product to degrade in",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Reactor and storage vessel bottom outlets",
      "Batch processing where complete drainage between batches is required",
      "Duties where a dead leg would allow product degradation or solids build-up",
      "Sampling from the vessel bottom",
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined flush bottom (tank outlet) valve",
      "Size range": "NB 1\" to NB 6\" — combinations 2\"×1\" to 6\"×4\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Outlet arrangement": "45°",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Flush Bottom Valve — heights and lining availability",
      cols: ["Size", "H", "H₂", "PTFE", "PFA", "FEP"],
      rows: [
        ["2\"×1\"", "220", "100", N, T, T],
        ["3\"×2\"", "430", "160", N, T, T],
        ["4\"×3\"", "500", "220", N, T, T],
        ["6\"×4\"", "600", "330", N, T, T],
      ],
      note: "All dimensions in mm. The first figure is the vessel connection, the second the outlet. Allow the H dimension below the vessel for installation and removal.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["How much clearance is needed under the vessel?", "At least the H dimension — 220 mm for the 2\"×1\" up to 600 mm for the 6\"×4\" — plus room to withdraw the valve for maintenance."],
      ["Why not just fit a ball valve below the bottom nozzle?", "Because the nozzle and the valve body above the ball form a pocket that never drains. Product sits there between batches, degrades and contaminates the next one. A flush bottom valve seats at the vessel floor and removes the pocket entirely."],
    ],
    related: ["ptfe-lined-diaphragm-valve", "ptfe-lined-ball-valve", "ptfe-lined-dip-pipe", "ptfe-t-bush-for-glr-nozzles"],
    keywords: "PTFE lined flush bottom valve, lined tank bottom valve, PFA lined vessel outlet valve, flush bottom discharge valve",
  },

  {
    slug: "ptfe-lined-swing-check-valve",
    name: "PTFE Lined Swing Check Valve",
    subtitle: "Wafer-pattern lined swing check, NB 3\" to 14\"",
    image: img("ptfe-lined-swing-check-valve"),
    alt: "PTFE lined swing check valve in short wafer pattern body with lined flange faces",
    desc: "Short wafer-pattern lined swing check valve — only 38 mm to 88 mm face to face across NB 3\" to 14\", where a conventional check valve would need far more length.",
    long: [
      "A swing check valve holds a hinged disc that opens with forward flow and swings shut against reverse flow. In this wafer pattern the whole valve occupies just 38 mm to 88 mm between flanges, against 127 mm to 300 mm for the lined non-return valve — which is what makes it fit where there is no room for a conventional check.",
      "The body is a casting to ASTM A 216 Gr. WCB, lined and drilled to ASME/ANSI B16.5 Class 150. The range starts at NB 3\" and runs to NB 14\", covering the larger bores where check valve length and weight matter most.",
    ],
    features: [
      "Wafer pattern — 38 mm to 88 mm face to face only",
      "NB 3\" to 14\", covering the larger bores",
      "Hinged disc opens with flow, swings shut against reversal",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "Stainless steel body on request",
    ],
    advantages: [
      "Fits where a conventional check valve will not — a quarter of the length",
      "Low weight and low installed cost on larger bores",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Reverse flow prevention on large lined lines",
      "Retrofit into pipework with no spare length",
      "Pump discharge protection on larger bores",
      "Common headers fed by multiple pumps",
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined swing check valve, wafer pattern",
      "Size range": "NB 3\" to NB 14\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "38 mm to 88 mm, tolerance ±3 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Swing Check Valve — face to face and lining availability",
      cols: ["Size", "Face to face L (±3)", "PTFE", "PFA", "FEP"],
      rows: [
        ["3\"", "38", N, T, T], ["4\"", "52", N, T, T],
        ["6\"", "56", N, T, T], ["8\"", "60", N, T, T],
        ["10\"", "68", N, T, T], ["12\"", "78", N, T, T],
        ["14\"", "88", N, T, T],
      ],
      note: "All dimensions in mm. Note how short this is against the lined non-return valve — 38–88 mm versus 127–300 mm.",
    },
    options: ["Stainless steel body"],
    faqs: [
      ["Swing check or non-return valve?", "Use the swing check where length is tight or the bore is large — it is a quarter of the face-to-face length. Use the non-return valve on NB 1\" to 2.5\", which the swing check range does not cover."],
      ["Can it be mounted vertically?", "A swing disc depends on flow and gravity to seat. Confirm the intended orientation with us so the valve is built for it."],
    ],
    related: ["ptfe-lined-non-return-valve", "ptfe-lined-butterfly-valve", "ptfe-lined-ball-valve", "ptfe-lined-y-type-strainer"],
    keywords: "PTFE lined swing check valve, wafer check valve lined, PFA lined swing check, fluoropolymer lined non return valve",
  },
];

/* ---------------------------------------------------------
   LINED SIGHT FLOW INDICATORS
   --------------------------------------------------------- */
export const linedSightFlow = [
  {
    slug: "ptfe-lined-double-window-sight-flow-indicator",
    name: "PTFE Lined Double Window Sight Flow Indicator",
    subtitle: "Lined double window sight glass, NB 1/2\" to 16\"",
    image: img("ptfe-lined-double-window-sight-flow-indicator"),
    alt: "PTFE lined double window sight flow indicator with opposed glass windows and lined body",
    desc: "Lined sight flow indicator with two opposed windows — look straight through the line against the light. NB 1/2\" to 16\", lined in PFA or FEP.",
    long: [
      "Two windows set opposite each other let an operator look straight through the flow with a light behind it. That reads far better than a single window for judging colour, clarity, phase separation and entrained gas, because the light passes through the fluid rather than reflecting off it.",
      "The lined version keeps the body, and everything the fluid touches apart from the glass, in fluoropolymer — so a sight glass can be put into an aggressive line without becoming its weak point. Body is a casting to ASTM A 216 Gr. WCB, flanged to ASME/ANSI B16.5 Class 150.",
      "Face-to-face steps up sharply from NB 8\": 274 mm at NB 6\" against 610 mm at NB 8\", reaching 1114 mm at NB 16\". Allow for that when setting out larger lines.",
    ],
    features: [
      "Two opposed windows for through-illumination viewing",
      "NB 1/2\" to 16\", face to face 131 mm to 1114 mm",
      "Cast body to ASTM A 216 Gr. WCB, lined and flanged to B16.5 Class 150",
      "Special face-to-face lengths on request",
      "Stainless steel body on request",
    ],
    advantages: [
      "Through-illumination reads colour, clarity and phase separation far better than a single window",
      "Fluoropolymer lined body — the sight glass is not the corrosion point of the line",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Visual confirmation of flow on corrosive lines",
      "Watching for phase separation, colour change or entrained gas",
      "Reactor discharge and transfer line monitoring",
      "Confirming a line has drained before maintenance",
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined double window sight flow indicator",
      "Size range": "NB 1/2\" to NB 16\"",
      "Body / steel grade": MAT.castBody,
      "Liner standard": `${MAT.pfa} (PFA), ASTM D 4894-19`,
      "Face to face": "131 mm to 1114 mm, tolerance ±2 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Double Window Sight Flow Indicator — face to face and lining availability",
      cols: ["Size", "Face to face L (±2)", "PTFE", "PFA", "FEP"],
      rows: [
        ["1\"", "131", N, T, T], ["1.5\"", "169", N, T, T],
        ["2\"", "182", N, T, T], ["3\"", "207", N, T, T],
        ["4\"", "233", N, T, T], ["6\"", "274", N, T, T],
        ["8\"", "610", N, T, T], ["10\"", "742", N, T, T],
        ["12\"", "862", N, T, T], ["14\"", "994", N, T, T],
        ["16\"", "1114", N, T, T],
      ],
      note: "All dimensions in mm. Face-to-face steps up sharply from NB 8\" — allow for it when setting out larger lines.",
    },
    options: ["Special length (face to face)", "Stainless steel body"],
    faqs: [
      ["Why does face-to-face jump between NB 6\" and NB 8\"?", "The catalogue lists 274 mm at NB 6\" and 610 mm at NB 8\", reflecting a change in body construction at that size. Take the figure from the table rather than interpolating."],
      ["Can I get a specific face-to-face length?", "Yes — special length (face to face) is listed as available on request."],
    ],
    related: ["ptfe-lined-tubular-sight-flow-indicator", "lined-double-window-sfi", "ptfe-lined-spool-pipe", "ptfe-lined-y-type-strainer"],
    keywords: "PTFE lined double window sight flow indicator, lined sight glass, PFA lined sight flow indicator, fluoropolymer lined flow sight glass",
  },

  {
    slug: "ptfe-lined-tubular-sight-flow-indicator",
    name: "PTFE Lined Tubular Sight Flow Indicator",
    subtitle: "Lined tubular sight glass, NB 1/2\" to 16\"",
    image: img("ptfe-lined-tubular-sight-flow-indicator"),
    alt: "PTFE lined tubular sight flow indicator with full-bore glass tube between lined flanges",
    desc: "Lined tubular sight flow indicator giving 360° visibility of the whole bore — NB 1/2\" to 16\", available in PTFE, PFA and FEP across the entire range.",
    long: [
      "A tubular sight flow indicator replaces a length of the line with a glass tube between two lined flanges. Instead of two viewing ports you see the entire circumference and the full length of the section, which makes it the right choice for spotting settling solids, stratification or a slow-moving interface that a window would miss.",
      "This is one of the few items in the lined catalogue where PTFE, PFA and FEP are all marked applicable across every size from NB 1/2\" to 16\". Face-to-face is short and changes little with bore — 175 mm at NB 1/2\" to 230 mm at NB 16\" — so it drops easily into an existing run.",
      "An azeotropic separation type is available on request for watching and separating two liquid phases by density.",
    ],
    features: [
      "360° visibility over the full length of the glass section",
      "PTFE, PFA and FEP available across the whole NB 1/2\" to 16\" range",
      "Short face to face — 175 mm to 230 mm regardless of bore",
      "Flanges IS 2062 plate or ASTM A 105 to B16.5 Class 150",
      "Azeotropic separation type on request",
    ],
    advantages: [
      "Sees the whole bore, not two ports — catches settling, stratification and interfaces",
      "Short, near-constant face to face makes retrofit straightforward",
      ...ADV_GENERAL.slice(0, 4),
    ],
    applications: [
      "Full-bore visual monitoring on corrosive lines",
      "Watching for settling solids or phase stratification",
      "Azeotropic and density-based separation observation",
      "Confirming complete drainage of a line",
    ],
    industries: INDUSTRIES,
    spec: specRows({
      "Product type": "Lined tubular sight flow indicator",
      "Size range": "NB 1/2\" to NB 16\"",
      "Body / steel grade": `Flanges ${MAT.flange}`,
      "Liner standard": `${MAT.ptfe} (PTFE), ${MAT.pfa} (PFA)`,
      "Face to face": "175 mm to 230 mm, tolerance ±2 mm",
      "Vent holes": "",
    }),
    dim: {
      caption: "PTFE Lined Tubular Sight Flow Indicator — face to face and lining availability",
      cols: ["Size", "Face to face L (±2)", "PTFE", "PFA", "FEP"],
      rows: [
        ["0.5\"", "175", T, T, T], ["0.75\"", "175", T, T, T],
        ["1\"", "180", T, T, T], ["1.5\"", "185", T, T, T],
        ["2\"", "190", T, T, T], ["2.5\"", "195", T, T, T],
        ["3\"", "200", T, T, T], ["4\"", "200", T, T, T],
        ["6\"", "210", T, T, T], ["8\"", "210", T, T, T],
        ["10\"", "220", T, T, T], ["12\"", "220", T, T, T],
        ["14\"", "230", T, T, T], ["16\"", "230", T, T, T],
      ],
      note: "All dimensions in mm. All three lining materials are marked applicable across the full size range.",
    },
    options: [
      "Special length (face to face)",
      "Stainless steel body",
      "Azeotropic separation type sight flow indicator",
    ],
    faqs: [
      ["Tubular or double window?", "Tubular shows the whole bore over the length of the glass, which suits settling, stratification and interface watching. A double window lets you look through the flow against a light, which reads colour and clarity better."],
      ["Is a safety shield available?", "Ask us — a polycarbonate or acrylic shield is standard on the tubular sight flow indicators in our glass range and can be discussed for the lined version."],
      ["What is the azeotropic separation type for?", "Separating two liquids by density while watching the interface — used on azeotropic distillation and solvent recovery duties."],
    ],
    related: ["ptfe-lined-double-window-sight-flow-indicator", "lined-ss-tubular-sfi", "azeotropic-separation-tubular-sfi", "ptfe-lined-spool-pipe"],
    keywords: "PTFE lined tubular sight flow indicator, lined glass tube sight glass, PFA lined tubular sight glass, fluoropolymer lined flow indicator",
    featured: true,
  },
];
