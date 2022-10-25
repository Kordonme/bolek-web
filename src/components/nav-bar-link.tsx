import Link from "next/link";
import { ComponentProps } from "react";
import { useOrganizations } from "../contexts/organizations-provider";

type Props = ComponentProps<typeof Link>

export const NavBarLink = ({ href, ...props }: Props) => {
  const { organization } = useOrganizations();
  const linkHref = `/${organization?.id}${href}`

  return <Link href={linkHref} {...props} />
}