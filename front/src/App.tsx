import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import HomeScreen from './screens/HomeScreen'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>,
  },
]);

function render() {
  ReactDOM.createRoot(document.getElementById("root")).render(
      <RouterProvider router={router} />
  );
}

render();
