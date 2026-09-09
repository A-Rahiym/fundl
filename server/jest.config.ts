import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/test/setup.ts",
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/prisma/"],
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // @scalar/express-api-reference ships ESM only, which ts-jest cannot
    // parse. Stub the docs middleware; API behavior is unaffected.
    "^@scalar/express-api-reference$": "<rootDir>/src/test/mocks/scalarApiReference.ts",
  },
};
export default config;
