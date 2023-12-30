/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/invite",
      destination:
        "https://discord.com/api/oauth2/authorize?client_id=1190299944062570627&permissions=26640&scope=bot%20applications.commands",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/icons/**",
      },
    ],
  },
};

module.exports = nextConfig;
