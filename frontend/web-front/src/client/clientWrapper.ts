import {
    DefaultApi,
} from "./api";
import { Configuration } from "./configuration";

// const basePath = "http://133.18.238.196:8080";

const protocol = location.protocol;
const hostname = location.hostname;
const basePath = protocol + "//" + hostname + ":8080";

const option = {};

export const videoDataApi = new DefaultApi({baseOptions:option, basePath:basePath} as Configuration);