function Flashcard({ question, answer }) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h3 className="text-lg font-bold text-slate-800">
        {question}
      </h3>

      <p className="mt-3 text-slate-600">
        {answer}
      </p>
    </div>
  );
}

export default Flashcard;