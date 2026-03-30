import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: document.getElementById("app"),
});

if (!import.meta.env.DEV && "serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(existingRegistrations.map(async (registration) => {
        const activeScriptUrl = registration.active?.scriptURL || "";
        const installingScriptUrl = registration.installing?.scriptURL || "";

        if (activeScriptUrl.endsWith("/sw.js") || installingScriptUrl.endsWith("/sw.js")) {
          await registration.unregister();
        }
      }));

      const registration = await navigator.serviceWorker.register("/sw-pwa.js", {
        scope: "/",
      });

      setInterval(() => {
        registration.update();
      }, 5 * 60 * 1000);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;

        if (!newWorker) {
          return;
        }

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            console.info("A new version is available. Reload to update.");
          }
        });
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Service worker registration failed", error);
    }
  });
}

export default app;
