import _wretch, { type Wretch } from "wretch";

const wretch = (token: string) => {
  return _wretch("https://api-s76sliscyq-as.a.run.app")
    .auth(`Bearer ${token}`)
    .middlewares([])
    .catcherFallback((err) => {
      console.error("[wretch.ts] API Error:", err);
      throw err;
    });
};

export default wretch;
