import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Layout } from "./components/layouts";
import "./css/index.css";
import store from "./redux/store/store";
import { Home } from "./components/pages";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
            </Routes>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();