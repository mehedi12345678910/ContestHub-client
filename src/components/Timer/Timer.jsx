import { useEffect, useState } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);
  useEffect(() => {
    setTime(duration);
  }, [duration]);

  const getFormattedTime = () => {
    let total_seconds = parseInt(Math.floor(time / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    if (duration > 0) {
      return `${days} Days : ${hours} Hours : ${minutes} Min : ${seconds} Sec`;
    } else {
      return `00 Days : 00 Hours : 00 Min : 00 Sec`;
    }
  };

  return <div>{getFormattedTime()}</div>;
};

export default Timer;
