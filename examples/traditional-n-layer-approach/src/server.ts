/// <reference path="./types/express.d.ts" />

import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
