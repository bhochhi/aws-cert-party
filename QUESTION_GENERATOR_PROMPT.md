# Question Generator Prompt for AWS Cert Party

Copy the prompt below and use it in any AI model (Claude, ChatGPT, Gemini, etc.) to generate new question packs. Save the output as a `.json` file in the appropriate domain folder — the app auto-discovers it, no code changes needed.

---

## THE PROMPT

```
You are an expert AWS certification exam question writer specializing in the AWS Certified AI Practitioner (AIF-C01) exam. Generate a question pack as a single valid JSON file that can be saved directly into the app's question folder.

## OUTPUT FORMAT

Output ONLY a valid, strict JSON object. All keys MUST be double-quoted strings. No trailing commas. No comments. No JavaScript expressions. The output must pass `JSON.parse()` as-is.

{
  "name": "<Short display name for this pack>",
  "description": "<One-line summary of topics covered>",
  "questions": [
    {
      "id": "d{domain}-{number}",
      "domain": 1,
      "question": "...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswers": [0],
      "explanation": "...",
      "tags": ["tag1", "tag2"]
    }
  ]
}

CRITICAL JSON RULES:
- All keys must be double-quoted: "id", "domain", "question", etc.
- All string values must be double-quoted
- No trailing commas after the last item in arrays or objects
- No single quotes — JSON only allows double quotes
- No JavaScript expressions like `[0 + 1]` — only literal values like `[1]`
- Escape double quotes inside strings with backslash: `\"like this\"`
- No markdown fences, no explanation, no preamble — just the raw JSON

## RULES

1. **ID numbering**: I will tell you the starting ID number. Use the format "d{DOMAIN}-{NUMBER}" with zero-padded 3-digit numbers. Example: "d2-041", "d2-042", etc.

2. **Single-select questions**: Provide exactly 4 options. `correctAnswers` is an array with ONE index.
   Example: `"correctAnswers": [2]` means option C is correct.

3. **Multi-select questions**: Provide exactly 5 options. `correctAnswers` has TWO indices. Start the question with "Which of the following..." and add "(Select TWO)" at the end.
   Example: `"correctAnswers": [1, 3]` means options B and D are correct.

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

8. **Tags**: Use lowercase kebab-case. Examples: `aws-services`, `bedrock`, `rag`, `prompt-engineering`, `iam`, `encryption`, `bias`, `sagemaker`, `guardrails`

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

## EXAMPLE OUTPUT (a complete, save-ready file)

{
  "name": "Advanced RAG Patterns",
  "description": "Deep-dive into RAG architecture, chunking strategies, and Bedrock Knowledge Bases",
  "questions": [
    {
      "id": "d3-041",
      "domain": 3,
      "question": "A retail company wants to automatically categorize customer support tickets into departments like billing, shipping, and technical issues using a foundation model. Which approach is MOST appropriate?",
      "options": [
        "Fine-tune a model on the company's historical ticket data",
        "Use a prompt with few-shot examples of each category",
        "Build a custom transformer from scratch",
        "Use Amazon Rekognition to classify the tickets"
      ],
      "correctAnswers": [1],
      "explanation": "Few-shot prompting with examples of each category is the most appropriate starting point for text classification with foundation models. Fine-tuning would work but is more expensive and complex. Rekognition is for images, not text. Building a custom transformer is unnecessary when pre-trained models are available.",
      "tags": ["prompt-engineering", "classification"]
    },
    {
      "id": "d3-042",
      "domain": 3,
      "question": "Which of the following are benefits of using Amazon Bedrock Knowledge Bases for RAG? (Select TWO)",
      "options": [
        "It trains custom foundation models on your data",
        "It automatically chunks, embeds, and indexes documents from S3",
        "It eliminates the need for any vector database",
        "It provides managed retrieval integrated with Bedrock model invocation",
        "It replaces the need for IAM permissions"
      ],
      "correctAnswers": [1, 3],
      "explanation": "Bedrock Knowledge Bases automatically handles document ingestion (chunking, embedding, indexing into a vector store) and provides managed retrieval that integrates directly with Bedrock model invocation. It still uses a vector database under the hood (e.g., OpenSearch Serverless) and does not train custom models.",
      "tags": ["bedrock", "knowledge-bases", "rag"]
    }
  ]
}

