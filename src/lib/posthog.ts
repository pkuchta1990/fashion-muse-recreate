import posthog from "posthog-js";

const POSTHOG_KEY = "phc_CPaZRnyHSujo7wdpBvhWQLrh6UYRbGyWVGQvzGVVaoLH";
const POSTHOG_HOST = "https://us.i.posthog.com";

let initialized = false;

export const initPostHog = () => {
  if (initialized || typeof window === "undefined") return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    disable_session_recording: true,
    autocapture: true,
    capture_pageview: true,
  });
  initialized = true;
};

export { posthog };
