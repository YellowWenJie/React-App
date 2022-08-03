import React from "react";
import TopNavBar from "./components/TopNavBar";
import Content from "./views/Content";
import "./App.css";
import Theme from "./components/theme/theme";

function App() {
  return (
    <>
      <Theme>
        {/*导航栏*/}
        <TopNavBar/>
        <Content/>
      </ Theme>
    </>
  );
}

export default App;
