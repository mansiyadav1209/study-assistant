function Flashcard({
  question,
  answer,
  flipped,
  setFlipped,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-8 min-h-[260px] flex flex-col justify-between">

      <div>
        <h3 className="text-xl font-bold text-indigo-700 mb-4">
          Question
        </h3>

        <p className="text-lg text-slate-700">
          {question}
        </p>

        {flipped && (
          <>
            <hr className="my-6" />

            <h3 className="text-xl font-bold text-green-700 mb-3">
              Answer
            </h3>

            <p className="text-lg text-slate-700">
              {answer}
            </p>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setFlipped(!flipped)}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {flipped ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

    </div>
  );
}

export default Flashcard;