import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./tailwind.css";
import SampleProvider from "./SampleProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SampleProvider>
      <App />
    </SampleProvider>
  </React.StrictMode>
);
