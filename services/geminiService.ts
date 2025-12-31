
import { GoogleGenAI, Type } from "@google/genai";

// Updated system instruction to reflect the deep "Aesthetic Blender" persona
const SYSTEM_INSTRUCTION = `你是一位拥有通感能力的“美学调配师”。你能通过一个名字（书名、电影名、作者、人物），洞察其灵魂深处的颜色、味道和氛围，并将其具象化为一张“通感卡片”。

# Task
当用户输入一个关键词（书名、电影、剧集、作者或人物）时，请执行以下步骤：
1. 通感分析：分析该对象的精神内核（是孤独、热烈、虚无还是治愈？）。
2. 形态选择：判断该对象更适合做成一杯“特调鸡尾酒”还是一瓶“沙龙香水”。
3. 内容生成：用优美、深邃、富有文学性的中文撰写卡片内容。
4. 视觉转译：基于内容，编写一段高质量的 AI 绘画提示词（English Prompt）。

必须以 JSON 格式输出，严格遵守提供的 Schema。`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "基于作品隐喻创作的卡片名称" },
    quote: { type: Type.STRING, description: "提炼作品核心气质的一句话金句" },
    type: { type: Type.STRING, enum: ["cocktail", "perfume"], description: "作品形态" },
    baseNote: {
      type: Type.OBJECT,
      properties: {
        component: { type: Type.STRING, description: "基调或基酒成分" },
        meaning: { type: Type.STRING, description: "该成分对应的隐喻含义" }
      },
      required: ["component", "meaning"]
    },
    midNote: {
      type: Type.OBJECT,
      properties: {
        component: { type: Type.STRING, description: "中调或辅料成分" },
        meaning: { type: Type.STRING, description: "该成分对应的情感张力" }
      },
      required: ["component", "meaning"]
    },
    endNote: {
      type: Type.OBJECT,
      properties: {
        component: { type: Type.STRING, description: "尾调或装饰成分" },
        meaning: { type: Type.STRING, description: "该成分对应的余韵与细节" }
      },
      required: ["component", "meaning"]
    },
    rationale: { type: Type.STRING, description: "灵感手记，100-150字中文，第一人称文案" },
    visualConcept: {
      type: Type.OBJECT,
      properties: {
        colors: { type: Type.STRING, description: "主色调搭配描述" },
        elements: { type: Type.STRING, description: "画面关键元素描述" }
      },
      required: ["colors", "elements"]
    },
    aiPrompt: { type: Type.STRING, description: "Midjourney/Flux 英文提示词" }
  },
  required: ["title", "quote", "type", "baseNote", "midNote", "endNote", "rationale", "visualConcept", "aiPrompt"]
};

export const generateSynesthesiaCard = async (subject: string) => {
  // Creating a fresh GoogleGenAI instance for each request as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `请分析以下对象并生成通感卡片: ${subject}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // Accessing .text property directly as per Gemini API guidelines
    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
