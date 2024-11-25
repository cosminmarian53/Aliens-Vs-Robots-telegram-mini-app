// src/index.js
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev/index.js";
import WebApp from "@twa-dev/sdk";
WebApp.ready();
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <App />
    </DevSupport>
  </Provider>
);
