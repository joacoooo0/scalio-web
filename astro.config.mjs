import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://scalio-web.vercel.app",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-PE",
        },
      },
      filter: (page) => !page.includes("/gracias") && !page.includes("/admin"),
      serialize(item) {
        // Prioridad alta para homepage y servicios
        if (item.url === "https://scalio-web.vercel.app/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (
          item.url.includes("/servicios/") ||
          item.url.includes("/contacto")
        ) {
          item.priority = 0.9;
        } else if (item.url.includes("/blog/")) {
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  // Compresión y optimización de assets
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar chunks para mejor cacheo
            vendor: ["astro"],
          },
        },
      },
    },
  },
  // Prefetch inteligente de enlaces
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
