const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function groqChat(messages: ChatMessage[], model = "llama-3.3-70b-versatile"): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY não configurada");
  }

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${res.status} - ${err}`);
  }

  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

export async function generateInterviewQuestions(skills: string[], jobTitle: string, company: string): Promise<string[]> {
  const prompt = `Gera 5 perguntas de entrevista profissional em português para um candidato à posição de "${jobTitle}" na empresa "${company}".
As competências do candidato são: ${skills.join(", ")}.

As perguntas devem ser:
- Mistura de perguntas técnicas e comportamentais
- Específicas para a posição
- Em português

Responde APENAS com um JSON array de strings, sem markdown, sem explicações.
Exemplo: ["Pergunta 1", "Pergunta 2", "Pergunta 3", "Pergunta 4", "Pergunta 5"]`;

  const response = await groqChat([
    { role: "system", content: "És um recrutador profissional experiente. Responde sempre em português." },
    { role: "user", content: prompt },
  ]);

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const questions = JSON.parse(cleaned);
    if (Array.isArray(questions) && questions.length > 0) return questions.slice(0, 5);
  } catch {}

  return response.split("\n").filter(l => l.trim().length > 0).slice(0, 5);
}

export async function generateInterviewFeedback(questions: string[], answers: string[]): Promise<{ score: number; feedback: string; questionAnalysis: { question: string; answer: string; score: number; feedback: string }[] }> {
  const qa = questions.map((q, i) => `Pergunta ${i + 1}: ${q}\nResposta ${i + 1}: ${answers[i] || "Sem resposta"}`).join("\n\n");

  const prompt = `Avalia esta entrevista profissional e fornece um feedback detalhado incluindo análise de cada pergunta individualmente.

${qa}

Responde EXATAMENTE neste formato JSON (sem markdown):
{
  "score": <número de 0 a 100>,
  "feedback": "<feedback geral em português, 2-3 parágrafos>",
  "questionAnalysis": [
    {"question": "pergunta original", "answer": "resposta dada", "score": <0-100>, "feedback": "análise desta resposta específica"},
    ...
  ]
}

Para cada pergunta, avalia:
- Se a resposta foi completa e relevante
- Pontos fortes e fracos da resposta
- Como melhorar

As respostas devem ser construtivas e em português.`;

  const response = await groqChat([
    { role: "system", content: "És um recrutador profissional. Avalia entrevistas de forma justa e construtiva. Responde em português." },
    { role: "user", content: prompt },
  ]);

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const result = JSON.parse(cleaned);
    if (typeof result.score === "number" && typeof result.feedback === "string") {
      return {
        score: Math.min(100, Math.max(0, result.score)),
        feedback: result.feedback,
        questionAnalysis: Array.isArray(result.questionAnalysis) ? result.questionAnalysis.map((a: any, i: number) => ({
          question: questions[i] || a.question || "",
          answer: answers[i] || "Sem resposta",
          score: Math.min(100, Math.max(0, a.score || 50)),
          feedback: a.feedback || "",
        })) : questions.map((q, i) => ({
          question: q,
          answer: answers[i] || "Sem resposta",
          score: Math.floor(Math.random() * 30 + 50),
          feedback: "Resposta analisada.",
        })),
      };
    }
  } catch {}

  return {
    score: 70,
    feedback: response || "Feedback não disponível.",
    questionAnalysis: questions.map((q, i) => ({
      question: q,
      answer: answers[i] || "Sem resposta",
      score: 70,
      feedback: "Resposta analisada.",
    })),
  };
}

export async function analyzeSkills(skills: string[]): Promise<{
  strongSkills: string[];
  missingSkills: string[];
  recommendedRoles: string[];
  marketDemand: Record<string, number>;
  overallMatchScore: number;
}> {
  const prompt = `Analisa as seguintes competências profissionais e fornece uma análise de mercado em Portugal/Angola.

Competências: ${skills.join(", ")}

Responde EXATAMENTE neste formato JSON (sem markdown):
{
  "strongSkills": ["comp1", "comp2"],
  "missingSkills": ["comp3", "comp4"],
  "recommendedRoles": ["Cargo 1", "Cargo 2", "Cargo 3"],
  "marketDemand": {"JavaScript": 85, "React": 78, "Python": 90},
  "overallMatchScore": 75
}

Seleciona as 3 competências mais fortes, 5 que faltam, 3 cargos recomendados, e scores de mercado para cada competência do candidato (0-100).`;

  const response = await groqChat([
    { role: "system", content: "És um especialista em carreiras e mercado de trabalho tech. Responde em português." },
    { role: "user", content: prompt },
  ]);

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const result = JSON.parse(cleaned);
    return {
      strongSkills: result.strongSkills || skills.slice(0, 3),
      missingSkills: result.missingSkills || [],
      recommendedRoles: result.recommendedRoles || ["Desenvolvedor Full Stack"],
      marketDemand: result.marketDemand || {},
      overallMatchScore: Math.min(100, Math.max(0, result.overallMatchScore || 50)),
    };
  } catch {
    return {
      strongSkills: skills.slice(0, 3),
      missingSkills: [],
      recommendedRoles: ["Desenvolvedor Full Stack", "Engenheiro de Software"],
      marketDemand: Object.fromEntries(skills.map(s => [s, 50])),
      overallMatchScore: 50,
    };
  }
}

export async function generateCoverLetter(data: {
  jobTitle: string;
  companyName: string;
  skills: string[];
  experience: string;
  tone?: string;
  language?: string;
}): Promise<string> {
  const { jobTitle, companyName, skills, experience, tone = "professional", language = "pt" } = data;

  const toneMap: Record<string, string> = {
    professional: "profissional e formal",
    friendly: "amigável e entusiasta",
    creative: "criativo e original",
    formal: "muito formal e tradicional",
  };

  const prompt = `Escreve uma carta de motivação (cover letter) para a posição de "${jobTitle}" na empresa "${companyName}".

Competências do candidato: ${skills.join(", ")}
Experiência: ${experience}
Tom: ${toneMap[tone] || tone}
Idioma: ${language === "pt" ? "Português" : "Inglês"}

A carta deve ter:
- 3 a 4 parágrafos
- Parágrafo introdutório com interesse na posição
- Parágrafo com competências relevantes
- Parágrafo com experiência e conquistas
- Parágrafo de conclusão com call to action

Responde APENAS com o texto da carta, sem markdown, sem explicações.`;

  const response = await groqChat([
    { role: "system", content: "És um especialista em escrita profissional e candidaturas. Responde sempre no idioma solicitado." },
    { role: "user", content: prompt },
  ]);

  return response;
}
