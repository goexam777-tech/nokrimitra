"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./socialProof.module.css";

interface SocialProofItem {
  id: number;
  name: string;
  role: string;
  location: string;
  action: string;
  timeAgo: string;
  initials: string;
  avatarGradient: string;
}

const NOTIFICATIONS: SocialProofItem[] = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "MBBS Intern",
    location: "Civil Hospital, Ahmedabad",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "2m ago",
    initials: "RV",
    avatarGradient: "linear-gradient(135deg, #059669, #10b981)",
  },
  {
    id: 2,
    name: "Dr. Sneha Sharma",
    role: "Junior Resident",
    location: "New Civil Hospital, Surat",
    action: "Downloaded OPD Mastery E-Book",
    timeAgo: "4m ago",
    initials: "SS",
    avatarGradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
  },
  {
    id: 3,
    name: "Amit K. Patel",
    role: "BAMS Final Year",
    location: "Vadodara",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "6m ago",
    initials: "AP",
    avatarGradient: "linear-gradient(135deg, #d97706, #f59e0b)",
  },
  {
    id: 4,
    name: "Dr. Mohit Joshi",
    role: "Resident Medical Officer",
    location: "Rajkot",
    action: "Downloaded OPD Mastery E-Book",
    timeAgo: "9m ago",
    initials: "MJ",
    avatarGradient: "linear-gradient(135deg, #0284c7, #06b6d4)",
  },
  {
    id: 5,
    name: "Pooja Deshmukh",
    role: "Medical Officer",
    location: "Gandhinagar",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "11m ago",
    initials: "PD",
    avatarGradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
  },
  {
    id: 6,
    name: "Dr. Arvind Nair",
    role: "General Practitioner",
    location: "Jamnagar",
    action: "Downloaded OPD Clinical Guide",
    timeAgo: "14m ago",
    initials: "AN",
    avatarGradient: "linear-gradient(135deg, #0d9488, #14b8a6)",
  },
  {
    id: 7,
    name: "Harshit Vyas",
    role: "BHMS Intern",
    location: "Bhavnagar",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "17m ago",
    initials: "HV",
    avatarGradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
  },
  {
    id: 8,
    name: "Dr. Neha Choudhary",
    role: "Casualty Medical Officer",
    location: "Anand",
    action: "Downloaded OPD Mastery E-Book",
    timeAgo: "21m ago",
    initials: "NC",
    avatarGradient: "linear-gradient(135deg, #e11d48, #f43f5e)",
  },
  {
    id: 9,
    name: "Siddharth Shah",
    role: "Clinical Intern",
    location: "Mehsana",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "24m ago",
    initials: "SS",
    avatarGradient: "linear-gradient(135deg, #0891b2, #22d3ee)",
  },
  {
    id: 10,
    name: "Dr. Pratik Parmar",
    role: "Junior Doctor",
    location: "Bharuch",
    action: "Downloaded OPD Mastery E-Book",
    timeAgo: "28m ago",
    initials: "PP",
    avatarGradient: "linear-gradient(135deg, #16a34a, #4ade80)",
  },
  {
    id: 11,
    name: "Manoj Solanki",
    role: "Community Health Officer",
    location: "Junagadh",
    action: "Purchased OPD Mastery + Emergency Handbook",
    timeAgo: "32m ago",
    initials: "MS",
    avatarGradient: "linear-gradient(135deg, #c026d3, #d946ef)",
  },
];

export default function LiveSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isHoveredRef = useRef(false);

  // Pick a random starting notification on mount for each user
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * NOTIFICATIONS.length);
    setCurrentIndex(randomIndex);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;

    // Show first popup after initial 3.5 seconds
    showTimeout = setTimeout(() => {
      setIsVisible(true);
      setIsExiting(false);

      scheduleHide();
    }, 3500);

    const scheduleHide = () => {
      hideTimeout = setTimeout(() => {
        if (isHoveredRef.current) {
          // If user is hovering, re-check in 1.5s
          scheduleHide();
          return;
        }
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          setIsExiting(false);

          // Wait 14 to 16 seconds between two popups
          const interval = Math.floor(Math.random() * 2000) + 14000;
          nextTimeout = setTimeout(() => {
            // Pick a random next notification different from the previous one
            setCurrentIndex((prev) => {
              let next = Math.floor(Math.random() * NOTIFICATIONS.length);
              if (next === prev) {
                next = (prev + 1) % NOTIFICATIONS.length;
              }
              return next;
            });
            setIsVisible(true);
            scheduleHide();
          }, interval);
        }, 350);
      }, 5500);
    };

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = NOTIFICATIONS[currentIndex];

  return (
    <div
      className={styles.toastContainer}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      role="status"
      aria-live="polite"
    >
      <div className={`${styles.toast} ${isExiting ? styles.toastExiting : ""}`}>
        <div
          className={styles.avatar}
          style={{ background: current.avatarGradient }}
        >
          {current.initials}
        </div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <span className={styles.name}>{current.name}</span>
            <span className={styles.verifiedBadge}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Verified
            </span>
            <span className={styles.timeAgo}>{current.timeAgo}</span>
          </div>

          <div className={styles.roleLoc}>
            {current.role} · {current.location}
          </div>

          <div className={styles.actionRow}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{current.action}</span>
          </div>
        </div>

        <button
          className={styles.closeBtn}
          onClick={() => setIsDismissed(true)}
          aria-label="Close notification"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.progressBar} />
      </div>
    </div>
  );
}
