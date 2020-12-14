import "./App.css";
import Table from "./components/Table";
import React, { useState } from "react";
import CheckBoxs from "./components/CheckBoxs";
function App() {
  const [searchBook, setBook] = useState("");
  const handleChange = (event) => {
    setBook(event.target.value);
  };

  return (
    <div className="mx-2">
      <div className="input-group mt-5">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar libro"
          onChange={handleChange}
          value={searchBook}
        />
      </div>

      <div className="d-flex flex-row">
        <Table searchData={searchBook} />

     
      </div>
    </div>
  );
}

export default App;
