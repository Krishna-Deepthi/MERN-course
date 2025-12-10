import axios from "axios";
const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

export const postRecord = async (record: any) => {
  const res = await API.post("/upload", record);
  return res.data;
};

export const getRecords = async () => {
  const res = await API.get("/records");
  return res.data;
};
