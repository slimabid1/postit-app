import dotenv from "dotenv";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

dotenv.config(); //process.env

let psts;

export default class PostitsDAO {
  //Verify DB connectivity
  static async injectDB(connection) {
    if (psts) {
      return;
    }
    try {
      psts = connection
        .db(process.env.POSTITS_NS)
        .collection(process.env.POSTITS_COL);
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostitsDAO: ${e}`
      );
    }
  }

  //listing the postits from DB
  static async getPostits() {
    try {
      let pList = [];
      //console.log("Postits : ");
      await psts.find().forEach((postits) => {
        pList.push(postits);
      });
      //console.log(pList);
      return pList;
    } catch (e) {
      console.log(e);
    }
  }

    //GET ONE POSTIT from DB
  static async getPostit(id) {
      try {
        let pList = [];
        //console.log("Postits : ");
        const onePostit = await psts.find(id).forEach((postit) => {
          pList.push(postit);
        });
        console.log("is it "+ pList);
        return onePostit;
      } catch (e) {
        console.log(e);
      }
  }

  //Adding new postit
  static async addPostit(title, content, deadline, date) {
    try {
      const postitDoc = {
        title: title,
        content: content,
        deadline: deadline,
        date_creation: date,
      };
      return await psts.insertOne(postitDoc);
    } catch (e) {
      console.error(`Unable to add postit. ${e}`);
      return { error: e };
    }
  }
  //Editing postit
  static async editPostit(postitId, title, content, deadline) {
    try {
      const updateResponse = await psts.updateOne(
        { _id: ObjectId(postitId)},
        { $set: {title: title, content: content, deadline: deadline}},
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to add postit. ${e}`);
      return { error: e };
    }
  }

  static async deletePostit(postitId) {
    try {
      const deleteResponse = await psts.removeOne({
        _id: ObjectId(postitId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
}
