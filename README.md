## AWS AIF-C01 Exam Prep App

An interactive Streamlit app that helps you practice AWS Certified AI Practitioner (AIF-C01) questions in either Domain Practice or Full Mock Exam mode.

### Run locally
1. Ensure you have Python 3.10+ installed.
2. Create and activate a virtual environment (recommended `.venv`; `.env` also works). Then install dependencies.
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   python -m pip install -r requirements.txt
   ```
   If you prefer to name the environment `.env`, replace `.venv` in the commands above (e.g., `source .env/bin/activate`). However, `.env` conflicts with the common dotenv file naming convention, so `.venv` is preferred.
   On Windows (PowerShell):
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   ```
3. Start the app:
   ```bash
   streamlit run app.py
   ```
4. Open the local URL shown in the terminal (typically http://localhost:8501) to use the app.
