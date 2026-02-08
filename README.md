## AWS AIF-C01 Exam Prep App

An interactive Streamlit app that helps you practice AWS Certified AI Practitioner (AIF-C01) questions in either Domain Practice or Full Mock Exam mode.

### Run locally
1. Ensure you have Python 3.10+ installed.
2. Create and activate a virtual environment directory named `.env` (this is a Python venv, not a dotenv file; feel free to use `.venv` or another name if you already use `.env` for dotenv variables), then install dependencies:
   ```bash
   python -m venv .env
   source .env/bin/activate
   python -m pip install -r requirements.txt
   ```
   On Windows (PowerShell):
   ```powershell
   python -m venv .env
   .\.env\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   ```
3. Start the app:
   ```bash
   streamlit run app.py
   ```
4. Open the local URL shown in the terminal (typically http://localhost:8501) to use the app.
