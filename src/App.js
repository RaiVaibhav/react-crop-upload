import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Crop from './Crop';
import Preview from './Preview';
import "./App.css";

class App extends PureComponent {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Crop} />
            <Route path="/preview" exact component={Preview} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
