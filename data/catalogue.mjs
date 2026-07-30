/* =========================================================
   LATA SCIENTIFIC — catalogue data (single source of truth)
   Edit this file, then run:  node scripts/build.mjs
   to regenerate all category + product pages.

   ⚠️  NO PLACEHOLDER PRODUCTS. A category's `products` array stays empty
   until the client supplies real product details + images. Never invent
   sample products, dimensions or specifications here.

   Large ranges live in their own module and are imported below:
     products-ptfe.mjs         — lined pipes, fittings, dip pipes, accessories
     products-lined-valves.mjs — lined valves + lined sight flow indicators
     products-sightglass.mjs   — double window + tubular sight flow indicators
   with shared engineering constants in ptfe-shared.mjs / sightglass-shared.mjs.

   To add a real product, push an object into the right category:
     {
       slug: "url-friendly-name",          // becomes product-<slug>.html
       name: "Exact Product Name",         // exactly as supplied
       subtitle: "Short line under name",
       image: "assets/img/products/file.jpg",   // optional; omit for icon placeholder
       desc: "Full paragraph description.",
       specs: [["Material","Borosilicate 3.3"], ["Capacity","5 L"]],
       featured: true,                     // optional: show in homepage showcase
       variants: [                         // optional: construction options
         { name: "Variant", construction: "…", fitting: "…" }
       ]
     }
   ========================================================= */

import { pipeSection, jacketed, otherComponents, madeToOrder } from "./products-pipeline.mjs";
import { glassValves } from "./products-glass-valves.mjs";
import { linedPipes, linedFittings, dipPipes, linedAccessories } from "./products-ptfe.mjs";
import { linedValves, linedSightFlow } from "./products-lined-valves.mjs";
import { doubleWindow, tubular } from "./products-sightglass.mjs";
import { FLANGE_TABLE, TOLERANCES, TORQUE_TABLE, STUD_TABLE, LINER_THICKNESS } from "./ptfe-shared.mjs";
import { FLANGE_STANDARDS, ASG_DRILLING } from "./sightglass-shared.mjs";

export const site = {
  brochureNote: "Full technical brochure (PDF)",
};

/* group: "glass" | "fluid" — controls which mega-menu column it sits in
   A category may hold EITHER a flat `products` array, OR `subcategories`
   (each with its own products) for deeper ranges. */
