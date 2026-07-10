type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-preset-2 font-bold">{title}</h1>
      <p className="text-preset-3 text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
