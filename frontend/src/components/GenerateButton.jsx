function GenerateButton({ loading, onClick}) {
  return (
    <button
       onClick={onClick}
      disabled={loading}
      className={`w-full py-4 rounded-xl font-semibold text-white transition

      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
      `}
    >
      {loading ? "Generating..." : "Generate Flashcards"}
    </button>
  );
}

export default GenerateButton;