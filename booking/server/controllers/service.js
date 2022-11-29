import Service from "../models/service";
import fs from "fs";

export const create = async (req, res) => {
  //   console.log("req.fields", req.fields);
  //   console.log("req.files", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let service = new Service(fields);
    // service.postedBy = req.user._id;
    // console.log("incoming request => ", req.user);
    // handle image
    if (files.image) {
      service.image.data = fs.readFileSync(files.image.path);
      service.image.contentType = files.image.type;
    }

    service.save((err, result) => {
      if (err) {
        console.log("saving service err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

/*export const services = async (req, res) => {
  let all = await Service.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  // console.log(all);
  res.json(all);
};*/
export const services = async (req, res) => {
  let all = await Service.find({})
    .limit(24)
    .select("-image.data")
    .exec();
  // console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let service = await Service.findById(req.params.serviceId).exec();
  if (service && service.image && service.image.data !== null) {
    res.set("Content-Type", service.image.contentType);
    return res.send(service.image.data);
  }
};

export const sellerServices = async (req, res) => {
  //console.log("incoming request => ", req.user);
  /*let all = await Service.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);*/
};

export const read = async (req, res) => {
  let service = await Service.findById(req.params.serviceId)
    .select("-image.data")
    .exec();
  console.log("SINGLE SERVICE", service);
  res.json(service);
};