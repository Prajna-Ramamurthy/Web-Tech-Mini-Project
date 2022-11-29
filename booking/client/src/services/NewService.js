import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { createService } from "../actions/service";
import { useSelector } from "react-redux";
import ServiceCreateForm from "../components/forms/ServiceCreateForm";

const { Option } = Select;

const NewService = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    workers: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, content, location, image, price, from, to, workers } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);

    let serviceData = new FormData();
    serviceData.append("title", title);
    serviceData.append("content", content);
    serviceData.append("location", location);
    serviceData.append("price", price);
    image && serviceData.append("image", image);
    serviceData.append("from", from);
    serviceData.append("to", to);
    serviceData.append("workers", workers);

    console.log([...serviceData]);

    let res = await createService(token, serviceData);
    console.log("SERVICE CREATE RES", res);
    toast("New service is posted");
    /*setTimeout(() => {
      window.location.reload();
    }, 1000);*/
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Service</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ServiceCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewService;