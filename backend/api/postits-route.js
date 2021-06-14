import express from "express";
import PostitsCtrl from "./postits-controller.js";

const router = express.Router();
//API getting all postits
router.route("/api/v1/postits").get(PostitsCtrl.apiGetPostits);

//TODO API for getting postit by ID
//here

//APIs CRUD postits
router
  .route("/api/v1/postits/postit")
  .post(PostitsCtrl.apiCreatePostit)
  .put(PostitsCtrl.apiUpdatePostit)
  .delete(PostitsCtrl.apiDeletePostit);
// .get(PostitsCtrl.apiGetPostit)
export default router;
