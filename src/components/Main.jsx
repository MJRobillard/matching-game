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
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("matching-game") || "[]")
  );

  const [autoWin, setAutoWin] = useState(false)
    
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

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
    const checkWin = squares.every(data => data.isEnabled) // check every property isEnabled, return boolean
    const remainingFalse = squares.filter(data => !data.isEnabled) // get remaining false squares
    
    // check if theres only one left and Auto Tap is Enabled and Selected number is equal to last number
    if(remainingFalse.length === 1 && autoWin && remainingFalse[0].number === selectedNo){
      setWon(true);
      setStart(false);
      let newRecords = [
        ...records,
        { id: nanoid(), time: count, date: formattedDate },
      ];
      localStorage.setItem("matching-game", JSON.stringify(newRecords));
      setRecords(newRecords);
    }else{ // if Auto tap is not enabled checkWin will chech if all squares are true
      if(checkWin){
        setWon(true);
        setStart(false);
        let newRecords = [
          ...records,
          { id: nanoid(), time: count, date: formattedDate },
        ];
        localStorage.setItem("matching-game", JSON.stringify(newRecords));
        setRecords(newRecords);
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

  function toggleAuto(){
    setAutoWin(oldData => !oldData)
  }

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      event.key === "r" && randomizeSquares();
    });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex gap-2 justify-center">
        <p className="absolute -top-8 text-xs text-zinc-600 text-center">
          Match the number's equal to the number on the right.
          The timer will start, once you tap a number.
        </p>
        <Records listRecords={records} />
        {won ? (
          <div className="relative w-72 bg-zinc-100 bg-opacity-5 flex flex-col justify-center items-center rounded-sm">
            <div className=" text-white flex items-center gap-1">
              <p>Time:</p>
              <div className=" bg-emerald-600 px-2  rounded-md">
                {count / 100}s
              </div>
            </div>
            <div className="bottom-0 my-2 text-xs absolute text-zinc-100 text-opacity-20">
              click{" "}
              <span
                onClick={resetAll}
                className="text-emerald-600 cursor-pointer"
              >
                reset
              </span>{" "}
              to continue
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-3 ${autoWin ? 'border-emerald-500' : 'border-white'} border rounded-sm`}>
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
      <div className="flex gap-2">
        <div className="w-48 flex gap-2 items-center justify-center text-white">
          <input onChange={toggleAuto} type="checkbox" name="" id="auto" /> 
          <label htmlFor="auto" className="text-xs">Auto Tap Last Number</label>
        </div>
        <button
          onClick={randomizeSquares}
          className=" bg-zinc-700 w-72 border py-1 rounded-sm border-zinc-600 hover:bg-zinc-600 focus:border focus:border-zinc-500 text-white  h-1/2"
        >
          Roll <span className="text-[10px]">(or press R)</span>
        </button>
       <select name="" className="w-48 border bg-zinc-700 py-1 px-2 rounded-sm border-zinc-600 hover:bg-zinc-600 focus:border focus:border-zinc-500 text-white" id="">
            <option value="">Numbers</option>
            <option value="">Emojis</option>
            <option value="">Letters</option>
       </select>
      </div>
    </div>
  );
}
