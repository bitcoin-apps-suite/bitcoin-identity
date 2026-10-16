import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    // Mount-time reads of localStorage/window must run after hydration,
    // so setState in a mount effect is intentional here.
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  { ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts", "public/**"] },
];

export default eslintConfig;
