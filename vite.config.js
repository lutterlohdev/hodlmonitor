import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      filename: "sw-pwa.js",
      registerType: "autoUpdate",
      injectRegister: false,
      manifest: false,
      workbox: {
        cleanupOutdatedCaches: true,
        globIgnores: ["**/build/**", "**/sw.js", "**/sw.js.map", "**/workbox-*.js"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.coingecko\.com\/api\/v3\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "coingecko-api-v1",
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 15,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "font-files-v1",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-v1",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
