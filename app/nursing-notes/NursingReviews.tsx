"use client";

import { Star } from "lucide-react";
import styles from "./nursing-notes.module.css";

const reviewsList = [
  {
    name: "Pooja Sharma",
    title: "Helpful for Revision",
    comment:
      "“The guide is well-organized and makes it easier to revise important nursing topics. A useful resource for regular revision and exam preparation.”",
    stars: 5,
  },
  {
    name: "Anjali Verma",
    title: "Easy to Understand",
    comment:
      "“The content is presented in simple language, making topics easier to understand. A helpful study resource for nursing students.”",
    stars: 5,
  },
  {
    name: "Rahul Patel",
    title: "Convenient to Study",
    comment:
      "“I like the PDF format because I can study on my phone whenever I have free time. It’s convenient for revising important topics.”",
    stars: 5,
  },
  {
    name: "Sneha Kulkarni",
    title: "Useful Study Resource",
    comment:
      "“Having nursing-related study material in one place is very convenient. It can be a useful reference for nursing studies and exam preparation.”",
    stars: 5,
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
                fill="#f59e0b"
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
              <div className={styles.barFill} style={{ width: "94%" }} />
            </div>
            <span className={styles.barPercent}>94%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Very good</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "5%" }} />
            </div>
            <span className={styles.barPercent}>5%</span>
          </div>

          <div className={styles.barRow}>
            <span className={styles.barLabel}>Average</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "1%" }} />
            </div>
            <span className={styles.barPercent}>1%</span>
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
              {[...Array(review.stars)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="#f59e0b"
                  color="#f59e0b"
                />
              ))}
            </div>

            <h3 className={styles.reviewItemHeading}>{review.title}</h3>

            <div className={styles.exactReviewComment}>
              <p>{review.comment}</p>
            </div>

            <p className={styles.exactGreenAuthor}>— {review.name}</p>

            {idx < reviewsList.length - 1 && (
              <hr className={styles.reviewDividerItem} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
