import type { Question } from '../../types';

export const domain5Questions: Question[] = [
  {
    id: 'd5-001',
    domain: 5,
    question: 'Which AWS service should be used to control access to Amazon Bedrock foundation models?',
    options: [
      'Amazon GuardDuty',
      'AWS Identity and Access Management (IAM)',
      'Amazon Macie',
      'AWS Shield',
    ],
    correctAnswers: [1],
    explanation:
      'AWS IAM is used to control who can access Amazon Bedrock and its foundation models. IAM policies can restrict which models a user/role can invoke, what actions they can perform (InvokeModel, CreateModelCustomizationJob), and under what conditions.',
    tags: ['iam', 'access-control'],
  },
  {
    id: 'd5-002',
    domain: 5,
    question: 'How is data encrypted "at rest" in Amazon Bedrock?',
    options: [
      'Data is not encrypted by default',
      'Using AWS Key Management Service (KMS) encryption keys — either AWS-managed or customer-managed keys',
      'Using SSL/TLS certificates',
      'Using VPN connections',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Bedrock encrypts data at rest using AWS KMS. By default, AWS-managed keys are used, but customers can configure customer-managed KMS keys (CMKs) for more control over key rotation, access policies, and auditing. This covers customization data, model artifacts, and logs.',
    tags: ['encryption', 'kms', 'at-rest'],
  },
  {
    id: 'd5-003',
    domain: 5,
    question: 'How is data encrypted "in transit" when calling Amazon Bedrock APIs?',
    options: [
      'Data is sent unencrypted for performance',
      'Using TLS (Transport Layer Security) encryption for all API calls',
      'Using AWS KMS encryption',
      'Using IPSec VPN tunnels',
    ],
    correctAnswers: [1],
    explanation:
      'All Amazon Bedrock API calls use TLS encryption to protect data in transit. API calls are made over HTTPS, ensuring that prompts, responses, and all data transmitted between the client and Bedrock are encrypted during transmission.',
    tags: ['encryption', 'tls', 'in-transit'],
  },
  {
    id: 'd5-004',
    domain: 5,
    question: 'What is Amazon Bedrock\'s approach to customer data privacy regarding model training?',
    options: [
      'Customer data is used to improve base foundation models by default',
      'Customer inputs and outputs are NOT used to train or improve the base foundation models — data stays isolated to the customer account',
      'Data is shared anonymously with model providers',
      'Only certain model providers use customer data',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Bedrock does NOT use customer inputs or outputs to train or improve the base foundation models. Customer data remains within the customer\'s AWS account and is not shared with model providers or other customers. This is a critical privacy and data sovereignty guarantee.',
    tags: ['privacy', 'data-sovereignty'],
  },
  {
    id: 'd5-005',
    domain: 5,
    question: 'Which AWS service logs all API calls made to Amazon Bedrock for audit purposes?',
    options: [
      'Amazon CloudWatch',
      'AWS CloudTrail',
      'AWS Config',
      'Amazon Inspector',
    ],
    correctAnswers: [1],
    explanation:
      'AWS CloudTrail records all API calls made to Amazon Bedrock, including who made the call, when, from where, and what actions were performed. This provides an audit trail essential for security analysis, compliance auditing, and troubleshooting.',
    tags: ['auditing', 'cloudtrail'],
  },
  {
    id: 'd5-006',
    domain: 5,
    question: 'What is the purpose of using VPC endpoints (AWS PrivateLink) with Amazon Bedrock?',
    options: [
      'To increase model inference speed',
      'To keep API traffic between your VPC and Bedrock within the AWS network, without traversing the public internet',
      'To reduce costs',
      'To access additional models not available publicly',
    ],
    correctAnswers: [1],
    explanation:
      'VPC endpoints (via AWS PrivateLink) allow you to access Amazon Bedrock APIs from within your VPC without traffic crossing the public internet. This enhances security by keeping data within the AWS network and is often required for compliance with security policies.',
    tags: ['vpc', 'privatelink', 'networking'],
  },
  {
    id: 'd5-007',
    domain: 5,
    question: 'A company needs to ensure that their AI application complies with HIPAA for processing medical data. What should they verify?',
    options: [
      'That the model was trained on medical data',
      'That the AWS services used are HIPAA-eligible, a BAA is in place, and appropriate security controls are implemented',
      'That the model has 99.99% uptime SLA',
      'That the data is stored in a US region only',
    ],
    correctAnswers: [1],
    explanation:
      'For HIPAA compliance: (1) verify the AWS services used are HIPAA-eligible, (2) sign a Business Associate Agreement (BAA) with AWS, (3) implement appropriate security controls (encryption, access control, audit logging), and (4) follow the AWS HIPAA reference architecture.',
    tags: ['compliance', 'hipaa'],
  },
  {
    id: 'd5-008',
    domain: 5,
    question: 'What is "model drift" and why is it a security/governance concern?',
    options: [
      'When a model is accidentally deployed to the wrong region',
      'When a model\'s performance degrades over time because the real-world data distribution changes from the training data',
      'When a model is moved between AWS accounts',
      'When model weights are updated automatically',
    ],
    correctAnswers: [1],
    explanation:
      'Model drift occurs when the statistical properties of real-world input data change over time, causing the model\'s predictions to become less accurate. It\'s a governance concern because degraded performance can lead to unfair, inaccurate, or harmful decisions. Continuous monitoring with SageMaker Model Monitor helps detect drift.',
    tags: ['monitoring', 'model-drift', 'governance'],
  },
  {
    id: 'd5-009',
    domain: 5,
    question: 'What is the principle of "least privilege" and how does it apply to AI workloads?',
    options: [
      'Using the smallest possible model for every task',
      'Granting only the minimum IAM permissions needed for a specific role or service to perform its function',
      'Using the cheapest instance type available',
      'Minimizing the amount of training data used',
    ],
    correctAnswers: [1],
    explanation:
      'Least privilege means granting only the permissions necessary for a specific task. For AI workloads, this includes: restricting which models a role can invoke, limiting access to training data in S3, controlling who can customize models, and scoping down permissions for Lambda functions used by Bedrock Agents.',
    tags: ['iam', 'least-privilege', 'security'],
  },
  {
    id: 'd5-010',
    domain: 5,
    question: 'Which AWS service can automatically discover and classify sensitive data (like PII) in S3 buckets used for AI training?',
    options: [
      'Amazon GuardDuty',
      'Amazon Macie',
      'AWS WAF',
      'Amazon Detective',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Macie uses machine learning and pattern matching to automatically discover, classify, and protect sensitive data stored in Amazon S3. It can identify PII, financial data, and other sensitive information in datasets used for AI training, helping ensure compliance with data privacy regulations.',
    tags: ['data-privacy', 'macie'],
  },
  {
    id: 'd5-011',
    domain: 5,
    question: 'How should sensitive training data be stored on Amazon S3 for ML workloads?',
    options: [
      'In a public S3 bucket for easy access',
      'With encryption enabled (SSE-S3 or SSE-KMS), restricted bucket policies, access logging, and versioning',
      'Without encryption to improve performance',
      'Only in the us-east-1 region',
    ],
    correctAnswers: [1],
    explanation:
      'Sensitive training data on S3 should have: (1) encryption at rest (SSE-KMS for key control), (2) restrictive bucket policies and ACLs, (3) S3 access logging and CloudTrail, (4) versioning for data lineage, (5) VPC endpoints for private access, and (6) Amazon Macie for sensitive data discovery.',
    tags: ['s3', 'encryption', 'best-practices'],
  },
  {
    id: 'd5-012',
    domain: 5,
    question: 'What is "data lineage" in the context of AI governance?',
    options: [
      'The family tree of data scientists',
      'Tracking the origin, movement, and transformation of data throughout the ML lifecycle for auditability and reproducibility',
      'The age of the data in a dataset',
      'The geographic location where data was collected',
    ],
    correctAnswers: [1],
    explanation:
      'Data lineage tracks where data came from, how it was transformed, and how it was used throughout the ML pipeline. This is crucial for: compliance auditing, debugging model issues, reproducing results, understanding data dependencies, and maintaining governance standards.',
    tags: ['governance', 'data-lineage'],
  },
  {
    id: 'd5-013',
    domain: 5,
    question: 'Which security feature helps protect SageMaker notebooks and training jobs from unauthorized network access?',
    options: [
      'Amazon CloudFront',
      'VPC configuration with security groups and network ACLs',
      'Amazon Route 53',
      'AWS Amplify',
    ],
    correctAnswers: [1],
    explanation:
      'SageMaker notebooks and training jobs can be deployed within a VPC with security groups and network ACLs to control inbound/outbound network access. This isolates ML workloads from the public internet and restricts communication to authorized resources only.',
    tags: ['vpc', 'sagemaker', 'networking'],
  },
  {
    id: 'd5-014',
    domain: 5,
    question: 'What is the recommended approach for managing access keys and secrets used by AI applications?',
    options: [
      'Store them in the application source code',
      'Use AWS Secrets Manager or Systems Manager Parameter Store, and use IAM roles instead of long-term access keys',
      'Email them to the development team',
      'Store them in environment variables on developer machines',
    ],
    correctAnswers: [1],
    explanation:
      'Secrets should never be hardcoded or stored in source code. Best practices include: (1) use IAM roles instead of access keys when possible, (2) store secrets in AWS Secrets Manager or SSM Parameter Store, (3) enable automatic rotation, (4) use fine-grained access policies, and (5) audit access with CloudTrail.',
    tags: ['secrets-management', 'best-practices'],
  },
  {
    id: 'd5-015',
    domain: 5,
    question: 'What does Amazon SageMaker Model Monitor do?',
    options: [
      'Monitors the physical servers running SageMaker',
      'Continuously monitors deployed ML models for data quality issues, model quality degradation, bias drift, and feature attribution changes',
      'Monitors network traffic to SageMaker endpoints',
      'Monitors the cost of SageMaker usage',
    ],
    correctAnswers: [1],
    explanation:
      'SageMaker Model Monitor continuously evaluates deployed models for: (1) data quality — detecting schema changes, missing values, or distribution shifts in input data, (2) model quality — monitoring accuracy/performance metrics, (3) bias drift — detecting fairness metric changes, and (4) feature attribution — monitoring explainability changes.',
    tags: ['sagemaker', 'model-monitor', 'monitoring'],
  },
  {
    id: 'd5-016',
    domain: 5,
    question: 'What is the purpose of "model versioning" in AI governance?',
    options: [
      'Keeping track of API version numbers',
      'Maintaining a history of model iterations including training data, hyperparameters, and performance metrics for reproducibility and rollback',
      'Versioning the documentation only',
      'Counting the number of times a model has been invoked',
    ],
    correctAnswers: [1],
    explanation:
      'Model versioning tracks each iteration of a model with its associated training data, hyperparameters, code, and evaluation results. This enables: reproducibility (recreating any previous version), rollback (reverting to a better-performing version), auditing (understanding what changed and when), and compliance documentation.',
    tags: ['governance', 'versioning'],
  },
  {
    id: 'd5-017',
    domain: 5,
    question: 'Which of the following compliance frameworks is relevant when processing personal data of EU residents? ',
    options: [
      'SOC 2',
      'GDPR (General Data Protection Regulation)',
      'FedRAMP',
      'SOX',
    ],
    correctAnswers: [1],
    explanation:
      'GDPR governs the processing of personal data of EU residents. For AI systems, GDPR requires: lawful basis for processing, data minimization, right to explanation for automated decisions, data subject rights (access, deletion), data protection impact assessments, and appropriate technical/organizational safeguards.',
    tags: ['compliance', 'gdpr'],
  },
  {
    id: 'd5-018',
    domain: 5,
    question: 'How can you restrict which foundation models specific IAM users can invoke in Amazon Bedrock?',
    options: [
      'By using S3 bucket policies',
      'By specifying model ARNs in IAM policy Resource conditions',
      'By configuring VPC security groups',
      'By setting up CloudFront distributions',
    ],
    correctAnswers: [1],
    explanation:
      'IAM policies can restrict access to specific Bedrock models by specifying model ARNs in the Resource element. For example, you can create a policy that only allows bedrock:InvokeModel for specific model IDs, preventing users from accessing expensive or unapproved models.',
    tags: ['iam', 'bedrock', 'access-control'],
  },
  {
    id: 'd5-019',
    domain: 5,
    question: 'What is "model governance"?',
    options: [
      'Government regulation of AI companies',
      'The framework of policies, processes, and controls for managing ML models throughout their lifecycle including development, deployment, and retirement',
      'The board of directors overseeing AI',
      'The model\'s ability to self-govern its outputs',
    ],
    correctAnswers: [1],
    explanation:
      'Model governance encompasses the policies, processes, and controls that ensure ML models are developed, deployed, monitored, and retired responsibly. It includes: model approval workflows, performance monitoring, bias auditing, documentation requirements, access controls, and compliance verification.',
    tags: ['governance', 'policies'],
  },
  {
    id: 'd5-020',
    domain: 5,
    question: 'A company wants to ensure their custom-trained model on Amazon Bedrock can only be accessed by specific AWS accounts. What should they use?',
    options: [
      'Public API keys',
      'IAM resource-based policies and model sharing permissions',
      'Public S3 bucket hosting',
      'Open-source licensing',
    ],
    correctAnswers: [1],
    explanation:
      'Access to custom models on Amazon Bedrock is controlled through IAM policies. Resource-based policies and model sharing permissions can restrict which AWS accounts and roles can access a custom-trained model, ensuring it\'s only available to authorized entities.',
    tags: ['iam', 'bedrock', 'custom-models'],
  },
  {
    id: 'd5-021',
    domain: 5,
    question: 'What security measure should be implemented for model invocation logging in Amazon Bedrock?',
    options: [
      'Disable logging to prevent data exposure',
      'Encrypt logs at rest, restrict access to log destinations, and implement log retention policies',
      'Store logs in a public S3 bucket for transparency',
      'Only log failed requests',
    ],
    correctAnswers: [1],
    explanation:
      'Model invocation logs may contain sensitive data (prompts and responses). Security measures include: encrypting log storage (S3 with KMS, CloudWatch with KMS), restricting access to log destinations with IAM, implementing retention policies, and using VPC endpoints for log delivery.',
    tags: ['logging', 'security', 'best-practices'],
  },
  {
    id: 'd5-022',
    domain: 5,
    question: 'What is the purpose of AWS Config in the context of AI/ML governance?',
    options: [
      'To configure AI models',
      'To continuously assess, audit, and evaluate the configuration of AWS resources against compliance rules and best practices',
      'To configure VPC networks',
      'To set up model training parameters',
    ],
    correctAnswers: [1],
    explanation:
      'AWS Config continuously monitors and records AWS resource configurations and evaluates them against desired configurations (compliance rules). For AI/ML, it can verify that S3 buckets are encrypted, VPCs are properly configured, and security settings meet organizational standards.',
    tags: ['compliance', 'aws-config', 'governance'],
  },
  {
    id: 'd5-023',
    domain: 5,
    question: 'What is "data residency" and why does it matter for AI workloads?',
    options: [
      'The permanent home address of data engineers',
      'The geographic location where data is stored and processed, which matters for regulatory compliance and data sovereignty',
      'The backup location for disaster recovery',
      'The type of storage used for data',
    ],
    correctAnswers: [1],
    explanation:
      'Data residency refers to the physical geographic location where data is stored and processed. Many regulations (GDPR, data sovereignty laws) require data to remain within certain jurisdictions. When using AI services, organizations must ensure data is processed in compliant AWS regions and doesn\'t cross restricted boundaries.',
    tags: ['compliance', 'data-residency'],
  },
  {
    id: 'd5-024',
    domain: 5,
    question: 'What is the recommended security practice for SageMaker training jobs that process sensitive data?',
    options: [
      'Use public subnets for faster access',
      'Run training in a VPC with no internet access, enable inter-container encryption, and use encrypted storage volumes',
      'Store training data in unencrypted EBS volumes for performance',
      'Use the default SageMaker configuration without changes',
    ],
    correctAnswers: [1],
    explanation:
      'For sensitive data, SageMaker training jobs should: (1) run in a VPC with private subnets, (2) disable direct internet access, (3) enable inter-container traffic encryption, (4) use encrypted storage volumes (KMS), (5) use VPC endpoints for S3 and other services, and (6) apply least-privilege IAM roles.',
    tags: ['sagemaker', 'security', 'best-practices'],
  },
  {
    id: 'd5-025',
    domain: 5,
    question: 'What is the purpose of "model cards" or "model documentation" in AI governance?',
    options: [
      'Marketing materials for AI products',
      'Standardized documentation that describes a model\'s purpose, performance, limitations, ethical considerations, and intended/unintended use cases',
      'Physical identification cards for models',
      'Configuration files for model deployment',
    ],
    correctAnswers: [1],
    explanation:
      'Model cards provide standardized documentation about ML models including: intended use, training data description, evaluation metrics and results, ethical considerations, limitations, performance across different groups, and maintenance information. They support transparency, accountability, and informed decision-making.',
    tags: ['governance', 'documentation', 'model-cards'],
  },
  {
    id: 'd5-026',
    domain: 5,
    question: 'Which AWS service helps detect security threats and unauthorized behavior in AWS accounts, including AI service usage?',
    options: [
      'Amazon Macie',
      'Amazon GuardDuty',
      'AWS WAF',
      'Amazon Inspector',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior across AWS accounts. It analyzes CloudTrail, VPC Flow Logs, and DNS logs to detect threats like unusual API calls, compromised credentials, and unauthorized access to AI services.',
    tags: ['security', 'guardduty', 'threat-detection'],
  },
  {
    id: 'd5-027',
    domain: 5,
    question: 'What security consideration is unique to AI/ML systems compared to traditional applications?',
    options: [
      'Network encryption requirements',
      'The risk of adversarial attacks, data poisoning, model extraction, and prompt injection specific to AI systems',
      'The need for user authentication',
      'Database backup requirements',
    ],
    correctAnswers: [1],
    explanation:
      'AI systems face unique security threats including: adversarial attacks (manipulating inputs to cause incorrect outputs), data poisoning (corrupting training data), model extraction (stealing model behavior through API queries), prompt injection (manipulating LLM behavior through crafted inputs), and membership inference (determining if data was in the training set).',
    tags: ['security', 'ai-specific-threats'],
  },
  {
    id: 'd5-028',
    domain: 5,
    question: 'What is the purpose of "model endpoint authentication" in SageMaker?',
    options: [
      'To verify the model\'s accuracy',
      'To ensure only authorized users and applications can invoke the model endpoint using IAM authentication and SigV4 signing',
      'To authenticate the model with the training data',
      'To verify the endpoint\'s SSL certificate',
    ],
    correctAnswers: [1],
    explanation:
      'SageMaker endpoint authentication uses AWS IAM and SigV4 request signing to verify that only authorized principals can invoke the model. IAM policies control who can call InvokeEndpoint, and VPC endpoints can further restrict access to within a private network.',
    tags: ['sagemaker', 'authentication', 'security'],
  },
  {
    id: 'd5-029',
    domain: 5,
    question: 'A company needs to track all changes to their ML model configurations and training pipelines. Which approach is recommended?',
    options: [
      'Keep notes in a spreadsheet',
      'Use AWS CloudTrail for API auditing, SageMaker Model Registry for model versioning, and infrastructure as code (CloudFormation/CDK) for reproducibility',
      'Take screenshots of the console',
      'Send weekly email summaries',
    ],
    correctAnswers: [1],
    explanation:
      'Comprehensive tracking requires: (1) CloudTrail for API activity auditing, (2) SageMaker Model Registry for versioning models with metadata, (3) infrastructure as code for reproducible environments, (4) SageMaker Experiments for tracking training runs, and (5) Git for code versioning.',
    tags: ['governance', 'auditing', 'best-practices'],
  },
  {
    id: 'd5-030',
    domain: 5,
    question: 'What is the security benefit of using Amazon Bedrock compared to deploying a model on a public API endpoint?',
    options: [
      'Bedrock is always faster',
      'Bedrock provides built-in encryption, IAM integration, VPC support, CloudTrail logging, and data isolation without customers managing infrastructure security',
      'Bedrock uses more GPUs',
      'Bedrock models are more accurate',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Bedrock provides security benefits including: data encryption at rest and in transit, IAM-based access control, VPC endpoint support (PrivateLink), CloudTrail audit logging, data isolation (customer data not used for training), and compliance certifications — all managed by AWS without customers securing their own infrastructure.',
    tags: ['bedrock', 'security', 'managed-service'],
  },
];
