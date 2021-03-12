import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header, { HeaderRoute } from "./components/Header";
import MainContainer from "./components/MainContainer";

import Home from "./pages/Home";
import Top from "./pages/Top";

export default function App() {
  const routes: HeaderRoute[] = [
    { text: "Home", path: "/" },
    { text: "Top", path: "/top" },
  ];

  return (
    <div className="App">
      <Router>
        <Header routes={routes} />

        <MainContainer>
          <Switch>
            <Route path="/top">
              <Top />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </MainContainer>
      </Router>
    </div>
  );
}
