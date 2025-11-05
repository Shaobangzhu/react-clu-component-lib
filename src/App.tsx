import React from "react";
import Menu from "./components/Menu/menu.tsx";
import MenuItem from "./components/Menu/menuItem.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex={0}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem index={1}>cool link 1</MenuItem>
          <MenuItem index={2} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={3}>cool link 3</MenuItem>
        </Menu>
        <Menu
          mode="vertical"
          defaultIndex={0}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem index={1}>cool link 1</MenuItem>
          <MenuItem index={2} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={3}>cool link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default App;
