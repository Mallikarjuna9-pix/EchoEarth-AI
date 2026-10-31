export interface ResinCodeInfo {
  code: number;
  symbol: string;
  name: string;
  fullName: string;
  curbsideAccepted: "Widely Accepted" | "Commonly Accepted" | "Specialized Drop-off Only" | "Rarely Recycled";
  safetyLevel: "High" | "Moderate" | "Strict Caution";
  commonProducts: string[];
  recycledInto: string[];
  upcyclingTips: string;
  safetyWarning: string;
}

export interface MaterialCategoryGuide {
  id: string;
  name: string;
  iconName: string;
  summary: string;
  dos: string[];
  donts: string[];
  lifespanInLandfill: string;
}

export interface RecyclableItem {
  id: string;
  name: string;
  category: "Plastics" | "Paper & Cardboard" | "Glass" | "Metals" | "Textiles" | "Electronics & Hazardous" | "Organics";
  disposalMethod: "Curbside Blue Bin" | "Store Drop-off" | "Specialized E-Waste Drop-off" | "Compost Bin" | "Upcycle First / Trash";
  curbside: boolean;
  preparation: string;
  upcyclePotential: "High" | "Medium" | "Low";
  upcycleIdea: string;
}

export const RESIN_CODES: ResinCodeInfo[] = [
  {
    code: 1,
    symbol: "♳",
    name: "PET or PETE",
    fullName: "Polyethylene Terephthalate",
    curbsideAccepted: "Widely Accepted",
    safetyLevel: "Moderate",
    commonProducts: ["Single-use water bottles", "Soda bottles", "Peanut butter jars", "Salad dressing containers", "Mouthwash bottles"],
    recycledInto: ["Fleece jackets", "Backpack fibers", "Carpet", "Strapping", "New beverage containers"],
    upcyclingTips: "Ideal for sub-irrigation seed pots, drip watering spikes, hanging bird feeders, and desktop pencil holders.",
    safetyWarning: "Never heat or melt PET; release of volatile chemicals. Do not reuse for hot liquids or indefinite drinking refills.",
  },
  {
    code: 2,
    symbol: "♴",
    name: "HDPE",
    fullName: "High-Density Polyethylene",
    curbsideAccepted: "Widely Accepted",
    safetyLevel: "High",
    commonProducts: ["Milk jugs", "Laundry detergent jugs", "Shampoo & conditioner bottles", "Bleach bottles", "Motor oil containers (clean)"],
    recycledInto: ["Plastic lumber", "Picnic tables", "Drying racks", "Drainage pipes", "Recycling bins"],
    upcyclingTips: "High structural toughness; great for scoopers, dustpans, durable garden plant tags, and tool caddies.",
    safetyWarning: "Food containers are safe to clean; never upcycle containers that previously stored bleach, pesticides, or motor oil.",
  },
  {
    code: 3,
    symbol: "♵",
    name: "PVC",
    fullName: "Polyvinyl Chloride",
    curbsideAccepted: "Rarely Recycled",
    safetyLevel: "Strict Caution",
    commonProducts: ["Plumbing pipes", "Vinyl flooring", "Garden hoses", "Clear blister packs", "Inflatable pool toys"],
    recycledInto: ["Speed bumps", "Decking panels", "Flooring tiles", "Mud flaps"],
    upcyclingTips: "Rigid pipes can be cut into tool rack holders and seedling organizers.",
    safetyWarning: "DO NOT BURN OR HEAT PVC. Releases hydrogen chloride and dioxins. Do not use for food or drinking water vessels.",
  },
  {
    code: 4,
    symbol: "♶",
    name: "LDPE",
    fullName: "Low-Density Polyethylene",
    curbsideAccepted: "Specialized Drop-off Only",
    safetyLevel: "High",
    commonProducts: ["Grocery shopping bags", "Bread bags", "Squeezable sauce bottles", "Bubble wrap", "Six-pack rings"],
    recycledInto: ["Trash can liners", "Floor tiles", "Shipping envelopes", "Compost bins"],
    upcyclingTips: "Plastic films can be fused between parchment paper into waterproof craft tarps or woven into plarn (plastic yarn) totes.",
    safetyWarning: "Never place thin film bags into curbside bins—they tangle in municipal conveyor belts and shut down sorting plants.",
  },
  {
    code: 5,
    symbol: "♷",
    name: "PP",
    fullName: "Polypropylene",
    curbsideAccepted: "Commonly Accepted",
    safetyLevel: "High",
    commonProducts: ["Yogurt tubs", "Medicine bottles", "Bottle caps", "Microwaveable food takeout trays", "Drinking straws"],
    recycledInto: ["Battery cable casings", "Bicycle racks", "Brooms & brushes", "Storage totes"],
    upcyclingTips: "Heat-tolerant and durable; ideal for seed starters, drawer screw/bead dividers, and paint mixing cups.",
    safetyWarning: "Ensure food residue is completely sanitized before crafting. Keep caps screwed onto bottles so they don't fall through sorters.",
  },
  {
    code: 6,
    symbol: "♸",
    name: "PS",
    fullName: "Polystyrene (Styrofoam)",
    curbsideAccepted: "Rarely Recycled",
    safetyLevel: "Strict Caution",
    commonProducts: ["Disposable coffee cups", "Egg cartons (foam)", "Packing peanuts", "Takeout clamshells", "Clear CD cases"],
    recycledInto: ["Thermal insulation panels", "License plate frames", "Rulers", "Foam molding"],
    upcyclingTips: "Packing peanuts can be used for potting soil aeration base. Rigid polystyrene can be drawn on and oven-shrunk into charms.",
    safetyWarning: "Highly brittle, easily fractures into microplastics. Flammable—keep away from open flames and food heating.",
  },
  {
    code: 7,
    symbol: "♹",
    name: "OTHER",
    fullName: "Polycarbonate, PLA Bioplastics & Composites",
    curbsideAccepted: "Specialized Drop-off Only",
    safetyLevel: "Moderate",
    commonProducts: ["Large 5-gallon water cooler jugs", "Baby bottles (older polycarbonate)", "Sunglasses", "PLA compostable cups", "Multi-layer pouches"],
    recycledInto: ["Plastic lumber", "Custom industrial molded goods"],
    upcyclingTips: "Water cooler jugs make exceptional miniature green mini-greenhouses and sub-irrigation reservoir tanks.",
    safetyWarning: "Bioplastics (PLA) cannot be recycled with conventional PET/HDPE; they contaminate the petroleum recycle stream.",
  },
];

