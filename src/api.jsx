import axios from "axios";
import { getConfig } from "./config";

export function api() {
  return axios.create({
    baseURL: getConfig().API_URL
  });
}
