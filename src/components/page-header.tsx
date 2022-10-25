import { Container } from "@components/container";
import { ReactNode } from "react";

type Props = {
  title: string;
  actions?: ReactNode;
};

export const PageHeader = ({ actions, title }: Props) => {
  return (
    <div className="bg-gray-100 border-gray-200 border-b h-24 flex items-center">
      <Container className="flex justify-between items-center">
        <h1 className="font-bold text-xl">{title}</h1>
        {actions && actions}
      </Container>
    </div>
  );
};
