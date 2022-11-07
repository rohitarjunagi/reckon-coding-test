/* eslint-disable node/no-process-env */

export default {
  nodeEnv: process.env.NODE_ENV ?? "",
  port: process.env.PORT ?? 0,
  reckonBaseUrlNumbers: process.env.RECKON_BASEURL_NUMBERS ?? "",
  reckonBaseUrlStrings: process.env.RECKON_BASEURL_SUBSTRINGS ?? "",
  maxRetries: process.env.MAX_RETRIES ?? 5,
} as const;
