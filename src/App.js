import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./App.css";

import CreatePaymentProfileDialog from "./components/CreatePaymentProfileDialog";

const App = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleToggle = () => setShowDialog(!showDialog);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleToggle}>Create Payment Profile</Button>
      </header>

      <CreatePaymentProfileDialog
        isOpen={showDialog}
        onClose={handleToggle}
      />
    </div>
  );
};

export default App;
