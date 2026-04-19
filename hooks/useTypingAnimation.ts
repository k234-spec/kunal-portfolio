import { useState, useEffect } from "react";

export function useTypingAnimation(phrases: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseTime: number = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[loopNum % phrases.length];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        timer = setTimeout(() => {}, pauseTime / 4);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (displayText === currentPhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return { displayText };
}
