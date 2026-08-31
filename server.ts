import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. AI features will fallback to smart curated rules.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: AI Stylist & Room Recommendations
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { currentProductId, viewedProductIds = [], roomType, stylePreference, colorVibe, budgetRange, userPrompt } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback if API key is not yet configured in environment
      return res.json({
        summary: "Curated harmonious selections designed for warm organic minimalism and architectural balance.",
        styleProfile: stylePreference || "Warm Scandinavian / Japandi",
        recommendedProductIds: ['table-travertine-arc', 'chair-kanso-lounge', 'lamp-kyoto-sphere'],
        decorAdvice: [
          "Balance the tactile bouclé and heavy timbers with porous natural stone surfaces like honed travertine.",
          "Introduce warm 2700K ambient illumination with washi paper or frosted opal glass to diffuse harsh shadows.",
          "Keep floor surfaces grounded with an undyed wool or high-pile jute area rug in soft oatmeal tones."
        ],
        colorPalette: [
          { name: "Oatmeal Cream", hex: "#FAF5ED" },
          { name: "Smoked Walnut", hex: "#5D4037" },
          { name: "Warm Roman Travertine", hex: "#E4DDD3" },
          { name: "Muted Terracotta", hex: "#B85D3B" }
        ]
      });
    }

    const systemPrompt = `You are the Master Interior Stylist at 'Atelier Form', a luxury modern furniture brand. 
Your catalog includes:
- 'sofa-solis-boucle' (Solis Curved Bouclé Sofa, $2450)
- 'table-travertine-arc' (Palazzo Travertine Coffee Table, $1380)
- 'chair-kanso-lounge' (Kanso Minimalist Lounge Chair, $890)
- 'table-arcadia-dining' (Arcadia Solid Walnut Dining Table, $2150)
- 'chair-aethel-dining' (Aethel Sculpted Dining Chair, $680)
- 'bed-haven-platform' (Haven Floating Platform Bed, $1950)
- 'storage-aer-credenza' (Aer Fluted Sideboard Credenza, $1780)
- 'sofa-nordic-modular' (Forma Modular Sectional Sofa, $3200)
- 'lamp-kyoto-sphere' (Kyoto Washi Paper Floor Lamp, $420)
- 'lamp-brass-chandelier' (Astral Sculptural Brass Pendant, $790)
- 'chair-nordic-linen' (Svelta Armchair in French Linen, $760)
- 'bed-nara-timber' (Nara Solid Walnut Spindle Bed, $1850)
- 'storage-pillar-bookshelf' (Atlas Architectural Bookcase, $1250)
- 'table-zen-desk' (Tenor Executive Writing Desk, $1450)

Provide an authentic, highly refined design recommendation in JSON format matching the schema. Select 2-4 exact product IDs from the list above that best complement the context.`;

    const userMessage = `Generate interior styling recommendations based on:
- Current/Focal Product: ${currentProductId || 'None'}
- Browsed Products: ${viewedProductIds.join(', ') || 'General Exploration'}
- Room Category: ${roomType || 'Living Room'}
- Design Style: ${stylePreference || 'Organic Modern / Japandi'}
- Color Preference: ${colorVibe || 'Earthy Neutrals & Warm Tones'}
- Budget Target: ${budgetRange || 'Flexible'}
- Custom Request: ${userPrompt || 'Create a cohesive, timeless room scheme.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: 'Editorial styling overview for this space' },
            styleProfile: { type: Type.STRING, description: 'Name of the resulting aesthetic profile' },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of exact product IDs from the catalog'
            },
            decorAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 concrete architectural and styling tips for layout, lighting, and textiles'
            },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING }
                },
                required: ['name', 'hex']
              },
              description: '3-4 complementary paint/material color swatches'
            }
          },
          required: ['summary', 'styleProfile', 'recommendedProductIds', 'decorAdvice', 'colorPalette']
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Error generating AI styling recommendation:', error);
    // Return structured graceful fallback
    return res.json({
      summary: "Curated harmonious selections designed for warm organic minimalism and architectural balance.",
      styleProfile: "Warm Scandinavian / Japandi",
      recommendedProductIds: ['table-travertine-arc', 'chair-kanso-lounge', 'lamp-kyoto-sphere'],
      decorAdvice: [
        "Pair curved sculptural seating with rectilinear stone or solid wood tables for visual balance.",
        "Layer varied textures (bouclé, linen, and honed stone) to create depth without visual noise.",
        "Incorporate warm indirect light at eye level to enhance timber grain and textile weaves."
      ],
      colorPalette: [
        { name: "Oatmeal Cream", hex: "#FAF5ED" },
        { name: "Smoked Walnut", hex: "#5D4037" },
        { name: "Warm Roman Travertine", hex: "#E4DDD3" }
      ]
    });
  }
});

// API: AI Interior Consultation Chat
app.post('/api/ai/stylist-chat', async (req, res) => {
  try {
    const { messages, contextProduct } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: "I'd be delighted to help you style your space! For a cohesive look, I recommend pairing natural oak and walnut timbers with tactile bouclé or Belgian linen fabrics, grounded by a statement travertine or marble piece. How can I help you customize your room dimensions or color scheme?"
      });
    }

    const systemInstruction = `You are 'Atelier AI', the personal interior design architect and stylist for Atelier Form modern furniture.
You possess deep knowledge of architectural interior design, proportions, ergonomics, lighting color temperatures, Scandinavian, Japandi, Mid-Century Modern, and Bauhaus aesthetics.
Speak with an elegant, warm, sophisticated, yet approachable tone.
Provide specific furniture pairing ideas, layout tips, spacing rules (e.g. 18" between sofa and coffee table, 36" dining walkway), and color harmony suggestions.
Keep replies concise, clear, and scannable (2-3 short paragraphs or clean bullet points).`;

    const chatContext = contextProduct 
      ? `The user is currently considering or asking about: ${contextProduct.name} (${contextProduct.category}, $${contextProduct.price}, materials: ${contextProduct.materials?.join(', ')}, dimensions: ${contextProduct.dimensions?.width}"W x ${contextProduct.dimensions?.depth}"D x ${contextProduct.dimensions?.height}"H).`
      : '';

    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: [
        { role: 'user', parts: [{ text: `Context: ${chatContext}\n\nUser Question: ${messages[messages.length - 1]?.content || 'Give me advice on styling this piece.'}` }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text || "I'd recommend pairing this piece with warm ambient lighting and natural textures." });
  } catch (error) {
    console.error('Error in stylist chat:', error);
    res.json({
      reply: "For timeless harmony, I suggest pairing your furniture with warm indirect lighting (2700K), organic textiles such as wool or Belgian linen, and natural stone accessories. Let me know if you need specific measurements or material pairing advice!"
    });
  }
});

// Setup Vite middleware in Dev or Static in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atelier Form server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
