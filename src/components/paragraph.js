export default text => {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = text;
  return paragraph;
};
