/**
 * Listings data for Serene Living.
 *
 * IMAGE PLACEHOLDERS: every image URL below is a warm/sage-toned Unsplash
 * photo, identifiable by the substring `images.unsplash.com/photo-`.
 * Find/replace these with the production photography when it lands.
 *
 * Goa listing prices are denominated in INR. Dubai and London use AED.
 */

export type Currency = "AED" | "INR" | "GBP";

export interface Review {
  reviewer: string;
  date: string;
  rating: number;
  text: string;
  country: string;
}

export interface NeighborhoodSpot {
  name: string;
  kind: string;
  note: string;
}

export interface Listing {
  id: string;
  slug: string;
  name: string;
  city: "Dubai" | "Goa" | "London";
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  currency: Currency;
  basePrice: number;
  cleaningFee: number;
  shortDescription: string;
  story: string[];
  heroImage: string;
  gallery: string[];
  amenities: string[];
  houseRules: string[];
  checkIn: string;
  checkOut: string;
  coordinates: { lat: number; lng: number };
  neighborhoodGuide: NeighborhoodSpot[];
  reviews: Review[];
  hostawayListingId: string;
  featured?: boolean;
  goaLaunch?: boolean;
}

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const baseAmenities = [
  "filtered still and sparkling water",
  "espresso machine and a pot for tea",
  "high-thread cotton linens",
  "blackout curtains in every bedroom",
  "rainfall showers and deep bathtubs",
  "smart television and a small record player",
  "fast wireless internet",
  "concierge, on call",
  "weekly housekeeping",
  "warm welcome basket on arrival",
  "in-home yoga mats",
  "luggage storage for early arrivals",
];

const baseRules = [
  "no parties or events",
  "no smoking indoors",
  "pets welcome with prior notice",
  "quiet hours after ten in the evening",
];

const dubaiReviewBank: Review[] = [
  {
    reviewer: "Annika",
    country: "Sweden",
    rating: 5,
    date: "March 2026",
    text: "We stayed for a week and didn't want to leave. The light through the curtains in the morning, the way the kitchen is laid out, the quiet of the courtyard. Everything was considered.",
  },
  {
    reviewer: "Rohan",
    country: "United Kingdom",
    rating: 5,
    date: "February 2026",
    text: "More like staying in a friend's beautiful home than a rental. The concierge sent us to a small coffee place a five minute walk away that we returned to every morning.",
  },
  {
    reviewer: "Camille",
    country: "France",
    rating: 5,
    date: "January 2026",
    text: "I work remotely and have stayed in many short term homes. This is among the few I would book again without hesitating. The chairs are comfortable, the wifi is fast, and the silence is real.",
  },
  {
    reviewer: "Yusuke",
    country: "Japan",
    rating: 5,
    date: "December 2025",
    text: "The bath alone is worth the trip. Genuinely. We came for four nights and extended to seven. The team made it feel easy.",
  },
  {
    reviewer: "Priya",
    country: "India",
    rating: 5,
    date: "November 2025",
    text: "Travelling with my parents and our toddler. The home held all of us without anyone feeling on top of each other. The welcome basket included things my mother actually liked, which never happens.",
  },
  {
    reviewer: "Daniel",
    country: "Australia",
    rating: 5,
    date: "October 2025",
    text: "Stayed three nights for a wedding. The walk-in shower, the speaker in the bedroom, the soft beige everywhere. I sent the link to four friends already.",
  },
  {
    reviewer: "Sofia",
    country: "Spain",
    rating: 5,
    date: "September 2025",
    text: "I asked for a private chef on a Tuesday for Wednesday and it happened. The concierge replied within minutes every time.",
  },
  {
    reviewer: "Marcus",
    country: "Germany",
    rating: 5,
    date: "August 2025",
    text: "Spent two weeks here while between leases. It became a small home. Even the way the towels were folded made me happy.",
  },
  {
    reviewer: "Aisha",
    country: "United Arab Emirates",
    rating: 5,
    date: "July 2025",
    text: "A staycation that did what staycations are supposed to do. We came back rested. I will be telling everyone about Serene Living.",
  },
  {
    reviewer: "Olivia",
    country: "Canada",
    rating: 5,
    date: "June 2025",
    text: "Honeymoon. The team left a small note and fresh dates on the bed. We are still talking about it.",
  },
  {
    reviewer: "Henrik",
    country: "Denmark",
    rating: 5,
    date: "May 2025",
    text: "The taste level is uncommon. Every object in the home feels chosen. Nothing is loud.",
  },
];

