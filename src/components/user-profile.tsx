import { UserProfileMenuItem } from "@components/user-profile-menu-item";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import MenuUnstyled from "@mui/base/MenuUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import {
  IconBuildingCommunity,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useRef, useState } from "react";
import { useOrganizations } from "../contexts/organizations-provider";

export const UserProfile = () => {
  const { setOrganization, organization, organizations } = useOrganizations();
  const { data: userSession } = useSession();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const preventReopenRef = useRef(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (preventReopenRef.current) {
      e.preventDefault();
      preventReopenRef.current = false;
      return;
    }

    setAnchorEl(!isOpen ? e.currentTarget : null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      preventReopenRef.current = true;
    }
  };

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });

    router.push("/login");
    handleMenuClose();
  };

  const handleSwitchOrganization = (id: string) => {
    setOrganization(id);
  };

  return (
    <>
      <ButtonUnstyled
        onClick={handleButtonClick}
        onMouseDown={handleButtonMouseDown}
        ref={buttonRef}
        className="group flex items-center gap-2"
      >
        <div className="flex  flex-col justify-center">
          <div>{userSession?.user?.name}</div>
          <div className="text-right text-sm text-gray-400">
            {organization?.name}
          </div>
        </div>
        <div
          className={`rounded text-slate-400 group-hover:bg-slate-800 ${
            isOpen ? "bg-slate-800" : ""
          }`}
        >
          {isOpen ? <IconChevronUp /> : <IconChevronDown />}
        </div>
      </ButtonUnstyled>
      <MenuUnstyled
        slots={{ root: PopperUnstyled }}
        slotProps={{
          root: {
            placement: "bottom-end",
            className:
              "rounded-lg shadow border-slate-200 dark:border-slate-700 border bg-slate-50 dark:bg-gray-900 min-w-[260px] !top-2 py-1",
          },
        }}
        open={isOpen}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
      >
        <Link href="/settings" onMouseUp={() => handleMenuClose()} passHref>
          <UserProfileMenuItem as="a" icon={IconSettings}>
            Indstillinger
          </UserProfileMenuItem>
        </Link>
        <UserProfileMenuItem divider />
        {organizations.map((organization) => {
          return (
            <UserProfileMenuItem
              as={ButtonUnstyled}
              onClick={() => handleSwitchOrganization(organization.id)}
              icon={IconBuildingCommunity}
              key={organization.id}
            >
              {organization.name}
            </UserProfileMenuItem>
          );
        })}
        <UserProfileMenuItem divider />
        <UserProfileMenuItem
          as={ButtonUnstyled}
          onClick={handleSignOut}
          icon={IconLogout}
        >
          Log ud
        </UserProfileMenuItem>
      </MenuUnstyled>
    </>
  );
};
