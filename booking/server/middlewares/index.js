import { expressjwt } from "express-jwt";

// req.user
export const requireSignin = expressjwt ({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const serviceOwner = async (req, res, next) => {
  let service = await Service.findById(req.params.serviceId).exec();
  let owner = service.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};