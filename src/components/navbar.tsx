import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between border-b border-neutral-800 px-6">
      <Image
        src="/logo.png"
        alt="Countify Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex items-center">
        <Link
          href="https://docs.countify.fun"
          className="p-2 text-sm transition-all hover:text-primary-600"
        >
          Docs
        </Link>
      </div>
      <div className="flex items-center">
        <a href="/invite" className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
          </svg>
        </a>
      </div>
    </nav>
  );
}
