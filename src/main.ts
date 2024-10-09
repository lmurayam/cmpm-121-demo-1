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

let counter : number = 0;
const counterText = document.createElement("div");
app.append(counterText);
refreshCounterText();

mainButton.addEventListener('click',()=>{
    counter+=1;
    refreshCounterText();
});

function refreshCounterText() {
    counterText.innerHTML = `Number of Bowls: ${counter}`;
}
