import {
  IconCalendar,
  IconFile,
  IconHome,
  IconMail,
  IconUser
} from "@tabler/icons";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Container } from "./container";
import { NavBarLink } from "./nav-bar-link";
import { UserProfile } from "./user-profile";

const menuItems = [
  {
    name: "Husstande",
    url: "/homes",
    icon: <IconHome size={20} />,
  },
  {
    name: "Beboere",
    url: "/homeowners",
    icon: <IconUser size={20} />,
  },
  {
    name: "Beskeder",
    url: "/messages",
    icon: <IconMail size={20} />,
  },
  {
    name: "Dokumenter",
    url: "/documents",
    icon: <IconFile size={20} />,
  },
  {
    name: "Kalender",
    url: "/calendar",
    icon: <IconCalendar size={20} />,
  },
];

export const NavBar = () => {
  const router = useRouter();

  const isActive = useCallback(
    (url: string) => {
      const currentUrl = router.pathname.substring(1);
      const menuLinkUrl = url.substring(1);

      return currentUrl.startsWith(menuLinkUrl);
    },
    [router.pathname]
  );

  const classes = classNames("flex h-20 bg-slate-900 text-white");

  return (
    <div className={classes}>
      <Container className="flex justify-between">
        <div className="flex flex-1 items-center">
          <div className="text-xl">Bolek</div>
          <div className="ml-8 mr-2 h-[60%] border-r border-r-slate-800"></div>
          <ul className="col-span-4 flex h-full">
            {menuItems.map((x) => {
              const active = isActive(x.url);

              return (
                <li key={x.name} className="flex h-full items-center">
                  <NavBarLink href={x.url}>
                    <a
                      className={`relative flex h-full items-center gap-2 px-6 transition-all hover:bg-slate-800/50 ${active ? "!bg-slate-800" : ""
                        }`}
                    >
                      <div
                        className={active ? "text-slate-200" : "text-slate-400"}
                      >
                        {x.icon}
                      </div>
                      {x.name}
                    </a>
                  </NavBarLink>
                </li>
              );
            })}
          </ul>
        </div>

        <UserProfile />
      </Container>
    </div>
  );
};
