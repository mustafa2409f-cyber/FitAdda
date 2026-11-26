import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { FloatingDecor } from "./FloatingDecor";
import { CelebrationToast } from "./CelebrationToast";
const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <div className="min-h-screen flex bg-[#FBF9FF] dark:bg-[#111317] text-[#1E1B2E] dark:text-[#F3F4F6] transition-colors duration-300 relative">
      <FloatingDecor variant="subtle" />

      <Sidebar
    mobileOpen={mobileMenuOpen}
    onCloseMobile={() => setMobileMenuOpen(false)}
  />

      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>

      <CelebrationToast />
    </div>;
};
export {
  Layout
};
