import Image from "next/image";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-neutral-900 p-5">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              width="30"
              height="30"
              alt="light logo"
              src="/assets/images/logos/light.svg"
            />
            <h1 className="text-2xl font-bold text-neutral-100">Large</h1>
          </div>

          <p className="text-neutral-100">
            &copy; {date.getFullYear()} Mark Kenneth Calendario
          </p>
        </div>
      </div>
    </footer>
  );
}
