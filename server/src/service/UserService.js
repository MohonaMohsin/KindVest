import UsersModel from "../models/UsersModel.js";
import {EncodeToken} from "../utility/tokenUtility.js";
import EmailSend from "../utility/emailUtility.js";
import DonationEventModel from "../models/DonationEventModel.js";
import usersModel from "../models/UsersModel.js";


export const registerService = async (req) => {
    try {
        const reqBody = req.body;
        console.log("request accept", reqBody);

        const existingUser = await UsersModel.findOne({ email: reqBody.email });
        if (existingUser) {
            return { status: false, msg: 'User already exists with this email.' };
        }

        const data=await UsersModel.create(reqBody);
        console.log(data);
        return {status:true, data:data , msg:"successfully register"};
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

//login-service

export const loginService = async (req,res)=>{
    try{

        let existUser= await UsersModel.findOne({email:req.body.email});
        console.log(existUser)

        if(!existUser){
            return {status:"fail", msg:"User does not exist"};
        }
        else{
            let reqBody={email: req.body.email,password:req.body.password,role:req.body.role};
            //console.log("reqBody:",reqBody);
            let data = await UsersModel.aggregate([
                {$match:reqBody},
                {$project:{ _id: 1,email: 1}},
            ]);
            console.log(data);
            if(data.length === 1){
                let token = EncodeToken(data[0]["email"],data[0]["_id"]);

                let options = {
                    maxAge:30*24*60*60*1000,
                    httpOnly:false,
                    sameSite:null,
                    secure:true,
                };
                res.cookie('token', token, options);
                console.log(token);
                return {status:"success",msg: `${reqBody.role} Login successful.` , token:token,data:data};
            } else {
                return { status: "fail", data: data, msg: "Login unsuccessful." };
            }

        }
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

//logout
export const logoutService = async (req,res) => {
    try {
        res.clearCookie("token");
        return { status: true, msg: "Logout success." };
    } catch (e) {
        return { status: false, error: e, msg: "Logout failed" };
    }
}

//get otp

export const UserOTPService = async (req) => {
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);
        console.log(email,code);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await EmailSend(email,EmailText,EmailSubject);

        await UsersModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:true, message:"6 Digit OTP has been send"}
    }catch (e) {
        return {status:false, message:e}
    }
}

//verify and change password
export const VerifyOTPService = async (req) => {

    try {
        let email=req.params.email;
        let otp=req.params.otp;

        // User Count
        let total=await UsersModel.find({email:email,otp:otp}).countDocuments();


        if(total===1){

            // User ID Read
            let user_id=await UsersModel.find({email:email,otp:otp}).select('_id');

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await UsersModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:true, message:"Valid OTP",token:token,total:total}

        }
        else{
            return {status:false, message:"Invalid OTP",total:total}
        }

    }catch (e) {
        return {status:false, message:"Invalid OTP"}
    }


}

// update password
export const ChangePasswordService = async (req) => {
    try {
        let email =req.params.email;
        let Password=req.body.password;
        //  reqBody.userID=user_id;
        console.log("Email,Pass",email,Password);
        await UsersModel.updateOne({email:email},{$set:{password:Password}},{upsert:true})
        return {status:true, message:"Password Changed Success",password:Password,email:email}
    }catch (e) {
        return {status:false, message:"Something Went Wrong"}
    }
}

//user-details

export const UserDetailsService = async (req)=>{
    try{
        console.log("from user details here",req.headers.email);
        let existUser= await UsersModel.findOne({_id:req.headers.id});
        //console.log("from user details ",existUser);

        if(!existUser){
            return {status:false, msg:"User does not exist"};
        }
        else{
            return {status:true, data:existUser};
        }
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

//update
export const updateProfile = async (req)=>{
    try {
        let reqBody = req.body;
        let Id = req.headers.id;

        console.log("Fetching from backend ",reqBody);

        const {firstName,lastName,profileImg,contactNo,address} = reqBody;

        let updateData = {firstName,lastName,profileImg,contactNo,address};
        await UsersModel.findByIdAndUpdate(Id,updateData,{new:true});

        return { status:true, data:updateData , msg:"Successfully Updated Profile" };
    }catch (error){
        console.log(error);
    }
}

//total volunteer
export const AllVolunteers = async (req)=>{
    try {
        let volunteers = await usersModel.aggregate([
            {
                $match:{
                    role: 'volunteer',
                }
            },

        ]);
        return { status:true, data:volunteers , msg:"sucessfully found volunteers"};

    }catch (error){
        console.log(error)
    }
}
