import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //shields protects app from common attack e.g. SQL injection
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      //blocks all bots except search engines
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        //see full list at https://arcjet.com/bot-list
      ],
    }),
    //rate limiting

    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 5,
      capacity: 20,
    }),
  ],
});
