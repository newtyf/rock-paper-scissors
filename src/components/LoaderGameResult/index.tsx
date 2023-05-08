import { useState, useEffect } from "react";
import { options } from "../../helpers";
import { TPick } from "../../types";

export const LoaderGameResult = () => {
  const [img, setimg] = useState(`url(${options.ROCK.img})`);
  const [color, setcolor] = useState(`var(${options.ROCK.color})`);

  useEffect(() => {
    let i = 0;
    const picksAvailable: TPick[] = ["ROCK", "PAPER", "SCISSOR"];
    const interval = setInterval(() => {
      if (i == 3) {
        i = 0;
      }
      setimg(`url(${options[picksAvailable[i] as keyof typeof options].img}`);
      setcolor(
        `var(${options[picksAvailable[i] as keyof typeof options].color})`
      );
      i++;
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      className='GameSelection'
      style={{ backgroundImage: img, borderColor: color }}
    ></button>
  );
};
