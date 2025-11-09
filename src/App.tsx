import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";
import type { RouteObject } from "react-router-dom";

// Lazy load components for better code splitting
const Home = lazy(() => import("./components/home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
      <p className="mt-4 text-slate-300">Loading...</p>
    </div>
  </div>
);

function App() {
  // Only import routes when VITE_TEMPO is true
  const TempoRoutes = () => {
    const [routes, setRoutes] = useState<RouteObject[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      if (import.meta.env.VITE_TEMPO === "true") {
        // Dynamic import to prevent accessing routes before initialization
        import("tempo-routes")
          .then((module) => {
            if (module && module.default) {
              setRoutes(module.default);
            } else {
              console.warn(
                "Tempo routes module loaded but default export is missing"
              );
            }
          })
          .catch((err) => {
            console.error("Failed to load tempo routes:", err);
            setError(err as Error);
          });
      }
    }, []);

    if (error) {
      console.debug("Error loading tempo routes, continuing without them");
      return null;
    }

    return routes ? useRoutes(routes) : null;
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* Add a catch-all route for Tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={null} />
          )}
        </Routes>
        <TempoRoutes />
        <Toaster />
      </div>
    </Suspense>
  );
}

export default App;
