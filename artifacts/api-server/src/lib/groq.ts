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

export async function generateInterviewQuestions(skills: string[], jobTitle: string, company: string, count: number = 5): Promise<string[]> {
  const prompt = `Gera ${count} perguntas de entrevista profissional em português para um candidato à posição de "${jobTitle}" na empresa "${company}".
As competências do candidato são: ${skills.join(", ")}.

As perguntas devem ser:
- Mistura de perguntas técnicas e comportamentais
- Específicas para a posição
- Em português
- Diversificadas (não repetir temas)

Responde APENAS com um JSON array de strings, sem markdown, sem explicações.
Exemplo: ["Pergunta 1", "Pergunta 2", "Pergunta 3"]`;

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
  const qa = questions.map((q, i) => `Pergunta ${i + 1}: ${q}\nResposta ${i + 1}: ${answers[i] || "Sem resposta (resposta vazia)"}`).join("\n\n");

  const prompt = `És um entrevistador profissional MUITO RIGOROSO. Avalia esta entrevista de forma exigente e justa. Não sejas condescendente — penaliza respostas vagas, incompletas ou irrelevantes.

CRITÉRIOS DE AVALIAÇÃO RIGOROSOS:
- Resposta vazia ou "não sei": 0-10%
- Resposta muito vaga ou genérica (ex: "trabalho bem em equipa" sem exemplos): 15-30%
- Resposta parcialmente relevante mas sem profundidade: 30-50%
- Resposta relevante com algum detalhe: 50-70%
- Resposta completa, técnica, com exemplos concretos: 70-85%
- Resposta excelente com exemplos reais, dados específicos e demonstração profunda de conhecimento: 85-100%

PENALIZAÇÕES EXPLÍCITAS:
- Resposta com menos de 30 palavras: descontar 20 pontos
- Resposta que não responde diretamente à pergunta: descontar 30 pontos
- Resposta genérica sem exemplos concretos: descontar 15 pontos
- Resposta copiada ou irrelevante: descontar 40 pontos

${qa}

Responde EXATAMENTE neste formato JSON (sem markdown):
{
  "score": <média rigorosa de 0 a 100, arredondada>,
  "feedback": "<feedback geral MUITO honesto e direto em português, 2-3 parágrafos. Destaca pontos fracos e o que precisa melhorar>",
  "questionAnalysis": [
    {"question": "pergunta original", "answer": "resposta dada", "score": <0-100 rigoroso>, "feedback": "análise CRÍTICA e específica desta resposta"},
    ...
  ]
}

Para cada pergunta, avalia RIGOROSAMENTE:
- Relevância direta da resposta à pergunta
- Profundidade técnica e especificidade
- Uso de exemplos concretos ou dados
- Clareza e estrutura da resposta
- Comprimento adequado (respostas curtas demais são penalizadas)

As respostas devem ser construtivas, honestas e em português. NÃO inflaciones as notas.`;

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
  const prompt = `És um especialista MUITO RIGOROSO em carreiras e mercado de trabalho tech em Angola/Portugal. Avalia estas competências de forma exigente.

Competências do candidato: ${skills.join(", ")}

CRITÉRIOS DE AVALIAÇÃO:
- Se o candidato tem poucas competências (< 3), penaliza o score geral
- Se as competências são muito genéricas (ex: "Office", "Word"), penalty de 20 pontos
- Skills muito específicas e demandadas no mercado angolano: bónus de 10 pontos
- Considera a demanda REAL do mercado angolano

Responde EXATAMENTE neste formato JSON (sem markdown):
{
  "strongSkills": ["até 3 competências mais fortes do candidato"],
  "missingSkills": ["até 5 competências IMPORTANTES que faltam"],
  "recommendedRoles": ["3 cargos realistas para o mercado angolano"],
  "marketDemand": {"competência": score de 0-100 baseado na DEMANDA REAL no mercado angolano},
  "overallMatchScore": <score rigoroso de 0-100>
}

O overallMatchScore deve refletir:
- Quantidade de competências (mais = melhor)
- Qualidade/relevância das competências para o mercado angolano
- Presença de skills demandadas (cloud, data, devops = alto; office básico = baixo)
- Se há apenas 2-3 skills básicas, score máximo 35
- Se há 5+ skills relevantes e específicas, score pode chegar a 80-90
- NUNCA dar acima de 90 sem justificação excepcional`;

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

export async function parseCvWithAi(cvText: string): Promise<{
  isValid: boolean;
  rejectionReason?: string;
  skills: string[];
  experience: string;
  education: string;
  summary: string;
}> {
  const truncated = cvText.substring(0, 4000);

  const validationPrompt = `És um validador de CVs. Analisa o seguinte texto e determina se é um CURRICULUM VITAE válido.

TEXTO:
---
${truncated}
---

CRITÉRIOS DE REJEIÇÃO (responde com isValid: false se algum se aplicar):
- É uma receita de culinária
- É uma história/conto/romance
- É uma mensagem de WhatsApp ou conversa informal
- É código de programação
- É um poema ou letra de música
- É um artigo de notícias
- É uma lista de compras
- É texto técnico aleatório (manual, documentação)
- É um email ou carta pessoal não profissional
- Não contém NENHUMA informação profissional (nome, experiência, competências, formação)
- É texto demasiado curto (< 20 palavras) sem info profissional

CRITÉRIOS DE APROVAÇÃO (responde com isValid: true):
- Contém informações sobre experiência profissional
- Contém competências ou habilidades
- Contém formação académica
- Contém dados de contacto profissionais
- É estruturado como CV (mesmo que informal)

Responde EXATAMENTE neste formato JSON (sem markdown):
{"isValid": true/false, "rejectionReason": "razão em português se rejeitado, null se aprovado"}`;

  const validationResponse = await groqChat([
    { role: "system", content: "És um validador de CVs. Responde APENAS com JSON válido." },
    { role: "user", content: validationPrompt },
  ], "llama-3.3-70b-versatile");

  try {
    const cleanedValidation = validationResponse.replace(/```json\n?|\n?```/g, "").trim();
    const validation = JSON.parse(cleanedValidation);

    if (validation.isValid === false) {
      return {
        isValid: false,
        rejectionReason: validation.rejectionReason || "O ficheiro carregado não parece ser um CV válido.",
        skills: [],
        experience: "",
        education: "",
        summary: "",
      };
    }
  } catch {
    // Se a validação falhar, continuar com a extração normal
  }

  const extractPrompt = `És um especialista em recrutamento e análise de CVs. Analisa o seguinte texto de CV e extrai as seguintes informações estruturadas:

TEXTO DO CV:
---
${truncated}
---

Responde EXATAMENTE neste formato JSON (sem markdown, sem explicações):
{
  "skills": ["lista de competências técnicas e soft skills encontradas no CV"],
  "experience": "resumo da experiência profissional formatada em parágrafos",
  "education": "formação académica encontrada",
  "summary": "um resumo profissional de 2-3 frases sobre o perfil do candidato"
}

REGRAS:
- skills: extrai TODAS as competências mencionadas (tecnologias, idiomas, ferramentas, soft skills)
- experience: formata cronologicamente com empresa, cargo e período se disponível
- education: inclui instituição, grau e ano se disponível
- summary: resumo conciso do perfil profissional
- Se alguma informação não estiver no CV, retorna string vazia para esse campo`;

  const response = await groqChat([
    { role: "system", content: "És um especialista em análise de CVs. Responde sempre em português. Responde APENAS com JSON válido, sem markdown." },
    { role: "user", content: extractPrompt },
  ], "llama-3.3-70b-versatile");

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const result = JSON.parse(cleaned);
    return {
      isValid: true,
      skills: Array.isArray(result.skills) ? result.skills : [],
      experience: typeof result.experience === "string" ? result.experience : "",
      education: typeof result.education === "string" ? result.education : "",
      summary: typeof result.summary === "string" ? result.summary : "",
    };
  } catch {
    return { isValid: true, skills: [], experience: "", education: "", summary: "" };
  }
}