const goaReviews: Review[] = [
  {
    reviewer: "Tara",
    country: "India",
    rating: 5,
    date: "April 2026",
    text: "A Portuguese house quietly restored. The verandah, the slow ceiling fan, the hammock under the mango tree. I cried on the second morning and could not tell you why.",
  },
  {
    reviewer: "James",
    country: "United Kingdom",
    rating: 5,
    date: "March 2026",
    text: "We came for a long weekend and stayed eleven days. There is a particular quality of light in Assagao at four in the afternoon that the team clearly knows about.",
  },
  {
    reviewer: "Emma",
    country: "Australia",
    rating: 5,
    date: "February 2026",
    text: "Spotless, soulful, and warm. The owner left a handwritten note and a small bottle of feni in the kitchen. We're booking again for next winter.",
  },
  {
    reviewer: "Devika",
    country: "India",
    rating: 5,
    date: "January 2026",
    text: "The garden is its own room. We took every meal outside. The cook came two evenings and made the kind of fish curry I remember from childhood.",
  },
  {
    reviewer: "Niall",
    country: "Ireland",
    rating: 5,
    date: "December 2025",
    text: "A house that knows what it is. Not styled for photographs, lived in for real. I would stay here for a month if I could find the time.",
  },
];

function pickReviews(seed: number): Review[] {
  const out: Review[] = [];
  const used = new Set<number>();
  for (let i = 0; i < 5; i++) {
    let idx = (seed * 3 + i * 2) % dubaiReviewBank.length;
    while (used.has(idx)) idx = (idx + 1) % dubaiReviewBank.length;
    used.add(idx);
    out.push(dubaiReviewBank[idx]);
  }
  return out;
}

const INTERIOR_IDS = [
  "1564013799919-ab600027ffc6",
  "1600585154340-be6161a56a0c",
  "1600210492486-724fe5c67fb0",
  "1600210492493-0946911123ea",
  "1505693416388-ac5ce068fe85",
  "1493809842364-78817add7ffb",
  "1522708323590-d24dbb6b0267",
  "1567016376408-0226e4d0c1ea",
  "1502672260266-1c1ef2d93688",
  "1560448204-e02f11c3d0e2",
  "1556909114-f6e7ad7d3136",
  "1631679706909-1844bbd07221",
  "1616594039964-ae9021a400a0",
  "1615875605825-5eb9bb5d52ac",
  "1603320409990-02d834f29a1e",
  "1617806118233-18e1de247200",
  "1591088398332-8a7791972843",
  "1505691938895-1758d7feb511",
  "1598928506311-c55ded91a20c",
  "1542314831-068cd1dbfeeb",
  "1560185007-cde436f6a4d0",
  "1560448075-bb485b067938",
];

function galleryFor(seed: number, count = 8): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(U(INTERIOR_IDS[(seed * 5 + i) % INTERIOR_IDS.length], 1800));
  }
  return arr;
}

interface DubaiSeed {
  name: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  basePrice: number;
  short: string;
  story: string[];
  amenities?: string[];
  spots: NeighborhoodSpot[];
  coords: [number, number];
  hero: number;
  featured?: boolean;
}

