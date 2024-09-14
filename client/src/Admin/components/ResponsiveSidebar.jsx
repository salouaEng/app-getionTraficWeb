import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo1.png";
import "tailwind-scrollbar";

function ResponsiveSidebar({ sidebarOpen, setSidebarOpen }) {

  const { pathname } = useLocation(); // Get the current path
const [activeLink, setActiveLink] = useState(pathname); // Initialize with current pathname

useEffect(() => {
  setActiveLink(pathname); // Update activeLink on path change
}, [pathname]);

const handleClick = (link) => {
  setActiveLink(link);
};

  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard, margin: true },
    { name: "Profile", link: "/admin/profile", icon: AiOutlineUser },
    { name: "Calender", link: "/admin/calendar", icon: IoCalendarOutline },
    { name: "Clients", link: "/admin/client-generated-links", icon: HiOutlineUsers },
    { name: "Generated Links", link: "/admin/generated-links", icon: TbReportAnalytics },
  ];
  const menus2 = [
    { name: "Pricing", link: "/admin/pricing", icon: FiShoppingCart, margin: true },
    { name: "Setting", link: "/admin/setting", icon: RiSettings4Line },
  ];
  const menus3 = [
    { name: "messages", link: "/admin/message", icon: FiMessageSquare, margin: true },
    { name: "Logout", link: "/", icon: BiLogOut },
  ];

  return (
    <section className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-t from-[#033363] to-[#021F3B] dark:bg-blue-950 ${sidebarOpen ? "w-72" : "w-0"
        } duration-500 text-white px-4 overflow-hidden`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 w-[100px] h-auto rounded-full flex items-center justify-center ${!sidebarOpen && "rotate-[360deg] mt-3"
              }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <div className={`py-3 flex justify-first ${!sidebarOpen && "mt-4"}`}>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <div className="menu-container max-h-[calc(100vh-150px)] scrollable-container overflow-hidden hover:overflow-y-auto scrollbar-thumb-blue-300 scrollbar-track-blue-950 scrollbar-thin scrollbar-width-thin">
          <div className="mt-0 flex flex-col gap-4 relative ">
            <h2 className={`${!sidebarOpen && "hidden"} text-sm font-medium text-blue-200 px-3`}>Menu</h2>

            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:text-white ${menu.link === activeLink ? "bg-gradient-to-l from-cyan-500 to-blue-500" : "hover:bg-[#073980]"}`}
                onClick={() => handleClick(menu.link)}
                >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!sidebarOpen && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${sidebarOpen && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}

            <h2 className={`${!sidebarOpen && "hidden"} text-sm font-medium text-blue-200 px-3`}>Support</h2>

            {menus2?.map((menu2, i) => (
              <Link
                to={menu2?.link}
                key={i}
                className={` ${menu2?.margin && "mt-0"
                  } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:text-white ${menu2.link === activeLink ? "bg-gradient-to-l from-cyan-500 to-blue-500" : "hover:bg-[#073980]"}`}
                  onClick={() => handleClick(menu2.link)}>
                <div>{React.createElement(menu2?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!sidebarOpen && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu2?.name}
                </h2>
                <h2
                  className={`${sidebarOpen && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu2?.name}
                </h2>
              </Link>
            ))}
            <h2 className={`${!sidebarOpen && "hidden"} text-sm font-medium text-blue-200 px-3`}>Others</h2>

            {menus3?.map((menu3, i) => (
              <Link
                to={menu3?.link}
                key={i}
                className={` ${menu3?.margin && "mt-0"
                  } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:text-white ${menu3.link === activeLink ? "bg-gradient-to-l from-cyan-500 to-blue-500" : "hover:bg-[#073980]"}`}
                  onClick={() => handleClick(menu3.link)}
                  >
                <div>{React.createElement(menu3?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 2}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!sidebarOpen && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu3?.name}
                </h2>
                <h2
                  className={`${sidebarOpen && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu3?.name}
                </h2>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default ResponsiveSidebar;