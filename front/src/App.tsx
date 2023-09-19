import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import HomeScreen from './screens/HomeScreen'

const router = createHashRouter([
  {
    path: "/",
    element: <HomeScreen/>,
  },
]);

ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");