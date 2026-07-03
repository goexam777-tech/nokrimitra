"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { mcqSections, type McqQuestion, type McqSection } from "@/lib/mcqData";
import styles from "./mcq.module.css";

/* ────── tiny inline icons ────── */
function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function XCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
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
  const [activeSection, setActiveSection] = useState<string>("gk");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentSection = mcqSections.find((s) => s.id === activeSection)!;
  const allQuestions = mcqSections.flatMap((s) => s.questions);
  const totalQuestions = allQuestions.length;
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = allQuestions.filter((q) => answers[q.id] === q.answer).length;

  const sectionStats = (sec: McqSection) => {
    const answered = sec.questions.filter((q) => q.id in answers).length;
    const correct = sec.questions.filter((q) => answers[q.id] === q.answer).length;
    return { answered, correct, total: sec.questions.length };
  };

  const handleOptionClick = (questionId: number, optionIdx: number) => {
    if (revealed[questionId]) return; // already answered
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setAnswers({});
    setRevealed({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowResult = () => {
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressPct = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  /* ────────── RESULT SCREEN ────────── */
  if (showResult) {
    const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    let grade = "";
    let gradeColor = "";
    if (pct >= 80) { grade = "ઉત્તમ! 🏆"; gradeColor = "#0b6b3a"; }
    else if (pct >= 60) { grade = "સારું! 👍"; gradeColor = "#1a73e8"; }
    else if (pct >= 40) { grade = "સુધારો જરૂરી 📖"; gradeColor = "#e67e22"; }
    else { grade = "વધુ મહેનત કરો 💪"; gradeColor = "#c0392b"; }

    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className="logo">
              <span className="logo-mark">NM</span>
              <span className="logo-name">
                <span className="logo-word">Nokri<span className="logo-accent">Mitra</span><span className="logo-tld">.in</span></span>
                <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
              </span>
            </Link>
            <nav className={styles.headerNav}>
              <Link href="/" className={styles.navBtn}><HomeIcon /> <span>હોમ</span></Link>
              <Link href="/buy" className={styles.navBtnAccent}><CartIcon /> <span>ખરીદો ₹120</span></Link>
            </nav>
          </div>
        </header>

        <main className={styles.resultMain}>
          <div className={styles.resultCard}>
            <div className={styles.resultCircle} style={{ borderColor: gradeColor }}>
              <span className={styles.resultPct} style={{ color: gradeColor }}>{pct}%</span>
            </div>
            <h1 className={styles.resultGrade} style={{ color: gradeColor }}>{grade}</h1>
            <p className={styles.resultSummary}>
              તમે <strong>{totalQuestions}</strong> માંથી <strong style={{ color: gradeColor }}>{totalCorrect}</strong> સાચા જવાબ આપ્યા.
            </p>

            <div className={styles.resultSections}>
              {mcqSections.map((sec) => {
                const st = sectionStats(sec);
                return (
                  <div key={sec.id} className={styles.resultSecRow}>
                    <span className={styles.resultSecIcon}>{sec.icon}</span>
                    <span className={styles.resultSecName}>{sec.shortTitle}</span>
                    <span className={styles.resultSecScore}>{st.correct}/{st.total}</span>
                    <div className={styles.resultSecBar}>
                      <div className={styles.resultSecFill} style={{ width: `${(st.correct / st.total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.resultActions}>
              <button onClick={handleReset} className={styles.resetBtn}><RefreshIcon /> ફરી પ્રયાસ કરો</button>
              <Link href="/buy" className={styles.buyBtnResult}><CartIcon /> સંપૂર્ણ PDF ખરીદો ₹120</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ────────── QUIZ SCREEN ────────── */
  return (
    <div className={styles.page}>
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
          <nav className={styles.headerNav}>
            <Link href="/" className={styles.navBtn}><HomeIcon /> <span>હોમ</span></Link>
            <Link href="/buy" className={styles.navBtnAccent}><CartIcon /> <span>ખરીદો ₹120</span></Link>
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>GSRTC કંડક્ટર MCQ પ્રેક્ટિસ ટેસ્ટ</h1>
        <p className={styles.heroSub}>100 પ્રશ્નો · 8 વિષયો · અભ્યાસક્રમ પ્રમાણે</p>
      </section>

      {/* PROGRESS BAR */}
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
        </div>
        <div className={styles.progressText}>
          <span>{totalAnswered}/{totalQuestions} પ્રશ્નો</span>
          <span>{totalCorrect} સાચા</span>
        </div>
      </div>

      {/* SECTION MENU */}
      <nav className={styles.sectionNav}>
        {mcqSections.map((sec) => {
          const st = sectionStats(sec);
          const isActive = sec.id === activeSection;
          return (
            <button
              key={sec.id}
              className={`${styles.sectionBtn} ${isActive ? styles.sectionBtnActive : ""}`}
              onClick={() => handleSectionClick(sec.id)}
            >
              <span className={styles.sectionIcon}>{sec.icon}</span>
              <span className={styles.sectionLabel}>{sec.shortTitle} ({st.total})</span>
              {st.answered > 0 && (
                <span className={styles.sectionBadge}>{st.correct}/{st.answered}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* QUESTIONS */}
      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>
          {currentSection.icon} {currentSection.title}
          <span className={styles.sectionCount}>({currentSection.questions.length} પ્રશ્નો)</span>
        </h2>

        <div className={styles.questionList}>
          {currentSection.questions.map((q, qi) => {
            const userAnswer = answers[q.id];
            const isRevealed = revealed[q.id];
            const isCorrect = userAnswer === q.answer;

            return (
              <div
                key={q.id}
                ref={(el) => { questionRefs.current[`q-${q.id}`] = el; }}
                className={`${styles.questionCard} ${isRevealed ? (isCorrect ? styles.cardCorrect : styles.cardWrong) : ""}`}
              >
                <div className={styles.questionHeader}>
                  <span className={styles.questionNum}>પ્ર. {q.id}</span>
                  {isRevealed && (
                    <span className={isCorrect ? styles.tagCorrect : styles.tagWrong}>
                      {isCorrect ? <><CheckCircleIcon /> સાચો</> : <><XCircleIcon /> ખોટો</>}
                    </span>
                  )}
                </div>
                <p className={styles.questionText}>{q.question}</p>
                <div className={styles.optionsGrid}>
                  {q.options.map((opt, oi) => {
                    let optClass = styles.optionBtn;
                    if (isRevealed) {
                      if (oi === q.answer) optClass += ` ${styles.optCorrect}`;
                      else if (oi === userAnswer && oi !== q.answer) optClass += ` ${styles.optWrong}`;
                      else optClass += ` ${styles.optDisabled}`;
                    }
                    return (
                      <button
                        key={oi}
                        className={optClass}
                        onClick={() => handleOptionClick(q.id, oi)}
                        disabled={isRevealed}
                      >
                        <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                        <span className={styles.optText}>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION NAVIGATION */}
        <div className={styles.sectionNavBottom}>
          {mcqSections.map((sec, idx) => {
            if (sec.id === activeSection) {
              const prevSec = mcqSections[idx - 1];
              const nextSec = mcqSections[idx + 1];
              return (
                <div key={sec.id} className={styles.navBottomRow}>
                  {prevSec ? (
                    <button className={styles.navPrev} onClick={() => handleSectionClick(prevSec.id)}>
                      ← {prevSec.icon} {prevSec.shortTitle}
                    </button>
                  ) : <span />}
                  {nextSec ? (
                    <button className={styles.navNext} onClick={() => handleSectionClick(nextSec.id)}>
                      {nextSec.icon} {nextSec.shortTitle} →
                    </button>
                  ) : (
                    <button className={styles.navSubmit} onClick={handleShowResult}>
                      📊 પરિણામ જુઓ
                    </button>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </main>

      {/* FLOATING RESULT BAR */}
      {totalAnswered >= 10 && (
        <div className={styles.floatingBar}>
          <div className={styles.floatingInner}>
            <span>{totalAnswered}/{totalQuestions} પૂર્ણ · {totalCorrect} સાચા</span>
            <button onClick={handleShowResult} className={styles.floatingBtn}>📊 પરિણામ જુઓ</button>
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
