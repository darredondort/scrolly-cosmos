import "./style.css";
import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";
import { select, selectAll } from "d3-selection";
import scrollama from "scrollama";

import {
  pointPositions,
  pointColors,
  // linkColorsA,
  pointSizes,
  pointLabelToIndex,
  links,
  pointMetadata,
  // pointIndexToLabel,
  // sentences
} from "./data";
import { CosmosLabels } from "./labels";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// const canvasContainer = document.querySelector('#cosmos-01-container') as HTMLCanvasElement;
// const canvas = select('#cosmos-01-canvas')
const div = document.querySelector("#labels") as HTMLDivElement;
const mainContent = document.querySelector("#main-content") as HTMLDivElement;

// canvas.attr(class, 'lowlight');
//
const cosmosLabels = new CosmosLabels(div);

// Current question, instance and location:
let currentLocationLabel = ["Barcelona"];
let currentSourceLabel = ["decidim.barcelona"];
// console.log(visited);
console.log(currentLocationLabel);
console.log(currentSourceLabel);

// visited counter
// let counter = 0;

const currentSourceContainer = select("#current-src");
currentSourceContainer.html(currentLocationLabel);

const currentLocationContainer = select("#current-location");
currentLocationContainer.html(currentSourceLabel);

// Scrollama setup
const scroller = scrollama();

// Setup your steps
const steps = [
  "section-0",
  "section-1",
  "section-2",
  "section-3",
  "section-4",
].map((id) => document.getElementById(id));
let currentZoom = 0.5;

// Scroller
// Initialize Scrollama
scroller
  .setup({
    step: steps,
    offset: 0.5,
    debug: false,
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);

// Scroll event handlers
function handleStepEnter({ index, direction }) {
  console.log(`Entering step ${index}, direction: ${direction}`);

  // Zoom in when scrolling down to section-01
  //   if (index === 1 && direction === 'down') {
  if (index === 0) {
    currentZoom = 0.5;
    graph.setZoomLevel(currentZoom, 500);
    mainContent.classList.add("visible");
    mainContent.classList.add("top-layer");

    mainContent.classList.remove("invisible");
    mainContent.classList.remove("bottom-layer");

    canvas.classList.add("bottom-layer");
    canvas.classList.remove("top-layer");

    cosmosLabels.labelRenderer.draw(false);
  }

  if (index === 1) {
    currentZoom = 0.75;
    graph.setZoomLevel(currentZoom, 1000); // Zoom transition
    mainContent.classList.add("invisible");
    mainContent.classList.add("bottom-layer");
    mainContent.classList.remove("visible");
    mainContent.classList.remove("top-layer");

    canvas.classList.add("top-layer");
    canvas.classList.remove("bottom-layer");

    // div.classList.add('top-layer');

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);
  }

  if (index === 2) {
    currentZoom = 3;
    graph.setZoomLevel(currentZoom, 500); // Zoom transition
    mainContent.classList.add("invisible");
    mainContent.classList.add("bottom-layer");

    mainContent.classList.remove("visible");
    mainContent.classList.remove("top-layer");

    canvas.classList.add("top-layer");
    canvas.classList.remove("bottom-layer");
    // graph.setLinkColors(244,253,117,0.8);
    // graph.setLinkColors(new Float32Array(linkColorsA));
    // graph.render();
    // console.log("new link color");

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);
  }

  if (index === 3) {
    currentZoom = 0.3;
    graph.setZoomLevel(currentZoom, 500); // Zoom transition
    mainContent.classList.add("visible");
    mainContent.classList.add("top-layer");
    mainContent.classList.remove("invisible");
    mainContent.classList.remove("bottom-layer");

    canvas.classList.remove("top-layer");
    canvas.classList.add("bottom-layer");

    // mainContent.classList.add('visible');
    cosmosLabels.labelRenderer.draw(false);
    canvas.classList.add("lowlight");
  }

  // Zoom out when scrolling to section-02 or back to section-00
  //   if ((index === 2 && direction === 'down') || (index === 0 && direction === 'up')) {
  if (index === 4) {
    currentZoom = 8;
    graph.setZoomLevel(currentZoom, 500); // Zoom transition
    mainContent.classList.add("visible");
    mainContent.classList.add("top-layer");
    mainContent.classList.remove("invisible");
    mainContent.classList.remove("bottom-layer");
    // canvas.classList.add('lowlight');

    canvas.classList.remove("top-layer");
    canvas.classList.add("bottom-layer");

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);

    // if ((index === 2 && direction === 'down') || (index === 0 && direction === 'up')) {
    // currentZoom = 0.5;
    // graph.setZoomLevel(0.5);
  }

  // Add CSS class to reveal the current section
  steps[index].classList.add("is-active");
}

