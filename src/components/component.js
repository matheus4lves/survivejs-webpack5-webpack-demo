export default (text = HOWDY) => {
  const element = document.createElement("div");
  element.className = "rounded bg-red-100 border max-w-md m-4 p-4";
  element.innerHTML = text;
  element.onclick = () => {
    import(/* webpackChunkName: "lazy-component" */ "./lazy")
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => console.log(err));
  };
  return element;
};
