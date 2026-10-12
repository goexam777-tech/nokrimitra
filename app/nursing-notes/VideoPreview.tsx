import styles from "./nursing-notes.module.css";

export default function VideoPreview() {
  return (
    <section className={styles.videoSection}>
      <h2 className={styles.videoTitle}>👇 Watch Video Preview 👇</h2>
      <div className={styles.videoWrapper}>
        <iframe
          src="https://www.youtube.com/embed/Wu0c4HUxBWM?rel=0"
          title="Complete Nursing Study Guide Video Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.videoIframe}
        />
      </div>
    </section>
  );
}
