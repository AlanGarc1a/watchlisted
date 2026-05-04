type MovieCardGridProps = {
  children: React.ReactNode;
};

const MovieCardGrid = ({ children }: MovieCardGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
  );
};

export default MovieCardGrid;
