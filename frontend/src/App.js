import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPostit from "./components/add-postit";
import PostitsList from "./components/postits-list";

function App() {
  // const [user, setUser] = React.useState(null);
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            POSTIT
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/postit-creation"} className="nav-link">
                Create new Postit
              </Link>
            </li>
          </div>
        </nav>
      </div>

      <Switch>
        <Route exact path={["/"]} component={PostitsList} />
        <Route
          path="/postit-creation"
          render={(props) => <AddPostit {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
