import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Using Switch for v5
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import Home from "./routes/Home";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;