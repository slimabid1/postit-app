import React, { useState } from "react";
import PostitsDataService from "../services/show-postits";
import { Link } from "react-router-dom";

const AddPostit = (props) => {

  let initialPostitStateTitle = "";
  let initialPostitStateContent = "";
  let initialPostitStateDeadline = "";

  let editing = false;

  if (props.location.state && props.location.state.currentPostit) {
    editing = true;
    initialPostitStateTitle = props.location.state.currentPostit.title;
    initialPostitStateContent = props.location.state.currentPostit.content;
    initialPostitStateDeadline = props.location.state.currentPostit.deadline;
  }

  const [postitTitle, setPostitTitle] = useState(initialPostitStateTitle);
  const [postitContent, setPostitContent] = useState(initialPostitStateContent);
  const [postitDeadline, setPostitDeadline] = useState(
    initialPostitStateDeadline
  );

  const [submitted, setSubmitted] = useState(false);

  const handleInputTitle = (event) => {
    setPostitTitle(event.target.value);
  };
  const handleInputContent = (event) => {
    setPostitContent(event.target.value);
  };
  const handleInputDeadline = (event) => {
    setPostitDeadline(event.target.value);
  };

  const savePostit = () => {
    var data = {
      title: postitTitle,
      content: postitContent,
      deadline: postitDeadline,
    };

    if (editing) {
      data._id = props.location.state.currentPostit._id;
      PostitsDataService.updatePostit(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      PostitsDataService.createPostit(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link to="/" className="btn btn-primary">
            Back Home page
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="description">
              {editing ? "Edit" : "Create"} Postit{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={postitTitle}
              onChange={handleInputTitle}
              name="text"
            />
            <input
              type="text"
              className="form-control"
              id="content"
              required
              value={postitContent}
              onChange={handleInputContent}
              name="content"
            />
            <input
              type="date"
              className="form-control"
              id="deadline"
              required
              value={postitDeadline}
              onChange={handleInputDeadline}
              name="deadline"
            />
          </div>
          <button onClick={savePostit} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPostit;
