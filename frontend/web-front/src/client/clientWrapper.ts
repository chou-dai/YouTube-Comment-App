import {
    DefaultApi,
} from "./api";
import { Configuration } from "./configuration";

// dev環境
const basePath = "http://localhost:8080";

const option = {};

export const videoDataApi = new DefaultApi({baseOptions:option, basePath:basePath} as Configuration);