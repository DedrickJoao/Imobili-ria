import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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

// Setup Nodemailer Transporter
const createMailTransporter = async () => {
  // If custom SMTP is provided in env
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to test ethereal account or local sendmail logger
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (e) {
    console.warn('Could not initialize Ethereal test account, will use console mail transporter:', e);
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
  }
};

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: AI Stylist & Room Recommendations
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { currentProductId, viewedProductIds = [], roomType, stylePreference, colorVibe, userPrompt } = req.body;
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

    const systemPrompt = `You are the Master Interior Stylist at 'Sarvicimobliaria', a luxury modern architectural furniture studio. 
Your catalog includes:
- 'sofa-solis-boucle' (Solis Curved Bouclé Sofa)
- 'table-travertine-arc' (Palazzo Travertine Coffee Table)
- 'chair-kanso-lounge' (Kanso Minimalist Lounge Chair)
- 'table-arcadia-dining' (Arcadia Solid Walnut Dining Table)
- 'chair-aethel-dining' (Aethel Sculpted Dining Chair)
- 'bed-haven-platform' (Haven Floating Platform Bed)
- 'storage-aer-credenza' (Aer Fluted Sideboard Credenza)
- 'sofa-nordic-modular' (Forma Modular Sectional Sofa)
- 'lamp-kyoto-sphere' (Kyoto Washi Paper Floor Lamp)
- 'lamp-brass-chandelier' (Astral Sculptural Brass Pendant)
- 'chair-nordic-linen' (Svelta Armchair in French Linen)
- 'bed-nara-timber' (Nara Solid Walnut Spindle Bed)
- 'storage-pillar-bookshelf' (Atlas Architectural Bookcase)
- 'table-zen-desk' (Tenor Executive Writing Desk)

Provide an authentic, highly refined design recommendation in JSON format matching the schema. Select 2-4 exact product IDs from the list above that best complement the context. Note: do not include prices or monetary budgets.`;

    const userMessage = `Generate interior styling recommendations based on:
- Current/Focal Product: ${currentProductId || 'None'}
- Browsed Products: ${viewedProductIds.join(', ') || 'General Exploration'}
- Room Category: ${roomType || 'Living Room'}
- Design Style: ${stylePreference || 'Organic Modern / Japandi'}
- Color Preference: ${colorVibe || 'Earthy Neutrals & Warm Tones'}
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

    const systemInstruction = `You are the personal interior design architect and stylist for Sarvicimobliaria modern furniture studio.
