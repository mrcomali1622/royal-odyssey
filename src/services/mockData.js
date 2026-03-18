// services/mockData.js
// Structured to support real backend later — matches typical REST API shapes

export const mockAnnouncements = [
  {
    id: 1,
    title: "Grand Kerala Backwaters Expedition",
    subtitle: "20% Off — Limited Seats Available",
    description: "Sail through emerald waterways, witness timeless village life, and experience the soul of God's Own Country.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=80",
    tag: "HOT DEAL",
    type: "offer",
    date: "2026-04-30",
    active: true
  },
  {
    id: 2,
    title: "Rajasthan Royal Heritage Tour",
    subtitle: "Upcoming — March 2026",
    description: "Palaces, forts, and golden deserts await. A journey through the land of kings like no other.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80",
    tag: "UPCOMING EVENT",
    type: "event",
    date: "2026-03-28",
    active: true
  },
  {
    id: 3,
    title: "Himalayan Sunrise Trek — Sikkim",
    subtitle: "New Tour Added",
    description: "Chase the golden light over Kanchenjunga. A once-in-a-lifetime alpine adventure for the fearless.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    tag: "NEW",
    type: "announcement",
    date: "2026-05-15",
    active: true
  }
];

export const mockTours = [
  {
    id: 1,
    place: "Kerala Backwaters",
    location: "Kerala, India",
    description: "A serene houseboat journey through the legendary backwaters, spice gardens, and coastal villages of Kerala.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    duration: 6,
    price: 28500,
    offer: 20,
    offerExpiry: "2026-04-30",
    category: "Nature",
    featured: true,
    createdAt: "2026-01-15",
    itinerary: [
      { day: 1, title: "Arrival in Kochi", description: "Welcome to Kerala! Transfer to hotel. Evening walk at Fort Kochi and Chinese fishing nets." },
      { day: 2, title: "Alleppey Houseboat", description: "Board a luxury houseboat. Cruise through narrow canals, paddy fields, and coconut groves." },
      { day: 3, title: "Kumarakom Bird Sanctuary", description: "Morning birdwatching tour. Afternoon village walk. Traditional Kerala lunch on the boat." },
      { day: 4, title: "Munnar Hills", description: "Drive to Munnar. Tea plantation tour and factory visit. Sunset at Echo Point." },
      { day: 5, title: "Thekkady Spice Gardens", description: "Periyar Wildlife Sanctuary boat ride. Spice garden walk. Cultural dance performance." },
      { day: 6, title: "Departure", description: "Morning yoga. Transfer to Kochi airport for departure. Take home memories of a lifetime." }
    ],
    priceBreakdown: [
      { item: "Accommodation (5 nights)", amount: 15000 },
      { item: "Houseboat stay", amount: 6000 },
      { item: "All meals included", amount: 4000 },
      { item: "Transportation", amount: 2500 },
      { item: "Guide & activities", amount: 1000 }
    ],
    inclusions: ["5-star accommodation", "Houseboat cruise", "All meals", "Airport transfers", "Licensed guide", "Entry tickets"],
    exclusions: ["Flights", "Personal shopping", "Alcohol", "Tips & gratuities", "Travel insurance"],
    cancellationPolicy: "Full refund if cancelled 15+ days before departure. 50% refund for 7–14 days. No refund within 7 days."
  },
  {
    id: 2,
    place: "Rajasthan Royal Heritage",
    location: "Rajasthan, India",
    description: "Step into a world of maharajas, opulent palaces, and rose-gold desert dunes across the most regal state of India.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    duration: 8,
    price: 45000,
    offer: 10,
    offerExpiry: "2026-03-31",
    category: "Heritage",
    featured: true,
    createdAt: "2026-01-10",
    itinerary: [
      { day: 1, title: "Jaipur Arrival", description: "Arrive in the Pink City. Check in to palace hotel. Evening at Hawa Mahal." },
      { day: 2, title: "Jaipur Sightseeing", description: "Amber Fort, City Palace, Jantar Mantar. Gem market evening tour." },
      { day: 3, title: "Pushkar", description: "Drive to Pushkar. Camel ride at sunrise. Holy Pushkar Lake and Brahma Temple." },
      { day: 4, title: "Jodhpur Blue City", description: "Mehrangarh Fort. Walk through cobalt-blue lanes. Rooftop dinner." },
      { day: 5, title: "Jaisalmer Desert", description: "Drive to Jaisalmer. Sonar Fort. Evening desert safari by jeep." },
      { day: 6, title: "Desert Camp", description: "Sunrise camel ride. Sam Sand Dunes. Folk music night at desert camp." },
      { day: 7, title: "Udaipur Lake City", description: "Fly to Udaipur. Lake Palace boat ride. Sunset cruise on Lake Pichola." },
      { day: 8, title: "Departure", description: "City Palace visit. Farewell lunch. Transfer to airport." }
    ],
    priceBreakdown: [
      { item: "Accommodation (7 nights)", amount: 28000 },
      { item: "Desert camp stay", amount: 5000 },
      { item: "All meals", amount: 5500 },
      { item: "Transportation & transfers", amount: 4500 },
      { item: "Guide & excursions", amount: 2000 }
    ],
    inclusions: ["Heritage hotel stays", "Desert camp", "Camel safari", "All meals", "A/C vehicle", "Local guide", "Entry fees"],
    exclusions: ["Airfare", "Personal expenses", "Camera fees at monuments", "Tips", "Insurance"],
    cancellationPolicy: "Full refund if cancelled 21+ days before. 50% refund 10–20 days. No refund within 10 days."
  },
  {
    id: 3,
    place: "Himalayan Sunrise Trek",
    location: "Sikkim, India",
    description: "Chase the first light over Kanchenjunga, the world's third-highest peak, through alpine meadows and Buddhist monasteries.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: 7,
    price: 32000,
    offer: null,
    offerExpiry: null,
    category: "Adventure",
    featured: true,
    createdAt: "2026-02-01",
    itinerary: [
      { day: 1, title: "Bagdogra to Gangtok", description: "Arrive at Bagdogra. Drive to Gangtok through scenic mountain roads." },
      { day: 2, title: "Gangtok Exploration", description: "Rumtek Monastery. Enchey Monastery. Local market stroll." },
      { day: 3, title: "Pelling", description: "Drive to Pelling. Kanchenjunga views. Pemayangtse Monastery." },
      { day: 4, title: "Trek Begins", description: "Yuksom. Begin trek. Birch forest. Camp at Tsokha." },
      { day: 5, title: "Dzongri", description: "Ascend to Dzongri (4020m). Stunning panoramas of the Kanchenjunga range." },
      { day: 6, title: "Sunrise at Dzongri Top", description: "Pre-dawn hike to Dzongri Top. Watch the sun paint Kanchenjunga golden." },
      { day: 7, title: "Return & Departure", description: "Descend to Yuksom. Drive to Bagdogra. Farewell dinner." }
    ],
    priceBreakdown: [
      { item: "Accommodation (6 nights)", amount: 16000 },
      { item: "Trekking permits", amount: 3000 },
      { item: "All meals", amount: 5000 },
      { item: "Transportation", amount: 4500 },
      { item: "Trekking guide & porter", amount: 3500 }
    ],
    inclusions: ["Mountain lodge stays", "Trekking permits", "Meals during trek", "Experienced guide", "Porter support", "First-aid kit"],
    exclusions: ["Flights to Bagdogra", "Personal trekking gear", "Personal medications", "Mule charges (optional)", "Tips"],
    cancellationPolicy: "Full refund 20+ days before. 40% refund 10–19 days. No refund under 10 days. Weather cancellations fully refunded."
  },
  {
    id: 4,
    place: "Andaman Island Escape",
    location: "Andaman & Nicobar, India",
    description: "Crystal waters, coral reefs, and untouched white sand beaches in the pristine emerald necklace of the Bay of Bengal.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    duration: 5,
    price: 35000,
    offer: 15,
    offerExpiry: "2026-05-15",
    category: "Beach",
    featured: false,
    createdAt: "2026-02-10",
    itinerary: [
      { day: 1, title: "Port Blair", description: "Arrival. Cellular Jail tour. Light and sound show." },
      { day: 2, title: "Havelock Island", description: "Ferry to Havelock. Radhanagar Beach (Asia's best). Snorkelling." },
      { day: 3, title: "Elephant Beach", description: "Glass-bottom boat ride. Scuba diving initiation. Beach bonfire." },
      { day: 4, title: "Neil Island", description: "Secluded beaches. Natural Rock Bridge. Sunset photography." },
      { day: 5, title: "Departure", description: "Morning kayaking. Return to Port Blair. Departure." }
    ],
    priceBreakdown: [
      { item: "Accommodation (4 nights)", amount: 18000 },
      { item: "Ferry transfers", amount: 3000 },
      { item: "All meals", amount: 5000 },
      { item: "Water activities", amount: 6000 },
      { item: "Guide & local transport", amount: 3000 }
    ],
    inclusions: ["Beach resort stays", "Inter-island ferries", "All meals", "Snorkelling gear", "Glass-bottom boat", "Scuba initiation"],
    exclusions: ["Flights to Port Blair", "Advanced dive courses", "Alcohol", "Shopping", "Travel insurance"],
    cancellationPolicy: "Full refund 14+ days before. 50% refund 7–13 days. No refund within 7 days."
  },
  {
    id: 5,
    place: "Varanasi Spiritual Journey",
    location: "Uttar Pradesh, India",
    description: "The eternal city on the Ganges — witness ancient rituals, ghats at dawn, and the timeless spiritual pulse of India.",
    image: "https://images.unsplash.com/photo-1561361058-c24e022e2d21?w=800&q=80",
    duration: 4,
    price: 18500,
    offer: null,
    offerExpiry: null,
    category: "Spiritual",
    featured: false,
    createdAt: "2026-01-28",
    itinerary: [
      { day: 1, title: "Arrival in Varanasi", description: "Check-in to heritage haveli. Evening Ganga Aarti at Dashashwamedh Ghat." },
      { day: 2, title: "Dawn Boat Ride", description: "Pre-sunrise boat ride along the ghats. Manikarnika Ghat. Kashi Vishwanath Temple." },
      { day: 3, title: "Sarnath", description: "Visit Sarnath — where Buddha gave his first sermon. Archaeological museum." },
      { day: 4, title: "Departure", description: "Silk weaving workshop. Farewell on the ghats. Transfer to airport." }
    ],
    priceBreakdown: [
      { item: "Heritage haveli (3 nights)", amount: 9000 },
      { item: "All meals", amount: 3500 },
      { item: "Transportation", amount: 2500 },
      { item: "Guide & activities", amount: 1500 },
      { item: "Silk workshop experience", amount: 2000 }
    ],
    inclusions: ["Heritage accommodation", "All meals", "Boat ride", "Guided temple tour", "Sarnath excursion"],
    exclusions: ["Flights", "Puja materials", "Photography charges at temples", "Personal shopping"],
    cancellationPolicy: "Full refund 10+ days before. 50% refund 5–9 days. No refund within 5 days."
  },
  {
    id: 6,
    place: "Coorg Coffee & Wilderness",
    location: "Karnataka, India",
    description: "Misty hills blanketed in coffee and cardamom plantations, cascading waterfalls, and the warmth of Kodava culture.",
    image: "https://images.unsplash.com/photo-1598953431135-d8f0f80b2cd4?w=800&q=80",
    duration: 4,
    price: 22000,
    offer: 5,
    offerExpiry: "2026-06-01",
    category: "Nature",
    featured: false,
    createdAt: "2026-02-18",
    itinerary: [
      { day: 1, title: "Arrival in Coorg", description: "Drive from Mysore or Bangalore. Check in to plantation stay." },
      { day: 2, title: "Coffee Plantation Tour", description: "Walk through coffee estates. Taste freshly brewed estate coffee. Iruppu Falls." },
      { day: 3, title: "Trekking & Dubare", description: "Elephant bathing at Dubare Reserve. Trek to Tadiandamol peak." },
      { day: 4, title: "Departure", description: "Morning mist walk. Traditional Kodava breakfast. Departure." }
    ],
    priceBreakdown: [
      { item: "Plantation stay (3 nights)", amount: 12000 },
      { item: "All meals (Kodava cuisine)", amount: 4000 },
      { item: "Transportation", amount: 3000 },
      { item: "Activities & guide", amount: 3000 }
    ],
    inclusions: ["Plantation bungalow", "All meals", "Coffee tour", "Elephant experience", "Trekking guide"],
    exclusions: ["Transportation from your city", "Personal expenses", "Tips"],
    cancellationPolicy: "Full refund 10+ days before. 50% refund 5–9 days. No refund within 5 days."
  }
];

