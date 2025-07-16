
import DonationModel from "../models/DonationModel.js";
//import mongoose from "mongoose";

//admin create donation activity
export const DonationCreateService = async (req) => {
    try {
        console.log(req.body);
        const reqBody = req.body;
        const data=await DonationModel.create(reqBody);
        return {status:true, data:data , msg:"successfully donation activity created"};
    }catch(e){
        return {status:false,error:e.toString()};
    }
}

//find donation by donationId
export const DonationDetailsService = async (req) => {
    try {
        const donationId = req.params.id;
        console.log("donation Id",donationId);
        const data=await DonationModel.findOne({_id:donationId});
        return {status:true, id:req.headers.id , data:data , msg:"successfully find donation details"};
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

export const getDonationsByUserId = async (req) => {
    try {
        const userId = req.headers.id;

        const donations = await DonationModel.find({ userId });

        return {status:true, data:donations , msg:"successfully fetched"};
    } catch (error) {
        console.error('Error fetching donations:', error);
        return {status:false, msg:"unsuccessful "};
    }
};

