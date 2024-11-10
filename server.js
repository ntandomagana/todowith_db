import http from "http";
import { app } from "./expressRoutes.js";

const port = 3000;

const server = http.createServer(app).listen(port);
