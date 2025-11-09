import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { validateEnvironment } from "./lib/env";
import logger from "./lib/logger";

import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo devtools
TempoDevtools.init();

// Validate environment variables
try {
  validateEnvironment();
  logger.info("Environment validation successful");
} catch (error) {
  logger.error("Environment validation failed", error);
  // In production, you might want to show a user-friendly error page
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

