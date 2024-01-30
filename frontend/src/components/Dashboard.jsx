import { Suspense, useEffect, useState } from "react";
import { Appbar } from "./Appbar"
import { Balance } from "./Balance"
import { Users } from "./Users"
import axios from "axios";
import React from "react"
const History=React.lazy(()=>import ("./History"));

export const Dashboard = () => {
    const [balance,setBalance]=useState(0);
    const [showHistory,setShowHistory]=useState(false);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            setBalance(response?.data?.balance.toFixed(2))
        })
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance showHistory={showHistory} setShowHistory={setShowHistory} value={balance} />
            {
                !showHistory && (<Users balance={balance} />)
            }
           {
                showHistory && (
                    <Suspense fallback={"Loading...."}>
                    <History />
                   </Suspense>
                )
           }
        </div>
    </div>
} 