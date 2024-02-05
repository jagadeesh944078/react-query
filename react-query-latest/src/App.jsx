import { useState } from "react";
import "./App.css";
import PostLists from "./components/PostLists";

function App() {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <div className="title">Post Title</div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle && <PostLists />}
    </div>
  );
}

export default App;
