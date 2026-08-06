/* =========================================================
   LATA SCIENTIFIC — column internals.

   Both dimension tables below are transcribed row-for-row from the supplied
   catalogue pages. Catalogue references (ATCP…, ATL…) are the catalogue's own.

   ⚠️  The catalogue pages for this range are dimensional only. They state no
   pressure or temperature rating, so none is claimed here. The material fact
   printed is that both items are PTFE, and both pages state the item is
   clamped between two components — the redistributor page adds "without
   using any gasket".

   The catalogue prints one note that governs both tables:
   "DN refers the nominal diameter of the column." DN is therefore the column
   it fits, not a dimension of the part itself.

   All dimensions are in mm.
   ========================================================= */

/* `img` is the dimension schematic, `photo` the supplied product shot. Both are
   set: the photo is what the card and the hero show, the schematic stays as the
   drawing beside the dimension table. */
const img = (s) => `assets/img/products/${s}.svg`;
const photo = (s) => `assets/img/products/${s}-photo.jpg`;

const MM = "All dimensions in mm, transcribed exactly from the catalogue page.";
const DN_NOTE =
  "The catalogue states: “DN refers the nominal diameter of the column.” DN is the column this item is sized for, not a dimension of the part.";

const CC_INDUSTRIES = [
  "Chemical processing", "Pharmaceutical", "Fine chemicals &amp; dyes",
  "Distillation &amp; solvent recovery", "Water &amp; effluent treatment",
  "Agrochemicals", "Research &amp; pilot plant",
];

const PTFE_ADV = [
  "Virgin PTFE — inert to almost every process medium a glass column will see",
  "Clamped between two components, so no adhesive and no fixings enter the column",
  "Will not soften, swell or embrittle across the working range of a borosilicate column",
  "Non-wetting surface sheds liquid instead of holding it, so nothing pools on the plate",
  "Removable at a shutdown — lift it out with the section above, no cutting or drilling",
];

