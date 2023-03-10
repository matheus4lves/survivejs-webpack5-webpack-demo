const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

module.exports = merge({ mode: "production", entry: { home: "./src/home.js", contact: "./src/contact.js" } }, parts.page({ title: "Demo", chunks: "home" }), parts.page({ title: "Another", url: "another", chunks: "contact" }));
