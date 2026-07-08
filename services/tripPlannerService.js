const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateTripPlan({ destination, checkIn, checkOut, guests, budget, hotels }) {
  const hotelList = hotels.length
    ? hotels.map((h) => `- ${h.title} in ${h.location} | ₹${h.price}/night`).join("\n")
    : "No hotels found for this destination yet.";

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are a helpful travel planner for India.

Trip details:
- Destination: ${destination}
- Duration: ${nights} night(s), Guests: ${guests}, Budget: ₹${budget}
- Check-in: ${checkIn}, Check-out: ${checkOut}

Available hotels:
${hotelList}

Give:
1. Overview of ${destination}
2. Day-by-day itinerary
3. Best hotel from the list
4. Budget breakdown
5. Travel tips`
      }
    ],
    max_tokens: 1500,
  });

  return completion.choices[0].message.content;
}

module.exports = { generateTripPlan };