const dubaiSeeds: DubaiSeed[] = [
  {
    name: "The Long Light, Palm Jumeirah",
    neighborhood: "Palm Jumeirah",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    basePrice: 3200,
    short:
      "A pale, generous villa on the inner trunk of the Palm. Wide windows. Slow afternoons.",
    story: [
      "The Long Light sits a few minutes from the water on the inner trunk of Palm Jumeirah. The light here arrives early and stays late, which is how the house earned its name. We restored it room by room across a slow year, taking out everything loud and putting back only what felt necessary. The result is a home that asks nothing of you.",
      "Mornings begin in the open kitchen, which faces east. There is a long oak table, a copper Italian espresso machine, and a small herb garden by the window. The living room steps down toward a private courtyard with an outdoor shower and a hammock that the owner uses more than anyone. Bedrooms are quiet, with linen the colour of dunes after rain.",
      "We send a welcome basket from a local Emirati pantry on the day you arrive. Beyond that, we leave you to your week. The concierge is one message away, and the team knows the neighbourhood well, from the best fishmonger to a yoga teacher who does private classes on the terrace.",
    ],
    spots: [
      {
        name: "Cocofly",
        kind: "Beach club",
        note: "Five minutes by car. Ask for the corner cabana.",
      },
      {
        name: "Aljomar",
        kind: "Spanish kitchen",
        note: "A long, late dinner kind of place. We know the chef.",
      },
      {
        name: "The View at the Palm",
        kind: "Lookout",
        note: "Best at dusk. Quietest on weekday evenings.",
      },
      {
        name: "Sufi Spa",
        kind: "Hammam",
        note: "A two hour ritual that resets you completely.",
      },
    ],
    coords: [25.1124, 55.139],
    hero: 0,
    featured: true,
  },
  {
    name: "The Reading Room, Dubai Marina",
    neighborhood: "Dubai Marina",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1450,
    short:
      "A quiet apartment high above the marina, with a wall of books and a deep tub.",
    story: [
      "The Reading Room is on the twenty-eighth floor of a building we like, and it surprises everyone who walks in. There are no marble counters and no chandeliers. There is a library wall, a deep linen sofa, a writing desk that faces the water, and a bath you can disappear into.",
      "We chose the building for the quiet. Even on a weekend, you cannot hear the marina from the windows. The home has two bedrooms, both with blackout curtains, and a small kitchen we use for breakfast and not much else. There is a record player and a small but well kept collection.",
      "It works as well for a writer on a deadline as for a couple on a long weekend. The marina walk is downstairs. The metro is a five minute walk. The rest of Dubai is a short drive away, and we will arrange the car if you want one.",
    ],
    spots: [
      {
        name: "Tom and Serg",
        kind: "Café",
        note: "Strong coffee, good eggs, no fuss.",
      },
      {
        name: "Pier 7",
        kind: "Dining tower",
        note: "Seven kitchens, seven floors. Asia de Cuba on five is our pick.",
      },
      {
        name: "Marina Walk",
        kind: "Promenade",
        note: "Quietest at sunrise. Run the full loop in forty minutes.",
      },
      {
        name: "Jumeirah Mosque",
        kind: "Cultural visit",
        note: "Twenty minutes away. Tours from a small entrance on the left.",
      },
    ],
    coords: [25.0808, 55.1403],
    hero: 1,
    featured: true,
  },
  {
    name: "The Slow Apartment, Downtown",
    neighborhood: "Downtown",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    basePrice: 1100,
    short:
      "A small one-bedroom near the Opera, with a balcony that looks at the fountains.",
    story: [
      "The Slow Apartment is for two. It looks across at the fountains, which are loud at the right time and silent the rest of the time. The home is one bedroom, one bath, one quiet living room, and a balcony that fits two chairs and a small table.",
      "We furnished it with one rule. Nothing in here gets in your way. The sofa is deep, the bed firm, the lighting warm. The kitchen has what you need for a long breakfast and not much else, because the city is right outside.",
      "It is a short walk to the Opera, to the Dubai Mall, to the small streets around the Old Town. We will book you a table anywhere you like, with enough notice.",
    ],
    spots: [
      {
        name: "Dubai Opera",
        kind: "Concert hall",
        note: "Walk over. The bar on the third floor is good before a show.",
      },
      {
        name: "Arabian Tea House",
        kind: "Lunch",
        note: "Old town. Sit in the courtyard.",
      },
      {
        name: "Boulevard Kitchen",
        kind: "Breakfast",
        note: "Open early. Order the shakshuka.",
      },
      {
        name: "Dubai Frame",
        kind: "Viewing platform",
        note: "Ten minutes away. Best at golden hour.",
      },
    ],
    coords: [25.1972, 55.2744],
    hero: 2,
    featured: true,
  },
  {
    name: "The Beach House, JBR",
    neighborhood: "Jumeirah Beach Residence",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    basePrice: 2100,
    short:
      "A three-bedroom apartment at the beach, with sand a minute from the lobby.",
    story: [
      "The Beach House is a working family apartment three minutes from the sand. We restored it for the way families actually live, which means a generous kitchen, a soft television corner the children can claim, and a private balcony with a long table for breakfast.",
      "There are three bedrooms, all with deep mattresses and good blackout. The master has a small private sitting area for the morning quiet. The bath has a window that looks at the sea.",
      "We will arrange a private cabana on the beach if you want one, or a paddleboard for the morning, or a sitter for the children if you and your partner want a real dinner.",
    ],
    spots: [
      {
        name: "The Walk at JBR",
        kind: "Promenade",
        note: "Open late. Best on weekday evenings.",
      },
      {
        name: "Bla Bla",
        kind: "Beach bar",
        note: "Twelve bars in one. Sit at Bla Bla One.",
      },
      {
        name: "AYA",
        kind: "Immersive art",
        note: "Twenty minutes by car. Worth it for the children.",
      },
      {
        name: "Bluewaters Island",
        kind: "Stroll",
        note: "Walk over the bridge at dusk.",
      },
    ],
    coords: [25.0792, 55.1342],
    hero: 3,
  },
  {
    name: "Stone and Linen, Bluewaters",
    neighborhood: "Bluewaters Island",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1850,
    short:
      "A pared-back two-bedroom on Bluewaters Island, with a long terrace and sea air.",
    story: [
      "Stone and Linen is a two-bedroom on the quieter side of Bluewaters, looking back toward the city across the water. We worked with a Lisbon studio on the furniture, which is mostly stone, mostly linen, and mostly older than it looks.",
      "The kitchen is small but right. The terrace is the room that gets used most, even on warm days, because we put a slow ceiling fan above the long table.",
      "It is a quiet building, mostly residents. Reach the beach in eight minutes on foot, the city in fifteen minutes by car.",
    ],
    spots: [
      {
        name: "Caesars Bluewaters",
        kind: "Hotel for a drink",
        note: "The rooftop at sunset.",
      },
      {
        name: "Madame Li",
        kind: "Chinese kitchen",
        note: "Order the duck. We can book it.",
      },
      {
        name: "Ain Dubai",
        kind: "Observation wheel",
        note: "Visible from the balcony. Best at golden hour.",
      },
      {
        name: "JBR Beach",
        kind: "Swim",
        note: "Eight minutes on foot.",
      },
    ],
    coords: [25.0796, 55.1244],
    hero: 4,
  },
  {
    name: "The Tower Room, DIFC",
    neighborhood: "DIFC",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    basePrice: 1300,
    short:
      "A single bedroom above the financial centre, for the kind of week that needs a clean desk and a deep bath.",
    story: [
      "The Tower Room is a one-bedroom on a high floor of a building we have come to know well. It works for the visiting partner or director who would like to live for a week rather than to overnight.",
      "There is a writing desk by the window, a deep linen sofa, a small kitchen with what you need for tea and breakfast, and a bath with a view of the Gate at sunset. The bedroom is soundproofed in a way these buildings rarely are.",
      "We will set up a car and driver for the week, a barista call at seven each morning, a tailor on speed dial. None of it is required.",
    ],
    spots: [
      {
        name: "Zuma",
        kind: "Late dinner",
        note: "Walking distance. Reserve a corner table.",
      },
      {
        name: "Roberto's",
        kind: "Italian",
        note: "Long lunch on Friday.",
      },
      {
        name: "Gate Avenue",
        kind: "Walking street",
        note: "Quietest in the morning. Good coffee at Alchemy.",
      },
      {
        name: "Christ Lim Art Space",
        kind: "Gallery",
        note: "Small, particular, worth thirty minutes.",
      },
    ],
    coords: [25.2122, 55.2796],
    hero: 5,
  },
  {
    name: "The Walk House, City Walk",
    neighborhood: "City Walk",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1600,
    short:
      "A two-bedroom that opens onto a tree-lined boulevard, in one of Dubai's quietest neighbourhoods.",
    story: [
      "City Walk is the closest Dubai gets to a Parisian arrondissement, and The Walk House sits on the leafiest stretch of it. The apartment is on the second floor of a small building, which means trees at eye level and almost no street noise.",
      "Two bedrooms, two baths, a long galley kitchen, a soft living room with a green velvet sofa we are quite proud of. The home was put together by a Dubai studio we work with often, and it shows in the small details.",
      "Everything is downstairs. Coffee, dinner, the bakery, the cinema, a small bookshop. The metro is a short walk away, and the city is closer than you think.",
    ],
    spots: [
      {
        name: "Reform Social",
        kind: "Pub lunch",
        note: "On the corner. Order the pie.",
      },
      {
        name: "Roseleaf",
        kind: "Breakfast",
        note: "Open early. The granola is theirs.",
      },
      {
        name: "Coya",
        kind: "Late dinner",
        note: "Five minute walk. Reserve the bar.",
      },
      {
        name: "Roxy Cinemas",
        kind: "Cinema",
        note: "The reclining seats are absurd.",
      },
    ],
    coords: [25.2073, 55.2622],
    hero: 6,
  },
  {
    name: "Hour of the Wolf, Business Bay",
    neighborhood: "Business Bay",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    basePrice: 950,
    short:
      "A small studio with a canal view, for the kind of week that needs no plans.",
    story: [
      "Named for the hour before the city wakes, this is the smallest home we have. One bedroom, one bath, a kitchenette, a small balcony on the canal. It is for a stay you want to forget about, in the best sense.",
      "The bed is firm. The bath is deep. The wifi is fast. The view of the canal at five in the morning is one of the few private things left in this city.",
      "We will leave you alone. Or we will help you find a class, a chef, a quiet table. Whatever you would like.",
    ],
    spots: [
      {
        name: "Marina Social",
        kind: "Late dinner",
        note: "Ten minutes by car. Order the lamb.",
      },
      {
        name: "Drift Beach Club",
        kind: "Day club",
        note: "Take the canal taxi.",
      },
      {
        name: "Canal Walk",
        kind: "Run",
        note: "Loop to the marina and back. About forty minutes.",
      },
      {
        name: "AYA Universe",
        kind: "Immersive art",
        note: "Twenty minutes. Worth it.",
      },
    ],
    coords: [25.1855, 55.2603],
    hero: 7,
  },
  {
    name: "The Garden Villa, Al Barari",
    neighborhood: "Al Barari",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    basePrice: 3500,
    short:
      "A four-bedroom villa in the city's green belt, with a private pool and a kitchen meant for company.",
    story: [
      "Al Barari is the quietest neighbourhood in Dubai. It feels like a garden, because most of it is. The Garden Villa is the largest home we keep, a four-bedroom on a corner plot with a long pool and a kitchen that wants to feed eight.",
      "There is a study with a record player and a small bar. There is a private spa room with a sauna we will arrange the firing for. There is a covered terrace that looks at the lawn.",
      "It works for a family across three generations. It works for a friend group on a long weekend. It works for the kind of stay where breakfast slips into lunch and lunch slips into dinner.",
    ],
    spots: [
      {
        name: "Body Language",
        kind: "Spa",
        note: "Inside Al Barari. Old fashioned, real.",
      },
      {
        name: "The Farm",
        kind: "Lunch",
        note: "Walking distance. Sit by the koi pond.",
      },
      {
        name: "Global Village",
        kind: "Cultural fair",
        note: "Seasonal. Worth one evening.",
      },
      {
        name: "Hatta",
        kind: "Day trip",
        note: "An hour out. Mountains, kayaking, a different country.",
      },
    ],
    coords: [25.0782, 55.3079],
    hero: 8,
  },
  {
    name: "The Quiet Floor, Jumeirah",
    neighborhood: "Jumeirah",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1750,
    short:
      "An entire ground floor of a Jumeirah villa, with a private courtyard and outdoor shower.",
    story: [
      "The Quiet Floor is the ground floor of a low Jumeirah villa we lease as a standalone home. The entrance is private, the courtyard is private, the outdoor shower is private. The upstairs is owned by a friend who is rarely there.",
      "Two bedrooms, two baths, a long kitchen, a small library. The courtyard has a single olive tree and one of the most comfortable hammocks we have ever placed. There is a thick adobe wall around the property that keeps things cool.",
      "The Jumeirah beach is a four minute walk. Mercato Mall is closer than you'd think, and the cafe in its courtyard is worth a morning.",
    ],
    spots: [
      {
        name: "Comptoir 102",
        kind: "Café",
        note: "Wellness without smugness. Order the bowl.",
      },
      {
        name: "Mercato Mall",
        kind: "Strolling",
        note: "Old fashioned and good.",
      },
      {
        name: "Etihad Museum",
        kind: "History",
        note: "Small, well done, ninety minutes.",
      },
      {
        name: "Jumeirah Beach",
        kind: "Swim",
        note: "Four minutes. Bring a towel from the linen closet.",
      },
    ],
    coords: [25.2236, 55.2503],
    hero: 9,
  },
  {
    name: "Olive and Oak, Arabian Ranches",
    neighborhood: "Arabian Ranches",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    basePrice: 1900,
    short:
      "A three-bedroom in the Ranches, with a green lawn and a hammock under a real tree.",
    story: [
      "Olive and Oak is family-shaped. Three bedrooms, three baths, a wide lounge, a kitchen-as-living-room, and a lawn that the children will not want to leave. There is a hammock under a thirty year old neem tree, which we did not plant.",
      "The Ranches is the quietest suburb in Dubai. It is twenty minutes from anywhere, which means twenty minutes back too, which is the trade. In return, you get a stay that feels like a real holiday.",
      "We can leave a private chef in the kitchen for an evening, or set up a barbecue under the tree, or arrange horse-riding at the polo club two minutes away.",
    ],
    spots: [
      {
        name: "Polo Club",
        kind: "Riding",
        note: "Two minutes by car. Quietest in the morning.",
      },
      {
        name: "The Market at the Ranches",
        kind: "Lunch",
        note: "On the lake. Order the salmon.",
      },
      {
        name: "Global Village",
        kind: "Seasonal fair",
        note: "Twenty minutes. One good evening.",
      },
      {
        name: "Hatta",
        kind: "Day trip",
        note: "Hour away. Mountains, kayaks.",
      },
    ],
    coords: [25.0489, 55.265],
    hero: 10,
  },
  {
    name: "The Glass Apartment, Burj Khalifa",
    neighborhood: "Downtown, Burj Khalifa",
    bedrooms: 1,
    bathrooms: 2,
    maxGuests: 2,
    basePrice: 2400,
    short:
      "A one-bedroom inside the Burj. The view is the room. The bath is the second room.",
    story: [
      "The Glass Apartment sits inside the building, high enough that the air is different. The view is the room, and that is the truth.",
      "We added almost nothing, because the building had already decided. A long linen sofa, a writing desk, a small kitchen for tea and breakfast. The bath is the second living room, with a window that frames the fountains.",
      "The hotel concierge downstairs is available to our guests. The Dubai Mall is below. The Opera is across the road. Almost everything is on foot.",
    ],
    spots: [
      {
        name: "At.mosphere",
        kind: "Dinner",
        note: "Two floors up. Window table.",
      },
      {
        name: "The Dubai Fountain",
        kind: "Free show",
        note: "Hourly from six. The home overlooks it.",
      },
      {
        name: "Dubai Mall",
        kind: "Errands",
        note: "Lifts directly from the building.",
      },
      {
        name: "Souk Al Bahar",
        kind: "Drinks",
        note: "Five minute walk. Sit at Karma Kafe.",
      },
    ],
    coords: [25.1972, 55.2744],
    hero: 11,
  },
  {
    name: "Small Hours, JLT",
    neighborhood: "Jumeirah Lake Towers",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1050,
    short:
      "A two-bedroom on the lake, for the kind of trip where breakfast is the whole point.",
    story: [
      "Small Hours is on the quieter side of JLT, looking at one of the lakes. It is a two-bedroom, two-bath, with a small kitchen and a long sofa we are quite attached to.",
      "We chose it for the corner balcony, which catches the wind off the lake. We furnished it for a slow Saturday. There is a coffee table book collection in the living room you can take your time with.",
      "JLT has a thousand cafés, four of which are good, and we will tell you which.",
    ],
    spots: [
      {
        name: "Tom and Serg",
        kind: "Café",
        note: "Five minute walk. Order the eggs.",
      },
      {
        name: "JLT Park",
        kind: "Walking",
        note: "Loop the lake at sunrise.",
      },
      {
        name: "Marina Walk",
        kind: "Promenade",
        note: "Ten minute walk.",
      },
      {
        name: "Bonsai",
        kind: "Sushi",
        note: "Walking distance. Sit at the bar.",
      },
    ],
    coords: [25.0667, 55.1413],
    hero: 12,
  },
  {
    name: "The Old Town Riad, Al Fahidi",
    neighborhood: "Al Fahidi, Old Town",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1400,
    short:
      "A restored coral and gypsum riad in old Dubai, with a small inner courtyard.",
    story: [
      "The Old Town Riad is our most particular home. It is a restored coral and gypsum house in Al Fahidi, the oldest part of Dubai, with an inner courtyard a few steps wide and a wind tower above. We worked with the local heritage department to keep what was meant to be kept.",
      "Inside, the walls are limewashed and cool to the touch. The kitchen is small and made for breakfast. The two bedrooms open onto the courtyard. There is no swimming pool. There is a fountain.",
      "It is unlike anything else we keep. It is also a few minutes from the abra crossing to Deira, which is one of our favourite things to send guests to do.",
    ],
    spots: [
      {
        name: "Arabian Tea House",
        kind: "Lunch",
        note: "Two minute walk. Sit in the courtyard.",
      },
      {
        name: "Abra crossing",
        kind: "Boat",
        note: "One dirham. Best at sunset.",
      },
      {
        name: "Gold Souk",
        kind: "Wander",
        note: "Across the water. Bring patience.",
      },
      {
        name: "Coffee Museum",
        kind: "Small museum",
        note: "Around the corner. Forty minutes.",
      },
    ],
    coords: [25.2638, 55.3009],
    hero: 13,
  },
  {
    name: "The Sand House, Mirdif",
    neighborhood: "Mirdif",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    basePrice: 1200,
    short:
      "A three-bedroom villa in a leafy suburb, for the kind of stay where you'd like a real garden.",
    story: [
      "Mirdif is a long flat suburb of low villas and quiet streets, and we have one home there. The Sand House is a three-bedroom on a corner plot with a long garden, a covered terrace, and a small pool we keep heated in the winter.",
      "Inside, the home is plain and well kept. Wide floors, simple kitchen, deep beds. There is a media room the children will find within ten minutes.",
      "The airport is fifteen minutes away. The city is twenty-five. The point of staying here is the silence, which is real.",
    ],
    spots: [
      {
        name: "Mirdif Hills",
        kind: "Park",
        note: "Walking distance.",
      },
      {
        name: "Bay Avenue",
        kind: "Breakfast",
        note: "Ten minute drive.",
      },
      {
        name: "Mushrif Park",
        kind: "Cycling",
        note: "Hire bikes at the gate.",
      },
      {
        name: "Dubai International Airport",
        kind: "Logistics",
        note: "Fifteen minutes.",
      },
    ],
    coords: [25.2228, 55.4297],
    hero: 14,
  },
  {
    name: "Cinnamon House, Bur Dubai",
    neighborhood: "Bur Dubai",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 1150,
    short:
      "A small two-bedroom near the creek, in a low building from a quieter Dubai.",
    story: [
      "Cinnamon House is in Bur Dubai, four streets back from the creek, in a low building that predates the towers by twenty years. We rent the entire upper floor as one home. It is two bedrooms, two baths, and a long living room with windows on three sides.",
      "The kitchen is small. The bath is good. The light is the reason we took the home, and it changes by the hour. There is a narrow balcony on the front and a wider one on the back. The building has a doorman who has been there since 2003 and knows everyone.",
      "It is a five minute walk to the abra crossing. It is a fifteen minute walk to the gold souk. It is a different Dubai, and we are quite fond of it.",
    ],
    spots: [
      {
        name: "Abra crossing",
        kind: "Boat",
        note: "Five minute walk. One dirham each way.",
      },
      {
        name: "Bait Al Wakeel",
        kind: "Lunch on the water",
        note: "Order the karak and the camel kofta.",
      },
      {
        name: "XVA Gallery",
        kind: "Small gallery",
        note: "Inside Al Fahidi. Quiet hour.",
      },
      {
        name: "Spice Souk",
        kind: "Wander",
        note: "Across the creek. Bring patience.",
      },
    ],
    coords: [25.2536, 55.295],
    hero: 16,
  },
  {
    name: "The Long Hall, London Marylebone",
    neighborhood: "Marylebone, London",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    basePrice: 850,
    short:
      "A Georgian two-bedroom flat in Marylebone, with a small kitchen and a long hallway.",
    story: [
      "The Long Hall is our small London house, a Georgian two-bedroom flat on a quiet street behind Marylebone High Street. The hallway is twenty feet long and lined with framed prints we have collected over the years.",
      "Two bedrooms, two baths, a kitchen the size of a small London kitchen, and a sitting room with a working fireplace. The streetlight outside the bedroom is gas, and on misty evenings it is something to look at.",
      "Three minutes to Marylebone High Street, six minutes to Hyde Park, fourteen minutes to the British Museum. We have a small list of favourite restaurants we hand over on arrival.",
    ],
    spots: [
      {
        name: "Daunt Books",
        kind: "Bookshop",
        note: "Three minute walk. Skylight at the back.",
      },
      {
        name: "The Chiltern Firehouse",
        kind: "Late dinner",
        note: "We can sometimes get you in.",
      },
      {
        name: "Regent's Park",
        kind: "Walking",
        note: "Ten minute walk. Beautiful in the morning.",
      },
      {
        name: "Wallace Collection",
        kind: "Museum",
        note: "Free, small, brilliant.",
      },
    ],
    coords: [51.5189, -0.1525],
    hero: 15,
  },
];

