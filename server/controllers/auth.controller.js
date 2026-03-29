import UserModel from "../models/user.model.js"
import { getToken } from "../utills/token.js"


// Login user
export const GoogleAuth = async (req, res)=>{
    try {
        const {name, email} = req.body
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name,email
            })
        }
         let token = await getToken(user._id   )
        // store in cookie
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            samesite:"strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 //  7 days
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({Message :"Google Sign Up error"})
    }
}

// Logout user
export const logOut = async (req, res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: " Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message:  `Logout Error ${error}`})
    }
}