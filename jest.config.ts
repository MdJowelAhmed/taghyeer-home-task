import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Points to Next.js app so Jest can load next.config.ts and .env files
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  // Runs after the test framework is installed in the environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Handle CSS modules with identity-obj-proxy
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // Handle @/ path alias matching tsconfig paths
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
};

export default createJestConfig(config);
