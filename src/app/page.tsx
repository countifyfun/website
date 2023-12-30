export default function Landing() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] max-w-[90rem] mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 grow">
        <div className="flex flex-col text-center md:text-left items-center md:items-start justify-center gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold [text-wrap:balance] tracking-tighter">
              Meet your{" "}
              <span className="relative whitespace-nowrap bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                dream counting bot
                <SquigglyLines />
              </span>
              .
            </h1>
            <p className="text-neutral-400 [text-wrap:pretty]">
              Keep your counting channel clean and organized with Countify.
            </p>
          </div>
          <a
            href="/invite"
            className="bg-yellow-500/30 border border-yellow-300 px-4 py-2 rounded-full hover:bg-yellow-500/40 transition-colors flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
            </svg>
            Add Countify
          </a>
        </div>
        <div className="flex flex-col items-center justify-center text-center grow perspective-250">
          <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 rounded-lg w-64 lg:w-72 xl:w-80 flex flex-col gap-3 relative md:-rotate-y-3 rotate-x-3 transform-style-3d">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold">#</p>
              <p className="text-lg">counting</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-center text-xl font-bold bg-blue-400">
                T
              </div>
              <div className="text-left">
                <p className="text-xs">Terry</p>
                <p className="text-2xl">997</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-center text-xl font-bold bg-fuchsia-500">
                M
              </div>
              <div className="text-left">
                <p className="text-xs">Mark</p>
                <p className="text-2xl">998</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-center text-xl font-bold bg-blue-400">
                T
              </div>
              <div className="text-left">
                <p className="text-xs">Terry</p>
                <p className="text-2xl">999</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-center text-xl font-bold bg-fuchsia-500">
                M
              </div>
              <div className="text-left">
                <p className="text-xs">Mark</p>
                <p className="text-2xl">1000</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-center text-xl font-bold bg-blue-700">
                G
              </div>
              <div className="text-left">
                <p className="text-xs">Gerald</p>
                <p className="text-2xl text-red-500">1000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SquigglyLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 418 42"
      className="absolute top-2/3 left-0 h-[0.48em] w-full fill-yellow-300/60"
      preserveAspectRatio="none"
    >
      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
    </svg>
  );
}
