import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import CreateOrder from "./components/CreateOrder";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path={"/"} exact component={Home} />
        <Route path={"/new"} exact component={CreateOrder} />
      </BrowserRouter>
    </div>
  );
};

export default App;
