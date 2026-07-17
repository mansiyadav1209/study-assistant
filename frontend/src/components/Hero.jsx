import { FaBookOpen } from "react-icons/fa";

function Hero() {
  return (
    <div className="text-center mb-10">

      <div className="flex justify-center mb-5">
        <div className="bg-indigo-600 p-5 rounded-full shadow-lg">
          <FaBookOpen className="text-white text-3xl" />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-slate-800">
        Study Assistant
      </h1>

      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Turn your study notes into interactive AI-powered flashcards.
        Learn faster, revise smarter, and practice difficult concepts.
      </p>

    </div>
  );
}

export default Hero;