export async function aiMatchJobsToCv(jobs: { title: string; company: string; skills: string[]; salary: string; location: string; category: string }[], cvSkills: string[], cvSummary: string): Promise<{ title: string; company: string; matchScore: number; reason: string; strengths: string[]; gaps: string[] }[]> {
  const jobsText = jobs.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} — Skills: [${j.skills.join(", ")}] — Local: ${j.location} — Cat: ${j.category}`).join("\n");

  const prompt = `És um consultor de carreira especialista em análise de compatibilidade candidato-vaga no mercado angolano.

PERFIL DO CANDIDATO:
- Competências: ${cvSkills.join(", ")}
- Resumo: ${cvSummary || "Não disponível"}

VAGAS DISPONÍVEIS:
${jobsText}

Para CADA vaga, calcula:
1. matchScore: 0-100 baseado em quantas skills do candidato coincidem com a vaga
2. reason: razão em 1 frase da pontuação
3. strengths: até 3 skills do candidato que são relevantes para a vaga
4. gaps: até 3 skills que faltam ao candidato para esta vaga

IMPORTANTE:
- Considera sinónimos (ex: "Node.js" ~= "Node", "React" ~= "React.js")
- Skills transferíveis contam parcialmente (ex: "SQL" é parcialmente transferível para "PostgreSQL")
- Um candidato com 0-3 skills matching = score baixo (20-40)
- Com 4-6 skills matching = score médio (40-70)
- Com 7+ skills matching = score alto (70-90+)

