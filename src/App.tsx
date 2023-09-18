import React from 'react';
import router from "./routes/routes";
import {RouterProvider} from "react-router-dom";
import Header from "./components/Header/Header";


function App() {
  return (
    <div >
        <Header/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
