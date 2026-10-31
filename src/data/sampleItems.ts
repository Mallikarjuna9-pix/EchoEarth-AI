import { SampleItem, AnalysisResult } from "../types";

export const SAMPLE_WASTE_ITEMS: SampleItem[] = [
  {
    id: "pet-water-bottle",
    name: "Crumpled Plastic Water Bottle",
    category: "Plastic",
    materialGuess: "PET #1 Plastic",
    description: "Standard 500ml single-use water bottle with cap intact.",
    imageUrl: "https://images.unsplash.com/photo-1574974671999-24b7dfba0d53?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cardboard-tubes-box",
    name: "Cardboard Delivery Box & Paper Rolls",
    category: "Paperboard",
    materialGuess: "Corrugated Kraft Cardboard",
    description: "Shipping parcel carton and cardboard toilet paper tubes.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "glass-pickle-jar",
    name: "Empty Glass Food Jar",
    category: "Glass",
    materialGuess: "Soda-lime Glass with Metal Lug Cap",
    description: "Clean wide-mouth condiment jar with twist-off metal lid.",
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "aluminum-soda-can",
    name: "Aluminum Beverage Cans",
    category: "Metal",
    materialGuess: "Aluminum Alloy 3004/5182",
    description: "Empty clean 330ml soda cans with pull tabs.",
    imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "old-cotton-denim",
    name: "Worn Cotton Denim Jeans & Fabric",
    category: "Textiles",
    materialGuess: "100% Woven Cotton Denim",
    description: "Outgrown pair of blue jeans with frayed knees.",
    imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
  },
];

