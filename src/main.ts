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

mainButton.addEventListener("click", () => {
    updateCounter(1);
});

let counter: number = 0;
const counterText = document.createElement("div");
app.append(counterText);

let growthRate : number = 0;
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "🥢 Upgrade (10 Bowls)";
app.append(upgradeButton);

upgradeButton.addEventListener("click", () => {
    growthRate++;
    counter-=10;
});

function updateCounter(x: number) {
  counter += x;
  counterText.innerHTML = `Number of Bowls: ${counter.toFixed(2)}`;
}

updateCounter(0);



let lastTime: number = performance.now();

function tick() {
  const elapsedTime: number = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();
  updateCounter(elapsedTime*growthRate);
  requestAnimationFrame(tick);
  
  upgradeButton.disabled = counter<10;
}
requestAnimationFrame(tick);
