import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
//import { createConnectAccount } from "../actions/stripe";
import { sellerServices } from "../actions/service";
import { toast } from "react-toastify";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersServices();
  }, []);

  const loadSellersServices = async () => {
    let { data } = await sellerServices(auth.token);
    setServices(data);
  };

  const handleClick = async () => {
    setLoading(true);
    /*
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }*/
  };
  

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Services</h2>
        </div>
        <div className="col-md-2">
          <Link to="/services/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {services.map((s) => (
          <SmallCard
            key={s._id}
            s={s}
            showViewMoreButton={false}
            owner={true}
          />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    /*<div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post services</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>*/

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Services</h2>
        </div>
        <div className="col-md-2">
          <Link to="/services/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {services.map((s) => (
          <SmallCard
            key={s._id}
            s={s}
            showViewMoreButton={false}
            owner={true}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user
        ? connected()
        : notConnected()}

      {/*<pre>{JSON.stringify(auth, null, 4)}</pre>*/}
    </>
  );
};

export default DashboardSeller;