// Pre-packaged offline demo result for the plastic bottle if user wants an instant preview
export const PRESET_DEMO_RESULT: AnalysisResult = {
  object: "Single-Use 500ml Plastic Beverage Bottle",
  material: "Polyethylene Terephthalate (PET #1 resin) with HDPE Cap",
  confidence: "High",
  condition: "Intact cylindrical body, slightly indented sidewalls, clean threaded neck with screw cap present.",
  reusePotential: "Excellent tensile strength, waterproof barrier, and lightweight translucency make this ideal for botanical sub-irrigation, bird feeding stations, or modular desk organizing.",
  safetyNotes: [
    "Never heat, melt, or burn PET plastic; doing so releases noxious toxic fumes.",
    "Do not reuse for human food, drinking water, or hot liquids due to bacterial accumulation in micro-crevices.",
    "Smooth cut edges with fine emery cloth, masking tape, or silicone lining to prevent sharp skin nicks.",
    "Keep hanging outdoor feeders safely out of reach of domestic predators."
  ],
  disposalAdvice: "If unusable, rinse thoroughly, crush flat to conserve bin volume, keep cap screwed on, and deposit in your municipal #1 PET plastics recycling stream.",
  ideas: [
    {
      title: "Self-Watering Sub-Irrigation Seed Pot",
      category: "Gardening & Plants",
      description: "A two-piece botanical planter that uses capillary cotton wicking to hydrate herb seeds and houseplant cuttings automatically.",
      difficulty: "Easy",
      time: "15 minutes",
      materials: ["Potting soil", "Cotton string or shoelace wick", "Herb seeds (basil or mint)"],
      tools: ["Household scissors", "Pushpin or nail for aeration holes"],
      steps: [
        "Cut the bottle horizontally approximately 10cm below the neck opening using sharp craft scissors.",
        "Invert the top funnel section upside down so it nests snugly inside the lower cylindrical base.",
        "Thread an 18cm cotton wick through the bottle opening, knotting it inside so half sits in the soil and half drapes into the water reservoir below.",
        "Fill the lower reservoir with 4cm of room-temperature water.",
        "Add potting mix into the inverted funnel, insert seeds or cutting, and watch capillary action keep roots moist without overwatering."
      ],
      proTips: [
        "Cover the outside with dark paper or twine wrap to prevent algae formation in the sunlit water chamber."
      ],
      estimatedCostUSD: "$0 - $1",
      impact: "Replaces store-bought plastic seed starting pots and prevents 32g of single-use PET from landfill.",
      estimatedGramsSaved: 32,
      estimatedDollarsSaved: 6
    },
    {
      title: "Wild Bird Perch & Gravity Feeder",
      category: "Pet Care & Birds",
      description: "A weather-resistant garden bird feeder utilizing wooden spoons as perches and feed-dispensing troughs.",
      difficulty: "Easy",
      time: "20 minutes",
      materials: ["Wild bird seed mix", "Natural twine or wire for hanging", "Two old wooden spoons or dowels"],
      tools: ["Pushpin or utility punch", "Household scissors"],
      steps: [
        "Thoroughly wash and air-dry the bottle completely to prevent seeds from molding.",
        "Pierce two opposite holes 8cm from the bottle base, sized slightly larger than the wooden spoon handle.",
        "Insert the spoon completely across so the handle extends out one side and the bowl faces upright on the other.",
        "Make a small crescent cut directly 5mm above the spoon bowl so seed gently spills onto the spoon bowl when birds peck.",
        "Repeat with the second spoon rotated 90 degrees higher up the bottle for multi-tier feeding.",
        "Loop natural twine securely around the threaded neck, fill with seed, cap it, and hang from a tree branch."
      ],
      proTips: [
        "Drill 3 tiny drainage pinholes in the very bottom of the bottle to prevent rainwater pooling inside."
      ],
      estimatedCostUSD: "$0 - $2",
      impact: "Avoids purchasing commercial plastic bird feeders and nourishes local biodiversity.",
      estimatedGramsSaved: 35,
      estimatedDollarsSaved: 14
    },
    {
      title: "Precision Micro-Drip Root Irrigator",
      category: "Gardening & Plants",
      description: "A subterranean drip irrigation stake that delivers moisture straight to deep tomato and shrub root systems while conserving 70% of surface evaporation water.",
      difficulty: "Easy",
      time: "10 minutes",
      materials: ["Scrap wire or garden stake (optional)", "Coarse gravel for weight"],
      tools: ["Safety pin or sewing needle"],
      steps: [
        "Take the screw cap and puncture 3-4 micro-holes with a heated safety pin.",
        "Cut off the very bottom 2cm of the bottle base to serve as an open water-funnel top.",
        "Screw the perforated cap firmly back onto the spout.",
        "Excavate a 12cm deep pocket right beside your thirsty plant or container tomato.",
        "Bury the inverted bottle snout-down in the soil, leaving the top 4cm exposed.",
        "Fill with water whenever passing by; water slowly percolates directly to root level over 6-8 hours without surface evaporation."
      ],
      proTips: [
        "Slip a scrap of old pantyhose or fine mesh over the spout inside the cap to prevent silt from clogging the pinholes."
      ],
      estimatedCostUSD: "$0",
      impact: "Reduces garden water usage by up to 70% and repurposes high-density bottle material for multiple growing seasons.",
      estimatedGramsSaved: 32,
      estimatedDollarsSaved: 18
    }
  ],
  overallTip: "Upcycling single-use polymers is most effective when creating durable, multi-year utility objects rather than disposable decor. Keep items out of direct UV scorching to maximize life span.",
  environmentalContext: {
    estimatedDecompositionYears: "450 - 500 years",
    lifecycleNote: "Producing virgin PET requires petroleum cracking and 100g of water per single 500ml bottle. Extending its lifespan by even 1 season saves embodied manufacturing energy.",
    circularTip: "Keep all caps on during ultimate municipal recycling—modern optical sorters process capped bottles efficiently through mechanical float-sink separation tanks."
  }
};

