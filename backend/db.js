const mongoose=require("mongoose");

try {
mongoose.connect("mongodb+srv://vishalbhardwaj820vb:mongoose23101998@cluster0.ltjmfpq.mongodb.net/") 
} catch (error) {
    console.log(error);
}

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }

})

const Account=mongoose.model('Account',accountSchema);


const User=mongoose.model('User',userSchema);

module.exports={
    User,
    Account
}