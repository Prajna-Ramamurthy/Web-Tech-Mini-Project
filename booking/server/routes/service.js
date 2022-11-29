import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
//import { requireSignin } from "../middlewares";
// controllers
import { create, services, image, sellerServices} from "../controllers/service";

//router.post("/create-service", requireSignin, formidable(), create);
router.post("/create-service", formidable(), create);
router.get("/services", services);
router.get("/service/image/:serviceId", image);
//router.get("/seller-hotels", requireSignin, sellerServices);
router.get("/seller-hotels", sellerServices);
module.exports = router;