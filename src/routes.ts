import { Router } from "express";
import NotificationController from "./controller/NotificationController";
import PixController from "./controller/PixController";
import { Request, Response } from "express";
const routes = Router();

routes.post("/create", PixController.create);
routes.get("/", PixController.consult);

routes.get("/push/getKey", NotificationController.getKey);
routes.post("/push/register", NotificationController.register);
routes.post("/push/send", NotificationController.send);

routes.post("/webhook/(/pix)?", (req: Request, res: Response) => {
    // Verifica se a requisição que chegou nesse endpoint foi autorizada
    if (req.body) { 
        res.status(200).end();
    } else {
        res.status(401).end();
    }
});

export default routes;
