"use client";

import React, { useState } from "react";

type WavingEmojiProps = {
  emoji: string;
};

export default function WavingEmoji({ emoji }: WavingEmojiProps) {
  const [animated, setAnimated] = useState(false);

  return (
    <span
      onMouseEnter={() => setAnimated(() => true)}
      onAnimationEnd={() => setAnimated(() => false)}
      className={`${animated ? "animate-wave" : ""} inline-block`}
    >
      {emoji}
    </span>
  );
}
