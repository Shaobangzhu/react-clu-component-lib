import React from "react";
import Alert, { AlertType } from "./components/Alert/alert.tsx";

const App: React.FC = () => {
  const handleClose = () => {
    console.log("Alert closed!");
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Alert Component Demo</h2>

      <Alert
        title="Success!"
        description="Data saved successfully."
        type="success"
        onClose={handleClose}
      />

      <Alert
        title="Warning!"
        description="Be careful with your next action."
        type="warning"
      />

      <Alert
        title="Danger!"
        description="This is a danger alert."
        type="danger"
      />

      <Alert title="Default Alert" />
    </div>
  );
};

export default App;
