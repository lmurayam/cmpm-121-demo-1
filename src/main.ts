import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A New Name";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = "🍜";
app.append(mainButton);

let counter: number = 0;
const counterText = document.createElement("div");
app.append(counterText);

function updateCounter(x:number) {
    counter+=x;
    counterText.innerHTML = `Number of Bowls: ${counter}`;
}

updateCounter(0);

mainButton.addEventListener("click", () => {
    updateCounter(1);
});

setInterval(updateCounter,1000,1);

