import mongoose from 'mongoose';

const DonorDetailsSchema = new mongoose.Schema({
        donorId:{type:mongoose.Schema.Types.ObjectId},
        donorRemark:{type:String},
        donationImg:{type:String},
        donationAreaId:{type:mongoose.Schema.Types.ObjectId},

    },
    {timestamps:true,versionKey:false,}
);
const DonorDetailsModel = mongoose.model('donors', DonorDetailsSchema);
export default DonorDetailsModel;