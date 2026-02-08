# Question Generator Prompt for AWS Cert Party

Copy the prompt below and use it in any AI model (Claude, ChatGPT, Gemini, etc.) to generate new questions. Then paste the output directly into the appropriate domain file.

---

## THE PROMPT

```
You are an expert AWS certification exam question writer specializing in the AWS Certified AI Practitioner (AIF-C01) exam. Generate practice questions in a specific TypeScript format that can be directly pasted into a React application.

## OUTPUT FORMAT

Output ONLY a valid TypeScript array of question objects. No markdown fences, no explanation, no preamble — just the raw array content ready to paste inside an existing array.

Each question object must follow this exact interface:

{
  id: string,           // Format: "d{domain}-{3-digit-number}" e.g. "d1-041", "d3-045"
  domain: number,       // 1 | 2 | 3 | 4 | 5
  question: string,     // The question text
  options: string[],    // Exactly 4 options (unless multi-select, then 5)
  correctAnswers: number[], // Zero-based indices of correct option(s). Single-select = [index], Multi-select = [idx1, idx2]
  explanation: string,  // 2-4 sentences explaining WHY the correct answer is right and why others are wrong
  tags: string[],       // 1-3 lowercase kebab-case topic tags
}

## RULES

1. **ID numbering**: I will tell you the starting ID number. Use the format "d{DOMAIN}-{NUMBER}" with zero-padded 3-digit numbers. Example: "d2-041", "d2-042", etc.

2. **Single-select questions**: Provide exactly 4 options. `correctAnswers` is an array with ONE index.
   Example: `correctAnswers: [2]` means option C is correct.

3. **Multi-select questions**: Provide exactly 5 options. `correctAnswers` has TWO indices. Start the question with "Which of the following..." and add "(Select TWO)" at the end.
   Example: `correctAnswers: [1, 3]` means options B and D are correct.

4. **Mix of ~80% single-select and ~20% multi-select questions.**

5. **Distractors must be plausible** — never use joke answers or obviously wrong options. Each wrong option should be a real AWS concept used incorrectly or a common misconception.

6. **Explanations must**:
   - State why the correct answer is right
   - Briefly address why the top distractor is wrong (when relevant)
   - Reference specific AWS service names, features, or concepts
   - Be 2-4 sentences

7. **Question style**: Write scenario-based questions when possible. Use phrases like:
   - "A company wants to..."
   - "Which AWS service is MOST appropriate for..."
   - "What is the BEST approach to..."
   - "Which of the following BEST describes..."

8. **Escape single quotes** in strings with backslash: `\'`

9. **Tags**: Use lowercase kebab-case. Examples: `aws-services`, `bedrock`, `rag`, `prompt-engineering`, `iam`, `encryption`, `bias`, `sagemaker`, `guardrails`

## DOMAINS AND THEIR TOPICS

**Domain 1 — Fundamentals of AI and ML (20% of exam)**
Topics: Basic AI/ML concepts, supervised/unsupervised/reinforcement learning, ML pipeline lifecycle, AWS AI/ML services (SageMaker, Rekognition, Comprehend, Translate, Polly, Lex, Textract, Kendra), ML problem framing, training/validation/test data splits, feature engineering, evaluation metrics (accuracy, precision, recall, F1, AUC-ROC, confusion matrix), overfitting/underfitting, bias-variance tradeoff, regularization, batch vs real-time inference, transfer learning, hyperparameter tuning, SageMaker Autopilot, SageMaker Ground Truth, Amazon Personalize, Amazon Forecast.

**Domain 2 — Fundamentals of Generative AI (24% of exam)**
Topics: Foundation models, LLMs, transformer architecture, self-attention, tokens/tokenization, embeddings, prompt engineering (zero-shot, few-shot, chain-of-thought), fine-tuning vs RAG vs in-context learning, Amazon Bedrock, Amazon Titan (Text, Embeddings, Image), inference parameters (temperature, top-p, top-k, stop sequences, max tokens), context windows, hallucination, model distillation, grounding, diffusion models, multi-modal models, prompt injection, Amazon PartyRock, vector databases, semantic search, Bedrock Provisioned Throughput, Bedrock model customization (fine-tuning, continued pre-training).

**Domain 3 — Applications of Foundation Models (28% of exam)**
Topics: RAG architecture and design patterns, chunking strategies, Amazon Bedrock Knowledge Bases, Amazon Bedrock Agents, action groups, Amazon Q Business, Amazon Q Developer, model selection criteria, prompt templates and chaining, Bedrock Converse API, model invocation logging, streaming responses, cost optimization, Provisioned Throughput, prompt caching, metadata filtering, hybrid search, vector databases (OpenSearch Serverless, Aurora pgvector), multi-modal use cases, contextual grounding, Bedrock Guardrails, model evaluation.

