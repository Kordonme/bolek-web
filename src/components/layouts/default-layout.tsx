import { NavBar } from "@components/nav-bar";
import { PropsWithChildren } from "react";
import { OrganizationsProvider } from "../../contexts/organizations-provider";

export const DefaultLayout = (props: PropsWithChildren) => {
  return (
    <OrganizationsProvider>
      <NavBar />
      {props.children}
    </OrganizationsProvider>
  );
};
