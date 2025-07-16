import mongoose from "mongoose";
import DonationEventModel from "../models/DonationEventModel.js";
import donationEventModel from "../models/DonationEventModel.js";
import DonationModel from "../models/DonationModel.js";


export const createEvent = async (req)=>{
    try{

        const reqBody = req.body;
        const donation = req.body.donationId;

        if(donation){
            reqBody.donationId = new mongoose.Types.ObjectId(donation);
        }
        const event = await DonationEventModel.create(reqBody);

        return { status:true, data:event,msg:"Successfully created" };
    }
    catch(error){
        console.log(error);
    }
}

export const findEvent = async (req)=>{

    try {
        const event= await DonationModel.find();
        return { status:true, data:event,msg:"Successfully find" };

    }catch(error){
        console.log(error);
    }
}

export const onGoingEvent = async (req)=>{
    try {
        const event = await DonationEventModel.aggregate([
            {
               $match: {status: {$in: ['pending', 'running']}

            }
            },
            {$lookup:{from:"donations", localField:"donationId",foreignField:"_id" , as:"donationDetails" }},
            {$unwind:"$donationDetails"},
            {
                $project: {
                    _id: 1,
                    areaName: 1,
                    description: 1,
                    status: 1,
                    "donationDetails.title": 1,
                    "donationDetails._id": 1,
                    createdAt: 1
                }
            }

        ]);

        return { status:true, data:event,msg:"Successfully onGoing event find" };
    }catch(error){
        console.log(error);
    }
}

export const updateEvent = async (req)=>{
  try {
      let reqBody = req.body;
      let eventId = req.params.id;

      console.log("Fetching from backend ",reqBody);

      const {donationId,description,areaName,status,bannerImg} = reqBody;

      const updateData = {donationId,description,areaName,status,bannerImg};
      await DonationEventModel.findByIdAndUpdate(eventId,updateData,{new:true});
      return { status:true, data:updateData , msg:"Successfully updated event" };
  }catch (error){
      console.log(error);
  }
}

export const findEventById = async (req)=>{
    try{
        const eventId = req.params.id;

        let event   = await DonationEventModel.aggregate([
            {
                $match: {_id:new mongoose.Types.ObjectId(eventId)}
            },
            {$lookup:{from:"donations", localField:"donationId",foreignField:"_id" , as:"donationDetails" }},
            {$unwind:"$donationDetails"},

            {
                $project: {
                    _id: 1,
                    areaName: 1,
                    description: 1,
                    status: 1,
                    bannerImg:1,
                    "donationDetails.title": 1,
                    "donationDetails._id": 1,
                    createdAt: 1
                }
            }

        ]);
        return { status:true, data:event , msg:"Successfully find" };
    }catch (error){
        console.log(error);
    }
}


export const AllEvent = async (req)=>{
    try {
        const event = await DonationEventModel.aggregate([

            {$lookup:{from:"donations", localField:"donationId",foreignField:"_id" , as:"donationDetails" }},
            {$unwind:"$donationDetails"},

            {
                $project: {
                    _id: 1,
                    areaName: 1,
                    description: 1,
                    status: 1,
                    bannerImg:1,
                    "donationDetails.title": 1,
                    "donationDetails._id": 1,
                    createdAt: 1
                }

            },
            {
                $sort: { createdAt: -1 } // Sort by createdAt in descending order
            }

        ]);

        return { status:true, data:event,msg:"Successfully events find" };
    }catch(error){
        console.log(error);
    }
}