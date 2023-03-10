// import React, { useCallback, useState } from "react";
// import Button from "./components/UI/Button/Button";
// import "./App.css";
// import DemoOutput from "./components/Demo/DemoOutput";

// function App() {
//   const [showParagraph, setShowParagraph] = useState(false);
//   const [allowToggle, setAllowToggle] = useState(false);

//   const toggleParagraphHandler = useCallback(() => {
//     if (allowToggle) {
//       setShowParagraph(prevShowParagraph => !prevShowParagraph);
//     }
//   }, [allowToggle]);

//   const allowToggleHandler = () => {
//     setAllowToggle(prevAllowToggle => !prevAllowToggle);
//   };

//   console.log("APP RUNNING");
//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={showParagraph} />
//       <Button onClick={allowToggleHandler}>Allow Toggle!</Button>
//       <Button onClick={toggleParagraphHandler}>Show Paragraph!</Button>
//     </div>
//   );
// }

// export default App;

import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList
        title={listTitle}
        items={listItems}
      />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
