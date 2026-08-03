import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API,
  baseURL: process.env.NVIDIA_BASE_URL,
});

export async function callNvidiaAI(systemPrompt, userPrompt, maxTokens = 1024) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-pro",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: maxTokens,
      chat_template_kwargs: { "thinking": false },
      stream: false
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error("NVIDIA NIM API Error:", error);
    throw error;
  }
}