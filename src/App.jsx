import React from "react";
import { NoteProvider } from "./NoteContext";
import AppUI from "./components/AppUI";

function App() {
  return (
    <>
      <NoteProvider>
        <AppUI />
      </NoteProvider>
    </>
  );
}

export default App;
