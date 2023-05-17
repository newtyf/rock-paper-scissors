import { useState, useEffect } from "react";
import { options } from "../../helpers";
import { TPick } from "../../types";

export const LoaderGameResult = () => {
  const [img, setimg] = useState<string>(`url(${options.ROCK.img})`);
  const [color, setcolor] = useState<string>(options.ROCK.color);

  useEffect(() => {
    let i = 0;
    const picksAvailable: TPick[] = ["ROCK", "PAPER", "SCISSOR"];
    const interval = setInterval(() => {
      if (i == 3) {
        i = 0;
      }
      setimg(`url(${options[picksAvailable[i] as keyof typeof options].img}`);
      setcolor(options[picksAvailable[i] as keyof typeof options].color);
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
