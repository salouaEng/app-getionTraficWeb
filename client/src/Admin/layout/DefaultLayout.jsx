import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar';
import ResponsiveSidebar from '../components/ResponsiveSidebar';


const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  useEffect(() => {
    const rootElement = document.documentElement; // Access the root element

    if (theme === "dark") {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("dark theme");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("light theme");
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches); // Update isSmallScreen based on the media query
    };
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); // Initial check
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="bg-[#e5ecfd] dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {isSmallScreen ? (
          sidebarOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-999" >
              <ResponsiveSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          )
        ) : (
          <Sidebar />
        )}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header theme={theme} setTheme={setTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
