import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function DigitalMihrab() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("gratitude");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("submissions").insert({ text, category });
    if (error) {
      console.error("Submission error:", error.message);
      return;
    }
    setSubmitted(true);
    setText("");
    setTimeout(() => setSubmitted(false), 4000);
  }

  const categoryColors = {
    gratitude: "bg-yellow-300/20",
    healing: "bg-green-300/20",
    hope: "bg-blue-300/20",
    grief: "bg-gray-400/20",
    repentance: "bg-purple-300/20",
    forgiveness: "bg-pink-300/20",
    guidance: "bg-indigo-300/20",
    love: "bg-red-300/20",
    fear: "bg-black/30",
    reflection: "bg-white/20",
  };

  const dailyQuotes = [
    {
      key: "13:28",
      en: "Indeed, in the remembrance of Allah do hearts find rest.",
      ar: "إِنَّ فِي ذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      fa: "در یاد خدا دل‌ها آرام می‌گیرند",
      tr: "Allah’ı anmakla kalpler huzur bulur",
      ur: "الله کے ذکر میں دلوں کو سکون ملتا ہے",
      ms: "Sesungguhnya dengan mengingati Allah hati menjadi tenteram",
      id: "Sesungguhnya dengan mengingat Allah hati menjadi tenang",
      bn: "আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে",
    }
  ];

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const dailyQuote = dailyQuotes[dayOfYear % dailyQuotes.length];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-white to-black text-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-serif mb-4 text-center">The Digital Mihrab</h1>
      <p className="text-center max-w-xl mb-8 text-gray-700">
        A sacred, silent space for anonymous intentions, prayers, and reflections.
      </p>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl space-y-4"
        >
          <textarea
            className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-600 border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            placeholder="What do you want to release into the Mihrab?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select
            className="w-full p-2 rounded bg-white text-black border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="gratitude">Gratitude</option>
            <option value="healing">Healing</option>
            <option value="hope">Hope</option>
            <option value="grief">Grief</option>
            <option value="repentance">Repentance</option>
            <option value="forgiveness">Forgiveness</option>
            <option value="guidance">Guidance</option>
            <option value="love">Love</option>
            <option value="fear">Fear</option>
            <option value="reflection">Reflection</option>
          </select>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 transition p-3 w-full rounded-xl shadow"
          >
            Send to the Mihrab
          </button>
        </form>
      ) : (
        <motion.div
          className={\`w-48 h-48 rounded-full backdrop-blur-sm flex items-center justify-center text-lg text-white text-center \${categoryColors[category]}\`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          🌙 Your prayer has been released.
        </motion.div>
      )}

      <div className="mt-10 max-w-xl text-center text-sm text-green-900 italic space-y-2">
        <select
          className="mb-2 p-2 rounded bg-white text-black border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fa">Persian</option>
          <option value="tr">Turkish</option>
          <option value="ur">Urdu</option>
          <option value="ms">Malay</option>
          <option value="id">Indonesian</option>
          <option value="bn">Bengali</option>
        </select>
        <p>{dailyQuote[language]}</p>
        <p className="text-xs text-gray-500">— Surah {dailyQuote.key}</p>
      </div>
    </div>
  );
}
