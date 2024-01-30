import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = ({ value,showHistory,setShowHistory}) => {
  return (
    <div className="flex justify-between border-b-2 border-black pb-4">
      <div className="flex">
        <div className="font-bold text-lg">Your balance </div>
        <div className="font-semibold ml-4 text-lg"> ₹ {value}</div>
      </div>
      <div className="">
        <button onClick={()=>setShowHistory(!showHistory)} className="border border-violet-400 px-8 py-2   rounded-md font-semibold bg-black text-white">{!showHistory ? "Show":"Hide"} History {!showHistory ? "⬇️":"⬆"} </button>
      </div>
    </div>
  );
};
