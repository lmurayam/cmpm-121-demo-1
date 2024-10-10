import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Noodle Shop";
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

let growthRate: number = 0;
const growthRateText = document.createElement("div");
growthRateText.innerHTML = `${growthRate.toFixed(2)} Bowls/Second`;
app.append(growthRateText);

interface IUpgrade {
  icon: string;
  description: string;
  cost: number;
  effect: number;
  amount: number;
}

const chopstick : IUpgrade = {
  icon: "🥢",
  description: "Chopsticks",
  cost: 10,
  effect: 0.1,
  amount: 0,
};

const narutomaki : IUpgrade = {
  icon: "🍥",
  description: "Narutomaki",
  cost: 100,
  effect: 2,
  amount: 0,
};

const meat : IUpgrade = {
  icon: "🥩",
  description: "Meat",
  cost: 1000,
  effect: 50,
  amount: 0,
};

const upgrades: [IUpgrade, HTMLButtonElement, number][] = [];

function createUpgrade(upgradeConfig: IUpgrade) {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgradeConfig.amount} ${upgradeConfig.icon} Cost: ${upgradeConfig.cost.toFixed(2)} Increase: ${upgradeConfig.effect}`;
  app.append(upgradeButton);

  upgrades.push([upgradeConfig, upgradeButton, 0]);

  upgradeButton.addEventListener("click", () => {

    upgradeConfig.amount+=1;

    growthRate += upgradeConfig.effect;
    counter -= upgradeConfig.cost;

    upgradeConfig.cost*=1.15;
    growthRateText.innerHTML = `${growthRate.toFixed(2)} Bowls/Second`;

    upgradeButton.innerHTML = `${upgradeConfig.amount} ${upgradeConfig.icon} Cost: ${upgradeConfig.cost.toFixed(2)} Increase: ${upgradeConfig.effect}`;
  });
}

createUpgrade(chopstick);
createUpgrade(narutomaki);
createUpgrade(meat);

function updateCounter(x: number) {
  counter += x;
  counterText.innerHTML = `Number of Bowls: ${counter.toFixed(2)}`;
}

updateCounter(0);

let lastTime: number = performance.now();

function tick() {
  const elapsedTime: number = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();
  updateCounter(elapsedTime * growthRate);

  upgrades.forEach((upgrade) => {
    upgrade[1].disabled = counter < upgrade[0].cost;
  });

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
