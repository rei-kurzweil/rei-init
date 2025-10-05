import { Hono } from "hono";

import { ENV } from "./env";

import { APIRouter } from "./api/v0";

import { UserRouter } from "./pages/[user_name]";
import { HandleSearchPage } from "./pages/search";
import { HandleAuthPage } from "./pages/login";
import { HandleHomePage } from "./pages";
import { HandleSpaAssets } from "./spa-assets";


const app = new Hono<{ Bindings: ENV }>();


// API routes:
app.route("/api/v0", APIRouter);

// Block WordPress admin requests
app.get("/wp-admin/*", (c) => c.text("Not Found", 404));
app.get("/wp-*", (c) => c.text("Not Found", 404));

// Static asset routes with correct MIME types for SPA files
app.get("/apps/*", async (c) => HandleSpaAssets(c));

// Web UI top-level routes (specific routes first):
app.get("/login",  (c) => HandleAuthPage(c));
app.get("/search", (c) => HandleSearchPage(c));
app.get("/",       (c) => HandleHomePage(c));

// Web UI user routes (catch-all pattern last):
app.route("/:user_name", UserRouter);


export default app;



