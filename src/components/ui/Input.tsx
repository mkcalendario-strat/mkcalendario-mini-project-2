interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  className?: string;
}

export default function Input({
  id,
  placeholder,
  className,
  ...props
}: InputProps) {
  const baseClasses = "flex flex-col gap-1";
  const classes = `${baseClasses} ${className ?? ""}`.trim();

  return (
    <div className={classes}>
      <label
        htmlFor={id}
        className="text-lg font-medium">
        {placeholder}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-none border-2 p-[10px] font-[500] outline-0"
      />
    </div>
  );
}
