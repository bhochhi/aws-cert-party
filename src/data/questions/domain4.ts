import type { Question } from '../../types';

export const domain4Questions: Question[] = [
  {
    id: 'd4-001',
    domain: 4,
    question: 'Which of the following are core principles of responsible AI? (Select TWO)',
    options: [
      'Maximizing profit',
      'Fairness and bias mitigation',
      'Using the largest model available',
      'Transparency and explainability',
      'Minimizing development time',
    ],
    correctAnswers: [1, 3],
    explanation:
      'Core responsible AI principles include: Fairness (avoiding unfair bias), Explainability (understanding why decisions are made), Transparency (clear about AI capabilities/limitations), Privacy (protecting personal data), Robustness (reliable and safe performance), and Governance (accountability and oversight).',
    tags: ['responsible-ai', 'principles'],
  },
  {
    id: 'd4-002',
    domain: 4,
    question: 'What is "bias" in the context of AI/ML?',
    options: [
      'A preference for certain programming languages',
      'Systematic errors in model outputs that unfairly favor or disadvantage particular groups',
      'A type of neural network architecture',
      'The model\'s tendency to memorize training data',
    ],
    correctAnswers: [1],
    explanation:
      'AI bias refers to systematic and unfair discrimination in model predictions that can arise from biased training data, feature selection, or model design. For example, a hiring model trained on historical data might discriminate against certain demographic groups if past hiring practices were biased.',
    tags: ['bias', 'fairness'],
  },
  {
    id: 'd4-003',
    domain: 4,
    question: 'What are AWS AI Service Cards?',
    options: [
      'Physical ID cards for AWS employees working on AI',
      'Documentation that provides transparency about AWS AI services including intended use cases, limitations, responsible AI design choices, and best practices',
      'Credit cards for paying for AWS AI services',
      'Network access control cards for AI services',
    ],
    correctAnswers: [1],
    explanation:
      'AWS AI Service Cards are a form of responsible AI documentation that provide transparency about how AWS AI services work. They describe intended use cases, limitations, responsible AI design choices, deployment best practices, and performance across different conditions to help customers make informed decisions.',
    tags: ['aws-services', 'service-cards', 'transparency'],
  },
  {
    id: 'd4-004',
    domain: 4,
    question: 'What is Amazon Bedrock Guardrails primarily used for?',
    options: [
      'Protecting model weights from being copied',
      'Implementing content filters, denied topics, word filters, and PII detection to ensure safe and appropriate model interactions',
      'Monitoring GPU utilization',
      'Managing model version control',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Bedrock Guardrails provides configurable safeguards for generative AI applications including: content filters (hate, violence, sexual content, misconduct), denied topic filters, word/phrase filters, sensitive information filters (PII detection and redaction), and contextual grounding checks.',
    tags: ['bedrock', 'guardrails', 'safety'],
  },
  {
    id: 'd4-005',
    domain: 4,
    question: 'What is "explainability" in AI?',
    options: [
      'Writing documentation for AI code',
      'The ability to understand and articulate how and why an AI model made a specific decision or prediction',
      'Explaining AI concepts to non-technical stakeholders',
      'The model\'s ability to explain code errors',
    ],
    correctAnswers: [1],
    explanation:
      'Explainability (or interpretability) refers to the degree to which humans can understand the reasoning behind an AI model\'s outputs. It\'s crucial for trust, debugging, compliance, and accountability — especially in high-stakes domains like healthcare, finance, and criminal justice.',
    tags: ['explainability', 'transparency'],
  },
  {
    id: 'd4-006',
    domain: 4,
    question: 'What is a "human-in-the-loop" approach in AI systems?',
    options: [
      'Using human operators to manually run ML models',
      'Including human review, oversight, or intervention at critical points in an AI system\'s decision-making process',
      'Training humans to think like AI',
      'Replacing AI with human workers',
    ],
    correctAnswers: [1],
    explanation:
      'Human-in-the-loop (HITL) means incorporating human judgment at key stages of an AI workflow. This could include reviewing model predictions before they\'re acted upon, handling edge cases the model is uncertain about, providing feedback to improve the model, or making final decisions in high-stakes scenarios.',
    tags: ['responsible-ai', 'human-in-the-loop'],
  },
  {
    id: 'd4-007',
    domain: 4,
    question: 'How can you mitigate bias in training data? (Select TWO)',
    options: [
      'Use only data from a single source',
      'Audit data for underrepresentation and ensure diverse, balanced datasets',
      'Ignore demographic attributes entirely',
      'Apply bias detection tools (like Amazon SageMaker Clarify) to identify and measure bias',
      'Train the model longer to eliminate bias',
    ],
    correctAnswers: [1, 3],
    explanation:
      'Mitigating training data bias involves: (1) auditing data for representation gaps and ensuring diverse, balanced datasets, (2) using bias detection tools like SageMaker Clarify to measure bias metrics (demographic parity, equalized odds), (3) applying data augmentation or resampling, and (4) implementing continuous monitoring.',
    tags: ['bias', 'mitigation'],
  },
  {
    id: 'd4-008',
    domain: 4,
    question: 'What is Amazon SageMaker Clarify used for?',
    options: [
      'Cleaning and preparing training data',
      'Detecting bias in data and models, and providing model explainability through feature attributions',
      'Deploying models to production endpoints',
      'Generating synthetic training data',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon SageMaker Clarify helps identify potential bias in data and ML models and provides feature attribution explanations. It can detect bias before training (data bias), after training (model bias), and during production (monitoring for bias drift). It uses SHAP values for model explainability.',
    tags: ['aws-services', 'clarify', 'bias'],
  },
  {
    id: 'd4-009',
    domain: 4,
    question: 'What is "content moderation" in the context of generative AI?',
    options: [
      'Managing content delivery networks',
      'Filtering, reviewing, or blocking AI-generated content that is harmful, inappropriate, or violates policies',
      'Moderating online discussion forums',
      'Compressing content for faster delivery',
    ],
    correctAnswers: [1],
    explanation:
      'Content moderation for generative AI involves automatically detecting and filtering harmful, inappropriate, or policy-violating content in both inputs (user prompts) and outputs (model responses). Amazon Bedrock Guardrails provides configurable content filters for hate speech, violence, sexual content, and other categories.',
    tags: ['content-moderation', 'safety'],
  },
  {
    id: 'd4-010',
    domain: 4,
    question: 'What is "hallucination mitigation" and which technique is MOST effective?',
    options: [
      'Restarting the model when it hallucinates',
      'Using RAG to ground responses in verified data sources, combined with guardrails for grounding checks',
      'Increasing the model temperature parameter',
      'Using a larger model that never hallucinates',
    ],
    correctAnswers: [1],
    explanation:
      'Hallucination mitigation strategies include: (1) RAG — grounding responses in retrieved source documents, (2) guardrails with contextual grounding checks, (3) lower temperature settings for more deterministic outputs, (4) clear instructions to say "I don\'t know" when uncertain, and (5) human review for high-stakes outputs.',
    tags: ['hallucination', 'mitigation'],
  },
  {
    id: 'd4-011',
    domain: 4,
    question: 'Which of the following is an example of "fairness" in AI?',
    options: [
      'A model that achieves 99% accuracy overall',
      'A model that performs equally well across different demographic groups without systematic disadvantage',
      'A model that generates responses very quickly',
      'A model that costs the same amount for all users',
    ],
    correctAnswers: [1],
    explanation:
      'Fairness in AI means the model\'s predictions or decisions don\'t systematically disadvantage certain demographic groups. For example, a loan approval model should have similar approval rates and error rates across different racial, gender, and age groups, given similar qualifications.',
    tags: ['fairness', 'responsible-ai'],
  },
  {
    id: 'd4-012',
    domain: 4,
    question: 'What is the purpose of "toxicity detection" in generative AI applications?',
    options: [
      'Detecting chemical toxins in laboratory data',
      'Identifying and filtering content that is harmful, offensive, hateful, or inappropriate in model inputs and outputs',
      'Detecting bugs in code generated by AI',
      'Monitoring server resource usage',
    ],
    correctAnswers: [1],
    explanation:
      'Toxicity detection identifies content that is harmful, offensive, hateful, threatening, or otherwise inappropriate. In generative AI applications, it\'s applied to both user inputs (preventing adversarial prompts) and model outputs (filtering inappropriate responses). Amazon Bedrock Guardrails provides toxicity filtering capabilities.',
    tags: ['content-moderation', 'toxicity'],
  },
  {
    id: 'd4-013',
    domain: 4,
    question: 'What is "model transparency"?',
    options: [
      'Making model source code open-source',
      'Being clear and open about how a model works, its training data, limitations, and appropriate use cases',
      'Using transparent hardware for model deployment',
      'Providing free access to all models',
    ],
    correctAnswers: [1],
    explanation:
      'Model transparency means providing clear information about: how the model was trained, what data was used, known limitations and failure modes, intended and unintended use cases, performance characteristics, and potential biases. AWS AI Service Cards are an example of transparency documentation.',
    tags: ['transparency', 'responsible-ai'],
  },
  {
    id: 'd4-014',
    domain: 4,
    question: 'A company uses an AI model for resume screening. They discover the model favors candidates from certain universities. What responsible AI principle is being violated?',
    options: [
      'Privacy',
      'Robustness',
      'Fairness',
      'Transparency',
    ],
    correctAnswers: [2],
    explanation:
      'The fairness principle is being violated. The model is exhibiting bias by systematically favoring candidates from certain universities, which may correlate with socioeconomic factors. Mitigation includes auditing the training data, removing or deweighting the university feature, and monitoring for disparate impact.',
    tags: ['fairness', 'bias', 'use-case'],
  },
  {
    id: 'd4-015',
    domain: 4,
    question: 'What are "denied topics" in Amazon Bedrock Guardrails?',
    options: [
      'Topics that AWS refuses to support',
      'User-defined topics that the model should refuse to engage with, such as competitor comparisons or off-topic requests',
      'Topics that require premium pricing',
      'Topics blocked by government regulation',
    ],
    correctAnswers: [1],
    explanation:
      'Denied topics in Bedrock Guardrails are user-configurable topic restrictions. You define topics (with descriptions and sample phrases) that the model should decline to discuss. For example, a banking chatbot might deny topics about investment advice, competitor products, or political opinions.',
    tags: ['bedrock', 'guardrails', 'denied-topics'],
  },
  {
    id: 'd4-016',
    domain: 4,
    question: 'What is "data poisoning" in the context of AI?',
    options: [
      'Encrypting data to protect it',
      'An attack where an adversary intentionally corrupts training data to manipulate model behavior',
      'Deleting obsolete data from databases',
      'Converting data between formats',
    ],
    correctAnswers: [1],
    explanation:
      'Data poisoning is an adversarial attack where malicious data is injected into the training dataset to cause the model to learn incorrect patterns. This can lead to backdoors (the model behaves normally except on specific trigger inputs) or general degradation of model quality.',
    tags: ['security', 'data-poisoning'],
  },
  {
    id: 'd4-017',
    domain: 4,
    question: 'Why is it important to document the intended use cases and limitations of an AI model?',
    options: [
      'It\'s only required for open-source models',
      'It helps users understand what the model is designed for, avoid misuse, and set appropriate expectations',
      'It increases the model\'s accuracy',
      'It reduces the model\'s training time',
    ],
    correctAnswers: [1],
    explanation:
      'Documenting intended use cases and limitations is a transparency best practice that: (1) helps users apply the model appropriately, (2) sets realistic expectations, (3) warns against known failure modes, (4) supports compliance requirements, and (5) reduces liability from misuse.',
    tags: ['transparency', 'documentation'],
  },
  {
    id: 'd4-018',
    domain: 4,
    question: 'What is the role of "sensitive information filters" in Amazon Bedrock Guardrails?',
    options: [
      'To encrypt all model communications',
      'To detect and redact personally identifiable information (PII) like names, addresses, and SSNs in model inputs and outputs',
      'To classify documents by sensitivity level',
      'To restrict model access to sensitive AWS accounts',
    ],
    correctAnswers: [1],
    explanation:
      'Sensitive information filters in Bedrock Guardrails detect and handle PII (personally identifiable information) in both inputs and outputs. They can detect entity types like names, email addresses, phone numbers, SSNs, and credit card numbers, and either block or redact (mask) them.',
    tags: ['bedrock', 'guardrails', 'pii'],
  },
  {
    id: 'd4-019',
    domain: 4,
    question: 'Which AWS service can be used to monitor ML models in production for bias drift?',
    options: [
      'Amazon CloudWatch',
      'Amazon SageMaker Clarify with SageMaker Model Monitor',
      'AWS Config',
      'Amazon Inspector',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon SageMaker Clarify, integrated with SageMaker Model Monitor, can continuously monitor deployed models for bias drift — detecting when model fairness metrics change over time as the input data distribution shifts. It generates alerts when bias exceeds defined thresholds.',
    tags: ['aws-services', 'clarify', 'monitoring'],
  },
  {
    id: 'd4-020',
    domain: 4,
    question: 'What is "robustness" in responsible AI?',
    options: [
      'The physical durability of AI hardware',
      'A model\'s ability to maintain accurate and reliable performance even with noisy, adversarial, or unexpected inputs',
      'The speed at which a model processes requests',
      'The model\'s ability to scale to more users',
    ],
    correctAnswers: [1],
    explanation:
      'Robustness refers to a model\'s ability to perform reliably and safely even when faced with unexpected, noisy, or adversarial inputs. A robust model doesn\'t fail catastrophically on edge cases, resists adversarial attacks, and degrades gracefully rather than producing dangerous outputs.',
    tags: ['robustness', 'responsible-ai'],
  },
  {
    id: 'd4-021',
    domain: 4,
    question: 'A company wants to ensure their generative AI chatbot never provides medical advice. Which feature of Amazon Bedrock Guardrails should they use?',
    options: [
      'Content filters',
      'Denied topics with "medical advice" defined as a restricted topic',
      'Word filters',
      'PII detection',
    ],
    correctAnswers: [1],
    explanation:
      'Denied topics allow you to define specific subject areas the model should refuse to engage with. By creating a "medical advice" denied topic with relevant descriptions and sample phrases, the guardrail will detect when conversations veer into medical territory and provide a canned refusal response.',
    tags: ['bedrock', 'guardrails', 'use-case'],
  },
  {
    id: 'd4-022',
    domain: 4,
    question: 'What is "disparate impact" in the context of AI fairness?',
    options: [
      'When different models produce different results',
      'When an AI system\'s outcomes disproportionately affect a protected group, even if the system appears neutral',
      'When different users experience different latencies',
      'When a model performs differently in different AWS regions',
    ],
    correctAnswers: [1],
    explanation:
      'Disparate impact occurs when an apparently neutral practice or model disproportionately affects a protected group (defined by race, gender, age, etc.). Even without explicit discrimination, if outcomes are significantly unequal across groups, the system may have disparate impact and require remediation.',
    tags: ['fairness', 'bias', 'legal'],
  },
  {
    id: 'd4-023',
    domain: 4,
    question: 'What is the recommended approach for handling edge cases in AI systems used for critical decisions?',
    options: [
      'Trust the model\'s output regardless',
      'Implement human-in-the-loop review for uncertain or high-stakes predictions',
      'Retrain the model daily',
      'Use multiple models and take the majority vote',
    ],
    correctAnswers: [1],
    explanation:
      'For critical decisions, human-in-the-loop is recommended for edge cases. When model confidence is low or the stakes are high (medical diagnoses, loan approvals, legal decisions), human reviewers should verify the AI\'s recommendation before it\'s acted upon. This balances efficiency with safety.',
    tags: ['human-in-the-loop', 'best-practices'],
  },
  {
    id: 'd4-024',
    domain: 4,
    question: 'What is "adversarial testing" for AI models?',
    options: [
      'Competition between AI vendors',
      'Deliberately attempting to make the model produce incorrect, harmful, or unexpected outputs to identify vulnerabilities',
      'Testing models on competitor data',
      'Running models against each other in games',
    ],
    correctAnswers: [1],
    explanation:
      'Adversarial testing (red teaming) involves deliberately trying to make an AI model fail — generating harmful content, bypassing safety measures, producing incorrect outputs, or exhibiting bias. This identifies vulnerabilities before deployment and helps strengthen guardrails and safety measures.',
    tags: ['testing', 'adversarial', 'safety'],
  },
  {
    id: 'd4-025',
    domain: 4,
    question: 'What is the difference between "interpretability" and "explainability" in AI?',
    options: [
      'They are completely unrelated concepts',
      'Interpretability is about understanding the model\'s internal mechanics; explainability is about communicating decisions in human-understandable terms',
      'Interpretability is for developers; explainability is for models',
      'There is no difference; they are identical',
    ],
    correctAnswers: [1],
    explanation:
      'Interpretability refers to understanding how a model works internally (its mechanics and decision process). Explainability refers to the ability to communicate why a model made a specific decision in human-understandable terms. Simple models (like decision trees) are inherently interpretable; complex models (like deep learning) often require post-hoc explainability techniques.',
    tags: ['explainability', 'interpretability'],
  },
  {
    id: 'd4-026',
    domain: 4,
    question: 'A financial company uses AI for credit scoring. Which of the following should they implement to ensure responsible AI use? (Select TWO)',
    options: [
      'Use the most complex model possible',
      'Regular bias audits to ensure fair treatment across demographic groups',
      'Hide the model\'s decision factors from regulators',
      'Provide clear explanations to applicants about why they were approved or denied',
      'Process all applications automatically without human review',
    ],
    correctAnswers: [1, 3],
    explanation:
      'For responsible AI in financial services: (1) Regular bias audits ensure the model doesn\'t discriminate against protected groups (fairness). (2) Providing decision explanations ensures transparency and meets regulatory requirements (like ECOA in the US). Additionally, human review of edge cases and model monitoring are best practices.',
    tags: ['responsible-ai', 'use-case', 'finance'],
  },
  {
    id: 'd4-027',
    domain: 4,
    question: 'What is the purpose of Amazon Bedrock Guardrails\' "word filters"?',
    options: [
      'To fix spelling errors in outputs',
      'To block specific words, phrases, or profanity from appearing in model inputs or outputs',
      'To count words for billing purposes',
      'To translate words between languages',
    ],
    correctAnswers: [1],
    explanation:
      'Word filters in Bedrock Guardrails allow you to create lists of specific words or phrases that should be blocked from model interactions. This includes custom word lists (like competitor names or internal code names) and a managed profanity filter to prevent inappropriate language.',
    tags: ['bedrock', 'guardrails', 'word-filters'],
  },
  {
    id: 'd4-028',
    domain: 4,
    question: 'Which technique provides feature-level explanations for individual model predictions?',
    options: [
      'Cross-validation',
      'SHAP (SHapley Additive exPlanations) values',
      'Gradient descent',
      'Batch normalization',
    ],
    correctAnswers: [1],
    explanation:
      'SHAP values provide feature-level explanations for individual predictions by attributing a contribution score to each input feature. They show how each feature pushed the prediction higher or lower from the average. Amazon SageMaker Clarify uses SHAP for model explainability.',
    tags: ['explainability', 'shap'],
  },
  {
    id: 'd4-029',
    domain: 4,
    question: 'Why should AI-generated content be labeled as such?',
    options: [
      'It\'s only required by law in the EU',
      'To maintain transparency, build trust, and allow users to apply appropriate scrutiny to AI-generated vs. human-created content',
      'To increase the perceived value of the content',
      'Labels are only needed for AI-generated images, not text',
    ],
    correctAnswers: [1],
    explanation:
      'Labeling AI-generated content maintains transparency and trust by: (1) allowing users to evaluate content with appropriate scrutiny, (2) preventing deception, (3) supporting informed decision-making, (4) meeting emerging regulatory requirements, and (5) upholding ethical standards. This applies to text, images, audio, and video.',
    tags: ['transparency', 'labeling'],
  },
  {
    id: 'd4-030',
    domain: 4,
    question: 'What is the recommended approach for building trust in AI systems within an organization?',
    options: [
      'Deploy AI systems without informing stakeholders to avoid resistance',
      'Establish AI governance policies, provide transparency about how AI is used, and enable feedback mechanisms',
      'Replace all human decision-making with AI immediately',
      'Only use AI for non-critical tasks',
    ],
    correctAnswers: [1],
    explanation:
      'Building trust requires: (1) clear AI governance policies and ethical guidelines, (2) transparency about where and how AI is used, (3) mechanisms for user feedback and appeals, (4) regular audits for bias and accuracy, (5) human oversight for high-stakes decisions, and (6) education about AI capabilities and limitations.',
    tags: ['responsible-ai', 'governance', 'trust'],
  },
];
