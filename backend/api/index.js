import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import ProductRoute from "./routes/produkRoute.js";
import ColorRoute from "./routes/colorRoute.js";
import BrandRoute from "./routes/brandRoute.js";
import SeriesRoute from "./routes/seriesRoute.js";
import AuthRoute from "./routes/authRoute.js";
import CartRoute from "./routes/cartRoute.js";
import OrderRoute from "./routes/orderRoute.js";
// import AuthRoute2 from "./routes/authRoute2.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const router = express.Router();
app.use("/api", router);

// For Google Cloud Functions
router.use("/product", ProductRoute);
router.use("/color", ColorRoute);
router.use("/brand", BrandRoute);
router.use("/series", SeriesRoute);
router.use("/auth", AuthRoute);
router.use("/cart", CartRoute);
// router.use("/admin/admin", AuthRoute2);
// router.use("/wishlist", WishlistRoute);
router.use("/order", OrderRoute);

app.listen(process.env.API_PORT, () =>
  console.log("Server berhasil dijalankan.")
);