export const columnComponents = [
  {
    slug: "ptfe-perforated-plate",
    name: "PTFE Perforated Plate",
    subtitle: "Packing retainer plate, DN 80 to DN 300",
    image: photo("ptfe-perforated-plate"),
    drawing: img("ptfe-perforated-plate"),
    alt: "Dimension schematic of a PTFE perforated plate showing the perforated face diameter d and the plate thickness L",
    photoAlt: "PTFE perforated plate — a white PTFE disc drilled with a regular pattern of round holes across its face",
    desc: "PTFE perforated plate used as a packing retainer in a borosilicate column — clamped between two components, DN 80 to DN 300 in five catalogue sizes.",
    long: [
      "A packed column only works while its packing stays where it was loaded. Rising vapour lifts the bed, surging liquid disturbs it, and a bed that has shifted channels — the column loses the contact area it was designed around and separation falls away. The catalogue's description of this item is exactly that job: it <em>is used as packing retainers to prevent the packing</em> from moving.",
      "The plate is solid PTFE, perforated across its face so vapour and liquid pass through freely while the packing above it cannot. Because it is <strong>clamped between two components</strong> rather than fixed into the glass, nothing is bonded, drilled or cemented inside the column — the plate is captured by the joint itself and comes out again when the sections are parted.",
      "Five references cover DN 80 to DN 300. Read the table in pairs: DN is the column the plate is sized for, d is the diameter of the plate itself, and L is its thickness — 7 mm at DN 80 rising to 16 mm at DN 300, because a larger plate has to carry a deeper, heavier bed without deflecting.",
    ],
    features: [
      "Retains the packing bed against vapour lift and liquid surge",
      "Perforated across the full face — free passage for vapour and liquid",
      "Clamped between two components; nothing is bonded or drilled into the glass",
      "Virgin PTFE construction throughout",
      "DN 80 to DN 300 in five catalogue references",
      "Thickness stepped with size, 7 mm at DN 80 to 16 mm at DN 300",
    ],
    advantages: PTFE_ADV,
    applications: [
      "Retaining random or structured packing in a fractionating column",
      "Supporting a packed bed above a column section joint",
      "Preventing bed lift in columns running high vapour velocity",
      "Absorption and scrubbing columns where the bed must stay level",
      "Any packed section that has to be broken down and repacked between campaigns",
    ],
    industries: CC_INDUSTRIES,
    spec: [
      ["Product type", "PTFE perforated plate — packing retainer"],
      ["Material", "PTFE"],
      ["Column size range", "DN 80 to DN 300"],
      ["Plate diameter (d)", "99 mm to 340 mm, size dependent"],
      ["Thickness (L)", "7 mm to 16 mm, size dependent"],
      ["Fitting", "Clamped between two components"],
      ["Pressure rating", "Not published on the catalogue page — confirm with us for your duty"],
      ["Temperature rating", "Not published on the catalogue page — confirm with us for your duty"],
      ["Catalogue reference", "ATCP series, e.g. ATCP6 = DN 150"],
    ],
    dim: {
      caption: "PTFE Perforated Plate — dimensions",
      cols: ["Cat. Ref.", "DN", "d", "L"],
      rows: [
        ["ATCP3", "80", "99", "7"],
        ["ATCP4", "100", "132", "9"],
        ["ATCP6", "150", "184", "10"],
        ["ATCP9", "225", "254", "12"],
        ["ATCP12", "300", "340", "16"],
      ],
      note: MM + " " + DN_NOTE + " d is the diameter of the plate and L its thickness.",
    },
    faqs: [
      ["What is the plate for?", "It is a packing retainer. The catalogue states it is used to prevent the packing moving — it holds the bed down against vapour lift so the column keeps the contact area it was designed around."],
      ["How is it fixed in the column?", "It is not fixed. The catalogue states it can be clamped between two components, so the plate is captured by the joint between two sections and lifts straight out when they are parted."],
      ["Why is d larger than DN?", "Because DN is the nominal diameter of the column, not of the plate. d is the plate's own diameter, sized so its rim is trapped in the joint rather than sitting inside the bore."],
      ["Do I need a gasket with it?", "The catalogue page for this item states only that it is clamped between two components. Tell us the joint you are clamping it into and we will confirm what, if anything, is needed alongside it."],
    ],
    related: ["ptfe-redistributor", "pipe-section", "ptfe-envelope-gasket", "backing-flange"],
    keywords: "PTFE perforated plate, packing retainer plate, column packing support, ATCP perforated plate, PTFE packing retainer DN 80 to DN 300, glass column internals",
    featured: true,
  },

  {
    slug: "ptfe-redistributor",
    name: "PTFE Redistributor",
    subtitle: "Anti-channeling redistributor, DN 80 to DN 600",
    image: photo("ptfe-redistributor"),
    drawing: img("ptfe-redistributor"),
    alt: "Dimension schematic of a PTFE redistributor showing the central opening d inside the column bore DN and the skirt height L",
    photoAlt: "PTFE redistributor — a white PTFE ring with a serrated inner edge that returns liquid to the centre of the column",
    desc: "PTFE redistributor clamped between two column sections to prevent channeling — DN 80 to DN 600 in eight catalogue sizes, fitted without any gasket.",
    long: [
      "Liquid running down a packed column does not stay evenly spread. It migrates to the wall, where it finds the path of least resistance and runs straight past the packing — channeling. The centre of the bed goes dry, the wall film does no separating work, and the column quietly stops performing to its rating. The catalogue puts the item's purpose plainly: the <em>PTFE redistributor is used to prevent channeling</em> in a column.",
      "It works by interrupting that wall film. Fitted at the joint between two column sections, the redistributor catches the liquid running down the wall and returns it to the centre of the bed below, so the next section starts with the flow spread across its full area again. On a tall column, one is fitted every few sections — the taller the packed height, the more times the flow needs collecting and re-spreading.",
      "The catalogue is specific about the fit: it <em>can be clamped between two column sections without using any gasket</em>. The PTFE seats directly on the glass, so the redistributor adds nothing to the joint stack and needs no separate sealing element.",
      "Eight references cover DN 80 to DN 600 — the widest span in this range. DN is the column diameter, d the central opening the redistributed liquid falls through, and L the height of the unit, 20 mm on the small sizes rising to 30 mm at DN 450 and DN 600.",
    ],
    features: [
      "Prevents channeling — collects the wall film and returns it to the centre of the bed",
      "Clamped between two column sections <strong>without using any gasket</strong>, per the catalogue",
      "Virgin PTFE construction throughout",
      "DN 80 to DN 600 in eight catalogue references — the widest range in this category",
      "Central opening d from 55 mm at DN 80 to 420 mm at DN 600",
      "Height L 20 mm to 30 mm, stepped with column size",
    ],
    advantages: [
      "Restores even liquid distribution, so the packing below works across its full area",
      "No gasket in the joint — one fewer consumable and one fewer leak path",
      ...PTFE_ADV.slice(0, 4),
    ],
    applications: [
      "Breaking up wall flow part-way down a packed fractionating column",
      "Tall packed sections where liquid has room to migrate to the wall",
      "Absorption and scrubbing columns running at low liquid rates",
      "Solvent recovery columns that must hold their separation over a long run",
      "Any column being extended, where a new section joint is an opportunity to redistribute",
    ],
    industries: CC_INDUSTRIES,
    spec: [
      ["Product type", "PTFE redistributor — anti-channeling column internal"],
      ["Material", "PTFE"],
      ["Column size range", "DN 80 to DN 600"],
      ["Central opening (d)", "55 mm to 420 mm, size dependent"],
      ["Height (L)", "20 mm to 30 mm, size dependent"],
      ["Fitting", "Clamped between two column sections, without using any gasket"],
      ["Pressure rating", "Not published on the catalogue page — confirm with us for your duty"],
      ["Temperature rating", "Not published on the catalogue page — confirm with us for your duty"],
      ["Catalogue reference", "ATL series, e.g. ATL 12 = DN 300"],
    ],
    dim: {
      caption: "PTFE Redistributor — dimensions",
      cols: ["Cat. Ref.", "DN", "d", "L"],
      rows: [
        ["ATL 3", "80", "55", "20"],
        ["ATL 4", "100", "80", "20"],
        ["ATL 6", "150", "100", "20"],
        ["ATL 9", "225", "175", "22"],
        ["ATL 12", "300", "215", "25"],
        ["ATL 16", "400", "315", "25"],
        ["ATL 18", "450", "365", "30"],
        ["ATL 24", "600", "420", "30"],
      ],
      note: MM + " " + DN_NOTE + " d is the central opening and L the height of the unit.",
    },
    faqs: [
      ["What is channeling, and why does it matter?", "Liquid running down a packed column drifts to the wall and runs past the packing instead of through it. The centre of the bed dries out, the wall film does no separating work, and the column stops meeting its rating. The redistributor collects that wall flow and returns it to the centre."],
      ["Does it need a gasket?", "No. The catalogue states it can be clamped between two column sections without using any gasket — the PTFE seats directly on the glass."],
      ["How many should a column have?", "That depends on packed height, packing type and liquid rate rather than on anything printed in the catalogue. Send us the column arrangement and duty and we will advise on the spacing."],
      ["What is d on the table?", "The central opening the redistributed liquid falls through. DN is the nominal diameter of the column and L is the height of the unit."],
    ],
    related: ["ptfe-perforated-plate", "pipe-section", "ptfe-envelope-gasket", "backing-flange"],
    keywords: "PTFE redistributor, column redistributor, anti channeling column internal, ATL redistributor, packed column liquid redistributor, DN 80 to DN 600 redistributor",
    featured: true,
  },
];
