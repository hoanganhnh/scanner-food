import axios from "axios";

import { ApiConfigs } from "../constants/api";

const axiosClient = axios.create(ApiConfigs);

export default axiosClient;
