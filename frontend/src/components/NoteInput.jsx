import { useState } from "react";
import GenerateButton from "./GenerateButton";
import api from "../services/api";

function NoteInput() {

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX = 5000;

 const handleGenerate = async () => {

    if (!notes.trim()) {

        alert("Please enter some notes.");
        return;

    }

    try {

        setLoading(true);

        const response = await api.post("/generate", {

            notes

        });

        console.log(response.data);

    }

    catch(error){

        console.error(error);

        alert("Something went wrong.");

    }

    finally{

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
        <GenerateButton loading={loading} onClick={handleGenerate}/>
      </div>

    </div>
  );
}

export default NoteInput;