export const SAMPLE_PRESET_MAP: Record<string, AnalysisResult> = {
  "pet-water-bottle": PRESET_DEMO_RESULT,
  "cardboard-tubes-box": {
    object: "Corrugated Cardboard Parcel Box & Kraft Paper Tubes",
    material: "Unbleached Kraft Paperboard / Recycled Cellulose Fiber",
    confidence: "High",
    condition: "Dry, rigid structural cardboard flaps, intact cylinder cores without water damage.",
    reusePotential: "Exceptional compression strength, easy to score and slot, 100% biodegradable, and highly receptive to non-toxic water-based glue.",
    safetyNotes: [
      "Use safety rulers with non-slip backing when scoring cardboard with craft knives.",
      "Keep cardboard out of damp zones to prevent mold growth.",
      "Avoid using tape with heavy solvent adhesives if you intend to compost later."
    ],
    disposalAdvice: "Flatten completely and place in municipal paper recycling bin, or shred and add as carbon 'browns' to garden compost.",
    ideas: [
      {
        title: "Multi-Tier Desktop Stationery Organizer",
        category: "Home & Desk Organization",
        description: "A geometric desk caddy utilizing nested paper tubes inside a tailored outer carton to hold pens, cables, and scissors.",
        difficulty: "Easy",
        time: "20 minutes",
        materials: ["Scrap paper tubes", "Cardboard box flaps", "PVA craft glue or double-sided tape"],
        tools: ["Ruler", "Scissors or craft knife", "Pencil"],
        steps: [
          "Cut cardboard tubes to varying stepped heights (12cm, 9cm, 6cm) using scissors.",
          "Cut a shallow 5cm high rectangular base tray from the shipping carton flaps.",
          "Glue the tubes in clustered rows inside the tray base, placing tallest tubes at the rear.",
          "Wrap the exterior with repurposed paper or paint with leftover emulsion.",
          "Organize pens, stylus, highlighters, USB drives, and charging cables neatly."
        ],
        proTips: ["Weight the bottom base with a flat stone or coins so it stays rock-solid when full."],
        estimatedCostUSD: "$0",
        impact: "Diverts 210g of cardboard from trash and avoids buying $18 plastic desk organizers.",
        estimatedGramsSaved: 210,
        estimatedDollarsSaved: 18
      },
      {
        title: "Tangle-Free Cable Management Cubby",
        category: "Home & Desk Organization",
        description: "A honeycombed storage box that keeps charging cables, audio leads, and adapters neatly separated and labeled.",
        difficulty: "Easy",
        time: "15 minutes",
        materials: ["Shipping shoebox or delivery carton", "6-8 toilet paper tubes"],
        tools: ["Scissors", "Marker pen"],
        steps: [
          "Stand paper tubes upright inside the box until the interior is fully packed with cylinders.",
          "Label the top rim of each tube (e.g. 'USB-C', 'Lightning', 'HDMI', 'Earbuds').",
          "Fold long cables into compact loops and slide one cord per tube.",
          "Close box lid for dust-free, tangle-free storage on any shelf."
        ],
        proTips: ["No glue even needed—friction between tightly packed tubes keeps them stable."],
        estimatedCostUSD: "$0",
        impact: "Keeps electronics cords organized and prevents cable fraying or duplicate purchases.",
        estimatedGramsSaved: 180,
        estimatedDollarsSaved: 15
      },
      {
        title: "Biodegradable Seed Starter Cells",
        category: "Gardening & Plants",
        description: "Compostable seedling planting pots that decompose directly in the soil without transplant shock to delicate roots.",
        difficulty: "Easy",
        time: "10 minutes",
        materials: ["Toilet paper tubes", "Seedling compost soil", "Tomato/pepper seeds"],
        tools: ["Scissors"],
        steps: [
          "Cut each toilet paper tube in half crosswise.",
          "Make four 1.5cm vertical cuts around one end of each cylinder.",
          "Fold the four flaps inward like a cardboard carton bottom to create a self-closing base.",
          "Fill with potting soil, insert seeds, and mist with water.",
          "When seedlings develop true leaves, bury the entire cardboard cell directly in garden soil."
        ],
        proTips: ["The cardboard naturally breaks down in garden soil within 4-6 weeks, feeding earthworms."],
        estimatedCostUSD: "$0",
        impact: "Eliminates single-use plastic nursery pots and builds organic soil carbon.",
        estimatedGramsSaved: 95,
        estimatedDollarsSaved: 12
      }
    ],
    overallTip: "Cardboard is the most circular household commodity. Layer it under garden mulch for zero-chemical weed suppression (sheet mulching).",
    environmentalContext: {
      estimatedDecompositionYears: "2 - 5 months (in soil)",
      lifecycleNote: "Recycling corrugated boxes requires 75% less energy than manufacturing from virgin timber and protects mature forests.",
      circularTip: "Keep greasy food sections out of blue paper recycling bins; shred clean cardboard for high-carbon composting."
    }
  },
  "glass-pickle-jar": {
    object: "Clear Glass Condiment Jar with Steel Lug Cap",
    material: "Soda-Lime Silica Glass & Tinplated Steel Lid",
    confidence: "High",
    condition: "Clean, transparent, scratch-free, intact rim with no chips or stress fractures.",
    reusePotential: "100% non-porous, airtight when sealed, chemically inert, and infinitely recyclable without structural degradation.",
    safetyNotes: [
      "Inspect rim carefully for micro-chips before using with bare hands.",
      "Never pour boiling water directly into cold glass (thermal shock risk).",
      "Do not freeze full liquids in glass jars (expansion will crack the cylinder)."
    ],
    disposalAdvice: "Rinse cleanly and place in curbside glass recycling stream. Metal cap can be recycled alongside.",
    ideas: [
      {
        title: "Hydroponic Plant Propagation Station",
        category: "Gardening & Plants",
        description: "A water-rooting station for houseplant cuttings (pothos, monstera, herbs) with visible root growth tracking.",
        difficulty: "Easy",
        time: "10 minutes",
        materials: ["Clean glass jar", "Fresh water", "Houseplant stem cutting (pothos or basil)"],
        tools: ["Pruning snips or scissors"],
        steps: [
          "Wash the jar with warm soapy water to eliminate oil residues.",
          "Fill with room-temperature tap water.",
          "Take a 10cm plant cutting just below a leaf node.",
          "Place cutting into the jar so the node is submerged while leaves rest above the rim.",
          "Set on a windowsill with indirect sunlight and refresh water weekly until roots form."
        ],
        proTips: ["Add a drop of 3% hydrogen peroxide monthly to aerate water and prevent root rot."],
        estimatedCostUSD: "$0",
        impact: "Avoids purchasing store-bought plastic propagation tubes and expands home greenery.",
        estimatedGramsSaved: 280,
        estimatedDollarsSaved: 16
      },
      {
        title: "Perforated Shaker Jar for Baking or Garden Seed",
        category: "Home & Desk Organization",
        description: "A precision shaker dispenser for powdered sugar, cocoa powder, diatomaceous earth, or grass seed.",
        difficulty: "Easy",
        time: "10 minutes",
        materials: ["Glass jar with metal lid"],
        tools: ["Hammer and small nail or pushpin"],
        steps: [
          "Place metal lid upside-down on a scrap piece of wood.",
          "Tap 15-20 small holes through the metal using a nail and hammer.",
          "Sand the reverse side lightly with sandpaper or emery board to eliminate burrs.",
          "Fill with spices, powdered cleaner, or seed mix and screw lid tightly on."
        ],
        proTips: ["Use smaller nail holes for ground spices, larger nail holes for garden seed."],
        estimatedCostUSD: "$0",
        impact: "Replaces commercial plastic spice shakers and repurposes heavy glass indefinitely.",
        estimatedGramsSaved: 280,
        estimatedDollarsSaved: 9
      },
      {
        title: "Twine-Wrapped Ambient Candle Lantern",
        category: "Kids & Crafts",
        description: "A rustic atmospheric lantern for patios or mantels that diffuses tea light glow through textured glass.",
        difficulty: "Easy",
        time: "15 minutes",
        materials: ["Natural jute twine", "Tea light candle or LED votive", "Craft glue"],
        tools: ["Scissors"],
        steps: [
          "Apply a dot of glue just below the threaded rim.",
          "Wind jute twine tightly around the neck 10-12 times, securing with a knot.",
          "Form a 15cm hanging loop handle with the excess twine.",
          "Drop a tea light candle or battery-powered LED into the jar base."
        ],
        proTips: ["Pour 2cm of coarse sea salt or dry sand in the bottom to securely cradle the candle."],
        estimatedCostUSD: "$1",
        impact: "Diverts 280g of heavy container glass and provides multi-year decorative lighting.",
        estimatedGramsSaved: 280,
        estimatedDollarsSaved: 14
      }
    ],
    overallTip: "Glass is chemically inert and does not leach chemicals. Soak sticky labels in warm water with cooking oil and baking soda for residue-free glass.",
    environmentalContext: {
      estimatedDecompositionYears: "1,000,000+ years (indefinite)",
      lifecycleNote: "Glass is 100% infinitely recyclable. Recycling one glass container saves enough electricity to run a computer for 30 minutes.",
      circularTip: "Keep ceramics, pyrex, and window panes out of container glass recycling bins—they ruin melt furnaces."
    }
  },
  "aluminum-soda-can": {
    object: "Aluminum Beverage Soda Can 330ml",
    material: "Aluminum Alloy 3004 Body with 5182 Tab",
    confidence: "High",
    condition: "Clean, empty beverage container with pull tab.",
    reusePotential: "Malleable, rust-proof, lightweight, and exceptional thermal conductivity.",
    safetyNotes: [
      "Cut aluminum edges are razor sharp! Always crimp edges with pliers or cover with cloth tape.",
      "Wear gloves when cutting metal cans.",
      "Never put aluminum cans in microwave."
    ],
    disposalAdvice: "Place in curbside metals bin. Aluminum is the most valuable and efficiently recycled beverage container on earth.",
    ideas: [
      {
        title: "Embossed Weatherproof Garden Plant Markers",
        category: "Gardening & Plants",
        description: "Permanent metal botanical plant tags that never wash away in the rain or fade in the sun.",
        difficulty: "Easy",
        time: "15 minutes",
        materials: ["Aluminum can", "Twine or scrap wire"],
        tools: ["Household scissors", "Ballpoint pen", "Gloves"],
        steps: [
          "Wearing gloves, carefully cut off top and bottom rims to create a flat aluminum sheet.",
          "Cut the metal sheet into 2cm x 10cm plant label strips.",
          "Place a strip on a magazine mousepad, and write plant names firmly using an empty ballpoint pen.",
          "The pen leaves deep, permanent raised embossing that never fades in sunlight or rain.",
          "Punch a small hole at one end and tie with wire to your tomato stakes or herb planters."
        ],
        proTips: ["Fold 2mm of the perimeter edge over with pliers so no sharp edges remain."],
        estimatedCostUSD: "$0",
        impact: "Eliminates plastic garden markers and preserves 15g of virgin mined bauxite.",
        estimatedGramsSaved: 15,
        estimatedDollarsSaved: 8
      },
      {
        title: "Desk Pen Caddy with Fabric Edge Crimp",
        category: "Home & Desk Organization",
        description: "A compact metallic stationery cup with rolled safety rim for paintbrushes, pens, or styling tools.",
        difficulty: "Easy",
        time: "15 minutes",
        materials: ["Clean soda can", "Colored electrical tape or decorative washi tape"],
        tools: ["Can opener or craft scissors"],
        steps: [
          "Use a smooth-edge can opener or scissors to remove the top lid cleanly.",
          "Fold colored electrical tape over the cut rim, half on inside and half on outside.",
          "Rinse out interior thoroughly and dry.",
          "Group together on a desk tray for organizing pens, pencils, and craft tools."
        ],
        proTips: ["Cover exterior with scrap adhesive vinyl or fabric for a custom boutique finish."],
        estimatedCostUSD: "$0",
        impact: "Replaces store-bought plastic pen pots and saves aluminum smelting energy.",
        estimatedGramsSaved: 15,
        estimatedDollarsSaved: 10
      },
      {
        title: "Campfire Emergency Biscuit Cutter",
        category: "Workshop & Utility",
        description: "A lightweight round pastry and dumpling dough cutter.",
        difficulty: "Easy",
        time: "10 minutes",
        materials: ["Soda can"],
        tools: ["Scissors", "Pliers"],
        steps: [
          "Cut a 4cm high circular ring from the cylinder body.",
          "Crimp the top edge with pliers for a comfortable hand grip.",
          "Leave the bottom edge straight and sharp for slicing cleanly through chilled pastry dough.",
          "Wash thoroughly and store in baking drawer."
        ],
        proTips: ["The sharp edge cuts dough cleanly without sealing the layers, giving biscuits maximum rise."],
        estimatedCostUSD: "$0",
        impact: "Diverts aluminum and avoids buying specialty metal baking cutters.",
        estimatedGramsSaved: 15,
        estimatedDollarsSaved: 7
      }
    ],
    overallTip: "Aluminum can be recycled indefinitely without loss of quality. 75% of all aluminum ever mined is still in productive use today.",
    environmentalContext: {
      estimatedDecompositionYears: "80 - 200 years",
      lifecycleNote: "Recycling an aluminum can saves 95% of the energy needed to make a new one from raw bauxite ore.",
      circularTip: "Keep cans dry and empty; single-stream facilities process intact cans more easily than crushed ones."
    }
  },
  "old-cotton-denim": {
    object: "Worn Cotton Denim Blue Jeans",
    material: "100% Woven Cotton Twill with Indigo Dye",
    confidence: "High",
    condition: "Heavyweight durable twill weave with frayed knees, intact pockets and waist seams.",
    reusePotential: "Remarkable tensile abrasion resistance, insulating thermal density, and machine-washable cotton fibers.",
    safetyNotes: [
      "Use heavy-duty fabric shears to cut through thick felled denim seams.",
      "Watch out for metal rivets when cutting or sewing with household needles."
    ],
    disposalAdvice: "Donate to textile recycling drop boxes; shredded denim is converted into building acoustic and thermal insulation.",
    ideas: [
      {
        title: "Heavy-Duty Braided Pet Tug Toy",
        category: "Pet Care & Birds",
        description: "An indestructible, machine-washable braided rope toy for dogs made from sturdy denim strips.",
        difficulty: "Easy",
        time: "15 minutes",
        materials: ["Denim pant legs cut from jeans"],
        tools: ["Fabric shears or scissors"],
        steps: [
          "Cut three 8cm wide strips down the length of each pant leg (approx 60cm long).",
          "Tie the three strips together tightly at one end in a thick overhand knot.",
          "Braid the three denim strands tightly until 10cm remains at the bottom.",
          "Secure the opposite end with a second double knot.",
          "Wash in warm water to soften edges and let your dog play safely."
        ],
        proTips: ["Unlike nylon dog toys, cotton denim strands are non-toxic and clean teeth naturally as dogs chew."],
        estimatedCostUSD: "$0",
        impact: "Saves 350g of cotton fabric from landfill and replaces $15 store-bought plastic pet toys.",
        estimatedGramsSaved: 350,
        estimatedDollarsSaved: 15
      },
      {
        title: "Wall-Hanging Multi-Pocket Organizer",
        category: "Home & Desk Organization",
        description: "A vertical wall organizer using the back pockets of jeans to hold phones, remotes, sunglasses, and keys.",
        difficulty: "Easy",
        time: "20 minutes",
        materials: ["Back pockets cut from jeans", "Cardboard or wooden dowel hanger", "Craft glue or needle & thread"],
        tools: ["Scissors"],
        steps: [
          "Cut out the two back pockets from the jeans, leaving a 1cm border around the seams.",
          "Mount the pockets side-by-side onto a fabric strip or rigid cardboard backing.",
          "Add a top hanging cord made from the waistband seam.",
          "Hang near your front entrance or desk to hold sunglasses, keys, charging cords, and stationery."
        ],
        proTips: ["The original pocket rivets provide built-in heavy reinforcement that won't tear."],
        estimatedCostUSD: "$0",
        impact: "Avoids synthetic plastic wall organizers and keeps durable cotton in use.",
        estimatedGramsSaved: 220,
        estimatedDollarsSaved: 22
      },
      {
        title: "Heat-Resistant Kitchen Pot Trivet",
        category: "Workshop & Utility",
        description: "A spiral fabric hot pad that protects wooden tabletops from steaming saucepans and tea kettles.",
        difficulty: "Easy",
        time: "20 minutes",
        materials: ["Denim waistband and hem seams", "Fabric craft glue"],
        tools: ["Scissors"],
        steps: [
          "Cut the thick waistband and hem seams off the jeans into long narrow cord strips.",
          "Begin rolling the strip into a tight flat disc, applying fabric glue along the edge as you coil.",
          "Continue coiling until the spiral reaches 18cm in diameter.",
          "Clamp or weigh down with a heavy book for 30 minutes until glue cures."
        ],
        proTips: ["Cotton is naturally heat-resistant up to 200°C, making it superior to synthetic polyester pads that melt."],
        estimatedCostUSD: "$0",
        impact: "Repurposes thick seam waste that is usually rejected by basic shredders.",
        estimatedGramsSaved: 160,
        estimatedDollarsSaved: 12
      }
    ],
    overallTip: "Textiles represent the fastest-growing waste stream. Repurpose natural cotton into cleaning cloths, pet supplies, or insulation before discarding.",
    environmentalContext: {
      estimatedDecompositionYears: "10 - 50 years",
      lifecycleNote: "Producing a single pair of cotton jeans consumes over 7,500 liters of water. Upcycling honors that immense agricultural investment.",
      circularTip: "Never put clothing in curbside recycling bins; donate wearable items or drop at dedicated textile shredding bins."
    }
  }
};