Responde APENAS com JSON array (sem markdown), ordenado por matchScore descendente:
[{"title": "título da vaga", "company": "empresa", "matchScore": 85, "reason": "razão", "strengths": ["skill1"], "gaps": ["skill2"]}]`;

  const response = await groqChat([
    { role: "system", content: "És um consultor de carreira. Responde APENAS com JSON válido, sem markdown, sem explicações adicionais." },
    { role: "user", content: prompt },
  ], "llama-3.3-70b-versatile");

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const results = JSON.parse(cleaned);
    if (Array.isArray(results)) {
      return results.map(r => ({
        title: r.title || "",
        company: r.company || "",
        matchScore: Math.min(100, Math.max(0, typeof r.matchScore === "number" ? r.matchScore : 50)),
        reason: r.reason || "",
        strengths: Array.isArray(r.strengths) ? r.strengths.slice(0, 3) : [],
        gaps: Array.isArray(r.gaps) ? r.gaps.slice(0, 3) : [],
      }));
    }
  } catch {}
  return jobs.map(j => {
    const matchingSkills = cvSkills.filter(s =>
      j.skills.some(js => js.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(js.toLowerCase()))
    );
    const score = j.skills.length > 0 ? Math.round((matchingSkills.length / j.skills.length) * 100) : 30;
    return { title: j.title, company: j.company, matchScore: score, reason: `${matchingSkills.length}/${j.skills.length} competências correspondentes`, strengths: matchingSkills.slice(0, 3), gaps: j.skills.filter(s => !matchingSkills.some(m => m.toLowerCase() === s.toLowerCase())).slice(0, 3) };
  });
}

export async function aiAnalyzeAllJobs(jobs: { title: string; company: string; skills: string[]; salary: string; location: string; category: string }[]): Promise<{ title: string; company: string; demandScore: number; trend: string; salaryInsight: string; topSkills: string[] }[]> {
  const jobsText = jobs.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} — Skills: [${j.skills.join(", ")}] — Salário: ${j.salary} — Cat: ${j.category}`).join("\n");

  const prompt = `És um analista de mercado de trabalho em Angola. Analisa estas vagas e fornece uma análise geral do mercado.

VAGAS DISPONÍVEIS:
${jobsText}

Para CADA vaga, analisa:
1. demandScore: 0-100 baseado na demanda REAL deste tipo de cargo no mercado angolano
2. trend: tendência de mercado (ex: "Alta procura", "Estável", "Emergente", "Nichado")
3. salaryInsight: insight sobre o salário (ex: "Acima da média", "Competitivo", "Baixo para o sector")
4. topSkills: até 3 skills mais procuradas/demandadas nesta área

Responde APENAS com JSON array (sem markdown), ordenado por demandScore descendente:
[{"title": "título", "company": "empresa", "demandScore": 85, "trend": "Alta procura", "salaryInsight": "Competitivo", "topSkills": ["skill1"]}]`;

  const response = await groqChat([
    { role: "system", content: "És um analista de mercado de trabalho angolano. Responde APENAS com JSON válido, sem markdown." },
    { role: "user", content: prompt },
  ], "llama-3.3-70b-versatile");

  try {
    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const results = JSON.parse(cleaned);
    if (Array.isArray(results)) {
      return results.map(r => ({
        title: r.title || "",
        company: r.company || "",
        demandScore: Math.min(100, Math.max(0, r.demandScore || 50)),
        trend: r.trend || "Estável",
        salaryInsight: r.salaryInsight || "Não disponível",
        topSkills: Array.isArray(r.topSkills) ? r.topSkills.slice(0, 3) : [],
      }));
    }
  } catch {}
  return jobs.map(j => ({ title: j.title, company: j.company, demandScore: 50, trend: "Estável", salaryInsight: "Não disponível", topSkills: j.skills.slice(0, 2) }));
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
