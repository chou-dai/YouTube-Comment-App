import {
    DefaultApi,
} from "./api";
import { Configuration } from "./configuration";

const protocol = location.protocol;
const hostname = location.hostname;
const basePath = protocol + "//" + hostname + ":8080";

const option = {};

export const videoDataApi = new DefaultApi({baseOptions:option, basePath:basePath} as Configuration);