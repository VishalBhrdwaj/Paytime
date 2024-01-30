import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
export const Appbar = () => {
    const handleGreetingTime=()=>{
        let time=new Date().getHours();
        if(time>0 && time<12)
            return "Morning";
        else if(time>=12 && time<16)
            return "Afternoon";
        else if(time>=16 && time<21)
            return "Evening🍵";
        else
            return "Night 😴" 
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-row justify-center h-full ml-9 text-2xl mt-3 ">
             <div className="font-semibold">Pay</div>Time Wallet
             <div className='ml-4'><AccountBalanceWalletIcon/></div>

        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Good {
                    handleGreetingTime()
                } 
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}