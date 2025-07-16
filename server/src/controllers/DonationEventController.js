import {
    AllEvent,
    createEvent,
    findEvent,
    findEventById,
    onGoingEvent,
    updateEvent
} from "../service/DonationEventService.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";


export const createEventController= async (req,res)=>{

    let result = await createEvent(req);
    return res.json(result);
}
export const findEventController = async (req,res)=>{
    let result = await findEvent(req);
    return res.json(result);
}
export const getOnGoingEventController = async (req,res)=>{
    let result = await onGoingEvent(req);
    return res.json(result);
}

export const updateEventController= async (req,res)=>{
    let result = await updateEvent(req);
    return res.json(result);
}

export const findEventByIdController = async (req,res)=>{
    let result = await findEventById(req);
    return res.json(result);
}

export const AllEventController=async(req,res)=>{
    let result = await AllEvent(req);
    return res.json(result);
}