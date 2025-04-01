
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ExplorePage from "./pages/ExplorePage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";

// Install Three.js for particle background
import * as THREE from 'three';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
