import axios from "axios";

export const createService = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-service`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allServices = async () =>
  await axios.get(`${process.env.REACT_APP_API}/services`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerServices = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const read = async (serviceId) =>
  await axios.get(`${process.env.REACT_APP_API}/service/${serviceId}`);