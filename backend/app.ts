import { config } from "./config/config";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";

const app = express();
const port = config.port;

app.use(express.json());

const whitelist = ["http://localhost:3256/", "http://localhost:3000/"];
const options = {
    origin: (
        origin: any,
        callback: (arg0: Error | null, arg1: boolean | undefined) => void,
    ) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("no permitido"), false);
        }
    },
};
app.use(cors(options));

app.get("/", (_req: Request, _res: Response, _next: NextFunction) => {
    _res.send("Hola mi server en express");
});

app.listen(port, () => {
    console.log(`Running in http://localhost:${port}`);
});
