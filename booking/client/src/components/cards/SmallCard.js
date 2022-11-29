//import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/service";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
    s,
    handleServiceDelete = (f) => f,
    owner = false,
    showViewMoreButton = true,
}) => {  
    const history = useHistory();
    return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
          {s.image && s.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/service/image/${s._id}`}
                alt="default service image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default service image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {s.title}{" "}
                {/*<span className="float-right text-primary">
                  {currencyFormatter({
                    amount: s.price,
                    currency: "usd",
                  })}
                </span>{" "}
                */}
                <span className="float-right text-primary">
                    <p className="card-text">{s.price} rupees</p>
                </span>{" "}
              </h3>
              {/*<p className="alert alert-info">{h.location}</p>*/}
              <p className="card-text">Location: {s.location}</p>
              <p className="card-text">{`${s.content.substring(0, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  For {diffDays(s.from, s.to)}{" "}
                  {diffDays(s.from, s.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{s.workers} workers</p>
              <p className="card-text">
                Available from {new Date(s.from).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/service/${s._id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/service/edit/${s._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleServiceDelete(s._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;