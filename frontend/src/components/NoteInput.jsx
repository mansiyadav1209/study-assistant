import { useState } from "react";
import GenerateButton from "./GenerateButton";
import Flashcard from "./Flashcard";
import api from "../services/api";

function NoteInput() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
      setCurrentCard(0);
      setFlipped(false);

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
            <>
                <Flashcard
                question={flashcards[currentCard].question}
                answer={flashcards[currentCard].answer}
                flipped={flipped}
                setFlipped={setFlipped}
                />

                <div className="flex justify-between mt-6">

                <button
                    onClick={() => {
                        setCurrentCard((prev) => Math.max(prev - 1, 0));
                        setFlipped(false);
                    }}
                    disabled={currentCard === 0}
                    className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                    Previous
                    </button>

                <span className="font-semibold">
                    {currentCard + 1} / {flashcards.length}
                </span>

                 <button
                    onClick={() => {
                        setCurrentCard((prev) =>
                        Math.min(prev + 1, flashcards.length - 1)
                        );
                        setFlipped(false);
                    }}
                    disabled={currentCard === flashcards.length - 1}
                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                    >
                    Next
                </button>

                </div>
            </>
)}

    </div>
  );
}

export default NoteInput;