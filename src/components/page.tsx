import { Container } from "@components/container";
import { PageHeader } from "@components/page-header";
import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title: string;
  actions?: ReactNode;
}>;

export const Page = ({ title, actions, children }: Props) => {
  return (
    <>
      <PageHeader title={title} actions={actions} />

      <div className="py-6">
        <Container>{children}</Container>
      </div>
    </>
  );
};
