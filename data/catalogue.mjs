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
import { pilotPlant } from "./products-pilot-plant.mjs";
import { rotaryEvaporator } from "./products-rotary-evaporator.mjs";
import { bellows, flangesAdaptors, gaskets } from "./products-coupling.mjs";
import { structureTube, structureFittings } from "./products-tubular-structure.mjs";
import { heatExchangers, coilExchangers, hxAccessories } from "./products-heat-exchanger.mjs";
import { columnComponents } from "./products-column-component.mjs";
import { vessels, SPHERICAL_GENERAL_DATA } from "./products-vessel.mjs";
import { FLANGE_TABLE, TOLERANCES, TORQUE_TABLE, STUD_TABLE, LINER_THICKNESS } from "./ptfe-shared.mjs";
import { FLANGE_STANDARDS, ASG_DRILLING } from "./sightglass-shared.mjs";
import {
  GENERAL_DATA, TUBE_SIZE, CUT_LENGTHS, STRUCT_COLUMN, STRUCT_EQUIPMENT,
} from "./tubular-shared.mjs";

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
    tagline: "Straight, angle, drain, vent and bottom outlet",
    blurb: "Borosilicate glass valves with PTFE spindles — straight through, drain, angle, vent and bottom outlet patterns for isolating, draining and venting a glass process line, DN 15 to DN 50.",
    brochure: "glass-valves.pdf",
    products: glassValves,
  },
  {
    slug: "coupling", name: "Coupling", group: "glass",
    tagline: "Joints that hold the line together",
    blurb: "PTFE bellows, bellow flanges, backing flanges, inserts and adaptor plates for joining borosilicate pipeline components — bolted assemblies that let a line be extended, branched or reconfigured without cutting glass.",
    brochure: "coupling.pdf",
    subcategories: [
      { slug: "ptfe-bellows", name: "PTFE Bellows", products: bellows },
      { slug: "flanges-inserts-adaptors", name: "Flanges, Inserts & Adaptors", products: flangesAdaptors },
      { slug: "gaskets-seals", name: "Gaskets & Seals", products: gaskets },
    ],
  },
  {
    slug: "rotary-evaporator", name: "Rotary Evaporator", group: "glass",
    tagline: "Solvent recovery, bench to pilot",
    blurb: "Rotary film evaporators for gentle solvent recovery under full vacuum — the LSRE range, from a 1 L bench unit to a 100 L pilot unit, with PTFE vacuum seals and IP-55 protected drives.",
    brochure: "rotary-evaporator.pdf",
    products: rotaryEvaporator,
  },
  {
    slug: "tubular-structure", name: "Tubular Structure", group: "glass",
    tagline: "Framed glass assemblies and skids",
    blurb: "Galvanised tube and cast iron fittings for building the structure that carries a glass plant — slidable fittings fixed with grub screws, so a structure can be modified later without hammering or welding.",
    brochure: "tubular-structure.pdf",
    /* Shared references shown once on the category page — the general data,
       tube sizes, cut lengths and structure-sizing guides govern the whole
       range rather than any single fitting. */
    refTables: [GENERAL_DATA, TUBE_SIZE, CUT_LENGTHS, STRUCT_COLUMN, STRUCT_EQUIPMENT],
    subcategories: [
      { slug: "structure-tube", name: "Structure Tube", products: structureTube },
      { slug: "structure-fittings", name: "Structure Fittings", products: structureFittings },
      /* "Column Supports" retired — both of its products (Column Base Support
         Frame, Counter Balance Support) were withdrawn, leaving the
         subcategory empty. */
    ],
  },
  {
    slug: "heat-exchanger", name: "Heat Exchanger", group: "glass",
    tagline: "Coil, shell-and-tube and block",
    blurb: "Shell and tube heat exchangers, coil boilers and product coolers for heating, cooling, vapourising and condensing duty — 0.10 m² to 25 m², in glass, metal and FRP combinations.",
    brochure: "heat-exchanger.pdf",
    subcategories: [
      { slug: "shell-and-tube", name: "Shell & Tube Heat Exchangers", products: heatExchangers },
      { slug: "coil-heat-exchangers", name: "Coil Boilers & Product Coolers", products: coilExchangers },
      { slug: "heat-exchanger-accessories", name: "Heat Exchanger Accessories", products: hxAccessories },
    ],
  },
  {
    slug: "pilot-plant", name: "Pilot Plant Series", group: "glass",
    tagline: "See-through reactors, research to pilot scale",
    blurb: "The LSPPS pilot plant range — see-through glass and glass lined steel reaction assemblies from 15 to 250 litres, plus a high pressure glass reactor to +5 bar, supplied complete with agitation, heating and instrumentation.",
    brochure: "pilot-plant-series.pdf",
    products: pilotPlant,
  },
  {
    slug: "column-component", name: "Column Component", group: "glass",
    tagline: "Sections, internals and distributors",
    blurb: "Column sections and internals — packing supports, distributors, sieve plates and flanged sections for fractionating and absorption columns.",
    brochure: "column-component.pdf",
    products: columnComponents,
  },
  {
    slug: "vessel", name: "Vessel", group: "glass",
    tagline: "Spherical and triple wall jacketed",
    blurb: "Borosilicate process vessels — spherical vessels from 5 to 200 litres in a single neck build and a three neck build with bottom outlet, and triple wall jacketed vessels for heating, cooling and mixing duty.",
    brochure: "vessel.pdf",
    /* Capacity and pressure depend on the size of the sphere, not on the neck
       arrangement, so the general data governs the whole range and is shown
       once here rather than repeated per build. */
    refTables: [SPHERICAL_GENERAL_DATA],
    products: vessels,
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
  /* The standalone "Valves" category was retired — it never held products of
     its own and duplicated ground already covered by Glass Valves and PTFE
     Lined Valves. cat-valves.html is kept as a redirect to Glass Valves so
     old links and search results do not land on a 404. */
];
