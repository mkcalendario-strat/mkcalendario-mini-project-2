"use client";

interface ModalProps {
  title: string;
  className?: string;
  toggle: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  toggle,
  children,
  className
}: ModalProps) {
  return (
    <div className="fixed top-0 left-0 z-[1] h-full w-full bg-neutral-900/50">
      <button
        onClick={toggle}
        className="fixed right-0 m-5 cursor-pointer">
        <i className="far fa-times text-2xl text-white" />
      </button>

      <div className="fixed top-[50%] left-[50%] max-h-[80vh] w-[90%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto bg-white p-[20px] md:w-[600px]">
        <div className="mb-7">
          <p className="text-xl font-medium">{title}</p>
        </div>

        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
