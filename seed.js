require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./schema/scema.js');

async function seedListings() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hotelbokking");
    console.log("Connected to MongoDB");

    // Clear existing listings
    await Listing.deleteMany({});
    console.log("Cleared existing listings");

    const listings = [
      // Rooms - Various States
      {
        title: "Luxury Stay in Mumbai - Sea View Apartment",
        description: "Premium 3-bedroom apartment with stunning sea view in Bandra. High-end furnishings, modern kitchen, concierge service available.",
        image: {
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          filename: "mumbai-luxury-1"
        },
        price: 8500,
        location: "Bandra, Mumbai",
        country: "India",
        category: "Rooms",
        owner: null
      },
      {
        title: "Cozy Room in Delhi - Central Location",
        description: "Beautiful 1-bedroom apartment in Connaught Place. Well-connected, modern amenities, perfect for business travelers.",
        image: {
          url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          filename: "delhi-apt-1"
        },
        price: 5500,
        location: "Connaught Place, Delhi",
        country: "India",
        category: "Rooms",
        owner: null
      },
      {
        title: "Premium Room in Bangalore - Tech Hub",
        description: "2-bedroom apartment in Indiranagar with workspace. Perfect for remote workers. WiFi, AC, washing machine, modern kitchen.",
        image: {
          url: "https://images.unsplash.com/photo-1501876725169-7c18eddc33d6?w=800",
          filename: "bangalore-apt-1"
        },
        price: 4500,
        location: "Indiranagar, Bangalore",
        country: "India",
        category: "Rooms",
        owner: null
      },
      {
        title: "Elegant Apartment in Kolkata",
        description: "Victorian-style 2-bedroom apartment in South Kolkata. Heritage charm with modern comforts.",
        image: {
          url: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800",
          filename: "kolkata-apt-1"
        },
        price: 3500,
        location: "Alipore, Kolkata",
        country: "India",
        category: "Rooms",
        owner: null
      },
      {
        title: "Modern Room in Pune - IT Area",
        description: "Spacious 2-bedroom apartment near Magarpatta. Gym, pool, 24/7 security.",
        image: {
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          filename: "pune-apt-1"
        },
        price: 4000,
        location: "Magarpatta, Pune",
        country: "India",
        category: "Rooms",
        owner: null
      },
      {
        title: "Boutique Stay in Jaipur - Pink City",
        description: "Charming heritage room in the heart of Jaipur. Traditional Rajasthani architecture with modern facilities.",
        image: {
          url: "https://images.unsplash.com/photo-1566665556112-652d216893d8?w=800",
          filename: "jaipur-heritage-1"
        },
        price: 3200,
        location: "C Scheme, Jaipur",
        country: "India",
        category: "Rooms",
        owner: null
      },

      // Mountains - Various States
      {
        title: "Mountain Retreat in Himachal Pradesh - Shimla",
        description: "Stunning 3-bedroom cottage overlooking the Himalayas. Fireplace, garden, hiking trails nearby. Perfect for mountain lovers.",
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          filename: "shimla-mountain-1"
        },
        price: 6500,
        location: "Shimla, Himachal Pradesh",
        country: "India",
        category: "Mountains",
        owner: null
      },
      {
        title: "Alpine Villa in Uttarakhand - Mussoorie",
        description: "Luxurious 4-bedroom villa with panoramic mountain views. Heated rooms, attached balconies, local food available.",
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          filename: "mussoorie-villa-1"
        },
        price: 7500,
        location: "Mussoorie, Uttarakhand",
        country: "India",
        category: "Mountains",
        owner: null
      },
      {
        title: "Hilltop Home in Nilgiris - Ooty",
        description: "Cozy 2-bedroom bungalow in the blue hills. Tea plantations nearby, cool climate, garden.",
        image: {
          url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
          filename: "ooty-hill-1"
        },
        price: 4500,
        location: "Ooty, Tamil Nadu",
        country: "India",
        category: "Mountains",
        owner: null
      },
      {
        title: "Mizoram Mountain Haven - Aizawl",
        description: "Beautiful hillside cottage with traditional design. Rice fields view, local market access, peaceful location.",
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          filename: "aizawl-mountain-1"
        },
        price: 2800,
        location: "Aizawl, Mizoram",
        country: "India",
        category: "Mountains",
        owner: null
      },
      {
        title: "Himalayan Escape in Meghalaya - Shillong",
        description: "Scenic 3-bedroom home with stunning hill views. Misty mornings, fresh air, nature trails.",
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          filename: "shillong-mountain-1"
        },
        price: 4000,
        location: "Shillong, Meghalaya",
        country: "India",
        category: "Mountains",
        owner: null
      },
      {
        title: "Mountain Cottage in Arunachal Pradesh",
        description: "Remote mountain retreat with stunning Himalayan views. 2-bedroom cottage, fireplace, local hospitality.",
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          filename: "arunachal-mountain-1"
        },
        price: 3500,
        location: "Tawang, Arunachal Pradesh",
        country: "India",
        category: "Mountains",
        owner: null
      },

      // Camping - Various States
      {
        title: "Desert Camping in Rajasthan - Jaisalmer",
        description: "Authentic desert camp with luxury tents. Camel safari, bonfire, traditional Rajasthani food.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "jaisalmer-camp-1"
        },
        price: 3500,
        location: "Jaisalmer, Rajasthan",
        country: "India",
        category: "Camping",
        owner: null
      },
      {
        title: "Adventure Camp in Gujarat - Rann of Kutch",
        description: "Canvas tent camping experience in the white salt desert. Unique landscape, sunset views, adventure activities.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "kutch-camp-1"
        },
        price: 3000,
        location: "Kutch, Gujarat",
        country: "India",
        category: "Camping",
        owner: null
      },
      {
        title: "Riverside Camp in Goa",
        description: "Tropical camping experience on riverside. Water sports, BBQ, bonfire nights, nature exploration.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "goa-camp-1"
        },
        price: 2500,
        location: "Goa",
        country: "India",
        category: "Camping",
        owner: null
      },
      {
        title: "Forest Camp in Karnataka - Kabini",
        description: "Wildlife camping experience in the jungle. Elephant interactions, bird watching, adventure activities.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "kabini-camp-1"
        },
        price: 4500,
        location: "Kabini, Karnataka",
        country: "India",
        category: "Camping",
        owner: null
      },
      {
        title: "Himalayan Camp in Himachal - Kinnaur",
        description: "Mountain camping with valley views. Trekking, meditation, organic meals, peaceful retreat.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "kinnaur-camp-1"
        },
        price: 3800,
        location: "Kinnaur, Himachal Pradesh",
        country: "India",
        category: "Camping",
        owner: null
      },
      {
        title: "Beach Camp in Maharashtra - Alibaugh",
        description: "Seaside camping with water activities. Bonfires, beach exploration, water sports.",
        image: {
          url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
          filename: "alibaugh-camp-1"
        },
        price: 2800,
        location: "Alibaugh, Maharashtra",
        country: "India",
        category: "Camping",
        owner: null
      },

      // Farms - Various States
      {
        title: "Organic Farm Stay in Punjab",
        description: "Experience rural farming life. Stay in farmhouse, participate in farming activities, traditional Punjabi meals.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "punjab-farm-1"
        },
        price: 2500,
        location: "Amritsar, Punjab",
        country: "India",
        category: "Farms",
        owner: null
      },
      {
        title: "Tea Plantation Farm in Assam",
        description: "Stay in tea garden cottage. Learn tea processing, participate in harvest, scenic plantation views.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "assam-tea-farm-1"
        },
        price: 3200,
        location: "Assam Tea Gardens",
        country: "India",
        category: "Farms",
        owner: null
      },
      {
        title: "Spice Farm in Kerala",
        description: "Spice plantation farm stay. Tour of spice gardens, cooking classes, traditional Kerala meals.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "kerala-spice-farm-1"
        },
        price: 3500,
        location: "Waynad, Kerala",
        country: "India",
        category: "Farms",
        owner: null
      },
      {
        title: "Fruit Orchard Farm in Himachal Pradesh",
        description: "Apple orchard stay. Pick your own fruits, farm tours, fresh organic meals.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "himachal-orchard-farm-1"
        },
        price: 2800,
        location: "Himachal Pradesh",
        country: "India",
        category: "Farms",
        owner: null
      },
      {
        title: "Vegetable Farm Experience in Uttarakhand",
        description: "Organic vegetable farm. Learn sustainable farming, participate in planting and harvesting.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "uttarakhand-veg-farm-1"
        },
        price: 2200,
        location: "Nainital, Uttarakhand",
        country: "India",
        category: "Farms",
        owner: null
      },
      {
        title: "Paddy Farm in West Bengal",
        description: "Traditional rice farm stay. Experience rural Bengal, participate in farm work, authentic local food.",
        image: {
          url: "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800",
          filename: "westbengal-paddy-farm-1"
        },
        price: 1800,
        location: "West Bengal",
        country: "India",
        category: "Farms",
        owner: null
      }
    ];

    // Insert listings
    await Listing.insertMany(listings);
    console.log("Successfully inserted", listings.length, "listings");
    console.log("Database seeded successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedListings();
