import { configDotenv } from "dotenv";
import { PostHog } from "posthog-node";

configDotenv();

export const client = new PostHog(
  "phc_8ELuzQyAvVetDC39my7E5JM8FmlMALJ8EdGx6kTMi79",
  {
    host: "https://us.i.posthog.com",
    flushInterval: 10000,
    enableExceptionAutocapture: true,
  }
);