## YOUR TASK

Generate {COUNT} new questions for **Domain {DOMAIN_NUMBER}** ({DOMAIN_TITLE}).

Start IDs at "d{DOMAIN_NUMBER}-{START_NUMBER}".

Focus on these specific topics: {OPTIONAL_TOPIC_FOCUS}

For the top-level "name" field, use a short descriptive title for this set (e.g., "Advanced RAG Patterns", "SageMaker Deep Dive").
For the top-level "description" field, use a one-line summary of the topics covered.

Output only the JSON object, ready to save as a .json file.
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
| `{START_NUMBER}` | `041` (check last ID across all packs in the domain folder) |
| `{OPTIONAL_TOPIC_FOCUS}` | `RAG architecture, chunking strategies, Bedrock Knowledge Bases` (or remove the line for general coverage) |

The AI will generate the `"name"` and `"description"` fields automatically based on the topic focus you provide.

### 2. Example filled prompt ending

> Generate 15 new questions for **Domain 3** (Applications of Foundation Models).
> Start IDs at "d3-041".
> Focus on these specific topics: RAG architecture, chunking strategies, Amazon Bedrock Knowledge Bases

### 3. Save the output

Save the AI's JSON output directly as a file in the appropriate domain folder:

```
src/data/certifications/{cert-id}/questions/domain{N}/{descriptive-name}.json
```

For example:
- `src/data/certifications/aif-c01/questions/domain3/advanced-rag-patterns.json`
- `src/data/certifications/aif-c01/questions/domain1/ml-pipeline-deep-dive.json`
- `src/data/certifications/aif-c01/questions/domain5/advanced-iam-scenarios.json`

The app auto-discovers all `.json` files in domain folders — no code changes needed!

### 4. What are "name" and "description"?

Each `.json` file is a **question pack**. The `"name"` and `"description"` at the top of the file are metadata shown in the app's **Packs** page:

- **`"name"`** — Short display title (e.g., "Core Fundamentals", "Advanced RAG Patterns"). Shown as the pack's label in the selection UI.
- **`"description"`** — One-line summary (e.g., "Deep-dive into RAG architecture, chunking, and Knowledge Bases"). Shown as a subtitle beneath the pack name.

Users see these on the Packs page where they can enable/disable individual packs, see completion progress per pack, and select/deselect all packs per domain. Only questions from enabled packs appear in Study and Mock Test modes.

You can have **multiple packs per domain** — e.g., `domain3/rag-patterns.json` and `domain3/bedrock-agents.json`. Each appears as a separate toggleable pack.

### 5. Current last IDs (update as you add questions)

| Domain | Folder | Last ID | Next starts at |
|---|---|---|---|
| Domain 1 | `domain1/` | `d1-040` | `d1-041` |
| Domain 2 | `domain2/` | `d2-040` | `d2-041` |
| Domain 3 | `domain3/` | `d3-040` | `d3-041` |
| Domain 4 | `domain4/` | `d4-030` | `d4-031` |
| Domain 5 | `domain5/` | `d5-030` | `d5-031` |

### 6. Validate after saving

Run `npm run build` to verify the JSON is valid and the app compiles. Common issues:
- Invalid JSON (trailing commas, missing quotes, unquoted keys)
- `correctAnswers` index out of range (must be 0-based, within options array length)
- Duplicate IDs across packs in the same domain
- Missing required fields (`id`, `domain`, `question`, `options`, `correctAnswers`, `explanation`)
- JavaScript expressions instead of literal values (e.g., `[0 + 1]` instead of `[1]`)
