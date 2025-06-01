import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DigitalMihrab() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("gratitude");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [showPrayers, setShowPrayers] = useState(false);
  const [prayers, setPrayers] = useState([]);

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

  async function handleViewPrayers() {
    const { data, error } = await supabase.from("submissions").select("text, category").order("id", { ascending: false });
    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setPrayers(data);
      setShowPrayers(true);
    }
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
    },
    {
      key: "2:286",
      en: "Allah does not burden a soul beyond that it can bear.",
      ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      fa: "خدا هیچ کس را جز به اندازه توانش تکلیف نمی‌کند",
      tr: "Allah, hiç kimseye gücünün yeteceğinden fazlasını yüklemez.",
      ur: "الله کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا",
      ms: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya",
      id: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya",
      bn: "আল্লাহ কাউকে তার সাধ্যাতীত ভার দেন না।",
    },
    {
      key: "94:6",
      en: "Indeed, with hardship [will be] ease.",
      ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      fa: "همانا با سختی آسانی است",
      tr: "Şüphesiz zorlukla beraber bir kolaylık vardır.",
      ur: "بے شک دشواری کے ساتھ آسانی ہے",
      ms: "Sesungguhnya sesudah kesulitan ada kemudahan",
      id: "Sesungguhnya sesudah kesulitan ada kemudahan",
      bn: "নিশ্চয়ই কষ্টের সাথে স্বস্তি রয়েছে।",
    },
    {
      key: "3:139",
      en: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.",
      ar: "فَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
      fa: "پس سست نشوید و غمگین نگردید که اگر مؤمن باشید، شما برترید",
      tr: "Gevşemeyin, üzülmeyin! Eğer mümin iseniz, üstün olan sizsiniz.",
      ur: "پس نہ کمزور ہو اور نہ غم کرو، تم ہی غالب آؤ گے اگر تم مؤمن ہو",
      ms: "Maka janganlah kamu menjadi lemah dan janganlah bersedih hati, padahal kamulah orang-orang yang paling tinggi (darjatnya) jika kamu orang yang beriman",
      id: "Janganlah kamu bersikap lemah, dan janganlah kamu bersedih hati, padahal kamulah orang-orang yang paling tinggi (derajatnya), jika kamu orang beriman",
      bn: "তোমরা হতোদ্যম হয়ো না এবং দুঃখ করো না। যদি তোমরা মুমিন হও, তবে তোমরাই শ্রেষ্ঠ।",
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
        <>
          <motion.div
            className={`relative w-48 h-48 flex items-center justify-center`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div
              className={`absolute w-48 h-48 rounded-full ${categoryColors[category]} animate-ping`}
            ></div>

            <div
              className={`w-32 h-32 rounded-full bg-green-700 shadow-lg flex items-center justify-center text-black text-sm font-semibold`}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-black text-center px-2"
              >
                🌙 Your prayer has been released
              </motion.span>
            </div>
          </motion.div>

          <button
            onClick={handleViewPrayers}
            className="mt-4 underline text-sm text-green-800 hover:text-green-600 transition"
          >
            View prayers
          </button>
        </>
      )}

      {showPrayers && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Whispers in the Mihrab</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {prayers.map((p, i) => (
              <li key={i} className="bg-green-50 border border-green-200 p-2 rounded">
                <p className="text-sm italic">{p.text}</p>
                <p className="text-xs text-right text-gray-500">— {p.category}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 max-w-xl text-center text-sm text-black italic space-y-2">
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
        <p className="text-xs text-black">— Surah {dailyQuote.key}</p>
      </div>
    </div>
  );
}
