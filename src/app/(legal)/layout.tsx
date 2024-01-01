import { ReactNode } from "react";

export default async function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <article className="prose prose-neutral prose-invert prose-h1:[text-wrap:balance] prose-h2:[text-wrap:balance] prose-p:[text-wrap:pretty] prose-li:[text-wrap:pretty] prose-a:text-yellow-300 mx-auto min-h-[calc(100vh-4rem)] w-full max-w-4xl p-6">
      {children}
    </article>
  );
}
