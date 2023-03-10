const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("./static");

const app = express();
app.use(express.static("static"));

function renderMarkup(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Demo</title>
        <script src="./index.js" defer></script>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

app.get("/", (req, res) => {
  res.status(200).send(renderMarkup(renderToString(SSR)));
});
app.listen(parseInt(process.env.PORT, 10) || 8080);
