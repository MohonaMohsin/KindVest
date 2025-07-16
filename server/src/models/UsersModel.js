import  mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email:{type:String,unique:true,required:true,lowercase:true},
    password:{type:String,required:true},
    firstName:{type:String},
    lastName:{type:String},
    profileImg:{type:String},
    role:{type:String},
    contactNo:{type:String},
    address:{type:String},
    otp:{type:Number , default:0},
    bio:{type:String},
},{ timestamps: true , versionKey: false }
);
const UsersModel = mongoose.model('users', UserSchema);
export default UsersModel;