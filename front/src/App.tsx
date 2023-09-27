import * as React from "react";

import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import HomeScreen from './screens/HomeScreen'
import ServiceScreen from "./screens/ServiceScreen";

const router = createHashRouter([
  {
    path: "/",
    element: <HomeScreen/>,
  },
  {
    path: "/:service",
    element: <ServiceScreen/>,
  }
]);

function App(): React.JSX.Element {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
