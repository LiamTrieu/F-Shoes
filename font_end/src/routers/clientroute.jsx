import Home from "../pages/client/Home";
import Product from "../pages/client/Product";

const clientRoute = [
  { path: "/home", element: <Home />, index: true },
  { path: "/product", element: <Product /> },
];

export default clientRoute;