function handleStepExit({ index, direction }) {
  console.log(`Exiting step ${index}, direction: ${direction}`);

  // Remove CSS class to hide the previous section
  steps[index].classList.remove("is-active");
}

// Update Scrollama on window resize
window.addEventListener("resize", scroller.resize);

// Cosmos settings
// Store the updated point positions
let updatedPointPositions: number[] = [...pointPositions];

// Graph visualization configuration
let graph: Graph;
export const config: GraphConfigInterface = {
  backgroundColor: "rgb(47, 40, 54)",
  linkWidth: 0.1,
  linkColor: "rgba(244,253,117,0.1)",
  linkArrows: false,
  fitViewOnInit: false,
  enableDrag: true,
  // simulationGravity: 0.8,
  // simulationLinkDistance: 20,
  // simulationLinkSpring: 0.8,
  // simulationRepulsion: 0.9,
  // setZoomLevel: [10,20],
  disableZoom: true,
  simulationGravity: 0.02, // Controls layout compactness
  simulationLinkDistance: 40,
  simulationLinkSpring: 1, // Connection stiffness
  simulationRepulsion: 0.2,
  simulationRepulsionTheta: 1,
  // simulationRepulsionFromMouse: 100,
  simulationFriction: 1.5,
  // simulationCluster: 0.5,
  simulationDecay: 10000,

  onSimulationTick: () => {
    // Update the positions on each tick
    const trackedPointPositions = graph.getTrackedPointPositionsMap();
    let i = 0;
    trackedPointPositions.forEach((positions, pointIndex) => {
      updatedPointPositions[pointIndex * 2] = positions[0];
      updatedPointPositions[pointIndex * 2 + 1] = positions[1];
      i++;
    });
    cosmosLabels.update(graph);
  },
  onZoom: () => graph && cosmosLabels.update(graph),
};

graph = new Graph(canvas, config);
graph.setPointPositions(new Float32Array(pointPositions));
graph.setPointColors(new Float32Array(pointColors));
graph.setPointSizes(new Float32Array(pointSizes));
graph.setLinks(new Float32Array(links));
graph.render();
graph.setZoomLevel(currentZoom);

// Track all points
graph.trackPointPositionsByIndices(
  Array.from(pointLabelToIndex.keys()).map(
    (label) => pointLabelToIndex.get(label) as number
  )
);

let hoveredNodeIndex: number | undefined = undefined;

// function showEgoNetworkLabels(nodeIndex: number) {
//     const visibleNodes = new Set<number>([nodeIndex]);
//     // cosmosLabels.setVisibleNodes(visibleNodes);
// }

// function hideAllLabels() {
//     // cosmosLabels.setVisibleNodes(new Set());
// }

// Node hover handling for metadata retrieval
function handleCanvasHover(event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Convert screen coordinates to space coordinates
  const spaceCoordinates = graph.screenToSpacePosition([x, y]);

  let closestPointIndex: number | undefined;
  let minDistance = Infinity;

  for (let i = 0; i < updatedPointPositions.length / 2; i++) {
    const pointX = updatedPointPositions[i * 2];
    const pointY = updatedPointPositions[i * 2 + 1];

    const dx = spaceCoordinates[0] - pointX;
    const dy = spaceCoordinates[1] - pointY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closestPointIndex = i;
    }
  }

  if (closestPointIndex !== undefined && minDistance < 10) {
    if (closestPointIndex !== hoveredNodeIndex) {
      hoveredNodeIndex = closestPointIndex;
      const metadata = pointMetadata[closestPointIndex];

      if (metadata) {
        const nodeType = metadata.type || "unknown";
        console.log(`Hovered over ${nodeType} node`);
        console.log("Node metadata:", metadata);
      }
    }
  } else {
    hoveredNodeIndex = undefined;
  }

  cosmosLabels.update(graph);
}

// Mouse out handler
canvas.addEventListener("mousemove", handleCanvasHover);
canvas.addEventListener("mouseout", () => {
  hoveredNodeIndex = undefined;
  cosmosLabels.update(graph);
});
