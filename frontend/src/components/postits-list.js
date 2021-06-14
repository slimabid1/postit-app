import React, { useState, useEffect } from "react";
import PostitsDataService from "../services/show-postits";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PostitsList = (props) => {
  const [postits, setPostits] = useState([]);

  //Retrieve all postits to display them client side
  const retrieveAllPostits = (props) => {
    PostitsDataService.getAll()
      .then((response) => {
        //Getting the data requested from the server and setting them into the client
        setPostits(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllPostits();
  }, []);

  const deletePostit = (postitId) => {
    PostitsDataService.deletePostit(postitId).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="row">
      {
        //Mapping the data retrieved to the key postits and then display it
        postits.map((postit) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{postit.title}</h5>
                  <p className="card-text">
                    <strong>Content: </strong>
                    {postit.content}
                    <br />
                    <strong>Deadline: </strong>
                    {postit.deadline}
                  </p>
                  <div className="row">
                    <a
                      onClick={() => {
                        deletePostit(postit._id);
                        window.top.location.reload();
                      }}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      Delete
                    </a>
                    <Link
                      to={{
                        pathname: "/postit-creation/" + postit._id + "/edit",
                        state: {
                          currentPostit: postit,
                        },
                      }}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default PostitsList;
