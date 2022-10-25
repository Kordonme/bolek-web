type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return <h2 className="mb-4 text-xl font-bold">{title}</h2>;
};
