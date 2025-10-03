import { Hono } from "hono";

import ItemRouter from "./item";
import UserRouter from "./user";
import AuthRouter from "./auth";


export const APIRouter = new Hono();


APIRouter.route("/auth", AuthRouter);
APIRouter.route("/item", ItemRouter);
APIRouter.route("/user", UserRouter);