export const MATERIAL_GUIDES: MaterialCategoryGuide[] = [
  {
    id: "plastics",
    name: "Plastics & Polymers",
    iconName: "Recycle",
    summary: "Plastics are classified by resin codes 1–7. Codes 1 (PET) and 2 (HDPE) are the most readily recyclable. Films (bags/bubble wrap) require grocery store drop-off bins.",
    dos: [
      "Keep plastic caps on bottles so optical sorters don't drop them.",
      "Empty liquids and rinse oily condiments with cold water.",
      "Check the stamped chasing arrows number on the bottom of containers.",
      "Flatten plastic bottles to preserve truck hauling capacity."
    ],
    donts: [
      "Never bag your recyclables in plastic grocery bags (keep them loose in bin).",
      "Do not toss plastic wrap, bubble wrap, or bags into curbside bins.",
      "Never put plastic utensils or straws in curbside recycling."
    ],
    lifespanInLandfill: "400 - 1,000 years"
  },
  {
    id: "paper",
    name: "Paper & Cardboard",
    iconName: "Package",
    summary: "Clean corrugated cardboard and paperboard are among the highest-demand circular commodities. Can be re-pulped 5 to 7 times before fibers become too short.",
    dos: [
      "Flatten all cardboard boxes before placing them in the bin.",
      "Remove plastic bubble mailers or plastic film tape where possible.",
      "Tear off clean lids of pizza boxes and recycle only the grease-free parts.",
      "Keep paper dry; wet paper turns to mush and contaminates fiber bales."
    ],
    donts: [
      "Do not recycle greasy or cheese-soaked pizza box bases (compost them).",
      "Do not recycle thermal receipts (contain BPA/BPS coatings).",
      "Do not recycle wax-coated or foil-lined gift wrap."
    ],
    lifespanInLandfill: "2 months - 5 years (produces methane in anaerobic landfills)"
  },
  {
    id: "glass",
    name: "Glass Bottles & Jars",
    iconName: "Wine",
    summary: "100% infinitely recyclable without any loss in purity or quality. Recycling 1 glass bottle saves enough energy to power an LED lightbulb for 25 hours.",
    dos: [
      "Rinse food and beverage containers cleanly.",
      "Metal lids can usually be recycled—check if your facility prefers them separate or on.",
      "Recycle clear, amber, and emerald green bottles."
    ],
    donts: [
      "Never mix Pyrex, ovenware, or ceramics with bottle glass (they melt at higher temps).",
      "Do not recycle mirrors, window panes, or drinking glasses in curbside bins.",
      "Do not recycle incandescent or fluorescent lightbulbs in standard bins."
    ],
    lifespanInLandfill: "Over 1,000,000 years (indefinite)"
  },
  {
    id: "metals",
    name: "Metals & Aluminum",
    iconName: "Shield",
    summary: "Aluminum cans can be recycled, melted, and back on a supermarket shelf as a new can in as little as 60 days. Recycling saves 95% of the energy needed for virgin bauxite mining.",
    dos: [
      "Recycle aluminum beverage cans and steel soup/food cans.",
      "Ball clean aluminum foil into a ball at least 5cm wide so machines catch it.",
      "Rinse food cans to deter pests."
    ],
    donts: [
      "Do not crush aluminum cans if your city uses single-stream sorting (may be misidentified as paper).",
      "Never recycle empty propane camping tanks or pressurized gas cylinders in curbside bins.",
      "Do not put pots, pans, or scrap automotive metal in household curbside bins."
    ],
    lifespanInLandfill: "80 - 500 years"
  },
  {
    id: "electronics",
    name: "Electronics & Lithium Batteries",
    iconName: "BatteryCharging",
    summary: "E-waste contains precious rare earths (gold, copper, lithium) and hazardous heavy metals (lead, cadmium). Batteries must NEVER enter household trash due to fire risks.",
    dos: [
      "Take rechargeable lithium-ion batteries to hardware store drop-offs (Home Depot, Best Buy, etc.).",
      "Tape battery terminals with scotch or electrical tape before drop-off.",
      "Wipe personal data from old smartphones and donate or recycle at e-waste drives.",
      "Collect old power cords and USB cables for specialized copper scrap recycling."
    ],
    donts: [
      "CRITICAL: Never put batteries in household trash or recycling bins (causes truck fires).",
      "Do not break fluorescent light tubes (contain mercury vapor).",
      "Do not dismantle swollen or pierced lithium-ion battery packs."
    ],
    lifespanInLandfill: "1,000+ years (leaches heavy metals into groundwater)"
  },
  {
    id: "textiles",
    name: "Textiles & Old Clothes",
    iconName: "Shirt",
    summary: "Fast fashion generates 92 million tons of textile waste annually. Synthetic fabrics (polyester, nylon) shed microplastics, while natural cotton uses 2,700 liters of water per shirt.",
    dos: [
      "Donate clean, wearable clothing to local shelters, thrift stores, or clothing swaps.",
      "Cut worn t-shirts and towels into washable household cleaning rags.",
      "Braid denim strips into durable pet tug toys or acoustic plant mats.",
      "Drop off worn garments at specialized textile recycling drop boxes."
    ],
    donts: [
      "Never put clothing, shoes, or blankets into curbside blue bins (tangles sorting machinery).",
      "Do not donate soiled, mildewed, or oil-stained textiles."
    ],
    lifespanInLandfill: "20 - 200 years (synthetics never fully biodegrade)"
  }
];

