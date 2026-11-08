import { useState } from "react";
import styles from "./WavingEmoji.module.scss";

type WavingEmojiProps = {
  emoji: string;
};

export default function WavingEmoji({ emoji }: WavingEmojiProps) {
  const [animated, setAnimated] = useState(false);

  return (
    <span
      onMouseEnter={() => setAnimated(true)}
      onAnimationEnd={() => setAnimated(false)}
      className={`${animated ? styles.waving : ""} ${styles.emoji}`}
    >
      {emoji}
    </span>
  );
}
