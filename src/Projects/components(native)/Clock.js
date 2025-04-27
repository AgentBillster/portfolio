import { Text } from "native-base";
import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  const timeOptions = { hour12: true, hour: "numeric", minute: "numeric" };

  return <Text>{date.toLocaleTimeString([], timeOptions)}</Text>;
};

export default Clock;
