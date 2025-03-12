// dependencies
import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routers";
import { errorHandler } from "./errorHandler";

// initialize express
const app = express();
const PORT = 3000;

// Configuration
app.disable('x-powered-by');
app.disable('etag');

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(json());

// Routes
app.use("/", routes);

// Error Handlers
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
