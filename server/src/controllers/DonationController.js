import {

    DonationCreateService,
    DonationDetailsService, getDonationsByUserId
} from "../service/DonationServices.js";
import DonationModel from "../models/DonationModel.js";



export const createDonation =async(req,res)=>{
    let result = await DonationCreateService (req);

    return res.json(result);
}

export const DonationDetailsByDonationId =async(req,res)=>{
    let result = await DonationDetailsService(req);

    return res.json(result);
}

export const AdminDonation =async(req,res)=>{

    let result = await getDonationsByUserId(req);
    return res.json(result);
}


