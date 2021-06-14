import http from "../http-common";

class PostitsDataService{
    //functions to get infos from api calls
    getAll() {
        return http.get("/");
      }

    // get(id){
    //     return http.get(`postit/id?id=${id}`);
    // }

    createPostit(data){
      return http.post("/postit", data);
    }

    updatePostit(data){
      return http.put("/postit", data);
    }

    deletePostit(id){
      return http.delete(`/postit?id=${id}`);
    }
}


export default new PostitsDataService(); //Verify this why new class ??