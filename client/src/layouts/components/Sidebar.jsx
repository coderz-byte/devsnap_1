import { AiFillPlusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router";
import { useLocation } from "react-router";

import AvatarImg from "@/assets/images/avatar.png";
import { Logo } from "@/components";
import MenuMore from "@/components/common/MenuMore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/context/theme-provider";
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

const iconSize = 25;

const Sidebar = () => {
  const { authUser } = useAuthStore();

  const location = useLocation();

  const { isDesktop } = useBreakPoints();

  const navLinks = [
    {
      name: "Feed",
      path: "/",
      icon: <GoHome size={iconSize} />,
      iconFill: <GoHomeFill size={iconSize} />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <IoSearchOutline size={iconSize} />,
      iconFill: <IoSearch size={iconSize} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <IoChatbubbleEllipsesOutline size={iconSize} />,
      iconFill: <IoChatbubbleEllipsesSharp size={iconSize} />,
    },
    // {
    //   name: "Notifications",
    //   path: "/notifications",
    //   icon: <PiBellSimpleLight size={iconSize} />,
    //   iconFill: <PiBellSimpleFill size={iconSize} />,
    // },
    {
      name: "Create",
      path: "/create",
      icon: <AiOutlinePlusSquare size={iconSize} />,
      iconFill: <AiFillPlusSquare size={iconSize} />,
    },
    {
      name: "Profile",
      path: `/user/${authUser?.username}`,
    },
  ];

  return (
    <div className="w-[60px] xl:w-[280px] px-2 xl:px-3 border-r shrink-0 fixed top-0 py-3 h-screen">
      {/* main content */}
      <div
        className={`flex flex-col justify-between ${!isDesktop && "items-center"} h-full`}
      >
        <div className="">
          <div className="xl:scale-80 xl:origin-left flex items-center justify-center xl:block py-3">
            <Logo textStyle="hidden xl:block" />
          </div>

          {/* Links */}
          <div className="flex flex-col mt-5 gap-2">
            {navLinks.map((link, idx) => (
              <Link
                to={link.path}
                key={idx}
                className={`hover:bg-accent p-2 xl:px-4 xl:py-2 rounded-lg flex items-center justify-center xl:justify-start gap-2 text-text-secondary ${location.pathname === link.path && "bg-accent"}`}
              >
                {link.name === "Profile" ? (
                  <>
                    <Avatar className="size-6">
                      <AvatarImage src={authUser?.profilePicture} alt="pfp" />
                      <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-xs font-semibold">
                        <img src={AvatarImg} alt="profilePicture" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden xl:inline-block sm:ml-[2px] text-lg font-medium">
                      {link.name}
                    </span>
                  </>
                ) : (
                  <>
                    {location.pathname === link.path
                      ? link.iconFill
                      : link.icon}
                    <span className="hidden xl:inline-block text-lg font-medium">
                      {link.name}
                    </span>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/*  */}
        <MenuMore>
          <div className="hover:bg-accent p-2 xl:px-4 xl:py-2 rounded-lg flex items-center justify-center xl:justify-start gap-2 text-text-secondary cursor-pointer">
            <IoMdMenu size={iconSize} />
            <span className="hidden xl:inline-block text-lg font-medium">
              More
            </span>
          </div>
        </MenuMore>
      </div>
    </div>
  );
};

export default Sidebar;
