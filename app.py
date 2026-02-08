import streamlit as st
import time
import questions

# Set page configuration
st.set_page_config(page_title="AWS AIF-C01 Exam Prep", layout="wide")

# --- Helper Functions ---
def save_exam_answer(idx):
    """Callback to save the answer from the widget to the permanent state dict."""
    key = f"exam_q_{idx}"
    if key in st.session_state:
        st.session_state.user_answers[idx] = st.session_state[key]

def reset_exam_state():
    st.session_state.exam_questions = []
    st.session_state.current_question_index = 0
    st.session_state.user_answers = {}
    st.session_state.exam_start_time = None
    st.session_state.exam_submitted = False
    st.session_state.score = 0
    # Clear widget keys
    keys_to_remove = [k for k in st.session_state.keys() if k.startswith("exam_q_")]
    for k in keys_to_remove:
        del st.session_state[k]

def reset_practice_state():
    st.session_state.practice_index = 0
    st.session_state.practice_submitted = False
    st.session_state.practice_score = 0 # Optional, maybe just track current question status
    # Clear widget keys
    keys_to_remove = [k for k in st.session_state.keys() if k.startswith("practice_")]
    for k in keys_to_remove:
        del st.session_state[k]

# --- Session State Initialization ---
if 'mode' not in st.session_state:
    st.session_state.mode = 'Domain Practice'

if 'exam_questions' not in st.session_state:
    st.session_state.exam_questions = []

if 'current_question_index' not in st.session_state:
    st.session_state.current_question_index = 0

if 'user_answers' not in st.session_state:
    st.session_state.user_answers = {}

if 'exam_start_time' not in st.session_state:
    st.session_state.exam_start_time = None

if 'exam_submitted' not in st.session_state:
    st.session_state.exam_submitted = False

if 'practice_index' not in st.session_state:
    st.session_state.practice_index = 0

if 'practice_submitted' not in st.session_state:
    st.session_state.practice_submitted = False

# --- Sidebar ---
st.sidebar.title("AWS AIF-C01 Prep")
selected_mode = st.sidebar.radio("Select Mode", ['Domain Practice', 'Full Mock Exam'])

# Handle Mode Switching
if selected_mode != st.session_state.mode:
    st.session_state.mode = selected_mode
    if selected_mode == 'Full Mock Exam':
        reset_exam_state()
    else:
        reset_practice_state()
    st.rerun()

# --- Main Content ---

if st.session_state.mode == 'Domain Practice':
    st.title("Domain Practice Mode")
    st.write("Practice questions with immediate feedback and explanations.")

    practice_qs = questions.get_all_questions()

    if st.session_state.practice_index < len(practice_qs):
        current_q = practice_qs[st.session_state.practice_index]

        st.subheader(f"Question {st.session_state.practice_index + 1} of {len(practice_qs)}")
        st.write(current_q['question'])

        # Unique key for widget to avoid conflicts
        widget_key = f"practice_{st.session_state.practice_index}"

        user_choice = st.radio(
            "Select an answer:",
            current_q['options'],
            index=None,
            key=widget_key,
            disabled=st.session_state.practice_submitted
        )

        if st.button("Submit Answer", disabled=st.session_state.practice_submitted):
            if user_choice:
                st.session_state.practice_submitted = True
                st.rerun()
            else:
                st.warning("Please select an answer.")

        if st.session_state.practice_submitted:
            correct_answer = current_q['answer']
            if user_choice == correct_answer:
                st.success("Correct!")
            else:
                st.error(f"Incorrect. The correct answer is: {correct_answer}")

            st.info(f"**Explanation:**\n\n{current_q['explanation']}")

            if st.button("Next Question"):
                st.session_state.practice_index += 1
                st.session_state.practice_submitted = False
                st.rerun()

    else:
        st.success("You have completed all practice questions!")
        if st.button("Restart Practice"):
            reset_practice_state()
            st.rerun()

elif st.session_state.mode == 'Full Mock Exam':
    st.title("Full Mock Exam (AIF-C01)")

    # Initialize Exam
    if not st.session_state.exam_questions:
        st.session_state.exam_questions = questions.get_mock_exam_questions()
        st.session_state.exam_start_time = time.time()
        st.rerun()

    # Timer Logic
    elapsed_time = time.time() - st.session_state.exam_start_time
    total_time = 90 * 60 # 90 minutes in seconds
    remaining_time = total_time - elapsed_time

    if remaining_time <= 0 and not st.session_state.exam_submitted:
        st.session_state.exam_submitted = True
        st.warning("Time is up! Submitting exam...")
        st.rerun()

    # Display Timer
    if not st.session_state.exam_submitted:
        mins, secs = divmod(int(remaining_time), 60)
        timer_color = "red" if mins < 5 else "green"
        st.markdown(f"### Time Remaining: :{timer_color}[{mins:02d}:{secs:02d}]")

    # Display Results if Submitted
    if st.session_state.exam_submitted:
        st.subheader("Exam Results")

        score = 0
        total_q = len(st.session_state.exam_questions)

        for idx, q in enumerate(st.session_state.exam_questions):
            # Retrieve answer from permanent session state dict
            user_ans = st.session_state.user_answers.get(idx)
            if user_ans == q['answer']:
                score += 1

        percentage = (score / total_q) * 100
        passed = percentage >= 70

        col1, col2 = st.columns(2)
        with col1:
            st.metric("Score", f"{score} / {total_q}")
        with col2:
            st.metric("Percentage", f"{percentage:.2f}%")

        if passed:
            st.success("PASSED! Congratulations!")
        else:
            st.error("FAILED. Keep practicing.")

        st.write("---")
        if st.button("Retake Exam"):
            reset_exam_state()
            st.rerun()

    else:
        # Question Navigation
        q_idx = st.session_state.current_question_index
        total_q = len(st.session_state.exam_questions)
        current_q = st.session_state.exam_questions[q_idx]

        st.progress((q_idx + 1) / total_q)
        st.write(f"Question {q_idx + 1} of {total_q}")

        st.markdown(f"### {current_q['question']}")

        # Determine the index of the previously selected answer, if any
        previous_answer = st.session_state.user_answers.get(q_idx)
        default_index = None
        if previous_answer in current_q['options']:
            default_index = current_q['options'].index(previous_answer)

        # Use a unique key for each question's radio button.
        # We use on_change to persist the answer to st.session_state.user_answers
        st.radio(
            "Select an answer:",
            current_q['options'],
            index=default_index,
            key=f"exam_q_{q_idx}",
            on_change=save_exam_answer,
            args=(q_idx,)
        )

        # Navigation Buttons
        col_prev, col_next, col_submit = st.columns([1, 1, 2])

        with col_prev:
            if q_idx > 0:
                if st.button("Previous"):
                    st.session_state.current_question_index -= 1
                    st.rerun()

        with col_next:
            if q_idx < total_q - 1:
                if st.button("Next"):
                    st.session_state.current_question_index += 1
                    st.rerun()

        with col_submit:
            if st.button("Submit Exam", type="primary"):
                st.session_state.exam_submitted = True
                st.rerun()
