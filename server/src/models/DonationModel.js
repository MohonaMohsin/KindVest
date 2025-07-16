import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
        title: {type:String,unique:true,required:true},
        description:{type:String,required:true},
        donationAreaId:{type:mongoose.Schema.Types.ObjectId},

    },
    {timestamps:true,versionKey:false,}
);
const DonationModel = mongoose.model('donations', DonationSchema);
export default DonationModel;