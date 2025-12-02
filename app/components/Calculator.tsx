"use client";

import { useState } from "react";

export default function Calculator() {
    const [input, setInput]=useState<string>("");
    const [prevValue, setPrevValue]=useState<number | null>(null);
    const [operator, setOperator]=useState<string | null>(null);

    const handleNumberClick=(num: string)=>{
        setInput((prev)=>prev+num);
    };

    const handleOperatorClick=(op: string)=>{
        if (input === "") return;

        setPrevValue(Number(input));
        setOperator(op);
        setInput("");

    };

    const handleClear=()=>{
        setInput("");
        setPrevValue(null);
        setOperator(null);
    };

    const handleEquals=()=>{
        if (prevValue===null || operator===null || input==="") return;

        const current=Number(input);

        let result=0;

        switch (operator) {
            case "+":
                result=prevValue+current;
                break;
            case "-":
                result=prevValue-current;
                break;
            case "*":
                result=prevValue*current;
                break;
            case "/":
                result=current===0? NaN : prevValue/current;
                break;
        }
        setInput(String(result));
        setPrevValue(null);
        setOperator(null);
    };
    return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-72">
      {/* Display */}
      <div className="bg-gray-200 text-right p-4 text-3xl rounded-lg mb-4 font-mono">
        {input || "0"}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-3">

        {/* Row 1 */}
        <button onClick={() => handleNumberClick("7")} className="btn">7</button>
        <button onClick={() => handleNumberClick("8")} className="btn">8</button>
        <button onClick={() => handleNumberClick("9")} className="btn">9</button>
        <button onClick={() => handleOperatorClick("/")} className="btn btn-op">/</button>

        {/* Row 2 */}
        <button onClick={() => handleNumberClick("4")} className="btn">4</button>
        <button onClick={() => handleNumberClick("5")} className="btn">5</button>
        <button onClick={() => handleNumberClick("6")} className="btn">6</button>
        <button onClick={() => handleOperatorClick("*")} className="btn btn-op">*</button>

        {/* Row 3 */}
        <button onClick={() => handleNumberClick("1")} className="btn">1</button>
        <button onClick={() => handleNumberClick("2")} className="btn">2</button>
        <button onClick={() => handleNumberClick("3")} className="btn">3</button>
        <button onClick={() => handleOperatorClick("-")} className="btn btn-op">-</button>

        {/* Row 4 */}
        <button onClick={() => handleNumberClick("0")} className="btn">0</button>
        <button onClick={handleClear} className="btn btn-clear">C</button>
        <button onClick={handleEquals} className="btn btn-eq">=</button>
        <button onClick={() => handleOperatorClick("+")} className="btn btn-op">+</button>

      </div>
    </div>
  );

}