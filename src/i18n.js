import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [language, setLanguage] = useState("en");
  const [hello, setHello] = useState("");

  // toggle language
  const changeLanguage = () => setLanguage(language === "en" ? "fi" : "en");

  useEffect(() => {
    translate(language, "hello").then(setHello).catch(console.error);
  }, [language]);

  return (
    <>
      <button onClick={changeLanguage}>Change language</button>
      <div>{hello}</div>
    </>
  );
};

function translate(locale, text) {
  return getLocaleData(locale).then(messages => messages[text]);
}

async function getLocaleData(locale) {
  return import(`../translations/${locale}.json`);
}

const app = document.createElement("div");
app.setAttribute("id", "root");
document.body.appendChild(app);

const root = createRoot(app);
root.render(<App />);
