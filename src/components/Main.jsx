import { useEffect, useState } from "react";
import Combo from "./Combo";
import Records from "./Records";
import Square from "./Square";
import { nanoid } from "nanoid";

export default function Main() {
  const [squares, setSquare] = useState(randomNumber());
  const [selectedNo, setSelectedNo] = useState(Math.ceil(Math.random() * 6));
  const [won, setWon] = useState(false);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);

  function randomNumber() {
    let newSquares = [];
    for (let index = 0; index < 9; index++) {
      newSquares.push({
        id: nanoid(),
        location: index,
        number: Math.ceil(Math.random() * 6),
        isEnabled: false,
      });
    }
    return newSquares;
  }

  function toggleSquare(id) {
    setStart(true);
    setSquare((oldData) => {
      return oldData.map((data) => {
        return {
          ...data,
          isEnabled:
            id === data.id && data.number === selectedNo
              ? !data.isEnabled
              : data.isEnabled,
        };
      });
    });
  }

  useEffect(() => {
    let currentVal = squares[0].number;
    for (let index = 0; index < squares.length; index++) {
      if (currentVal === squares[index].number && squares[index].isEnabled) {
        currentVal === squares[index].number;
        if (squares.length === index + 1) {
          setWon(true);
          setStart(false);
          console.log("Congrats");
        }
      } else {
        break;
      }
    }
  }, [squares]);

  function resetAll() {
    setSquare(randomNumber());
    setSelectedNo(Math.ceil(Math.random() * 6));
    setWon(false);
    setStart(false);
    setCount(0);
  }

  function randomizeSquares() {
    setSquare((oldData) => {
      return oldData.map((data) => {
        return {
          ...data,
          number: data.isEnabled ? data.number : Math.ceil(Math.random() * 6),
        };
      });
    });
  }

  function handleKeyPress(event) {
    if (event.key === "r") {
      randomizeSquares();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        <Records />
        {won ? (
          <div className="w-72 bg-zinc-100 bg-opacity-5 flex justify-center items-center rounded-sm">
            <div className=" text-white flex items-center gap-1">
              <p>Time:</p>
              <div className=" bg-emerald-600 px-2  rounded-md">
              {count / 100}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 border-white border rounded-sm">
            {squares.map((data) => {
              return (
                <Square
                  isClickable={selectedNo === data.number}
                  loc={data.location}
                  handleToggle={() => toggleSquare(data.id)}
                  key={data.id}
                  number={data.number}
                  enabled={data.isEnabled}
                />
              );
            })}
          </div>
        )}

        <Combo
          count={count}
          setCounter={setCount}
          played={start}
          handleReset={resetAll}
          selectedNo={selectedNo}
        />
      </div>
      <button
        onClick={randomizeSquares}
        className=" bg-zinc-700 border py-1 rounded-sm border-zinc-600 hover:bg-zinc-600 focus:border focus:border-zinc-500 text-white  h-1/2"
      >
        Roll <span className="text-[10px]">(or press R)</span>
      </button>
    </div>
  );
}
