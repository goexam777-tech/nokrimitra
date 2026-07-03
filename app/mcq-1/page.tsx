"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { mcqSections, type McqQuestion, type McqSection } from "@/lib/mcqData";
import styles from "./mcq.module.css";

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

export default function McqPage() {
  const allQuestions = mcqSections.flatMap((s: McqSection) => s.questions);
  const totalQuestions = allQuestions.length;

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = allQuestions.filter((q: McqQuestion) => answers[q.id] === q.answer).length;

  const handleOptionClick = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowAnswers(true);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowAnswers(false);
    setSubmitted(false);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  let grade = "";
  let gradeEmoji = "";
  if (pct >= 80) { grade = "ઉત્તમ!"; gradeEmoji = "🏆"; }
  else if (pct >= 60) { grade = "સારું!"; gradeEmoji = "👍"; }
  else if (pct >= 40) { grade = "સુધારો જરૂરી"; gradeEmoji = "📖"; }
  else { grade = "વધુ મહેનત કરો"; gradeEmoji = "💪"; }

  const sectionStats = (sectionId: string) => {
    const sec = mcqSections.find((s: McqSection) => s.id === sectionId)!;
    const correct = sec.questions.filter((q: McqQuestion) => answers[q.id] === q.answer).length;
    return { correct, total: sec.questions.length };
  };

  return (
    <div className={styles.page} ref={topRef}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className="logo">
            <span className="logo-mark">NM</span>
            <span className="logo-name">
              <span className="logo-word">Nokri<span className="logo-accent">Mitra</span><span className="logo-tld">.in</span></span>
              <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
            </span>
          </Link>
        </div>
      </header>

      {/* PAPER TITLE */}
      <div className={styles.paperTitle}>
        <div className={styles.paperTitleInner}>
          <h1>GSRTC કંડક્ટર ભરતી પરીક્ષા</h1>
          <h2>MCQ પ્રેક્ટિસ ટેસ્ટ પેપર</h2>
          <div className={styles.paperMeta}>
            <span>📝 કુલ પ્રશ્નો: <strong>100</strong></span>
            <span>📚 વિષયો: <strong>8</strong></span>
            <span>⏱️ સમય: <strong>મર્યાદા નથી</strong></span>
          </div>
        </div>
      </div>

      {/* TOP CONTROLS */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <button
            className={`${styles.answerToggle} ${showAnswers ? styles.answerToggleOn : ""}`}
            onClick={() => setShowAnswers(!showAnswers)}
          >
            {showAnswers ? <><EyeOffIcon /> જવાબો છુપાવો</> : <><EyeIcon /> જવાબો જુઓ</>}
          </button>

          {submitted && (
            <div className={styles.resultBadge}>
              <span className={styles.resultEmoji}>{gradeEmoji}</span>
              <span>{grade} — {totalCorrect}/{totalQuestions} ({pct}%)</span>
            </div>
          )}

          {(submitted || totalAnswered > 0) && (
            <button className={styles.resetBtn} onClick={handleReset}>
              <RefreshIcon /> ફરીથી શરૂ કરો
            </button>
          )}
        </div>
      </div>

      {/* RESULT CARD (after submit) */}
      {submitted && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div className={styles.resultCircle}>
              <span className={styles.resultPct}>{pct}%</span>
            </div>
            <div className={styles.resultInfo}>
              <h3>{gradeEmoji} {grade}</h3>
              <p><strong>{totalCorrect}</strong> સાચા · <strong>{totalQuestions - totalCorrect}</strong> ખોટા · કુલ <strong>{totalQuestions}</strong></p>
            </div>
          </div>
          <div className={styles.resultGrid}>
            {mcqSections.map((sec: McqSection) => {
              const st = sectionStats(sec.id);
              return (
                <div key={sec.id} className={styles.resultSecItem}>
                  <span className={styles.resultSecIcon}>{sec.icon}</span>
                  <span className={styles.resultSecName}>{sec.shortTitle}</span>
                  <div className={styles.resultSecBar}>
                    <div className={styles.resultSecFill} style={{ width: `${(st.correct / st.total) * 100}%` }} />
                  </div>
                  <span className={styles.resultSecScore}>{st.correct}/{st.total}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUESTIONS — ALL SECTIONS ON ONE PAGE */}
      <main className={styles.paper}>
        {mcqSections.map((sec: McqSection, si: number) => (
          <section key={sec.id} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>{sec.icon}</span>
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
              <span className={styles.sectionCount}>{sec.questions.length} પ્રશ્નો</span>
              {submitted && (
                <span className={styles.sectionScore}>
                  {sectionStats(sec.id).correct}/{sec.questions.length}
                </span>
              )}
            </div>

            {sec.questions.map((q: McqQuestion, qi: number) => {
              const userAnswer = answers[q.id];
              const hasAnswered = q.id in answers;
              const isCorrect = userAnswer === q.answer;
              const revealAnswer = showAnswers || submitted;

              return (
                <div
                  key={q.id}
                  className={`${styles.question} ${revealAnswer && hasAnswered ? (isCorrect ? styles.qCorrect : styles.qWrong) : ""}`}
                >
                  <div className={styles.qRow}>
                    <span className={styles.qNum}>{q.id}.</span>
                    <p className={styles.qText}>{q.question}</p>
                  </div>
                  <div className={styles.options}>
                    {q.options.map((opt: string, oi: number) => {
                      const letter = String.fromCharCode(65 + oi);
                      const isSelected = userAnswer === oi;
                      const isCorrectOpt = oi === q.answer;

                      let optClass = styles.opt;
                      if (isSelected && !revealAnswer) optClass += ` ${styles.optSelected}`;
                      if (revealAnswer && isCorrectOpt) optClass += ` ${styles.optCorrect}`;
                      if (revealAnswer && isSelected && !isCorrectOpt) optClass += ` ${styles.optWrong}`;

                      return (
                        <button
                          key={oi}
                          className={optClass}
                          onClick={() => handleOptionClick(q.id, oi)}
                          disabled={submitted}
                        >
                          <span className={styles.optLetter}>{letter}</span>
                          <span className={styles.optText}>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        ))}

        {/* SUBMIT BUTTON */}
        {!submitted && (
          <div className={styles.submitArea}>
            <p className={styles.submitInfo}>
              {totalAnswered}/{totalQuestions} પ્રશ્નોના જવાબ આપ્યા
            </p>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              📊 પેપર સબમિટ કરો
            </button>
            {totalAnswered < totalQuestions && (
              <p className={styles.submitNote}>
                ⚠️ {totalQuestions - totalAnswered} પ્રશ્નોના જવાબ બાકી છે
              </p>
            )}
          </div>
        )}
      </main>

      {/* FLOATING BOTTOM BAR */}
      {!submitted && totalAnswered > 0 && (
        <div className={styles.floatingBar}>
          <div className={styles.floatingInner}>
            <span className={styles.floatingCount}>{totalAnswered}/{totalQuestions} પૂર્ણ</span>
            <button onClick={handleSubmit} className={styles.floatingSubmit}>
              📊 સબમિટ કરો
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} NokriMitra.in — All rights reserved.</p>
      </footer>
    </div>
  );
}
