import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-neutral-900 mx-auto flex max-w-[90rem] justify-center py-12 text-gray-400 md:justify-start pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div>
        <a
          className="flex items-center justify-center gap-2 hover:opacity-75 md:justify-normal md:w-fit"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="Countify Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <h1 className="text-primary-600 text-2xl font-bold tracking-tight">
            Countify
          </h1>
        </a>
        <p className="mt-4 text-xs text-neutral-500">
          © 2023{" "}
          <a
            href="https://github.com/countifyfun"
            className="text-primary-600 underline decoration-from-font [text-underline-position:from-font]"
          >
            Countify Labs
          </a>{" "}
          (a subdivision of{" "}
          <a
            href="https://youtube.com/@graphifystatistics"
            className="text-primary-600 underline decoration-from-font [text-underline-position:from-font]"
          >
            Graphify Studios
          </a>
          ). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
