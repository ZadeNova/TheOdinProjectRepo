import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import "./index.css";
import routes from "./components/router.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
);