const dubaiListings: Listing[] = dubaiSeeds.map((seed, i) => {
  const slug = seed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const city: Listing["city"] =
    seed.neighborhood.toLowerCase().includes("london") ? "London" : "Dubai";
  const currency: Currency = city === "London" ? "GBP" : "AED";
  const price = currency === "GBP" ? Math.round(seed.basePrice / 4.6) : seed.basePrice;
  return {
    id: `dxb-${String(i + 1).padStart(2, "0")}`,
    slug,
    name: seed.name,
    city,
    neighborhood: seed.neighborhood,
    bedrooms: seed.bedrooms,
    bathrooms: seed.bathrooms,
    maxGuests: seed.maxGuests,
    currency,
    basePrice: price,
    cleaningFee: currency === "GBP" ? 60 : 350,
    shortDescription: seed.short,
    story: seed.story,
    heroImage: U(INTERIOR_IDS[seed.hero % INTERIOR_IDS.length], 2200),
    gallery: galleryFor(i + 1, 9),
    amenities: seed.amenities ?? baseAmenities,
    houseRules: baseRules,
    checkIn: "After 3 in the afternoon",
    checkOut: "Before 11 in the morning",
    coordinates: { lat: seed.coords[0], lng: seed.coords[1] },
    neighborhoodGuide: seed.spots,
    reviews: pickReviews(i),
    hostawayListingId: `HW-${100000 + i + 1}`,
    featured: seed.featured,
  };
});

