import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import Galaxy from "./Galaxy";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Galaxy background */}
      <div className="fixed inset-0 z-0">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.4}
          saturation={0.6}
          hueShift={240}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};