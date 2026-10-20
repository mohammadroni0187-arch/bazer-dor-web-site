"use client";

import { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return <span>{date || "লোড হচ্ছে..."}</span>;
};

export default DateDisplay;