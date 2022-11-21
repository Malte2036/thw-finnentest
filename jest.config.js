const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/pages/(.*)": "<rootDir>/pages/$1",
    "@/components/(.*)": "<rootDir>/components/$1",
    "@/models/(.*)": "<rootDir>/models/$1",
    "@/styles/(.*)": "<rootDir>/styles/$1",
    "@/utils/(.*)": "<rootDir>/utils/$1/",
    "@/public/(.*)": "<rootDir>/public/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);