export const mockAlbums = [
  {
    id: 1,
    title: "Kerala — God's Own Country",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    imageCount: 6,
    images: [
      { id: 101, src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80", caption: "Backwaters at dusk", likes: 42, views: 310 },
      { id: 102, src: "https://images.unsplash.com/photo-1562619245-3fd0b1c5a9a4?w=1200&q=80", caption: "Coconut groves along the canal", likes: 28, views: 225 },
      { id: 103, src: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&q=80", caption: "Traditional houseboat", likes: 55, views: 489 },
      { id: 104, src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80&sat=-80", caption: "Morning mist on the water", likes: 31, views: 201 },
      { id: 105, src: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80", caption: "Tea plantations of Munnar", likes: 47, views: 358 },
      { id: 106, src: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80", caption: "Kathakali performance", likes: 39, views: 274 }
    ]
  },
  {
    id: 2,
    title: "Rajasthan — Land of Kings",
    coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    imageCount: 6,
    images: [
      { id: 201, src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80", caption: "Amber Fort at sunrise", likes: 73, views: 512 },
      { id: 202, src: "https://images.unsplash.com/photo-1477587458883-47145ed31859?w=1200&q=80", caption: "Hawa Mahal facade", likes: 61, views: 430 },
      { id: 203, src: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1200&q=80", caption: "Mehrangarh Fort, Jodhpur", likes: 88, views: 640 },
      { id: 204, src: "https://images.unsplash.com/photo-1585016495481-91613b3f7a8c?w=1200&q=80", caption: "Jaisalmer golden city", likes: 52, views: 380 },
      { id: 205, src: "https://images.unsplash.com/photo-1552424169-f3f43da1e6f4?w=1200&q=80", caption: "Camel caravan at sunset", likes: 94, views: 720 },
      { id: 206, src: "https://images.unsplash.com/photo-1591017683658-e23aa69c4cec?w=1200&q=80", caption: "Lake Pichola, Udaipur", likes: 66, views: 490 }
    ]
  },
  {
    id: 3,
    title: "Himalayas — Roof of the World",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    imageCount: 5,
    images: [
      { id: 301, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", caption: "Kanchenjunga at dawn", likes: 112, views: 890 },
      { id: 302, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80", caption: "Alpine meadows of Dzongri", likes: 78, views: 580 },
      { id: 303, src: "https://images.unsplash.com/photo-1585016495481-91613b3f7a8c?w=1200&q=80", caption: "Buddhist prayer flags", likes: 65, views: 445 },
      { id: 304, src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80", caption: "Trekkers on the ridge", likes: 49, views: 330 },
      { id: 305, src: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1200&q=80", caption: "Night sky at high camp", likes: 91, views: 670 }
    ]
  },
  {
    id: 4,
    title: "Andaman — Emerald Islands",
    coverImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80",
    imageCount: 4,
    images: [
      { id: 401, src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80", caption: "Radhanagar Beach", likes: 83, views: 610 },
      { id: 402, src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80", caption: "Coral reefs underwater", likes: 70, views: 520 },
      { id: 403, src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80", caption: "Turquoise waters at Elephant Beach", likes: 95, views: 740 },
      { id: 404, src: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80", caption: "Sunset over the Bay of Bengal", likes: 107, views: 820 }
    ]
  }
];

export const mockReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    comment: "The Kerala backwaters tour was absolutely magical. Every detail was taken care of, and the houseboat experience was beyond our expectations. Royal Odyssey truly delivers on its promise of luxury.",
    rating: 5,
    tour: "Kerala Backwaters",
    date: "2026-02-10",
    visible: true
  },
  {
    id: 2,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "9988776655",
    comment: "Rajasthan was a dream come true! The palace hotels, the camel safari, the food — everything was world-class. Our guide Ramesh was exceptional. Will definitely book again.",
    rating: 5,
    tour: "Rajasthan Heritage",
    date: "2026-01-22",
    visible: true
  },
  {
    id: 3,
    name: "Sneha Nair",
    email: "sneha@example.com",
    phone: "9123456789",
    comment: "The Himalayan trek was challenging but utterly rewarding. Watching the sunrise over Kanchenjunga is a moment I will carry forever. Professional team, excellent safety standards.",
    rating: 5,
    tour: "Himalayan Trek",
    date: "2026-02-05",
    visible: true
  },
  {
    id: 4,
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "9654321098",
    comment: "Our Andaman trip was a revelation. Crystal clear waters, pristine beaches, and a seamlessly organized itinerary. The scuba initiation session was the highlight for my kids!",
    rating: 4,
    tour: "Andaman Islands",
    date: "2026-02-18",
    visible: true
  },
  {
    id: 5,
    name: "Kavitha Reddy",
    email: "kavitha@example.com",
    phone: "9543210987",
    comment: "Varanasi is unlike anywhere else on earth, and Royal Odyssey made it profound. The early morning Ganga aarti boat ride was spine-tingling. A truly spiritual experience, beautifully curated.",
    rating: 5,
    tour: "Varanasi Spiritual",
    date: "2026-01-30",
    visible: true
  },
  {
    id: 6,
    name: "Dev Balachandran",
    email: "dev@example.com",
    phone: "9432109876",
    comment: "Coorg is a gem and the plantation stay was just gorgeous. Woke up to coffee aromas and misty hills every morning. Perfect for a relaxing yet immersive getaway.",
    rating: 4,
    tour: "Coorg Coffee",
    date: "2026-02-25",
    visible: true
  }
];

// API-like service functions (swap out for real fetch calls later)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const api = {
  getAnnouncements: async () => { await delay(300); return mockAnnouncements.filter(a => a.active); },
  getTours: async () => { await delay(400); return [...mockTours].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  getTourById: async (id) => { await delay(200); return mockTours.find(t => t.id === parseInt(id)); },
  getAlbums: async () => { await delay(350); return mockAlbums; },
  getAlbumById: async (id) => { await delay(200); return mockAlbums.find(a => a.id === parseInt(id)); },
  getReviews: async () => { await delay(300); return mockReviews.filter(r => r.visible); },
  submitReview: async (data) => { await delay(500); return { success: true, id: Date.now(), ...data }; },
  submitContact: async (data) => { await delay(400); return { success: true }; },
};
