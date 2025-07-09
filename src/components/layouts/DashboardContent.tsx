interface DashboardContentProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function DashboardContent({
  title,
  description,
  className,
  children
}: DashboardContentProps) {
  return (
    <section className="pb-[75px]">
      <div className="container">
        <Title
          title={title}
          description={description}
        />

        <div className={className}>{children}</div>
      </div>
    </section>
  );
}

interface TitleProps {
  title?: string;
  description?: string;
}

function Title({ title, description }: TitleProps) {
  if (!title && !description) return null;

  return (
    <div className="pb-[25px]">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p>{description}</p>
    </div>
  );
}
