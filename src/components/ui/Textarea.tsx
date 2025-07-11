interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  tip?: string;
  placeholder: string;
  className?: string;
}

export default function Textarea({
  id,
  placeholder,
  className,
  tip,
  ...props
}: InputProps) {
  const baseClasses = "flex flex-col gap-1";
  const classes = `${baseClasses} ${className ?? ""}`.trim();

  return (
    <div className={classes}>
      <div className="flex flex-wrap items-center gap-1">
        <label
          htmlFor={id}
          className="text-lg font-medium">
          {placeholder}
        </label>
        {tip && (
          <p className="bg-neutral-900/20 px-[6px] py-[3px] text-xs">{tip}</p>
        )}
      </div>
      <textarea
        id={id}
        {...props}
        className="w-full rounded-none border-2 p-[10px] font-[500] outline-0"
      />
    </div>
  );
}
