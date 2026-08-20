export interface Review {
  id: string;
  name: string;
  location?: string;
  contributions: number;
  visited: string;
  travelledWith: string;
  quote: string;
}

// Real TripAdvisor reviews for Sterna Aveiro Ria Tours & Birdwatching.
// Trimmed for card layout while preserving reviewer's voice; nothing added.
export const reviews: Review[] = [
  {
    id: "trail743531",
    name: "Trail743531",
    contributions: 8,
    visited: "December 2025",
    travelledWith: "as a couple",
    quote:
      "A wonderful afternoon with Sandra and Steven. Truly our favourite day yet in our Portugal travels.",
  },
  {
    id: "rachael-r",
    name: "Rachael R",
    contributions: 3,
    visited: "April 2026",
    travelledWith: "as a couple",
    quote:
      "The electric boat is beautifully quiet, which made the whole experience feel incredibly peaceful. Even though the town was busy over Easter, it was wonderfully calm out on the water.",
  },
  {
    id: "catarina-fc",
    name: "catarina_fc",
    location: "London, UK",
    contributions: 29,
    visited: "August 2025",
    travelledWith: "as a couple",
    quote:
      "Sandra is super knowledgeable and passionate about the history and wildlife of this beautiful place, which really shows and makes for a unique experience. Cannot recommend enough.",
  },
  {
    id: "stephen-a",
    name: "Stephen A",
    contributions: 1,
    visited: "September 2025",
    travelledWith: "with family",
    quote:
      "Truly one of the highlights of our day trip to Aveiro. An incredible time spotting a wide variety of birds, including flamingos, sea eagles, cormorants and more.",
  },
  {
    id: "alexandre-d",
    name: "Alexandre D",
    contributions: 6,
    visited: "October 2025",
    travelledWith: "with friends",
    quote:
      "Highly recommended. The owner clearly loves the area and knows a lot about the history and the wildlife. The itinerary is adapted to the tides, weather and personal requests.",
  },
  {
    id: "monica-bastos",
    name: "Mónica Bastos",
    contributions: 1,
    visited: "August 2025",
    travelledWith: "with family",
    quote:
      "Incredible experience, rediscovering the Ria de Aveiro. Sandra and Stephen were fantastic guides. The boat is quiet, we really felt we were not intruders in the Ria, passing flamingos and other birds without scaring them.",
  },
  {
    id: "beatriz-vasconcelos",
    name: "Beatriz Vasconcelos",
    contributions: 9,
    visited: "April 2026",
    travelledWith: "solo",
    quote:
      "Along the way there was always a clear and interesting explanation of what we were seeing. I really liked the experience.",
  },
  {
    id: "janelle-d",
    name: "Janelle D",
    contributions: 9,
    visited: "October 2025",
    travelledWith: "with family",
    quote:
      "Silviu introduced us to the history, ecosystem and current state of the old salt pan of Aveiro. The boat has the huge advantage of being silent and a very comfortable way to navigate the waterways.",
  },
  {
    id: "rui-c",
    name: "Rui C",
    location: "Aix-en-Provence, France",
    contributions: 3,
    visited: "September 2025",
    travelledWith: "with family",
    quote:
      "A very enriching experience. Sandra and Estevão were friendly, accessible, acquainted with the Ria and its secrets. Excellent guides.",
  },
  {
    id: "luis-angel-d",
    name: "Luis Ángel D",
    contributions: 4,
    visited: "September 2025",
    travelledWith: "with family",
    quote:
      "A wonderful excursion, already the second we do with them. Sandra and Silvio are a charmer of people, they explain everything in Spanish very well, then give you a tasting of Ovos Moles and typical cookies.",
  },
];
