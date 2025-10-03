import { Hono } from "hono";

import { ENV } from "./env";

import { APIRouter } from "./api/v0";

import { UserRouter } from "./pages/[user_name]";
import { HandleHomePage } from "./pages";
import { HandleSearchPage } from "./pages/search";
import { HandleAuthPage } from "./pages/login";


const app = new Hono<{ Bindings: ENV }>();


// API routes:
app.route("/api/v0", APIRouter);

// Web UI top-level routes (specific routes first):
app.get("/login",  (c) => HandleAuthPage(c));
app.get("/search", (c) => HandleSearchPage(c));
app.get("/",       (c) => HandleHomePage(c));

// Web UI user routes (catch-all pattern last):
app.route("/:user_name", UserRouter);


export default app;



