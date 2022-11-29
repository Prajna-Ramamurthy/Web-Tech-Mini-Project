import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin , serviceOwner } from "../middlewares";
// controllers
import {
    create,
    services,
    image,
    sellerServices,
    read,
  } from "../controllers/service";

router.post("/create-service", requireSignin, formidable(), create);
router.get("/services", services);
router.get("/service/image/:serviceId", image);
router.get("/seller-services", requireSignin, sellerServices);
router.get("/service/:serviceId", read);

module.exports = router;