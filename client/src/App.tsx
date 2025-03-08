import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProcessSync from "@/pages/ProcessSync";
import Multithreading from "@/pages/Multithreading";
import VirtualMemory from "@/pages/VirtualMemory";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="min-h-screen bg-background flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-background/95">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/process-sync" component={ProcessSync} />
          <Route path="/multithreading" component={Multithreading} />
          <Route path="/virtual-memory" component={VirtualMemory} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;