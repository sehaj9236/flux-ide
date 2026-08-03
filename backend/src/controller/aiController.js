import { callNvidiaAI } from "../service/nvidiaAi.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import prisma from "../db/prisma.js";
import { getAuth } from '@clerk/express';
import asyncHandler from "../utils/asyncHandler.js";



// Inside controllers/aiController.js
export const getInlineCodeCompletion = asyncHandler(async (req, res) => {
  // 1. Verify authentication for this API request using Clerk's getAuth
  const { userId } = getAuth(req);
  if (!userId) {
    throw new ApiError(401, "Unauthorized: You must be logged in to get AI suggestions.");
  }

  console.log("===================================================");
  console.log("🔥 AI ROUTE HIT! Authenticated User:", userId);
  console.log("===================================================");

  const { 
    language = "javascript", 
    framework = "react", 
    beforeContext = "", 
    currentLine = "", 
    cursorPosition = { column: 0 }, 
    afterContext = "",
    isInFunction = false,
    isInClass = false,
    isAfterComment = false,
    incompletePatterns = []
  } = req.body;

  if (!beforeContext && !currentLine) {
    throw new ApiError(400, "Code context is required.");
  }

  const systemPrompt = `You are an expert autocomplete assistant for a code editor.
Your ONLY job is to predict the exact next characters, lines of code, or plain text content.
You must seamlessly complete code logic, as well as English prose/text inside HTML/JSX markup tags.

STRICT INSTRUCTIONS:
1. Provide ONLY the exact text/code that should be inserted in place of the |CURSOR| marker.
2. Maintain proper indentation and style.
3. Do NOT include greetings, conversational filler, or markdown blocks.
4. Do NOT repeat the code that surrounds the cursor.
5. If no logical completion exists, return an empty string.`;

  const userPrompt = `Language: ${language}
Framework: ${framework}

Context:
${beforeContext}
${currentLine.substring(0, cursorPosition.column)}|CURSOR|${currentLine.substring(cursorPosition.column)}
${afterContext}

Analysis:
- In Function: ${isInFunction}
- In Class: ${isInClass}
- After Comment: ${isAfterComment}
- Incomplete Patterns: ${incompletePatterns.join(", ") || "None"}

Generate suggestion:`;

  const suggestion = await callNvidiaAI(systemPrompt, userPrompt, 300);

  return res.status(200).json(
    new ApiResponse(200, { suggestion }, "Inline suggestion generated successfully.")
  );
});