**Domain 4 — Guidelines for Responsible AI (14% of exam)**
Topics: Responsible AI principles (fairness, explainability, transparency, robustness, privacy), bias detection/mitigation, AWS AI Service Cards, Amazon Bedrock Guardrails (content filters, denied topics, word filters, PII/sensitive info filters, contextual grounding), SageMaker Clarify (bias detection, SHAP explainability), human-in-the-loop, hallucination mitigation, content moderation, toxicity detection, adversarial testing/red teaming, data poisoning, model transparency documentation, disparate impact, AI governance/trust.

**Domain 5 — Security and Compliance for AI (14% of exam)**
Topics: IAM for AI services (Bedrock, SageMaker), data encryption at rest (KMS) and in transit (TLS), Amazon Bedrock data privacy (customer data not used for training), AWS CloudTrail audit logging, VPC endpoints/AWS PrivateLink, Amazon Macie (sensitive data discovery), SageMaker VPC configuration, secrets management, SageMaker Model Monitor, model versioning, compliance frameworks (HIPAA, GDPR, SOC, FedRAMP), data residency/sovereignty, model governance, model cards, least privilege, GuardDuty, AWS Config, inter-container encryption, model endpoint authentication.

## EXAMPLE OUTPUT

  {
    id: 'd1-041',
    domain: 1,
    question: 'A retail company wants to automatically categorize customer support tickets into departments like billing, shipping, and technical issues. Which type of ML problem is this?',
    options: [
      'Regression',
      'Multi-class classification',
      'Clustering',
      'Anomaly detection',
    ],
    correctAnswers: [1],
    explanation:
      'This is a multi-class classification problem because each ticket needs to be assigned to exactly one of several predefined categories (billing, shipping, technical). Regression predicts continuous values, clustering finds groups without predefined labels, and anomaly detection identifies outliers.',
    tags: ['ml-basics', 'classification'],
  },
  {
    id: 'd1-042',
    domain: 1,
    question: 'Which AWS services provide pre-trained AI capabilities that require NO machine learning expertise? (Select TWO)',
    options: [
      'Amazon SageMaker Studio',
      'Amazon Rekognition',
      'Amazon SageMaker Ground Truth',
      'Amazon Polly',
      'Amazon SageMaker Autopilot',
    ],
    correctAnswers: [1, 3],
    explanation:
      'Amazon Rekognition (image/video analysis) and Amazon Polly (text-to-speech) are AI services with pre-trained models — you simply call the API. SageMaker Studio, Ground Truth, and Autopilot are ML tools designed for practitioners who want more control over the ML workflow.',
    tags: ['aws-services', 'ai-services'],
  },

## YOUR TASK

Generate {COUNT} new questions for **Domain {DOMAIN_NUMBER}** ({DOMAIN_TITLE}).

Start IDs at "d{DOMAIN_NUMBER}-{START_NUMBER}".

Focus on these specific topics: {OPTIONAL_TOPIC_FOCUS}

Output only the TypeScript objects, comma-separated, ready to paste inside the existing array. Do not wrap in code fences.
```

---

## HOW TO USE

### 1. Fill in the placeholders

Replace these values in the prompt before sending:

| Placeholder | Example Value |
|---|---|
| `{COUNT}` | `20` |
| `{DOMAIN_NUMBER}` | `3` |
| `{DOMAIN_TITLE}` | `Applications of Foundation Models` |
| `{START_NUMBER}` | `041` (check last ID in the domain file) |
| `{OPTIONAL_TOPIC_FOCUS}` | `RAG architecture, chunking strategies, Bedrock Knowledge Bases` (or remove the line for general coverage) |

### 2. Example filled prompt ending

> Generate 15 new questions for **Domain 3** (Applications of Foundation Models).
> Start IDs at "d3-041".
> Focus on these specific topics: RAG architecture, chunking strategies, Amazon Bedrock Knowledge Bases

### 3. Paste the output

Open the corresponding domain file and paste the generated objects before the closing `];`:

- Domain 1 → `src/data/questions/domain1.ts`
- Domain 2 → `src/data/questions/domain2.ts`
- Domain 3 → `src/data/questions/domain3.ts`
- Domain 4 → `src/data/questions/domain4.ts`
- Domain 5 → `src/data/questions/domain5.ts`

### 4. Current last IDs (update as you add questions)

| Domain | Last ID | Next starts at |
|---|---|---|
| Domain 1 | `d1-040` | `d1-041` |
| Domain 2 | `d2-040` | `d2-041` |
| Domain 3 | `d3-040` | `d3-041` |
| Domain 4 | `d4-030` | `d4-031` |
| Domain 5 | `d5-030` | `d5-031` |

### 5. Validate after pasting

Run `npm run build` to verify TypeScript compiles correctly. Common issues:
- Missing comma between objects
- Unescaped single quotes (use `\'`)
- `correctAnswers` index out of range
- Duplicate IDs
