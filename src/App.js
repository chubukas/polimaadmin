import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { AllRoutes } from "./routers";
import { Preloader } from "./components/loader/Preloader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <ErrorBoundary>
            <AllRoutes />
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
