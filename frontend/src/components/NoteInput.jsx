import { useState } from "react";
import GenerateButton from "./GenerateButton";
import Flashcard from "./Flashcard";
import api from "../services/api";

function NoteInput() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const MAX = 5000;

  const handleGenerate = async () => {
    if (!notes.trim()) {
      alert("Please enter some notes.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/generate", {
        notes,
      });

      console.log(response.data);

      // Store the flashcards returned by the backend
      setFlashcards(response.data.data);

    } catch (error) {
      console.error("Full Error:", error);

      if (error.response) {
        console.log("Response:", error.response.data);
        console.log("Status:", error.response.status);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error:", error.message);
      }

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <label className="font-semibold text-slate-700">
        Paste your study notes
      </label>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        maxLength={MAX}
        rows={12}
        placeholder="Paste your notes here..."
        className="w-full mt-3 p-5 rounded-xl border border-slate-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        resize-none"
      />

      <div className="flex justify-end mt-2">
        <span
          className={`text-sm ${
            notes.length > 4500
              ? "text-red-500"
              : "text-slate-500"
          }`}
        >
          {notes.length} / {MAX}
        </span>
      </div>

      <div className="mt-6">
        <GenerateButton
          loading={loading}
          onClick={handleGenerate}
        />
      </div>

      {/* Render Flashcards */}
      {flashcards.length > 0 && (
        <div className="mt-8 space-y-4">
          {flashcards.map((card, index) => (
            <Flashcard
              key={index}
              question={card.question}
              answer={card.answer}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default NoteInput;