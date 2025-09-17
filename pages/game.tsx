import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import dares from '../bank/dares.json';
import dirty from '../bank/dirty.json';
import normal from '../bank/normal.json';
import party from '../bank/party.json';
import ThemeToggle from '../components/ThemeToggle';

const Game: NextPage = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [question, setQuestion] = useState("");

  const modeMap: Record<string, string> = {
    "party": "Үдэшлэг",
    "dirty": "+21",
    "dares": "Хий эсвэл Уу",
    "mixed": "Холимог",
    "normal": "Энгийн"
  };

  let mode = "Энгийн";
  if (router.query.mode && typeof router.query.mode === "string") {
    const queryMode = router.query.mode.toLowerCase();
    mode = modeMap[queryMode] || "Энгийн";
  }

  let gradient = '';
  let prearr: string[] = [];

  switch (mode) {
    case "Үдэшлэг":
      gradient = 'bg-gradient-to-r from-[#FFC300] to-[#FF8900]';
      prearr = [...party];
      break;
    case "+21":
      gradient = 'bg-gradient-to-r from-[#FF006D] to-[#FC0023]';
      prearr = [...dirty];
      break;
    case "Хий эсвэл Уу":
      gradient = 'bg-gradient-to-r from-[#EA00C3] to-[#BE00FF]';
      prearr = [...dares];
      break;
    case "Холимог":
      gradient = 'bg-black';
      prearr = [...normal, ...party, ...dirty, ...dares];
      break;
    default:
      gradient = 'bg-gradient-to-r from-[#00C5FF] to-[#009BFF]';
      prearr = [...normal];
  }

  useEffect(() => {
    if (!router.isReady) return;

    const ind = parseInt(String(router.query.q)) || 0;
    const offset = parseInt(String(router.query.offset)) || 0;

    let newstart = ind < prearr.length ? ind : 0;
    if (!isNaN(offset)) {
      newstart = newstart - offset;
      if (newstart < 0) newstart = prearr.length + newstart;
    }

    setIndex(newstart);
    setQuestions(prearr);
    setQuestion(prearr[newstart]);
    document.getElementById('maindiv')?.focus();
  }, [router.isReady]);

  // 🎉 Confetti celebration (dynamic import)
  const celebrate = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  const nextQuestion = () => {
    const nextIndex = (index + 1) % questions.length;
    setIndex(nextIndex);
    setQuestion(questions[nextIndex]);

    if (nextIndex === questions.length - 1) {
      celebrate();
    }
  };

  const prevQuestion = () => {
    const prevIndex = (index - 1 + questions.length) % questions.length;
    setIndex(prevIndex);
    setQuestion(questions[prevIndex]);
  };

  const handleKeyDown = (e: any) => {
    if (e.code === 'Space' || e.code === 'ArrowRight') nextQuestion();
    else if (e.code === 'ArrowLeft') prevQuestion();
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextQuestion,
    onSwipedRight: prevQuestion
  });

  const getYear = () => new Date().getFullYear();

  return (
    <div className="h-full" tabIndex={0} id='maindiv' onKeyDown={handleKeyDown}>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W9M7TVKHRZ"/>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W9M7TVKHRZ');
          `,
        }}
      />
      <Head>
        <title>Хариул эсвэл Уу</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-4 right-4">
        <ThemeToggle /> 
      </div>

      <div className="fixmobilevh flex flex-col">
        <Link href='/'>
          <div className="cursor-pointer">
            <div className="select-none text-4xl text-header font-semibold mx-auto text-center pt-4 pb-2">
              Хариул <span className="text-xl">эсвэл</span> Уу
            </div>
            <div className={[gradient, "select-none rounded-lg text-center text-white font-bold max-w-fit px-4 m-auto"].join(" ")}>
              {mode.toUpperCase().split('').join(' ')}
            </div>
          </div>
        </Link>

        <div className="flex flex-grow p-2 mx-auto mt-2 justify-center w-screen" {...handlers} style={{ touchAction: 'none' }}>
          <div
            className="select-none flex items-center text-5xl text-white font-semibold bg-black rounded-xl shadow-xl p-4 max-w-3xl w-full justify-center text-center"
            onClick={nextQuestion}
          >
            {question}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={prevQuestion}
            className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
          >
            ⬅ Өмнөх
          </button>
          <button
            onClick={nextQuestion}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            Дараах ➡
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-3xl mx-auto mt-4">
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-400 mt-1">
            {index + 1} / {questions.length}
          </div>
        </div>

        <footer className="flex flex-col text-center">
          <div className="select-none text-gray-700 p-2 mb-2 text-opacity-60">
            © {getYear()} Buyanaa.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Game;
