const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCIsZW2ZmJB9rDFGY2ADZD-bC8QN2PXvb0");

async function run() {
  try {
    console.log("Testing Gemini 1.5 Flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Say Hello");
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Success! Response:", text);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

run();