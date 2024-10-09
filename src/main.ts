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

function updateCounter(x: number) {
  counter += x;
  counterText.innerHTML = `Number of Bowls: ${counter.toFixed(2)}`;
}

updateCounter(0);

mainButton.addEventListener("click", () => {
  updateCounter(1);
});


// const startTime : number =performance.now();
// let frames : number = 0;
// let totalTime : number = 0;

// function addFractionAvg(){
//     frames++;
//     totalTime = (performance.now()-startTime)/1000;
//     const fps : number = (frames/totalTime);
//     updateCounter(1/fps);
//     requestAnimationFrame(addFractionAvg);
// }

let lastTime : number = performance.now();

function addFraction(){
    const elapsedTime : number = (performance.now()-lastTime)/1000;
    lastTime=performance.now();
    updateCounter(elapsedTime);
    requestAnimationFrame(addFraction);
}
requestAnimationFrame(addFraction);

