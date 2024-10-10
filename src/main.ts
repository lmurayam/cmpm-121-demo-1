import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Noodle Shop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = `<span style='font-size: ${screen.width / 5}px;'> 🍜 </span>`;
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

interface Item {
  icon: string;
  description: string;
  cost: number;
  effect: number;
  amount: number;
  button: HTMLButtonElement | null;
}

const availableItems: Item[] = [
  {
    icon: "🥢",
    description: "Chopsticks, also used for making music",
    cost: 10,
    effect: 0.1,
    amount: 0,
    button: null,
  },
  {
    icon: "🍥",
    description: "Narutomaki, makes you feel like an anime protagonist",
    cost: 100,
    effect: 2,
    amount: 0,
    button: null,
  },
  {
    icon: "🍣",
    description: "Sushi, an excellent appetizer",
    cost: 500,
    effect: 20,
    amount: 0,
    button: null,
  },
  {
    icon: "🥩",
    description: "Meat, essential to a good bowl of noodles",
    cost: 1000,
    effect: 50,
    amount: 0,
    button: null,
  },
  {
    icon: "🍱",
    description: "Bento Box, something to take to go?",
    cost: 10000,
    effect: 1000,
    amount: 0,
    button: null,
  },
];

function createUpgrade(upgradeConfig: Item) {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgradeConfig.amount} ${upgradeConfig.icon} Cost: ${upgradeConfig.cost.toFixed(2)} Increase: ${upgradeConfig.effect}`;
  upgradeButton.title = upgradeConfig.description;
  app.append(upgradeButton);

  upgradeConfig.button = upgradeButton;

  upgradeButton.addEventListener("click", () => {
    upgradeConfig.amount += 1;

    growthRate += upgradeConfig.effect;
    counter -= upgradeConfig.cost;

    upgradeConfig.cost *= 1.15;
    growthRateText.innerHTML = `${growthRate.toFixed(2)} Bowls/Second`;

    upgradeButton.innerHTML = `${upgradeConfig.amount} ${upgradeConfig.icon} Cost: ${upgradeConfig.cost.toFixed(2)} Increase: ${upgradeConfig.effect}`;
  });
}

function updateCounter(x: number) {
  counter += x;
  counterText.innerHTML = `Number of Bowls: ${counter.toFixed(2)}`;
}

updateCounter(0);

availableItems.forEach((upgrade) => {
  createUpgrade(upgrade);
});

let lastTime: number = performance.now();

function tick() {
  const elapsedTime: number = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();
  updateCounter(elapsedTime * growthRate);

  availableItems.forEach((upgrade) => {
    if (upgrade.button != null)
      upgrade.button.disabled = counter < upgrade.cost;
  });

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
