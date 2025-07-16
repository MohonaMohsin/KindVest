import  mongoose from 'mongoose';

const DonationEventSchema = new mongoose.Schema({
    areaName: {type:String},
    description: {type:String},
    status: {type:String,enum:['finished','running','pending'],default:'pending'},
    volunteerId:[{type:mongoose.Schema.Types.ObjectId}],
    donorId:[{type:mongoose.Schema.Types.ObjectId}],
    donationId:{type:mongoose.Schema.Types.ObjectId},
    bannerImg:{type:String},
},
    {timestamps:true,versionKey:false,}
);

const DonationEventModel = mongoose.model('donationevents', DonationEventSchema);
export default DonationEventModel;