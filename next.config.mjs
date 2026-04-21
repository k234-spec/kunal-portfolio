/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://open.spotify.com",
              "frame-src 'self' https://open.spotify.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.emailjs.com https://api.spotify.com https://accounts.spotify.com https://vitals.vercel-insights.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
