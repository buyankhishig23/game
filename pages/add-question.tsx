import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

const CATEGORIES = [
  { value: "normal", label: "Энгийн" },
  { value: "party", label: "Үдэшлэг" },
  { value: "dirty", label: "+21" },
  { value: "dares", label: "Хий эсвэл Уу" },
  { value: "mix", label: "Холимог" },
];

const AddQuestion: NextPage = () => {
  const [category, setCategory] = useState("normal");
  const [question, setQuestion] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    const key = `custom-${category}`;
    const prev: string[] = JSON.parse(localStorage.getItem(key) || "[]");

    // Avoid duplicate
    if (!prev.includes(trimmed)) {
      const updated = [...prev, trimmed];
      localStorage.setItem(key, JSON.stringify(updated));
      setSaved(true);
      setQuestion("");
      setTimeout(() => setSaved(false), 2000);
    } else {
      setSaved(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 relative">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W9M7TVKHRZ" />
      <Head>
        <title>Асуулт нэмэх</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition"
        >
          ⬅ Нүүр
        </Link>
      </div>

      <div className="flex flex-grow justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
            📝 Асуулт нэмэх
          </h1>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Төрөл сонгох</label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-800"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Асуулт</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-800 placeholder-gray-400"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Шинэ асуултаа бичнэ үү..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:opacity-90 transition"
          >
            ➕ Нэмэх
          </button>

          {saved && <div className="text-green-600 font-semibold text-center">✅ Амжилттай хадгалагдлаа!</div>}
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
