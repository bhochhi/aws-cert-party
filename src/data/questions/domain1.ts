import type { Question } from '../../types';

export const domain1Questions: Question[] = [
  {
    id: 'd1-001',
    domain: 1,
    question: 'Which type of machine learning is used when the training data includes both input features and labeled outputs?',
    options: [
      'Supervised learning',
      'Unsupervised learning',
      'Reinforcement learning',
      'Self-supervised learning',
    ],
    correctAnswers: [0],
    explanation:
      'Supervised learning uses labeled training data where each example includes both the input and the desired output. The model learns to map inputs to outputs based on these examples.',
    tags: ['ml-basics', 'supervised'],
  },
  {
    id: 'd1-002',
    domain: 1,
    question: 'A company wants to group customers into segments based on purchasing behavior, without any predefined categories. Which type of machine learning should they use?',
    options: [
      'Supervised learning — classification',
      'Unsupervised learning — clustering',
      'Reinforcement learning',
      'Supervised learning — regression',
    ],
    correctAnswers: [1],
    explanation:
      'Unsupervised learning clustering algorithms (like K-means) group data points based on similarities without requiring labeled categories. This is ideal for customer segmentation when no predefined groups exist.',
    tags: ['ml-basics', 'unsupervised'],
  },
  {
    id: 'd1-003',
    domain: 1,
    question: 'Which AWS service provides pre-trained models for image and video analysis without requiring ML expertise?',
    options: [
      'Amazon SageMaker',
      'Amazon Rekognition',
      'Amazon Comprehend',
      'Amazon Personalize',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Rekognition provides pre-trained and customizable computer vision capabilities for image and video analysis, including object detection, facial analysis, and content moderation — all without requiring ML expertise.',
    tags: ['aws-services', 'rekognition'],
  },
  {
    id: 'd1-004',
    domain: 1,
    question: 'What is the primary purpose of feature engineering in the ML pipeline?',
    options: [
      'To deploy the model to production',
      'To select the best algorithm for training',
      'To transform raw data into meaningful inputs that improve model performance',
      'To monitor model performance after deployment',
    ],
    correctAnswers: [2],
    explanation:
      'Feature engineering is the process of creating, selecting, and transforming raw data into features (inputs) that better represent the underlying problem, improving the model\'s ability to learn and make accurate predictions.',
    tags: ['ml-pipeline', 'feature-engineering'],
  },
  {
    id: 'd1-005',
    domain: 1,
    question: 'Which metric is MOST appropriate for evaluating a model that needs to minimize false positives, such as a spam email classifier?',
    options: [
      'Recall',
      'Precision',
      'F1 Score',
      'Mean Absolute Error',
    ],
    correctAnswers: [1],
    explanation:
      'Precision measures the proportion of positive predictions that are actually correct (True Positives / (True Positives + False Positives)). Minimizing false positives means maximizing precision — important for spam filters where flagging a legitimate email as spam is costly.',
    tags: ['evaluation', 'metrics'],
  },
  {
    id: 'd1-006',
    domain: 1,
    question: 'Which AWS service uses natural language processing to extract insights and relationships from unstructured text?',
    options: [
      'Amazon Textract',
      'Amazon Comprehend',
      'Amazon Translate',
      'Amazon Polly',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Comprehend is an NLP service that uses machine learning to find insights and relationships in text, including sentiment analysis, entity recognition, key phrase extraction, and topic modeling.',
    tags: ['aws-services', 'comprehend'],
  },
  {
    id: 'd1-007',
    domain: 1,
    question: 'What is the purpose of splitting data into training, validation, and test sets?',
    options: [
      'To reduce the total amount of data needed',
      'To train three different models simultaneously',
      'To evaluate model performance during tuning and provide an unbiased final evaluation',
      'To increase training speed by using smaller datasets',
    ],
    correctAnswers: [2],
    explanation:
      'The training set is used to train the model, the validation set is used to tune hyperparameters and prevent overfitting during development, and the test set provides a final unbiased evaluation of the model\'s performance on unseen data.',
    tags: ['ml-pipeline', 'data-splitting'],
  },
  {
    id: 'd1-008',
    domain: 1,
    question: 'A model performs extremely well on training data but poorly on new, unseen data. What is this problem called?',
    options: [
      'Underfitting',
      'Overfitting',
      'Bias',
      'Data leakage',
    ],
    correctAnswers: [1],
    explanation:
      'Overfitting occurs when a model learns the training data too well, including noise and specific patterns, and fails to generalize to new data. This results in high training accuracy but poor performance on validation/test data.',
    tags: ['ml-basics', 'overfitting'],
  },
  {
    id: 'd1-009',
    domain: 1,
    question: 'Which AWS service would you use to build, train, and deploy machine learning models with full flexibility and control?',
    options: [
      'Amazon Rekognition',
      'Amazon SageMaker',
      'Amazon Comprehend',
      'Amazon Bedrock',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon SageMaker is a fully managed service that provides every developer and data scientist with the ability to build, train, and deploy ML models at scale. It provides the most flexibility and control over the entire ML lifecycle.',
    tags: ['aws-services', 'sagemaker'],
  },
  {
    id: 'd1-010',
    domain: 1,
    question: 'In reinforcement learning, what does an agent learn from?',
    options: [
      'Labeled training examples',
      'Unlabeled data clusters',
      'Rewards and penalties from interactions with an environment',
      'Pre-trained model weights',
    ],
    correctAnswers: [2],
    explanation:
      'In reinforcement learning, an agent learns by interacting with an environment and receiving rewards (positive feedback) or penalties (negative feedback) based on its actions. The agent\'s goal is to maximize cumulative rewards over time.',
    tags: ['ml-basics', 'reinforcement-learning'],
  },
  {
    id: 'd1-011',
    domain: 1,
    question: 'Which type of ML problem would be used to predict the price of a house based on its features?',
    options: [
      'Classification',
      'Clustering',
      'Regression',
      'Anomaly detection',
    ],
    correctAnswers: [2],
    explanation:
      'Regression is a supervised learning task used to predict continuous numerical values. House price prediction is a classic regression problem where the model learns to predict a numerical price based on input features like size, location, and number of rooms.',
    tags: ['ml-basics', 'regression'],
  },
  {
    id: 'd1-012',
    domain: 1,
    question: 'Amazon Textract is BEST suited for which of the following tasks?',
    options: [
      'Translating text between languages',
      'Extracting text and data from scanned documents',
      'Generating speech from text',
      'Detecting sentiment in customer reviews',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Textract is a service that automatically extracts text, handwriting, and structured data (like tables and forms) from scanned documents, going beyond simple OCR by identifying relationships between extracted elements.',
    tags: ['aws-services', 'textract'],
  },
  {
    id: 'd1-013',
    domain: 1,
    question: 'What does the AUC-ROC metric measure?',
    options: [
      'The average absolute error of predictions',
      'The model\'s ability to distinguish between positive and negative classes',
      'The proportion of correct predictions out of total predictions',
      'The training speed of the model',
    ],
    correctAnswers: [1],
    explanation:
      'AUC-ROC (Area Under the Receiver Operating Characteristic Curve) measures a classification model\'s ability to distinguish between positive and negative classes across all thresholds. An AUC of 1.0 means perfect discrimination; 0.5 means no discrimination (random guessing).',
    tags: ['evaluation', 'metrics'],
  },
  {
    id: 'd1-014',
    domain: 1,
    question: 'Which AWS service converts text to lifelike speech?',
    options: [
      'Amazon Transcribe',
      'Amazon Translate',
      'Amazon Polly',
      'Amazon Lex',
    ],
    correctAnswers: [2],
    explanation:
      'Amazon Polly is a text-to-speech service that uses advanced deep learning technologies to synthesize natural-sounding human speech. It supports multiple languages and voices, including neural text-to-speech voices.',
    tags: ['aws-services', 'polly'],
  },
  {
    id: 'd1-015',
    domain: 1,
    question: 'Which of the following BEST describes the concept of "inference" in machine learning?',
    options: [
      'The process of training a model on data',
      'Using a trained model to make predictions on new data',
      'Selecting the right algorithm for a problem',
      'Evaluating model performance with metrics',
    ],
    correctAnswers: [1],
    explanation:
      'Inference is the process of using a trained machine learning model to make predictions or generate outputs on new, unseen data. It is the production phase where the model is applied to real-world inputs.',
    tags: ['ml-basics', 'inference'],
  },
  {
    id: 'd1-016',
    domain: 1,
    question: 'Which AWS service would you use to build a conversational chatbot with voice and text capabilities?',
    options: [
      'Amazon Polly',
      'Amazon Lex',
      'Amazon Comprehend',
      'Amazon Transcribe',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Lex provides advanced deep learning functionalities for building conversational interfaces (chatbots) using voice and text. It powers the same technology behind Alexa and integrates with AWS Lambda for fulfillment.',
    tags: ['aws-services', 'lex'],
  },
  {
    id: 'd1-017',
    domain: 1,
    question: 'What is the purpose of hyperparameter tuning in the ML lifecycle?',
    options: [
      'To clean and prepare the training data',
      'To optimize model configuration settings that aren\'t learned during training',
      'To deploy the model to a production endpoint',
      'To select which features to use as inputs',
    ],
    correctAnswers: [1],
    explanation:
      'Hyperparameters are configuration settings (like learning rate, number of layers, batch size) that are set before training and are not learned from the data. Hyperparameter tuning optimizes these settings to improve model performance.',
    tags: ['ml-pipeline', 'hyperparameters'],
  },
  {
    id: 'd1-018',
    domain: 1,
    question: 'Which metric is MOST important when the cost of missing a positive case is very high, such as in medical disease detection?',
    options: [
      'Precision',
      'Recall (Sensitivity)',
      'Specificity',
      'Accuracy',
    ],
    correctAnswers: [1],
    explanation:
      'Recall (also called Sensitivity or True Positive Rate) measures the proportion of actual positives that are correctly identified. In medical diagnostics, high recall is crucial because missing a positive case (false negative) could be life-threatening.',
    tags: ['evaluation', 'metrics'],
  },
  {
    id: 'd1-019',
    domain: 1,
    question: 'Amazon Kendra is BEST described as which type of service?',
    options: [
      'A machine learning model training platform',
      'An intelligent enterprise search service powered by ML',
      'A document processing and OCR service',
      'A recommendation engine service',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Kendra is an intelligent enterprise search service powered by machine learning. It provides natural language search capabilities across enterprise data sources, understanding context and returning precise answers rather than just keyword matches.',
    tags: ['aws-services', 'kendra'],
  },
  {
    id: 'd1-020',
    domain: 1,
    question: 'Which of the following is a common technique to address underfitting in a machine learning model?',
    options: [
      'Reduce the number of features',
      'Increase model complexity or add more features',
      'Add more regularization',
      'Decrease the size of the training dataset',
    ],
    correctAnswers: [1],
    explanation:
      'Underfitting occurs when a model is too simple to capture the underlying patterns in the data. Increasing model complexity (e.g., more layers, more parameters) or adding more informative features helps the model learn the data patterns better.',
    tags: ['ml-basics', 'underfitting'],
  },
  {
    id: 'd1-021',
    domain: 1,
    question: 'Which AWS service converts speech to text?',
    options: [
      'Amazon Polly',
      'Amazon Transcribe',
      'Amazon Translate',
      'Amazon Comprehend',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Transcribe is an automatic speech recognition (ASR) service that converts speech to text. It supports real-time and batch transcription, speaker identification, and custom vocabularies.',
    tags: ['aws-services', 'transcribe'],
  },
  {
    id: 'd1-022',
    domain: 1,
    question: 'What is the F1 Score?',
    options: [
      'The average of accuracy and AUC',
      'The harmonic mean of precision and recall',
      'The ratio of true negatives to total predictions',
      'The difference between training and validation loss',
    ],
    correctAnswers: [1],
    explanation:
      'The F1 Score is the harmonic mean of precision and recall: F1 = 2 × (Precision × Recall) / (Precision + Recall). It provides a single metric that balances both precision and recall, useful when you need to find an optimal trade-off between the two.',
    tags: ['evaluation', 'metrics'],
  },
  {
    id: 'd1-023',
    domain: 1,
    question: 'A retail company wants to predict which products individual customers are likely to purchase next. Which AWS service is MOST appropriate?',
    options: [
      'Amazon Comprehend',
      'Amazon Forecast',
      'Amazon Personalize',
      'Amazon Rekognition',
    ],
    correctAnswers: [2],
    explanation:
      'Amazon Personalize is a fully managed service that enables developers to create individualized product and content recommendations. It uses the same ML technology used by Amazon.com for real-time personalized recommendations.',
    tags: ['aws-services', 'personalize'],
  },
  {
    id: 'd1-024',
    domain: 1,
    question: 'Which of the following is an example of anomaly detection?',
    options: [
      'Predicting tomorrow\'s stock price',
      'Classifying emails as spam or not spam',
      'Identifying unusual transactions that may indicate fraud',
      'Translating English text to French',
    ],
    correctAnswers: [2],
    explanation:
      'Anomaly detection identifies data points that deviate significantly from expected behavior. Fraud detection is a classic example — the model learns what "normal" transactions look like and flags unusual ones for further investigation.',
    tags: ['ml-basics', 'anomaly-detection'],
  },
  {
    id: 'd1-025',
    domain: 1,
    question: 'Which AWS service would you use to forecast future business metrics like product demand or financial outcomes?',
    options: [
      'Amazon Personalize',
      'Amazon Forecast',
      'Amazon Lookout for Metrics',
      'Amazon SageMaker Autopilot',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Forecast is a fully managed service that uses ML to deliver highly accurate time-series forecasts. It is purpose-built for business forecasting use cases like demand planning, financial forecasting, and resource planning.',
    tags: ['aws-services', 'forecast'],
  },
  {
    id: 'd1-026',
    domain: 1,
    question: 'What is the primary difference between batch inference and real-time inference?',
    options: [
      'Batch inference uses GPUs; real-time uses CPUs',
      'Batch inference processes large datasets offline; real-time inference processes individual requests with low latency',
      'Batch inference is more accurate; real-time inference is approximate',
      'There is no practical difference; they are interchangeable terms',
    ],
    correctAnswers: [1],
    explanation:
      'Batch inference processes large volumes of data at once, typically on a schedule (e.g., nightly scoring of all customers). Real-time inference provides immediate predictions for individual requests with low latency (e.g., a product recommendation when a user visits a page).',
    tags: ['ml-basics', 'inference'],
  },
  {
    id: 'd1-027',
    domain: 1,
    question: 'Amazon SageMaker Autopilot is BEST described as:',
    options: [
      'A service that automatically deploys models to production endpoints',
      'An AutoML capability that automatically explores data, selects algorithms, and trains models',
      'A monitoring service that detects model drift',
      'A notebook environment for data exploration',
    ],
    correctAnswers: [1],
    explanation:
      'SageMaker Autopilot is an AutoML feature that automatically explores different solutions to find the best model. It inspects raw data, applies feature processing, picks the best set of algorithms, trains and tunes multiple models, and ranks them based on performance.',
    tags: ['aws-services', 'sagemaker'],
  },
  {
    id: 'd1-028',
    domain: 1,
    question: 'Which of the following BEST describes transfer learning?',
    options: [
      'Moving a trained model from one AWS region to another',
      'Using knowledge gained from training on one task to improve performance on a related task',
      'Transferring data between training and test sets',
      'Copying model weights between SageMaker endpoints',
    ],
    correctAnswers: [1],
    explanation:
      'Transfer learning is a technique where a model trained on one task is reused as the starting point for a model on a different but related task. This is especially useful when you have limited training data, as the pre-trained model has already learned useful features.',
    tags: ['ml-basics', 'transfer-learning'],
  },
  {
    id: 'd1-029',
    domain: 1,
    question: 'What is data labeling in the context of machine learning?',
    options: [
      'Adding metadata tags to stored data files',
      'Annotating data with the correct answers so it can be used for supervised learning',
      'Encrypting data with security labels',
      'Organizing data into folders by category',
    ],
    correctAnswers: [1],
    explanation:
      'Data labeling (or annotation) is the process of adding meaningful, informative labels to raw data (such as identifying objects in images or tagging sentiment in text) so the data can be used to train supervised learning models. AWS offers Amazon SageMaker Ground Truth for this purpose.',
    tags: ['ml-pipeline', 'data-labeling'],
  },
  {
    id: 'd1-030',
    domain: 1,
    question: 'Which AWS service helps create labeled training datasets using human annotators and built-in workflows?',
    options: [
      'Amazon Mechanical Turk',
      'Amazon SageMaker Ground Truth',
      'Amazon Comprehend',
      'AWS Glue DataBrew',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon SageMaker Ground Truth helps create high-quality training datasets by providing built-in labeling workflows, automated labeling with active learning, and a managed workforce of annotators. It significantly reduces the time and cost of data labeling.',
    tags: ['aws-services', 'ground-truth'],
  },
  {
    id: 'd1-031',
    domain: 1,
    question: 'A model has high bias and low variance. What does this indicate?',
    options: [
      'The model is overfitting the training data',
      'The model is underfitting — it\'s too simple to capture the data patterns',
      'The model is perfectly balanced',
      'The model needs more regularization',
    ],
    correctAnswers: [1],
    explanation:
      'High bias and low variance indicates underfitting — the model is too simple to capture the underlying patterns in the data. It makes strong assumptions that don\'t match reality. The solution is to increase model complexity.',
    tags: ['ml-basics', 'bias-variance'],
  },
  {
    id: 'd1-032',
    domain: 1,
    question: 'Which of the following is NOT a typical step in the ML pipeline?',
    options: [
      'Data collection and preparation',
      'Model training and evaluation',
      'Network firewall configuration',
      'Model deployment and monitoring',
    ],
    correctAnswers: [2],
    explanation:
      'The typical ML pipeline includes: data collection → data preparation/feature engineering → model selection → training → evaluation → deployment → monitoring. Network firewall configuration is an infrastructure/security concern, not a core step of the ML pipeline itself.',
    tags: ['ml-pipeline'],
  },
  {
    id: 'd1-033',
    domain: 1,
    question: 'Amazon Translate is BEST used for which purpose?',
    options: [
      'Converting audio speech between languages',
      'Translating text between supported languages using neural machine translation',
      'Converting documents from PDF to text format',
      'Translating programming code between languages',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Translate is a neural machine translation service that delivers fast, high-quality, affordable, and customizable language translation of text content between supported language pairs.',
    tags: ['aws-services', 'translate'],
  },
  {
    id: 'd1-034',
    domain: 1,
    question: 'What is the difference between multi-class classification and multi-label classification?',
    options: [
      'They are the same thing',
      'Multi-class assigns exactly one class per sample; multi-label allows multiple classes per sample',
      'Multi-class uses regression; multi-label uses clustering',
      'Multi-class is supervised; multi-label is unsupervised',
    ],
    correctAnswers: [1],
    explanation:
      'In multi-class classification, each sample belongs to exactly one of several classes (e.g., cat, dog, or bird). In multi-label classification, each sample can belong to multiple classes simultaneously (e.g., a movie can be both "action" and "comedy").',
    tags: ['ml-basics', 'classification'],
  },
  {
    id: 'd1-035',
    domain: 1,
    question: 'What does regularization do in machine learning?',
    options: [
      'Increases model complexity to improve accuracy',
      'Adds constraints to prevent the model from overfitting',
      'Speeds up the training process',
      'Increases the size of the training dataset',
    ],
    correctAnswers: [1],
    explanation:
      'Regularization techniques (like L1/Lasso, L2/Ridge, dropout) add constraints or penalties to the model during training to prevent it from learning noise in the training data, thus reducing overfitting and improving generalization to new data.',
    tags: ['ml-basics', 'regularization'],
  },
  {
    id: 'd1-036',
    domain: 1,
    question: 'Which of the following are AI/ML services that require NO machine learning expertise to use? (Select TWO)',
    options: [
      'Amazon SageMaker',
      'Amazon Rekognition',
      'Amazon SageMaker Ground Truth',
      'Amazon Comprehend',
      'Amazon SageMaker Studio',
    ],
    correctAnswers: [1, 3],
    explanation:
      'Amazon Rekognition and Amazon Comprehend are AI services with pre-trained models that require no ML expertise — you simply call the API with your data. SageMaker, Ground Truth, and SageMaker Studio are tools designed for ML practitioners who want more control over the ML process.',
    tags: ['aws-services', 'ai-services'],
  },
  {
    id: 'd1-037',
    domain: 1,
    question: 'What is a confusion matrix used for?',
    options: [
      'To visualize the training loss over time',
      'To summarize the performance of a classification model by showing true/false positives and negatives',
      'To display the distribution of features in a dataset',
      'To compare the cost of different AWS services',
    ],
    correctAnswers: [1],
    explanation:
      'A confusion matrix is a table that summarizes a classification model\'s predictions vs. actual values. It shows True Positives, True Negatives, False Positives, and False Negatives, making it easy to calculate metrics like precision, recall, and accuracy.',
    tags: ['evaluation', 'metrics'],
  },
  {
    id: 'd1-038',
    domain: 1,
    question: 'Amazon Lookout for Metrics is designed to:',
    options: [
      'Train custom ML models',
      'Automatically detect anomalies in business metrics and identify root causes',
      'Provide search capabilities across enterprise data',
      'Generate synthetic training data',
    ],
    correctAnswers: [1],
    explanation:
      'Amazon Lookout for Metrics uses ML to automatically detect anomalies in business and operational metrics (like revenue dips, traffic spikes) and helps identify their root causes, reducing the time to detect and resolve issues.',
    tags: ['aws-services', 'lookout'],
  },
  {
    id: 'd1-039',
    domain: 1,
    question: 'Which of the following BEST describes the concept of "epoch" in model training?',
    options: [
      'A single prediction made by the model',
      'One complete pass through the entire training dataset',
      'The time taken to train the model',
      'A batch of data samples processed together',
    ],
    correctAnswers: [1],
    explanation:
      'An epoch represents one complete pass through the entire training dataset. During training, the model typically goes through multiple epochs, iteratively adjusting its weights to improve predictions. Too few epochs lead to underfitting; too many can cause overfitting.',
    tags: ['ml-basics', 'training'],
  },
  {
    id: 'd1-040',
    domain: 1,
    question: 'What is the primary purpose of cross-validation in machine learning?',
    options: [
      'To increase the size of the training dataset',
      'To provide a more robust estimate of model performance by training and evaluating on multiple data splits',
      'To deploy models to multiple regions simultaneously',
      'To translate validation data between languages',
    ],
    correctAnswers: [1],
    explanation:
      'Cross-validation (e.g., k-fold) splits the data into multiple folds, trains and evaluates the model on different combinations, and averages the results. This provides a more reliable estimate of model performance and helps detect overfitting.',
    tags: ['evaluation', 'cross-validation'],
  },
];
