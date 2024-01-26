const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const zod=require("zod");
const { User } = require("../DB");
const { JWT_SECRET } = require("../config");
const userSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    latname:zod.string(),
})
const signinUserSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signup",async(req,res)=>{

    const body=req.body;
    const {success}=userSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user=await User.findOne({
        username:body.username
    })

    if(user._id){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const newUser=await User.create({
        username:body.username,
        password:body.password,
        firstname:body.firstname,
        lastname:body.lastname
    })

    const token=jwt.sign({userId:newUser._id},JWT_SECRET);


    res.status(200).json({
        message: "User created successfully",
        token:token
    })
})

router.post("/signin",async(req,res)=>{

    const body=req.body;
    const {success} =signinUserSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user=await User.findOne({
        username:body.username,
        password:body.password
    });

    if(user){
        const token=jwt.sign({userId:user._id},JWT_SECRET); 
        return res.status(200).json({
            token:token
        })
    }

    return res.status(411).json({
        message: "Error while logging in"
    })

})

module.exports=router;