const goaListing: Listing = {
  id: "goa-01",
  slug: "the-quiet-house-assagao",
  name: "The Quiet House, Assagao",
  city: "Goa",
  neighborhood: "Assagao, North Goa",
  bedrooms: 4,
  bathrooms: 4,
  maxGuests: 8,
  currency: "INR",
  basePrice: 24000,
  cleaningFee: 4500,
  shortDescription:
    "A Portuguese-era villa in Assagao, restored across two slow years. Our first stay outside the city.",
  story: [
    "The Quiet House is our first home in Goa, and the first home we have opened anywhere outside Dubai. It is a Portuguese-era villa in Assagao, restored across two slow years by a small team of local craftspeople who knew the building from before we did.",
    "The roof was rebuilt by hand in the old way, with mangalore tiles laid on coconut wood beams. The walls are limewashed in a colour the previous owner's mother chose forty years ago. The garden is older than the house, with a mango tree, a jackfruit tree, three frangipanis, and a quiet space at the back where the dog used to sleep.",
    "Inside there are four bedrooms, four baths, a long living room with deep linen sofas, a wide kitchen with a separate prep pantry, and a verandah that runs the length of the front of the house. The home asks you to slow down. Most guests stay longer than they intended.",
  ],
  heroImage: U("1615875605825-5eb9bb5d52ac", 2400),
  gallery: galleryFor(99, 10),
  amenities: [
    "filtered still water in every room",
    "espresso machine and a clay pot for chai",
    "high-thread cotton linens",
    "blackout curtains in every bedroom",
    "deep cast iron bathtubs",
    "an old record player and a small collection",
    "fast wireless internet",
    "private cook on request",
    "morning yoga with a local teacher",
    "daily housekeeping",
    "a hammock under the mango tree",
    "concierge available on WhatsApp",
  ],
  houseRules: [
    "no parties or events",
    "no smoking indoors, smoking allowed in the garden",
    "well behaved dogs welcome with notice",
    "quiet hours after ten in the evening",
  ],
  checkIn: "After 2 in the afternoon",
  checkOut: "Before 11 in the morning",
  coordinates: { lat: 15.598, lng: 73.762 },
  neighborhoodGuide: [
    {
      name: "Gunpowder",
      kind: "South Indian kitchen",
      note: "A two minute walk. Sit on the verandah.",
    },
    {
      name: "Vaayu",
      kind: "Beach club",
      note: "Twenty minutes to Vagator. Sunset is the moment.",
    },
    {
      name: "Sublime",
      kind: "Long dinner",
      note: "Walking distance. Book ahead.",
    },
    {
      name: "People Tree",
      kind: "Shop",
      note: "Old building, careful curation.",
    },
  ],
  reviews: goaReviews,
  hostawayListingId: "HW-200001",
  featured: true,
  goaLaunch: true,
};

export const LISTINGS: Listing[] = [...dubaiListings, goaListing];

export function getListing(slug: string): Listing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export function listingsByCity(city: Listing["city"]) {
  return LISTINGS.filter((l) => l.city === city);
}

export const FEATURED_LISTINGS = LISTINGS.filter((l) => l.featured);
