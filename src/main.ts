import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A New Name";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = '🍜';
app.append(mainButton);