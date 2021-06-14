import PostitsDAO from "../dao/postitsDAO.js";
import mongodb from "mongodb";

export default class PostitsController {
  //API for getting all the postits
  static async apiGetPostits(req, res, next) {
    try {
      const postits = await PostitsDAO.getPostits();
      res.json(postits);
    } catch (e) {
      console.log(`api, ${e}`);
    }
  }
  //ONE POSTIT
  static async apiGetPostit(req, res, next) {
    try {
      const postit = await PostitsDAO.getPostit(req.body._id);
      res.json("API ONE POSTIT => " +postit);
    } catch (e) {
      console.log(`api, ${e}`);
    }
  }

  //API for creating a postit
  static async apiCreatePostit(req, res, next) {
    try {
      const title = req.body.title;
      const content = req.body.content;
      const deadline = req.body.deadline;
      const date = new Date();

      const postitAddRes = await PostitsDAO.addPostit(
        title,
        content,
        deadline,
        date
      );
      res.json({ status: "Postit created successfully !" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  //API for updating a postit
  static async apiUpdatePostit(req, res, next) {
    try {
      const postitId = req.body._id;
      const title = req.body.title;
      const content = req.body.content;
      const deadline = req.body.deadline;
      const date = new Date();

      const postitEditRes = await PostitsDAO.editPostit(
        postitId,
        title,
        content,
        deadline,
        date,
      );
      
      var {error} = postitEditRes;
      if(error){
        res.status(400).json({error});
      }
      res.json({ status: "Postit updated successfully !" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  //API for deleting a postit
  static async apiDeletePostit(req, res, next) {
    try {
      const postitId = req.query.id;
      console.log(postitId);
      const postitDelRes = await PostitsDAO.deletePostit(postitId);
      res.json({ status: "Postit deleted successfully !" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
