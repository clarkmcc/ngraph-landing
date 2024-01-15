import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    ssr: {
      noExternal: ["@clarkmcc/ngraph"]
    }
  },
  // output: "server",
  adapter: vercel()
});
