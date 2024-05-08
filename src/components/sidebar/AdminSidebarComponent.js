import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "src/context/UserContext";
import imageLogoWhite from "src/assets/logo.svg";
import { PageContext } from "src/context/PageContext";
import { SidebarContext } from "src/context/SidebarContext";
import { FiX, FiHome, FiLogOut } from "react-icons/fi";
import { AuthServices } from "src/services/AuthServices";

const menus = [
  {
    name: "Beranda",
    icon: FiHome,
    role: ["admin"],
    link: "/",
  },
  {
    name: "Kategori Berita",
    icon: FiHome,
    role: ["admin"],
    link: "/category-news",
  },
  {
    name: "Berita",
    icon: FiHome,
    role: ["admin"],
    link: "/news",
  },
  {
    name: "Kategori Edukasi",
    icon: FiHome,
    role: ["admin"],
    link: "/category-education",
  },
  {
    name: "Edukasi",
    icon: FiHome,
    role: ["admin"],
    link: "/education",
  },
  {
    name: "Kategori Promotion",
    icon: FiHome,
    role: ["admin"],
    link: "/category-promotion",
  },
  {
    name: "Pesanan",
    icon: FiHome,
    role: ["admin"],
    link: "/order",
  },
  {
    name: "Profile",
    icon: FiHome,
    role: ["admin"],
    link: "/my-profile",
  },
];

export function AdminSidebarComponent() {
  const navigate = useNavigate();

  const authServices = new AuthServices();

  const { user, setUser } = useContext(UserContext);
  const { page, setPage } = useContext(PageContext);
  const { sidebar, setSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const path = window.location.pathname;
    const page = path.split("/")[1];

    const index = menus.findIndex((menu) => {
      const tempPage = menu.link.split("/")[1];
      return tempPage == page;
    });
    setPage(menus[index].name);
  }, []);

  async function handleLogout() {
    await authServices.SignOut();
    document.cookie = "token=; Max-Age=0";
    window.location.href = "/";
  }

  return (
    <div id="sidebar" className="p-5 bg-primary-main h-screen">
      <button
        onClick={() => {
          setSidebar(false);
        }}
        className="absolute right-2 top-4 md:hidden"
      >
        <FiX color="fff" size={24} />
      </button>
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center gap-4">
          <div className="w-10">
            <img src={imageLogoWhite} className="rounded-md" alt="Logo" />
          </div>
          <h4 className="f-h4 text-white">ADMIN ARTI</h4>
        </div>

        <div className="flex flex-col gap-1 mt-4 grow">
          {menus.map((menu, index) => {
            if (menu.role.includes(user.role)) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setPage(menu.name);
                    navigate(menu.link);
                  }}
                  className={`flex items-center gap-4 py-3 px-3 rounded-md hover:bg-slate-900 text-white hover:bg-opacity-30 ${
                    page == menu.name ||
                    (page == "" && menu.name == "Dashboard")
                      ? "bg-slate-900 bg-opacity-30"
                      : ""
                  }`}
                >
                  <div className="w-5">
                    <menu.icon />
                  </div>
                  <h4 className="uppercase text-[12px] font-bold text-left">
                    {menu.name}
                  </h4>
                </button>
              );
            }
          })}

          <button
            onClick={() => handleLogout()}
            className="md:hidden flex items-center w-full gap-4 py-3 px-3 rounded-md hover:bg-slate-900 hover:bg-opacity-30 mt-4 text-white"
          >
            <div className="w-5">
              <FiLogOut />
            </div>
            <h4 className="uppercase text-[10px] font-bold">Log Out</h4>
          </button>
        </div>

        <div className="md:flex hidden">
          <button
            onClick={() => handleLogout()}
            className="flex items-center w-full gap-4 py-3 px-3 rounded-md hover:bg-slate-900 hover:bg-opacity-30 text-white"
          >
            <div className="w-5">
              <FiLogOut />
            </div>
            <h4 className="uppercase text-[10px] font-bold">Log Out</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