export const RECYCLING_DIRECTORY_ITEMS: RecyclableItem[] = [
  {
    id: "plastic-water-bottle",
    name: "Plastic Water / Soda Bottle (#1 PET)",
    category: "Plastics",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Empty liquid, keep plastic screw cap on, flatten to save bin space.",
    upcyclePotential: "High",
    upcycleIdea: "Cut into self-watering seed planter, drip irrigator, or bird feeder."
  },
  {
    id: "milk-jug",
    name: "Milk Jug / Detergent Bottle (#2 HDPE)",
    category: "Plastics",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Rinse with cold water, replace screw cap.",
    upcyclePotential: "High",
    upcycleIdea: "Cut handle into a heavy-duty garden soil scoop or workshop funnel."
  },
  {
    id: "yogurt-tub",
    name: "Yogurt / Margarine Tub (#5 PP)",
    category: "Plastics",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Rinse cleanly, check if municipal program accepts #5 polypropylene.",
    upcyclePotential: "High",
    upcycleIdea: "Use as stackable drawer dividers for nails, screws, beads, or desk pins."
  },
  {
    id: "plastic-shopping-bag",
    name: "Plastic Grocery Bag / Bread Bag (#4 LDPE)",
    category: "Plastics",
    disposalMethod: "Store Drop-off",
    curbside: false,
    preparation: "NEVER in curbside bin! Bundle clean dry bags at grocery store collection bins.",
    upcyclePotential: "Medium",
    upcycleIdea: "Fuse between baking sheets into a durable water-resistant craft tote."
  },
  {
    id: "cardboard-shipping-box",
    name: "Corrugated Cardboard Box",
    category: "Paper & Cardboard",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Break down flat, remove excess plastic tape, keep dry.",
    upcyclePotential: "High",
    upcycleIdea: "Desktop organizer with toilet paper tube slots or sheet mulching garden bed."
  },
  {
    id: "pizza-box",
    name: "Pizza Delivery Box",
    category: "Paper & Cardboard",
    disposalMethod: "Compost Bin",
    curbside: false,
    preparation: "Greasy cheese sections cannot be recycled into paper (compost instead). Tear off clean top lid for paper recycling.",
    upcyclePotential: "Medium",
    upcycleIdea: "Weed barrier under mulch or solar oven craft experiment."
  },
  {
    id: "egg-carton-cardboard",
    name: "Molded Pulp Egg Carton",
    category: "Paper & Cardboard",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Completely compostable or recyclable in paper stream.",
    upcyclePotential: "High",
    upcycleIdea: "Biodegradable seedling starter tray; plant directly into garden soil."
  },
  {
    id: "aluminum-soda-can",
    name: "Aluminum Beverage Can",
    category: "Metals",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Empty liquid. Do not crush if municipal plant uses optical shape sorters.",
    upcyclePotential: "High",
    upcycleIdea: "Embossed plant identification markers or desk pen holder."
  },
  {
    id: "steel-soup-can",
    name: "Tin / Steel Food Can",
    category: "Metals",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Rinse thoroughly; tuck cut metal lid inside the can and crimp slightly shut.",
    upcyclePotential: "High",
    upcycleIdea: "Punched tin candle lantern or herb planter with bottom drainage hole."
  },
  {
    id: "aluminum-foil",
    name: "Clean Aluminum Foil & Pie Pans",
    category: "Metals",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Wipe off food oil. Ball foil together until it's at least 5cm in diameter.",
    upcyclePotential: "Medium",
    upcycleIdea: "Fold and cut with scissors to sharpen dull scissor blades."
  },
  {
    id: "glass-food-jar",
    name: "Glass Pickle / Sauce Jar",
    category: "Glass",
    disposalMethod: "Curbside Blue Bin",
    curbside: true,
    preparation: "Rinse food residue, recycle metal lid alongside.",
    upcyclePotential: "High",
    upcycleIdea: "Plant propagation station, bathroom cotton ball jar, or bulk pantry storage."
  },
  {
    id: "pyrex-cookware",
    name: "Broken Pyrex / Ceramic Baking Dish",
    category: "Glass",
    disposalMethod: "Upcycle First / Trash",
    curbside: false,
    preparation: "NOT curbside recyclable! Borosilicate glass melts at higher temperature and contaminates glass batches.",
    upcyclePotential: "Medium",
    upcycleIdea: "Crush safely with hammer in canvas bag for decorative mosaic garden stones."
  },
  {
    id: "lithium-batteries",
    name: "Lithium-Ion Rechargeable Battery (Phone/Laptop)",
    category: "Electronics & Hazardous",
    disposalMethod: "Specialized E-Waste Drop-off",
    curbside: false,
    preparation: "CRITICAL: Place clear tape over electrical contacts. Drop off at Call2Recycle or hardware store.",
    upcyclePotential: "Low",
    upcycleIdea: "Never disassemble batteries; high risk of thermal runaway fire."
  },
  {
    id: "aa-alkaline-batteries",
    name: "Single-Use Alkaline Batteries (AA, AAA, 9V)",
    category: "Electronics & Hazardous",
    disposalMethod: "Specialized E-Waste Drop-off",
    curbside: false,
    preparation: "Tape terminals of 9V batteries. Check city guidelines (some allow trash, but drop-off recovers zinc).",
    upcyclePotential: "Low",
    upcycleIdea: "Use in battery tester before discarding; often have remaining low-draw charge."
  },
  {
    id: "old-cables-chargers",
    name: "Old Charging Cables & Power Bricks",
    category: "Electronics & Hazardous",
    disposalMethod: "Specialized E-Waste Drop-off",
    curbside: false,
    preparation: "Collect in bag for electronics recycling drive to recover high-grade copper.",
    upcyclePotential: "Medium",
    upcycleIdea: "Twist wires for garden plant staking or craft structural supports."
  },
  {
    id: "worn-tshirt",
    name: "Worn Cotton T-Shirt",
    category: "Textiles",
    disposalMethod: "Store Drop-off",
    curbside: false,
    preparation: "Wash clean. Drop at textile collection bin if unwearable.",
    upcyclePotential: "High",
    upcycleIdea: "Cut into seamless continuous t-shirt yarn for macrame plant hangers or dusting rags."
  },
  {
    id: "worn-denim-jeans",
    name: "Outgrown / Frayed Denim Jeans",
    category: "Textiles",
    disposalMethod: "Store Drop-off",
    curbside: false,
    preparation: "Clean, dry condition.",
    upcyclePotential: "High",
    upcycleIdea: "Tough pocket organizers, hot pot trivets, or braided pet chew toys."
  },
  {
    id: "styrofoam-cups",
    name: "Polystyrene Foam Coffee Cups & Clamshells (#6 PS)",
    category: "Plastics",
    disposalMethod: "Upcycle First / Trash",
    curbside: false,
    preparation: "Most cities cannot recycle. Dispose in general waste unless specialized foam facility exists.",
    upcyclePotential: "Medium",
    upcycleIdea: "Break into chunks as lightweight drainage filler at bottom of large outdoor flower pots."
  },
  {
    id: "coffee-grounds",
    name: "Used Coffee Grounds & Filters",
    category: "Organics",
    disposalMethod: "Compost Bin",
    curbside: true,
    preparation: "Paper filters and grounds can both be placed straight into green compost bin.",
    upcyclePotential: "High",
    upcycleIdea: "Mix into acid-loving plant soil (blueberries, hydrangeas) or natural odor absorber in fridge."
  },
  {
    id: "thermal-receipts",
    name: "Glossy Thermal Cash Register Receipts",
    category: "Paper & Cardboard",
    disposalMethod: "Upcycle First / Trash",
    curbside: false,
    preparation: "Dispose in trash. Coated with BPA or BPS chemicals that contaminate recycled paper fibers.",
    upcyclePotential: "Low",
    upcycleIdea: "Opt for digital email receipts when shopping."
  }
];
