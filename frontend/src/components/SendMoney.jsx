import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const name=searchParams.get('name');
  const balance=searchParams.get("balance");
  const userId=searchParams.get('id');
  const [amount,setAmount]=useState();
  const transferAmount = () => {
    console.log(amount,balance);
    if(parseFloat(amount)>parseFloat(balance))
      {
        alert("Insufficient balance to Tranfer");
        return;
      }
    if(amount==0){
      alert("Invalid Amount");
      return
    }
    let data = JSON.stringify({
      "to": userId,
      "amount": amount
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/v1/account/transfer',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      navigate("/dashboard")
    })
    .catch((error) => {
      console.log(error);
    });
     
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {searchParams.get("name").charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {searchParams.get("name")}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  onChange={(e)=>setAmount(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button onClick={transferAmount} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
              >
                Cancel Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
