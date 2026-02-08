import random

# Sample questions for AWS Certified AI Practitioner (AIF-C01)
# Note: In a production environment, these would be stored in a database.

base_questions = [
    {
        "question": "Which AWS service is primarily used for building, training, and deploying machine learning models at scale?",
        "options": ["Amazon SageMaker", "AWS Lambda", "Amazon EC2", "Amazon S3"],
        "answer": "Amazon SageMaker",
        "explanation": "Amazon SageMaker is a fully managed service that provides every developer and data scientist with the ability to build, train, and deploy machine learning (ML) models quickly. AWS Lambda is for serverless compute, EC2 is for virtual servers, and S3 is for storage."
    },
    {
        "question": "What is the primary benefit of using Amazon Bedrock?",
        "options": ["It allows you to build foundation models from scratch.", "It provides serverless access to foundation models via API.", "It is a database service for ML.", "It is used for labeling data."],
        "answer": "It provides serverless access to foundation models via API.",
        "explanation": "Amazon Bedrock is a fully managed service that makes foundation models (FMs) from leading AI startups and Amazon available via an API, so you can choose from a wide range of FMs to find the model that is best suited for your use case."
    },
    {
        "question": "Which AWS service helps in identifying potential bias in machine learning models?",
        "options": ["Amazon SageMaker Clarify", "Amazon Inspector", "AWS CloudTrail", "Amazon Macie"],
        "answer": "Amazon SageMaker Clarify",
        "explanation": "Amazon SageMaker Clarify detects potential bias during data preparation, after model training, and in your deployed model by examining specified attributes."
    },
    {
        "question": "A company wants to implement a chatbot that can answer customer queries using natural language. Which service is best suited for this?",
        "options": ["Amazon Lex", "Amazon Polly", "Amazon Transcribe", "Amazon Rekognition"],
        "answer": "Amazon Lex",
        "explanation": "Amazon Lex is a service for building conversational interfaces into any application using voice and text. It provides the advanced deep learning functionalities of automatic speech recognition (ASR) and natural language understanding (NLU)."
    },
    {
        "question": "Which service converts text into lifelike speech?",
        "options": ["Amazon Polly", "Amazon Lex", "Amazon Translate", "Amazon Comprehend"],
        "answer": "Amazon Polly",
        "explanation": "Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products."
    },
    {
        "question": "Which AWS AI service can identify objects, people, text, scenes, and activities in images and videos?",
        "options": ["Amazon Rekognition", "Amazon Textract", "Amazon Kendra", "Amazon Personalize"],
        "answer": "Amazon Rekognition",
        "explanation": "Amazon Rekognition offers pre-trained and customizable computer vision (CV) capabilities to extract information and insights from your images and videos."
    },
    {
        "question": "What is the purpose of Amazon Kendra?",
        "options": ["To provide intelligent search capabilities powered by machine learning.", "To translate text between languages.", "To automate code reviews.", "To forecast time-series data."],
        "answer": "To provide intelligent search capabilities powered by machine learning.",
        "explanation": "Amazon Kendra is an intelligent search service powered by machine learning. It reimagines enterprise search for your websites and applications so your employees and customers can easily find the content they are looking for."
    },
    {
        "question": "Which service is used to extract printed text, handwriting, and data from scanned documents?",
        "options": ["Amazon Textract", "Amazon Comprehend", "Amazon Rekognition", "Amazon Translate"],
        "answer": "Amazon Textract",
        "explanation": "Amazon Textract is a machine learning (ML) service that automatically extracts text, handwriting, and data from scanned documents."
    },
    {
        "question": "Which AWS service is designed to help developers create real-time personalized recommendations?",
        "options": ["Amazon Personalize", "Amazon Forecast", "Amazon SageMaker", "Amazon Connect"],
        "answer": "Amazon Personalize",
        "explanation": "Amazon Personalize allows developers to create real-time personalized recommendations for their users, with the same machine learning (ML) technology used by Amazon.com."
    },
    {
        "question": "What is 'Prompt Engineering' in the context of Generative AI?",
        "options": ["Designing the physical hardware for AI models.", "Crafting inputs to guide Generative AI models to produce desired outputs.", "Writing code to train neural networks.", "Managing the database schemas for AI applications."],
        "answer": "Crafting inputs to guide Generative AI models to produce desired outputs.",
        "explanation": "Prompt engineering involves crafting inputs (prompts) to guide Generative AI models to produce the best possible results for a specific task."
    },
    {
        "question": "Which feature of Amazon SageMaker allows you to label training datasets?",
        "options": ["Amazon SageMaker Ground Truth", "Amazon SageMaker JumpStart", "Amazon SageMaker Pipelines", "Amazon SageMaker Debugger"],
        "answer": "Amazon SageMaker Ground Truth",
        "explanation": "Amazon SageMaker Ground Truth is a data labeling service that makes it easy to build highly accurate training datasets for machine learning."
    },
    {
        "question": "Which concept refers to the ability of an AI system to explain its decisions?",
        "options": ["Explainability", "Scalability", "Elasticity", "Availability"],
        "answer": "Explainability",
        "explanation": "Explainability refers to the extent to which the internal mechanics of a machine or deep learning system can be explained in human terms."
    }
]

def get_all_questions():
    """Returns the base list of questions for Domain Practice."""
    return base_questions

def get_mock_exam_questions():
    """
    Returns a list of 65 randomized questions for the Mock Exam.
    Since we have a limited sample set, we will sample with replacement/repetition
    to simulate a full 65-question exam.
    """
    target_count = 65
    current_count = len(base_questions)

    if current_count >= target_count:
        return random.sample(base_questions, target_count)
    else:
        # Calculate how many times we need to repeat the list
        multiplier = (target_count // current_count) + 1
        extended_questions = base_questions * multiplier
        # Shuffle to mix them up
        random.shuffle(extended_questions)
        # Slice to exact number
        return extended_questions[:target_count]
