import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/test/setup.ts",
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/prisma/"],
  setupFiles: ["dotenv/config"],
};
export default config;
