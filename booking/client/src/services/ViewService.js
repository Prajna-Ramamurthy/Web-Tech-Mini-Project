import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { read, diffDays } from "../actions/service";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewService = ({ match, history }) => {
  const [service, setService] = useState({});
  const [image, setImage] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerService();
  }, []);

  const loadSellerService = async () => {
    let res = await read(match.params.serviceId);
    // console.log(res);
    setService(res.data);
    setImage(`${process.env.REACT_APP_API}/service/image/${res.data._id}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!auth) history.push("/login");
    console.log("get session id from stripe to show a button > checkout with stripe");
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{service.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={service.title} className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{service.content}</b>
            <p className="alert alert-info mt-3">₹{service.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(service.from, service.to)}{" "}
                {diffDays(service.from, service.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(service.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(service.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            {/*<i>Posted by {service.postedBy && service.postedBy.name}</i>*/}
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
            >
              {auth && auth.token ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewService;