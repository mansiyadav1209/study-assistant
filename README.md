# 📚 AI Study Assistant

An AI-powered web application that transforms study notes into interactive Flashcards and Multiple-Choice Quizzes using the Google Gemini API. The application helps students revise concepts efficiently through AI-generated learning material.

---

## 🚀 Features

- 📄 Paste study notes into the application
- 🤖 Generate AI-powered flashcards
- 📝 Generate AI-powered multiple-choice quizzes
- 🔄 Flip flashcards to reveal answers
- ⬅️➡️ Navigate between flashcards
- ✅ Interactive quiz with score calculation
- 📊 Instant quiz results
- ✔️ View correct and incorrect answers after submission
- 🔁 Retake only incorrectly answered questions
- 📱 Responsive UI for desktop and mobile devices
- ⚠️ Input validation and error handling for empty notes and AI responses

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- Google Gemini API (`@google/genai`)
- dotenv
- CORS

---

# 📂 Project Structure

```
study-assistant/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Setup

## 1. Clone the Repository

```bash
git clone https://github.com/mansiyadav1209/study-assistant.git
cd study-assistant
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Generate your Gemini API key from Google AI Studio and replace:

```
YOUR_GEMINI_API_KEY
```

with your own API key.

---

# ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd frontend
npm start
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📖 Usage

1. Paste your study notes into the text area.
2. Click **Generate Flashcards**.
3. Browse the generated flashcards.
4. Flip flashcards to view answers.
5. Click **Start Quiz**.
6. Answer all quiz questions.
7. Submit the quiz.
8. Review:
   - Final score
   - Correct answers
   - Incorrect answers
9. Retake only the incorrectly answered questions if desired.

---

# 📌 API Endpoint

### Generate Study Material

**POST**

```
/api/generate
```

### Request

```json
{
  "notes": "Your study notes here..."
}
```

### Response

```json
{
  "success": true,
  "data": {
    "flashcards": [
      {
        "question": "What is AI?",
        "answer": "Artificial Intelligence"
      }
    ],
    "quiz": [
      {
        "question": "What does AI stand for?",
        "options": [
          "Artificial Intelligence",
          "Automatic Internet",
          "Advanced Interface",
          "None"
        ],
        "correctAnswer": "Artificial Intelligence"
      }
    ]
  }
}
```

---

# 🤖 AI Usage Note

This project uses the **Google Gemini API** to generate educational content.

The AI is responsible for:

- Generating flashcards from study notes
- Creating multiple-choice quiz questions
- Producing plausible distractor options for MCQs

Prompt engineering was used to ensure the API returns structured JSON containing both flashcards and quiz data in a single response. The backend validates the AI response before sending it to the frontend.

---

# ⚠️ Limitations

- AI-generated content may occasionally contain factual inaccuracies.
- Generated quiz questions depend on the quality and completeness of the provided notes.
- Free Gemini API quotas and rate limits may temporarily prevent content generation.
- Internet connectivity is required to access the Gemini API.
- AI responses may vary for the same input due to the probabilistic nature of language models.

---

# ⏱️ Time Spent

Approximate development time:

| Task | Time |
|------|------:|
| Project setup | 1 hour |
| Frontend UI | 3 hours |
| Backend API | 2 hours |
| Gemini integration | 3 hours |
| Flashcard implementation | 2 hours |
| Quiz implementation | 3 hours |
| Testing & debugging | 4 hours |
| Documentation | 1 hour |

**Total:** **19 hours**

---

# 📦 Dependencies

## Frontend

- React
- Tailwind CSS
- Axios

## Backend

- Express
- @google/genai
- dotenv
- cors

---

# 👩‍💻 Author

**Mansi Yadav**

B.Tech – Artificial Intelligence & Data Science
