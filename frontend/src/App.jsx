import Hero from "./components/Hero";
import NoteInput from "./components/NoteInput";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <Hero />
        <NoteInput />
      </div>
    </div>
  );
}

export default App;

