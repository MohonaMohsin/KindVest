import axios from "axios";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";


let baseURL="http://localhost:5050/api/"
class ApiRequest {

    async register(reqBody){
        console.log("register request",reqBody);
        let res=await axios.post(`${baseURL}register`,reqBody);
        return res.data;
    }

    async fileUpload (reqBody) {

        let result = await axios.post(`${baseURL}file-upload`, reqBody);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            console.log("api-img",result.data.file);
            return result;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }


    async login(reqBody) {
        console.log("reqBody:",reqBody);
        let result = await axios.post(`${baseURL}login`, reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === "success") {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async logout() {
        let result = await axios.get(`${baseURL}logout`, {
            withCredentials: true,
        });
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async userDetails() {
        //const  token = Cookies.get("token");
        // console.log(token);

        try{
            let result = await axios.get(`${baseURL}user-details`,{
                withCredentials: true});
            console.log(result);
            if (result.data.status === true) {
                return result.data;
            } else {
                return false;
            }
        }catch (error){
            console.log(error)
        }
    }

    async updateProfile(reqBody) {


        try{
            let result = await axios.post(`${baseURL}update-profile`,reqBody,{
                withCredentials: true});
            console.log(result);
            if (result.data.status === true) {
                return result.data;
            } else {
                return false;
            }
        }catch (error){
            console.log(error)
        }
    }

    async createDonation(reqBody) {
        console.log("reqBody:",reqBody);
        let result = await axios.post(`${baseURL}create-donation`, reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async createEvent(reqBody) {
        console.log("reqBody:",reqBody);
        let result = await axios.post(`${baseURL}create-event`, reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async findDonationList() {

        let result = await axios.get(`${baseURL}find-all-donations`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async OnGoingEventList() {

        let result = await axios.get(`${baseURL}on-going-events`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async UpdateOnGoingEvent(id,reqBody) {

        console.log("Sending PUT request to:", reqBody)
        let result = await axios.put(`${baseURL}${id}/update-event`,reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async FindEventById(id) {

        let result = await axios.get(`${baseURL}${id}/event`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async ActivityList() {

        let result = await axios.get(`${baseURL}activity`);
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async DonorDonationList() {

        let result = await axios.get(`${baseURL}donorId/donation`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async donateNow(id,reqBody) {
        console.log("reqBody:",reqBody,"id",id);
        let result = await axios.post(`${baseURL}${id}/donate`, reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async ManageDonationList() {

        let result = await axios.get(`${baseURL}admin/mannage-donation`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async volunteersList(){

        let result = await axios.get(`${baseURL}volunteers`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async UpdateManageDonation(id,reqBody) {

        console.log("Sending PUT request to:", reqBody)
        let result = await axios.post(`${baseURL}${id}/update-manage-donation`,reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async VolunteerNewDonationList() {

        let result = await axios.get(`${baseURL}volunteer/donation`,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async UpdateNewVolDonation(id,status) {

        console.log("Sending PUT request to:", status)
        let result = await axios.post(`${baseURL}${id}/update-volunteer-remark/${status}`);
        console.log("result return",result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async DonationDetails(id) {

        console.log("Sending PUT request to:",` ${baseURL}donation-details/${id}`);
        let result = await axios.get(`${baseURL}donation-details/${id}`,{
            withCredentials: true,
        });
        console.log("result return",result);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return result.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async DashboardInformation() {
        let result = await axios.get(`${baseURL}numbers-of-roles`);
        console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async AdminDashboardStat() {
        let result = await axios.get(`http://localhost:5050/api/admin-dashboard-stat`,{
            withCredentials: true,
        });
       // console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }
    async DonorDashboardStat() {
        let result = await axios.get(`${baseURL}donor-dashboard-stat`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }
    async VolDashboardStat() {
        let result = await axios.get(`${baseURL}volunteer-dashboard-stat`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async AdminCompletionDonation() {
        let result = await axios.get(`${baseURL}admin/completion-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }
    async AdminAcceptDonation() {
        let result = await axios.get(`${baseURL}admin/accept-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }



    async AdminPendingDonation() {
        let result = await axios.get(`${baseURL}admin/pending-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async VolDeliveredDonation() {
        let result = await axios.get(`${baseURL}volunteer/delivered-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async VolReceivedDonation() {
        let result = await axios.get(`${baseURL}volunteer/received-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async VolPendingDonation() {
        let result = await axios.get(`${baseURL}volunteer/pending-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async DonorPendingDonation() {
        let result = await axios.get(`${baseURL}donor/pending-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }
    async DonorCompleteDonation() {
        let result = await axios.get(`${baseURL}donor/received-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }
    async DonorOnGoingDonation() {
        let result = await axios.get(`${baseURL}donor/accept-donation`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async VolunteersTotalList() {
        let result = await axios.get(`${baseURL}all-volunteers`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

   async initiatePayment(data){
       let result = await axios.post(`${baseURL}payment`,data,{
           withCredentials: true,
       });
       let res = result.data;
      console.log("result return",res);
       if (result.data.data.status === true) {
           console.log("result return");
           window.location.href = result.data.data.url; // Redirect to SSLCommerz gateway
       } else {
           ErrorToast("Error ");
       }
   }

    async DonorTotalPaymentsList() {
        let result = await axios.get(`${baseURL}donorId/payment-details`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async TotalPaymentsList() {
        let result = await axios.get(`${baseURL}admin/payment-details`,{
            withCredentials: true,
        });
        //console.log("result return",result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async TotalFeedbacksList() {
        let result = await axios.get(`${baseURL}donorId/get-feedback`,{
            withCredentials: true,
        });
        console.log("result return",result.data);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }

    async createFeedback(data){
        let result = await axios.post(`${baseURL}create-feedback`,data,{
            withCredentials: true,
        });

       // console.log("result return",res);
        if (result.data.status === true) {
           // console.log("result return");
            SuccessToast("Successfully Done")
            return true;
        } else {
            ErrorToast("Error ");
        }
    }

    async UserOTP(email){
        let result = await axios.get(`${baseURL}OTP/${email}`);

         console.log("result return",result);
        if (result.data.status === true) {
            // console.log("result return");
            //SuccessToast("Successfully Done")
            return true;
        } else {
            ErrorToast("Error ");
        }
    }

    async VerifyOTP(email,otp){
        let result = await axios.get(`${baseURL}VerifyLogin/${email}/${otp}`);

        console.log("result return",result);
        if (result.data.status === true) {
            // console.log("result return");
            //SuccessToast("Successfully Done")
            return true;
        } else {
            ErrorToast("Error ");
        }
    }

    async ChangePassword(password,email){
        console.log("pass",password);
        let result = await axios.post(`${baseURL}changed-password/${email}`,{
            password: password,
        });

        console.log("result return",result);
        if (result.data.status === true) {
             console.log("return",result.data);
            //SuccessToast("Successfully Done")
            return true;
        } else {
            ErrorToast("Error ");
        }
    }

}
export const { register ,updateProfile, fileUpload , login,userDetails,logout,createDonation ,findDonationList,createEvent,
              OnGoingEventList,UpdateOnGoingEvent,FindEventById,ActivityList ,DonorDonationList,donateNow,
              ManageDonationList,volunteersList,UpdateManageDonation,VolunteerNewDonationList,UpdateNewVolDonation,
    DonationDetails,DashboardInformation,AdminDashboardStat,VolDashboardStat,DonorDashboardStat,AdminAcceptDonation,AdminPendingDonation,
    AdminCompletionDonation,VolDeliveredDonation,VolReceivedDonation,VolPendingDonation,DonorOnGoingDonation,DonorPendingDonation,
    DonorCompleteDonation,VolunteersTotalList,initiatePayment,DonorTotalPaymentsList,TotalPaymentsList,TotalFeedbacksList,
    createFeedback,UserOTP,VerifyOTP,ChangePassword} = new ApiRequest();