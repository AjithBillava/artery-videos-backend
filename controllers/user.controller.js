const {User}= require("../model/user.model")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

const getUserDetails = async(req,res,next) =>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId)
        .select("-password -createdAt -updatedAt -__v")
        .populate({
            path:"history",
            model:"History",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"likedVideos",
            model:"LikedVideos",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"savedVideos",
            model:"SavedVideos",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"playLists",
            model:"PlayList",
            populate:{
                path:"playLists.videos",
                model:"Video"
            }
        })

        res.status(200).json({
            message:"User fetched sucessfully",
            user
        })
        
    } catch (error) {
        next(error)
    }
}

const registerUser = async(req,res,next) =>{
    try {
        
        const {firstname,lastname,email,password} = req.body;
        const checkValidation = validator.validate(email)

        if(!firstname||!lastname||!email||!password){
            res.status(400).json({
                success:false,
                message:"Please fill all flieds"
            })
        }
        if(checkValidation){
            const userEmail = await User.findOne({email})
            if(userEmail){
                return res.status(403).json({
                    success:false,
                    message:"user already exist"
                })
            }

            const user = new User({firstname,lastname,email,password})
            console.log(user)
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(user.password,salt,async(err,hash)=>{
                    if(err){
                        throw Error(err)
                    }

                    user.password = hash

                    const savedUser = await user.save();

                    jwt.sign(
                        {id:savedUser._id},
                        process.env.JWTSECRET,
                        {expiresIn:"24h"},
                        (err,token)=>{
                            if(err){
                                throw new Error(err)
                            }
                            savedUser.password = undefined,
                            savedUser.__v=undefined

                            res.status(201).json({
                                success:true,
                                message:"User registered successfully",
                                token,
                                savedUser
                            })
                        })
                })
            })

        }
        else{
            return res.status(400).json({
                success:false,
                message:"Entered email is not valid"
            })
        }

    } catch (error) {
        next(error);
    }
}

const loginUser = async(req,res,next) =>{
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            message:"Please enter all fields"
        })
    }

    const checkValidation = validator.validate(email);

    if(!checkValidation){
        return res.status(400).json({
            message:"Entered email is not in the valid format"
        })
    }
    try {
        const user = await User.findOne({email})
        .select("-createdAt -updatedAt -__v")
        .populate({
            path:"history",
            model:"History",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"likedVideos",
            model:"LikedVideos",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"savedVideos",
            model:"SavedVideos",
            populate:{
                path:"videos",
                model:"Video"
            }
        })
        .populate({
            path:"playLists",
            model:"PlayList",
            populate:{
                path:"playLists.videos",
                model:"Video"
            }
        })

        if(!user){
            return res.status(404).json({
                message:"User does not exist"
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const JwtSecretKey = process.env.JWTSECRET;
        jwt.sign({
            id: user._id
        }, JwtSecretKey, {
            expiresIn: "24h"
        }, (err, token) => {
            if (err) {
                throw new Error(err);
            }
            user.password = undefined;
            res.status(200).json({
                message: "You are logged in",
                token,
                user
            });
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    loginUser,
    registerUser,
    getUserDetails
}