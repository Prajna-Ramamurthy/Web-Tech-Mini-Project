import { useState, useEffect } from "react";
import { allServices } from "../actions/service";
import SmallCard from "../components/cards/SmallCard";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadAllservices();
  }, []);

  const loadAllservices = async () => {
    let res = await allServices();
    setServices(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Services</h1>
      </div>
      <div className="container-fluid">
        {/* <pre>{JSON.stringify(services, null, 4)}</pre> */}
        {services.map((s) => (
          <SmallCard key={s._id} s={s} />
        ))}
      </div>
    </>
  );
};

export default Home;