export const categories = [
  /* ---------------- GLASS & PROCESS EQUIPMENT ---------------- */
  {
    slug: "pipeline", name: "Pipeline Components", group: "glass",
    tagline: "Pipe sections, bends, tees and closures",
    blurb: "Borosilicate glass pipeline components — straight sections, bends, tees, crosses, reducers, jacketed sections and closures for building complete process lines.",
    brochure: "pipeline-components.pdf",
    subcategories: [
      { slug: "pipe-section", name: "Pipe Section", products: pipeSection },
      { slug: "jacketed-pipe-section", name: "Jacketed Pipe Section", products: jacketed },
      { slug: "other-pipeline-components", name: "Other Pipeline Components", products: otherComponents },
      { slug: "made-to-order", name: "Made to Order", products: madeToOrder },
    ],
  },
  {
    slug: "glass-valves", name: "Glass Valves", group: "glass",
    tagline: "Straight, angle, drain, vent and three way",
    blurb: "Borosilicate glass valves with PTFE spindles — straight through, drain, angle, vent, bottom outlet and three way patterns for isolating, draining, venting and diverting a glass process line, DN 15 to DN 50.",
    brochure: "glass-valves.pdf",
    products: glassValves,
  },
  {
    slug: "coupling", name: "Coupling", group: "glass",
    tagline: "Joints that hold the line together",
    blurb: "Couplings, backing flanges and gasket sets for joining borosilicate pipeline components — bolted assemblies that let a line be extended or reconfigured without cutting glass.",
    brochure: "coupling.pdf",
    products: [],
  },
  {
    slug: "rotary-evaporator", name: "Rotary Evaporator", group: "glass",
    tagline: "Solvent recovery, bench to pilot",
    blurb: "Rotary evaporator assemblies and their glass components — evaporating flasks, condensers, receivers and vapour ducts in borosilicate 3.3.",
    brochure: "rotary-evaporator.pdf",
    products: [],
  },
  {
    slug: "tubular-structure", name: "Tubular Structure", group: "glass",
    tagline: "Framed glass assemblies and skids",
    blurb: "Tubular structural assemblies that carry and support a glass process line — framework, supports and mounted pipework built as one unit.",
    brochure: "tubular-structure.pdf",
    products: [],
  },
  {
    slug: "heat-exchanger", name: "Heat Exchanger", group: "glass",
    tagline: "Coil, shell-and-tube and block",
    blurb: "Glass heat exchangers for heating, cooling and condensing duty — fully visible, chemically inert exchange surfaces for corrosive service.",
    brochure: "heat-exchanger.pdf",
    products: [],
  },
  {
    slug: "column-component", name: "Column Component", group: "glass",
    tagline: "Sections, internals and distributors",
    blurb: "Column sections and internals — packing supports, distributors, sieve plates and flanged sections for fractionating and absorption columns.",
    brochure: "column-component.pdf",
    products: [],
  },
  /* ---------------- FLUID TRANSFER & FITTINGS ---------------- */
  {
    slug: "ptfe-lined", name: "PTFE Lined Pipes & Fittings", group: "fluid",
    tagline: "PTFE, PFA and FEP lined carbon steel",
    blurb: "Fluoropolymer lined carbon steel pipes, fittings, dip pipes, spacers, bellows and accessories to ASTM F 1545 — steel strength outside, PTFE, PFA or FEP chemistry inside, NB 1/2\" to 24\".",
    brochure: "ptfe-lined-pipes-fittings.pdf",
    /* Shared engineering references shown on the category page — they apply to
       every product in the range, so they are not repeated per product. */
    refTables: [FLANGE_TABLE, LINER_THICKNESS, TOLERANCES, TORQUE_TABLE, STUD_TABLE],
    subcategories: [
      { slug: "lined-pipes", name: "Lined Pipes & Spools", products: linedPipes },
      { slug: "lined-fittings", name: "Lined Fittings", products: linedFittings },
      { slug: "dip-pipes", name: "Dip Pipes & Dip Legs", products: dipPipes },
      { slug: "lined-accessories", name: "Spacers, Bellows, Strainers & Accessories", products: linedAccessories },
    ],
  },
  {
    slug: "lined-valves", name: "PTFE Lined Valves", group: "fluid",
    tagline: "Ball, butterfly, plug, diaphragm and check",
    blurb: "PFA and FEP lined valves on cast steel bodies to ASME/ANSI B16.5 Class 150 — quarter-turn isolation, throttling, non-return and flush bottom duty on the most aggressive process media.",
    brochure: "ptfe-lined-valves.pdf",
    refTables: [FLANGE_TABLE, TORQUE_TABLE],
    subcategories: [
      { slug: "lined-valves-range", name: "Lined Valves", products: linedValves },
      { slug: "lined-sight-flow", name: "Lined Sight Flow Indicators", products: linedSightFlow },
    ],
  },
  {
    slug: "sight-flow", name: "Sight Flow Indicators", group: "fluid",
    tagline: "Double window, tubular, lined and hygienic",
    blurb: "Sight flow indicators and sight glasses in stainless, mild steel, polypropylene and FEP/PFA lined construction — double window, tubular, rotary wheel, flapper and tri-clamp, 15NB to 400NB.",
    brochure: "sight-flow-indicators.pdf",
    refTables: [FLANGE_STANDARDS, ASG_DRILLING],
    subcategories: [
      { slug: "double-window", name: "Double Window Sight Flow Indicators", products: doubleWindow },
      { slug: "tubular-sight-glass", name: "Tubular Sight Flow Indicators", products: tubular },
    ],
  },
  {
    /* Slug deliberately kept as "valves" so the existing cat-valves.html
       URL keeps resolving instead of turning into a 404. */
    slug: "valves", name: "Valves", group: "fluid",
    tagline: "Isolation, control and non-return",
    blurb: "Process valves for corrosive and general duty — isolation, throttling, non-return and bottom-outlet patterns across glass, lined and metallic construction.",
    brochure: "valves.pdf",
    products: [],
  },
];
