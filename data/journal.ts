export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  cover: string;
  category: string;
  readingMinutes: number;
}

const U = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const ARTICLES: Article[] = [
  {
    slug: "what-we-mean-by-slow",
    title: "What we mean when we say slow",
    date: "April 2026",
    category: "Philosophy",
    readingMinutes: 5,
    excerpt:
      "Slow is not the same as quiet. It is not the same as remote. It is a particular relationship with time, and it can happen in the middle of a city.",
    cover: U("1542314831-068cd1dbfeeb"),
    body: [
      "The word slow has been so thoroughly worked over by hospitality marketing that it has almost stopped meaning anything. We are aware of this. We use it anyway, because we have not found a better word, and because the thing we are pointing at is real.",
      "Slow, for us, is not the same as quiet. It is not the same as remote. It is not the same as off-grid, though we have nothing against any of those. Slow is a particular relationship with time, where the day asks less of you and you ask less of the day. It can happen in the middle of a city. It can happen on a Tuesday morning. It almost never happens on a holiday that is also a job.",
      "When we design a home, we are designing for that relationship. We are choosing the depth of the sofa and the firmness of the bed. We are choosing the time the curtains take to open and close. We are choosing the silence of the kitchen drawers, which we test by hand before we sign off on a home.",
      "We do not always get it right. The first home we restored had a fridge that hummed at exactly the wrong pitch. We replaced it twice. There is a version of luxury that is about excess, and a version that is about absence. We tend toward the second.",
      "We do not pretend that booking a Serene Living home will fix anything. But for the few days you are with us, the home will work with you, and not against you. That is what we mean.",
    ],
  },
  {
    slug: "on-restoring-an-old-house-in-goa",
    title: "On restoring an old house in Goa",
    date: "March 2026",
    category: "Field notes",
    readingMinutes: 7,
    excerpt:
      "Two years in the courtyard of a Portuguese-era villa in Assagao. The roof, the wells, the trees, and the way the light works in the afternoon.",
    cover: U("1615875605825-5eb9bb5d52ac"),
    body: [
      "We found the house in July, which is a season most people do not buy houses in Goa. The roof was a sieve. The walls were holding water from the inside. The mango tree had not been pruned in a decade and was leaning over the verandah.",
      "We bought it anyway, because of the courtyard and because of the way the afternoon light hit the back wall of the kitchen. The owner had been born in the house, lived in it for forty-one years, and was selling it because his children were in Lisbon and he wanted to be closer.",
      "The first six months were spent doing almost nothing. We watched the house through one full monsoon to understand where the water went and what wanted to grow back. We had the wells cleaned but not deepened. We let the garden settle.",
      "When we began the work, we worked slowly and almost entirely with local craftspeople. The roof was rebuilt by hand in the old way, with Mangalore tiles laid on coconut wood beams. The lime plaster was mixed on site. We saved every piece of the old verandah floor and put it back. We replaced a single broken tile from the kitchen with one we found at the chor bazaar in Mapusa.",
      "The hardest decision was the kitchen, which had been added in the eighties and had no relationship with the rest of the house. We took it down and rebuilt it with a wider window onto the garden and a pantry that holds everything you can't see.",
      "The house opened in April. The owner came back to see it and stayed for tea. He said it was the same house. We do not think we deserve that, but we will take it.",
    ],
  },
  {
    slug: "the-coffee-list",
    title: "The Serene Living coffee list",
    date: "February 2026",
    category: "City notes",
    readingMinutes: 4,
    excerpt:
      "Where to drink a good morning coffee in Dubai, Goa and London. Slowly updated. Strongly opinionated.",
    cover: U("1493809842364-78817add7ffb"),
    body: [
      "Coffee at home is good, and we will gladly leave a Mokka pot and a decent local roast in every kitchen we keep. But there are mornings when the right thing is to leave the house entirely. This is the small list we hand to guests.",
      "Dubai is harder than it looks. The chain coffee here is loud, the third wave coffee is sometimes smug, and the best places are not on the obvious streets. We send guests in JBR and the Marina to Tom and Serg in Al Quoz. We send guests in DIFC to Alchemy at Gate Avenue. We send guests in Jumeirah to Comptoir 102, which is technically a wellness restaurant, but the espresso is good.",
      "Goa is a different problem. Most of the coffee there is the wrong kind of strong. The exceptions are a small place in Siolim called The Bean Me Up, and a roastery in Aldona called Joshi. Both will let you sit for an hour with a single cup.",
      "London is the easiest of the three, and we will tell you, if you ask, why we keep going back to Workshop Coffee on Wigmore Street.",
      "We update this list when something earns a place. We remove a place when it falls off. Nothing in here is paid.",
    ],
  },
  {
    slug: "in-praise-of-deep-baths",
    title: "In praise of deep baths",
    date: "January 2026",
    category: "Design notes",
    readingMinutes: 3,
    excerpt:
      "We have spent more time choosing bathtubs than is reasonable. Here is why.",
    cover: U("1631679706909-1844bbd07221"),
    body: [
      "The bath in a hotel is usually a prop. The bath in a Serene Living home is the room. We have spent more time choosing bathtubs than is reasonable, and we will keep doing so.",
      "What we look for is depth, weight, and a slow heat loss. A good bath holds its warmth for twenty minutes longer than you expect. The cast iron tubs we use in Goa have walls thick enough to feel like furniture.",
      "We also pay attention to the placement. A bath next to a window with a view of the sky is a different bath than one against a tile wall. We never put a television in a bathroom. We never use bath salts that smell of dessert.",
      "If the bath is the room, the room should be quiet. Our bathrooms have books in them. They have small chairs. The light is warm and dim by default.",
      "This is the sort of detail that does not show in a brochure. You feel it on the third evening of a long stay, when you forgot how hot the water still was, and you stayed for another half hour.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
