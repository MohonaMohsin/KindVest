import mongoose from 'mongoose';

const VolunteerDetailsSchema = new mongoose.Schema({
        volunteerId:{type:mongoose.Schema.Types.ObjectId},
        volunteerRemark:{type:String},
        donationAreaId:{type:mongoose.Schema.Types.ObjectId},
        donorId:{type:mongoose.Schema.Types.ObjectId},

    },
    {timestamps:true,versionKey:false,}
);
const VolunteerDetailsModel = mongoose.model('volunteers', VolunteerDetailsSchema);
export default VolunteerDetailsModel;