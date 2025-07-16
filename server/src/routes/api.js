import express from "express";
import * as UserController from "../controllers/UserController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import * as FileUploadController from "../controllers/FileUploadController.js";
import * as DonationController from "../controllers/DonationController.js";
import * as EventController from "../controllers/DonationEventController.js";
import * as DeleteFileUtility from "../utility/DeleteFileUtility.js"
import * as SingleDonationController from "../controllers/SingleDonationController.js";
import * as DashboardController from "../controllers/DashboardController.js";
import * as PaymentController from "../controllers/PaymentController.js";
import * as feedbackController from "../controllers/FeedbackController.js";
import upload from "../middlewares/FileUploads.js";
import {initiatePayment} from "../service/PaymentService.js";
import {createfeedbackController} from "../controllers/FeedbackController.js";
//import uthMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

//users
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/OTP/:email",UserController.useOTP);
router.get('/VerifyLogin/:email/:otp',UserController.verifyOTP);
router.get('/user-details',authMiddleware.default, UserController.UserDetails);
router.get('/all-volunteers',authMiddleware.default,UserController.AllVolunteerController);
router.get('/volunteers',authMiddleware.default,SingleDonationController.findAllVolunteerController);

router.post("/changed-password/:email", UserController.changePassword);
router.post("/update-profile",authMiddleware.default,UserController.updateProfileController);
router.get("/numbers-of-roles", DashboardController.numbersOfDonorVolunteerEventController);
router.get("/admin-dashboard-stat",authMiddleware.default,DashboardController.AdminDashboardStatController);
router.get("/volunteer-dashboard-stat",authMiddleware.default,DashboardController.VolDashboardStatController);
router.get("/donor-dashboard-stat",authMiddleware.default,DashboardController.DonorDashboardStatController);


//admin donation
router.post("/create-donation",authMiddleware.default,DonationController.createDonation);
router.post("/create-event",authMiddleware.default,EventController.createEventController);
router.put("/:id/update-event",authMiddleware.default,EventController.updateEventController);
router.get("/:id/event",authMiddleware.default,EventController.findEventByIdController);
router.get("/activity",EventController.AllEventController);

router.get("/find-all-donations",authMiddleware.default,EventController.findEventController);
router.get("/on-going-events",authMiddleware.default,EventController.getOnGoingEventController);
router.get("/:id",authMiddleware.default,DonationController.DonationDetailsByDonationId);
//router.get("/details/user", authMiddleware.default, DonationController.getDonationsByUserId);
router.get('/donations-admin/user', authMiddleware.default, DonationController.AdminDonation);


//single donation handle
router.post("/:id/donate",authMiddleware.default,SingleDonationController.donateNowController);
router.post("/:id/update-manage-donation",authMiddleware.default,SingleDonationController.updateMannageDonationController);
router.get("/donorId/donation",authMiddleware.default,SingleDonationController.donorDonationController);
router.get("/admin/mannage-donation",authMiddleware.default,SingleDonationController.mannageDonationController);
router.get("/admin/completion-donation",authMiddleware.default,DashboardController.AdminCompletionController);
router.get("/admin/pending-donation",authMiddleware.default,DashboardController.AdminPendingController);
router.get("/admin/accept-donation",authMiddleware.default,DashboardController.AdminOnGoingController);

//volunteer-donation
router.get("/volunteer/donation",authMiddleware.default,SingleDonationController.volunteerNewDonationController);
router.get("/volunteer/delivered-donation",authMiddleware.default,DashboardController.volDeliveryDonationController);
router.get("/volunteer/pending-donation",authMiddleware.default,DashboardController.volPendingDonationController);
router.get("/volunteer/received-donation",authMiddleware.default,DashboardController.volDReceivedDonationController);

router.get("/donor/accept-donation",authMiddleware.default,DashboardController.DonorOnGoingDonationController);
router.get("/donor/pending-donation",authMiddleware.default,DashboardController.DonorPendingDonationController);
router.get("/donor/received-donation",authMiddleware.default,DashboardController.DonorCompleteDonationController);

router.post("/:id/update-volunteer-remark/:status",SingleDonationController.updateVolNewDonationController);
router.get("/donation-details/:id",authMiddleware.default,SingleDonationController.DonationDetailsController);

router.post("/create-feedback",authMiddleware.default,feedbackController.createfeedbackController);
router.get("/donorId/get-feedback",authMiddleware.default,feedbackController.getfeedbackController);
//payment
router.post('/payment',authMiddleware.default,PaymentController.initiatePaymentController)
router.post('/payment/success/:transactionId',authMiddleware.default,PaymentController.successPaymentController)
router.post('/payment/fail/:transactionId',authMiddleware.default,PaymentController.failPaymentController)
router.post('/payment/cancel/:transactionId',authMiddleware.default,PaymentController.cancelPaymentController)
router.get('/donorId/payment-details',authMiddleware.default,PaymentController.getPaymentsByDonor);
router.get('/admin/payment-details',authMiddleware.default,PaymentController.getPaymentsByAdmin);
//router.get("/admin-dashboard-stat",authMiddleware.default,DashboardController.AdminDashboardStatController);

// file-route
router.post("/file-upload", upload.single("file"), FileUploadController.fileUpload);
router.delete("/delete-file/:filename", DeleteFileUtility.deleteUploadedFile);

export default router;