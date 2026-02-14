import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "happy-dom",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})