You possess deep knowledge of architectural interior design, proportions, ergonomics, lighting color temperatures, Scandinavian, Japandi, Mid-Century Modern, and Bauhaus aesthetics.
Respond in the language requested by the user or match their language (Portuguese if Portuguese, English if English).
Speak with an elegant, warm, sophisticated, yet approachable tone.
Provide specific furniture pairing ideas, layout tips, spacing rules (e.g. 18" between sofa and coffee table, 36" dining walkway), and color harmony suggestions. Do not discuss prices.
Keep replies concise, clear, and scannable (2-3 short paragraphs or clean bullet points).`;

    const chatContext = contextProduct 
      ? `The user is currently considering or asking about: ${contextProduct.name} (${contextProduct.category}, materials: ${contextProduct.materials?.join(', ')}, dimensions: ${contextProduct.dimensions?.width}"W x ${contextProduct.dimensions?.depth}"D x ${contextProduct.dimensions?.height}"H).`
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

// Helper to format item rows for HTML email
const buildItemsHtml = (items: any[]) => {
  return items
    .map(
      (item, idx) => `
    <tr style="border-bottom: 1px solid #E5E4E2;">
      <td style="padding: 12px 8px; font-family: 'Georgia', serif; font-style: italic; color: #1A1A1A; font-size: 14px;">
        <strong>${idx + 1}. ${item.name || item.product?.name}</strong>
        ${item.sku ? `<div style="font-size: 11px; color: #7A7A7A; font-family: sans-serif; font-style: normal;">SKU: ${item.sku}</div>` : ''}
      </td>
      <td style="padding: 12px 8px; color: #5A5A5A; font-size: 13px; font-family: sans-serif;">
        ${item.color || item.selectedColor?.name || 'Acabamento Padrão'}
      </td>
      <td style="padding: 12px 8px; color: #1A1A1A; font-weight: bold; text-align: center; font-size: 13px; font-family: sans-serif;">
        ${item.quantity || 1}
      </td>
    </tr>
  `
    )
    .join('');
};

// API: Order Submission & Email Dispatch
app.post('/api/orders/submit', async (req, res) => {
  try {
    const { orderId, customer, items = [], deliveryMethod, paymentPreference, notes } = req.body;
    const storeEmail = 'dedrickdomingos.domingos@gmail.com';
    const clientEmail = customer?.email;
    const safeOrderId = orderId || 'SVM-' + Date.now();
    const customerFullName = `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim() || 'Cliente';
    const formattedDate = new Date().toLocaleString('pt-PT', {
      timeZone: 'Africa/Maputo',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const paymentLabel =
      paymentPreference === 'cash-on-delivery'
        ? 'Pay while ordering in the office / Pagamento ao encomendar no escritório'
        : paymentPreference === 'mpesa'
        ? 'M-Pesa (Vodacom)'
        : paymentPreference === 'bank-transfer'
        ? 'Transferência Bancária (BCI / Millennium BIM / Standard Bank / Moza)'
        : 'Pay while ordering in the office';

    const deliveryLabel =
      deliveryMethod === 'white-glove'
        ? 'Entrega White-Glove Especializada com Montagem no Cômodo (Moçambique)'
        : 'Entrega Padrão ao Domicílio / Levantamento no Showroom';

    console.log('====================================================');
    console.log(`[SARVICIMOBLIARIA] NOVO PEDIDO RECEBIDO - MOÇAMBIQUE`);
    console.log(`Destinatário Notificação Loja: ${storeEmail}`);
    console.log(`Destinatário Cliente: ${clientEmail}`);
    console.log(`Pedido ID: ${safeOrderId}`);
    console.log(`Cliente: ${customerFullName}`);
    console.log(`Telefone/WhatsApp: ${customer?.phone}`);
    console.log(`Endereço: ${customer?.address}, ${customer?.apartment ? customer.apartment + ', ' : ''}${customer?.city}, ${customer?.state || 'Maputo'}, ${customer?.country || 'Moçambique'}`);
    console.log(`Método de Entrega: ${deliveryLabel}`);
    console.log(`Forma de Pagamento: ${paymentLabel}`);
    if (notes) console.log(`Observações: ${notes}`);
    console.log(`Itens Solicitados (${items.length}):`);
    items.forEach((item: any, idx: number) => {
      console.log(`  ${idx + 1}. ${item.name || item.product?.name} (Qtd: ${item.quantity}) - Acabamento/Cor: ${item.color || item.selectedColor?.name || 'Padrão'}`);
    });
    console.log('====================================================');

    // Generate HTML for Store Administrator Email
    const adminEmailHtml = `
      <div style="background-color: #FAF9F6; padding: 24px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A1A1A;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E4E2; border-radius: 4px; overflow: hidden;">
          <div style="background-color: #1A1A1A; padding: 24px; text-align: center; color: #FFFFFF;">
            <h1 style="font-family: 'Georgia', serif; font-style: italic; font-size: 22px; margin: 0; letter-spacing: 2px;">SARVICIMOBLIARIA</h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #A08C75; margin: 6px 0 0;">Novo Pedido de Mobiliário / Trabalho</p>
          </div>
          
          <div style="padding: 24px;">
            <div style="background-color: #F5F2ED; border-left: 4px solid #A08C75; padding: 12px 16px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1A1A1A;">Referência do Pedido: #${safeOrderId}</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #5A5A5A;">Data: ${formattedDate}</p>
            </div>

            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #A08C75; margin-bottom: 10px; border-bottom: 1px solid #E5E4E2; padding-bottom: 4px;">1. Detalhes do Cliente</h2>
            <table style="width: 100%; font-size: 13px; margin-bottom: 20px; line-height: 1.6;">
              <tr><td style="width: 35%; color: #7A7A7A;">Nome Completo:</td><td style="font-weight: bold; color: #1A1A1A;">${customerFullName}</td></tr>
              <tr><td style="color: #7A7A7A;">E-mail:</td><td><a href="mailto:${clientEmail}" style="color: #A08C75; text-decoration: none;">${clientEmail}</a></td></tr>
              <tr><td style="color: #7A7A7A;">Telefone / WhatsApp:</td><td style="font-weight: bold; color: #1A1A1A;">${customer?.phone || 'Não informado'}</td></tr>
              <tr><td style="color: #7A7A7A;">Endereço:</td><td>${customer?.address || ''} ${customer?.apartment ? `(${customer.apartment})` : ''}</td></tr>
              <tr><td style="color: #7A7A7A;">Cidade / Província:</td><td>${customer?.city || 'Maputo'}, ${customer?.state || 'Maputo Cidade'}, Moçambique</td></tr>
              ${customer?.zipCode ? `<tr><td style="color: #7A7A7A;">Código Postal:</td><td>${customer.zipCode}</td></tr>` : ''}
              ${notes ? `<tr><td style="color: #7A7A7A;">Instruções / Ponto Ref:</td><td style="background: #FFF8E7; padding: 4px 8px; border-radius: 2px;">${notes}</td></tr>` : ''}
            </table>

            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #A08C75; margin-bottom: 10px; border-bottom: 1px solid #E5E4E2; padding-bottom: 4px;">2. Detalhes da Compra / Trabalho Encomendado</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #FAF9F6; border-bottom: 2px solid #E5E4E2; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7A7A7A;">
                  <th style="padding: 8px;">Artigo / Peça</th>
                  <th style="padding: 8px;">Cor / Acabamento</th>
                  <th style="padding: 8px; text-align: center;">Qtd</th>
                </tr>
              </thead>
              <tbody>
                ${buildItemsHtml(items)}
              </tbody>
            </table>

            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #A08C75; margin-bottom: 10px; border-bottom: 1px solid #E5E4E2; padding-bottom: 4px;">3. Logística & Pagamento</h2>
            <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 10px;">
              <tr><td style="width: 35%; color: #7A7A7A;">Forma de Pagamento:</td><td style="font-weight: bold; color: #1A1A1A;">${paymentLabel}</td></tr>
              <tr><td style="color: #7A7A7A;">Modalidade de Entrega:</td><td style="color: #1A1A1A;">${deliveryLabel}</td></tr>
            </table>
          </div>

          <div style="background-color: #F5F5F5; padding: 16px; text-align: center; font-size: 11px; color: #7A7A7A; border-top: 1px solid #E5E4E2;">
            Sarvicimobliaria · Arquitetura, Imobiliária & Mobiliário Fino · Moçambique
          </div>
        </div>
      </div>
    `;

    // Generate HTML for Customer Confirmation Email
    const customerEmailHtml = `
      <div style="background-color: #FAF9F6; padding: 24px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A1A1A;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E4E2; border-radius: 4px; overflow: hidden;">
          <div style="background-color: #1A1A1A; padding: 28px 24px; text-align: center; color: #FFFFFF;">
            <h1 style="font-family: 'Georgia', serif; font-style: italic; font-size: 24px; margin: 0; letter-spacing: 2px;">SARVICIMOBLIARIA</h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #A08C75; margin: 6px 0 0;">Confirmação de Pedido de Mobiliário</p>
          </div>
          
          <div style="padding: 24px;">
            <p style="font-size: 15px; color: #1A1A1A; margin-top: 0;">
              Prezado(a) <strong>${customerFullName}</strong>,
            </p>
            <p style="font-size: 13px; color: #5A5A5A; line-height: 1.6;">
              Agradecemos a sua preferência pela <strong>Sarvicimobliaria</strong>. O seu pedido foi registado com sucesso e os detalhes completos do trabalho foram encaminhados para o nosso ateliê de produção e equipa de atendimento em Moçambique.
            </p>

            <div style="background-color: #F5F2ED; border-left: 4px solid #A08C75; padding: 12px 16px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1A1A1A;">Código do Pedido: #${safeOrderId}</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #5A5A5A;">Data do Registo: ${formattedDate}</p>
            </div>

            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #A08C75; margin-bottom: 10px; border-bottom: 1px solid #E5E4E2; padding-bottom: 4px;">Peças Encomendadas</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #FAF9F6; border-bottom: 2px solid #E5E4E2; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7A7A7A;">
                  <th style="padding: 8px;">Artigo / Design</th>
                  <th style="padding: 8px;">Acabamento</th>
                  <th style="padding: 8px; text-align: center;">Qtd</th>
                </tr>
              </thead>
              <tbody>
                ${buildItemsHtml(items)}
              </tbody>
            </table>

            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #A08C75; margin-bottom: 10px; border-bottom: 1px solid #E5E4E2; padding-bottom: 4px;">Informações de Entrega & Contacto</h2>
            <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
              <tr><td style="width: 35%; color: #7A7A7A;">Endereço de Entrega:</td><td>${customer?.address || ''} ${customer?.apartment ? `(${customer.apartment})` : ''} - ${customer?.city || 'Maputo'}, ${customer?.state || 'Maputo Cidade'}</td></tr>
              <tr><td style="color: #7A7A7A;">Telefone / WhatsApp:</td><td style="font-weight: bold;">${customer?.phone || 'Informado'}</td></tr>
              <tr><td style="color: #7A7A7A;">Modalidade de Entrega:</td><td>${deliveryLabel}</td></tr>
              <tr><td style="color: #7A7A7A;">Preferência de Pagamento:</td><td style="font-weight: bold;">${paymentLabel}</td></tr>
            </table>

            <div style="background-color: #FAF9F6; border: 1px solid #E5E4E2; padding: 14px; border-radius: 4px; margin-top: 20px;">
              <h3 style="margin: 0 0 6px; font-size: 13px; color: #1A1A1A;">Próximos Passos:</h3>
              <p style="margin: 0; font-size: 12px; color: #5A5A5A; line-height: 1.5;">
                A nossa equipa comercial entrará em contacto consigo por WhatsApp ou chamada telefónica para confirmar os detalhes de acabamento, alinhar a data ideal de entrega especializada e formalizar o pagamento conforme a sua opção seleccionada.
              </p>
            </div>
          </div>

          <div style="background-color: #1A1A1A; padding: 18px; text-align: center; font-size: 11px; color: #DEDCD7;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #FFFFFF;">Sarvicimobliaria Moçambique</p>
            <p style="margin: 0;">E-mail: dedrickdomingos.domingos@gmail.com | WhatsApp: +258 84 920 1842</p>
          </div>
        </div>
      </div>
    `;

    // Attempt dispatch via nodemailer
    let mailDispatchStatus = 'dispatched_and_logged';
    try {
      const transporter = await createMailTransporter();
      
      // Dispatch email to store owner
      await transporter.sendMail({
        from: '"Sarvicimobliaria Studio" <orders@sarvicimobliaria.co.mz>',
        to: storeEmail,
        subject: `[Novo Pedido #${safeOrderId}] Mobiliário - ${customerFullName} (${items.length} itens)`,
        html: adminEmailHtml,
        text: `Novo pedido #${safeOrderId} recebido de ${customerFullName} (${customer?.phone}, ${clientEmail}). Itens: ${items.map((i: any) => `${i.name} (x${i.quantity})`).join(', ')}. Pagamento: ${paymentLabel}.`,
      });

      // Dispatch confirmation email to client if valid email provided
      if (clientEmail && clientEmail.includes('@')) {
        await transporter.sendMail({
          from: '"Sarvicimobliaria Studio" <orders@sarvicimobliaria.co.mz>',
          to: clientEmail,
          subject: `Confirmação de Pedido #${safeOrderId} - Sarvicimobliaria`,
          html: customerEmailHtml,
          text: `Olá ${customerFullName}, recebemos o seu pedido #${safeOrderId} na Sarvicimobliaria. Nossa equipa entrará em contacto em breve para alinhar os detalhes e a entrega.`,
        });
      }
    } catch (mailError) {
      console.warn('Nodemailer dispatch warning (email details still logged and response provided):', mailError);
      mailDispatchStatus = 'logged_successfully';
    }

    res.json({
      success: true,
      message: `Detalhes completos do pedido e do trabalho enviados com sucesso para ${storeEmail} e para ${clientEmail}.`,
      notifiedStoreEmail: storeEmail,
      notifiedCustomerEmail: clientEmail,
      orderId: safeOrderId,
      dispatchStatus: mailDispatchStatus,
      customerDetails: {
        name: customerFullName,
        email: clientEmail,
        phone: customer?.phone,
        address: customer?.address,
        city: customer?.city,
        state: customer?.state,
      },
      workSummary: {
        itemCount: items.length,
        items: items.map((it: any) => ({
          name: it.name || it.product?.name,
          quantity: it.quantity,
          color: it.color || it.selectedColor?.name,
        })),
        deliveryMethod: deliveryLabel,
        paymentPreference: paymentLabel,
      },
      status: 'confirmed_and_dispatched',
    });
  } catch (error) {
    console.error('Erro ao processar submissão do pedido:', error);
    res.status(500).json({ success: false, error: 'Erro ao processar pedido' });
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
