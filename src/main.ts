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

interface IUpgrade{
  icon : string;
  description : string;
  cost : number;
  effect : number;
}

const upgrades : [IUpgrade,HTMLButtonElement,number][] = [];

function createUpgrade( upgradeConfig : IUpgrade){
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `0 ${upgradeConfig.icon} ${upgradeConfig.description}`;
  app.append(upgradeButton);

  upgrades.push([upgradeConfig,upgradeButton,0]);

  upgradeButton.addEventListener("click", () => {
    upgrades.forEach((upgrade)=>{
      if(upgrade[0]==upgradeConfig){
        upgrade[2]+=1;
        upgradeButton.innerHTML = `${upgrade[2]} ${upgradeConfig.icon} ${upgradeConfig.description}`;
      }
    });



    growthRate+=upgradeConfig.effect;
    counter -= upgradeConfig.cost;
    growthRateText.innerHTML  = `${growthRate.toFixed(2)} Bowls/Second`;
  });
}

createUpgrade({icon:"🥢",description:"Cost: 10 Increase: 0.1",cost:10,effect:.1})
createUpgrade({icon:"🍥",description:"Cost: 100 Increase: 2",cost:100,effect:2})
createUpgrade({icon:"🥩",description:"Cost: 1000 Increase: 50",cost:1000,effect:50})




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

  upgrades.forEach((upgrade)=>{
    upgrade[1].disabled = counter<upgrade[0].cost;
  })

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
