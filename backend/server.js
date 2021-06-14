
import express from "express";
import cors from "cors";
import Postits from "./api/postits-route.js";
// const express = require("express");
// const cors = require("cors");
// const Postits = require("./api/postits-route.js");
//const PostitsCtrl = require("./api/postits-controller.js");

//to make the server
const app = express();

//The middleware
app.use(cors());
app.use(express.json());

app.use("/", Postits);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))
// app.get("/", (req, res) => {
//   PostitsCtrl.PostitsController.apiGetPostits(req, res).then((result) => {
//     const databaseArray = [];
//     databaseArray.push(req.body);
//     res.json(result);
//   });
// });
export default app;
