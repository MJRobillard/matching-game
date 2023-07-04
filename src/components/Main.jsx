import { useEffect, useState } from "react";
import Combo from "./Combo";
import Records from "./Records";
import Square from "./Square";
import { nanoid } from "nanoid";

export default function Main() {

  const [squares, setSquare] = useState(randomNumber());
  const [selectedNo, setSelectedNo] = useState(Math.ceil(Math.random()*6));
  
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
    setSquare((oldData) => {
      return oldData.map((data) => {
        return {
          ...data,
          isEnabled: (id === data.id) && (data.number === selectedNo) ? !data.isEnabled : data.isEnabled,
        };
      });
    });
  }

  useEffect(() => {
    let currentVal = squares[0].number
    for (let index = 0; index < squares.length; index++) {
        if(currentVal === squares[index].number && squares[index].isEnabled){
            currentVal === squares[index].number
            squares.length === index+1 && console.log('Congrats');
        }else{
            break 
        }
    }
  }, [squares])

  function resetAll(){
    setSquare(randomNumber());
    setSelectedNo(Math.ceil(Math.random()*6))
  }

  function randomizeSquares() {
    setSquare(oldData => {
        return oldData.map(data => {
            return {
                ...data,
                number: data.isEnabled ? data.number : Math.ceil(Math.random() * 6)
            }
        })
    })
  }

  function handleKeyPress(event){
    if (event.key === 'r') {
        randomizeSquares();
      }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  } , [])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        <Records />
        <div className="grid grid-cols-3">
          {squares.map((data) => {
            return (
              <Square
                isClickable={selectedNo === data.number}
                loc = {data.location}
                handleToggle={() => toggleSquare(data.id)}
                key={data.id}
                number={data.number}
                enabled={data.isEnabled}
              />
            );
          })}
        </div>
        <Combo handleReset={resetAll} selectedNo={selectedNo} />
      </div>

      <button onClick={randomizeSquares} className="rounded-b-lg bg-zinc-700 border border-zinc-600 hover:bg-zinc-600 py-1 focus:border focus:border-zinc-500 text-white">
        Roll <span className="text-[10px]">(or press R)</span>
      </button>
    </div>
  );
}
