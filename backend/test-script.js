import { callNvidiaAI } from "./src/service/nvidiaAi.js";


const testLLM = async () => {
  console.log("Sending request to NVIDIA NIM...");

  const systemPrompt = "You are a helpful AI coding assistant. Respond with a very short and concise answer.";
  const userPrompt = "Generate me a code for Cloud based collaborative code editor need a react component with tailwind css";

  try {
    const response = await callNvidiaAI(systemPrompt, userPrompt, 5000);
    
    console.log("\n✅ --- LLM Response --- ✅");
    console.log(response);
    console.log("---------------------------\n");
    
    process.exit(0); 
  } catch (error) {
    console.error("❌ Test failed. Error details:", error);
    process.exit(1);
  }
};

// You MUST call the function here for it to run
testLLM();