import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import { RankVideoListReducer } from "../videoDataResponse";

const createStore = () => {
    // const logger = createLogger({
    //     collapsed: true,
    //     diff: true
    // });

    return reduxCreateStore(
        combineReducers({
            videoDataList: RankVideoListReducer
        }),

        applyMiddleware(
            // logger,
            thunk
        )
    );
};

const store = createStore();

export default store;