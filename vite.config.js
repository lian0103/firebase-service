import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_APP_BASE } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        include: [/\.js$/, /\.vue$/, /\.vue\?vue/],
      }),
      Components(),
    ],
    base: VITE_APP_BASE,
    build: {
      outDir: "docs",
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  });
};
