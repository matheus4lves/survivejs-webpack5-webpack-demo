// Fonts
import "@fontsource/lato";
import "@fontsource/montserrat";
// import "@fontsource/lato";
// import "@fontsource/montserrat";

// Components
import component from "./components/component";
import paragraph from "./components/paragraph";
import "./main.css";

document.body.appendChild(component());
document.body.appendChild(paragraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique lorem suscipit, congue tortor eu, porttitor libero. Integer tempus commodo justo eu gravida."));
