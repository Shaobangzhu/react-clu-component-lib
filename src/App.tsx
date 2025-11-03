import React from "react";
import Menu from "./components/Menu/menu.tsx";
import MenuItem from "./components/Menu/menuItem.tsx";

const App: React.FC = () => {


  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default App;
