import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const LOCAL_STORAGE_KEY = 'BOLEK_CURRENT_ORGANIZATION_ID'

type Organization = {
  name: string;
  id: string;
};

type OrganizationsContextProps = {
  organization: Organization | undefined;
  organizations: Organization[];
  setOrganization: (organizationId: string) => void;
};

const OrganizationsContext = createContext<
  OrganizationsContextProps | undefined
>(undefined);

export const useOrganizations = () => {
  const context = useContext(OrganizationsContext);

  if (context === undefined) {
    throw new Error(
      "useOrganizations must be used within a NotificationProvider"
    );
  }

  return context;
};

export const OrganizationsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setOrganizations([
      {
        id: "gf",
        name: "GF Kongelunden",
      },
      {
        id: "tubavej",
        name: "Tubavej",
      },
    ]);
  }, [setOrganizations]);

  const organization = useMemo(() => {
    const id = String(router.query.organizationId);
    const localOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);
    const organization = organizations.find((x) => x.id === id);



    return (
      organizations.find((x) => x.id === id) ?? organizations[0] ?? undefined
    );
  }, [organizations, router.query.organizationId]);

  const setOrganization = (organizationId: string) => {
    if (router.query.organizationId) {
      router.replace({
        query: { organizationId },
      });
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, organizationId)
  };

  return (
    <OrganizationsContext.Provider
      value={{ organization, organizations, setOrganization }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};
