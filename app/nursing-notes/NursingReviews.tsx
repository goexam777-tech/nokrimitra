"use client";

import { Star } from "lucide-react";
import styles from "./nursing-notes.module.css";

const reviewsList = [
  {
    stars: 5,
    comment:
      "I found this ebook to be very thorough and easy to follow. It breaks down complex medical concepts into simple terms. Perfect for both beginners and advanced learners.",
    author: "-Rakesh Bagade",
  },
  {
    stars: 4.5,
    author: "-Shreya Sharma",
    comment:
      "I am from Mumbai and this ebooks helped me a lot. This ebook is a fantastic resource for anyone studying nursing. It covers all the essential topics in a clear and concise manner.\n\nHighly recommended!",
  },
  {
    stars: 4,
    author: "-Pooja Deshmukh",
    comment:
      "This ebook is an excellent study guide. It helped me understand difficult topics and prepare for my exams. The explanations are straightforward and very helpful.",
  },
  {
    stars: 5,
    author: "-Amit Patel",
    comment:
      "The detailed diagrams for organ systems and IV fluid charts are super helpful. Everything is neatly organized. Must-buy for all nursing students!",
  },
  {
    stars: 5,
    author: "-Sneha Kulkarni",
    comment:
      "Instant access on email within seconds of payment! The notes are extremely detailed, covering NORCET syllabus completely. Totally worth it.",
  },
];

export default function NursingReviews() {
  return (
    <div className={styles.reviewsLayout}>
      <div className={styles.reviewsHeaderWrap}>
        <h2 className={styles.reviewsTitleExact}>Customer Reviews</h2>
      </div>

      {/* Breakdown Box */}
      <div className={styles.ratingBreakdownBox}>
        <div className={styles.scoreRow}>
          <span className={styles.bigScore}>4.9</span>
          <div className={styles.starsRow}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < 4 ? "#f59e0b" : "#f59e0b"}
                color="#f59e0b"
              />
            ))}
          </div>
        </div>
        <p className={styles.scoreSubtext}>
          4.9 out of 5 stars (based on 2,488 reviews)
        </p>

        <div className={styles.breakdownBars}>
          <div className={styles.barRow}>
            <span className={styles.barLabel}>Excellent</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "92%" }} />
            </div>
            <span className={styles.barPercent}>92%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Very good</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "6%" }} />
            </div>
            <span className={styles.barPercent}>6%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Average</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "2%" }} />
            </div>
            <span className={styles.barPercent}>2%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Poor</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "0%" }} />
            </div>
            <span className={styles.barPercent}>0%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Terrible</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "0%" }} />
            </div>
            <span className={styles.barPercent}>0%</span>
          </div>
        </div>
      </div>

      <hr className={styles.reviewDividerMain} />

      {/* Reviews List */}
      <div className={styles.exactReviewsList}>
        {reviewsList.map((review, idx) => (
          <div key={idx} className={styles.exactReviewItem}>
            <div className={styles.starsRowItem}>
              {[...Array(5)].map((_, i) => {
                const isFull = i < Math.floor(review.stars);
                const isHalf = i === Math.floor(review.stars) && review.stars % 1 !== 0;
                return (
                  <Star
                    key={i}
                    size={18}
                    fill={isFull ? "#f59e0b" : isHalf ? "#f59e0b" : "#e2e8f0"}
                    color={isFull || isHalf ? "#f59e0b" : "#cbd5e1"}
                  />
                );
              })}
            </div>

            {review.author && idx === 1 ? (
              <>
                <p className={styles.exactGreenAuthor}>{review.author}</p>
                <div className={styles.exactReviewComment}>
                  {review.comment.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={styles.exactReviewComment}>
                  <p>{review.comment}</p>
                </div>
                {review.author && (
                  <p className={styles.exactGreenAuthor}>{review.author}</p>
                )}
              </>
            )}

            {idx < reviewsList.length - 1 && (
              <hr className={styles.reviewDividerItem} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
