// main.ts
import './style.css';
import { Graph, GraphConfigInterface } from '@cosmograph/cosmos';
import { select } from 'd3-selection';
import scrollama from 'scrollama';


// Import the cosmosSpaceSize from data.ts
import {
  pointPositions,
  pointColors,
  pointSizes,
  pointLabelToIndex,
  links,
  pointIndexToLabel,
  linkColorsHigh,
  linkColorsLow,
  linkColorsDisabled,
  pointMetadata,
  sentences,
  cosmosSpaceSize // Import the space size
} from './data';



import { CosmosLabels } from './labels';

const initialZoom = 1.5;
let currentZoom = initialZoom;


// Update the Cosmos settings
export const config: GraphConfigInterface = {
  backgroundColor: 'rgb(47, 40, 54)',
  linkWidth: 0.1,
  linkColor: linkColorsLow,
  // linkColor: 'rgba(244,253,117,0.2)',
  linkArrows: false,
  fitViewOnInit: false,
  enableDrag: true,
  disableZoom: true,
  spaceSize: cosmosSpaceSize, // Use the same space size as in data normalization
  disableSimulation: false,
  simulationGravity: 0.02,
  simulationLinkDistance: 200,
  simulationLinkSpring: 1,
  simulationRepulsion: 0.2,
  simulationRepulsionTheta: 1.5,
  simulationFriction: 1.5,
  // simulationDecay: 100000,
  simulationDecay: 10000,
  onSimulationTick: () => {
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
  // graph.setPointPositions(new Float32Array(pointPositions));
  pointPositions: new Float32Array(pointPositions)
};





const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const labelsDiv = document.querySelector('#labels') as HTMLDivElement;
const mainContent = document.querySelector('#main-content') as HTMLDivElement;
const cosmosLabels = new CosmosLabels(labelsDiv);

let currentLocationLabel = ['Barcelona'];
let currentSourceLabel = ['decidim.barcelona'];
console.log(currentLocationLabel);
console.log(currentSourceLabel);

const currentSourceContainer = select('#current-src');
currentSourceContainer.html(currentLocationLabel);

const currentLocationContainer = select('#current-location');
currentLocationContainer.html(currentSourceLabel);

// Scrollama setup
const scroller = scrollama();

// Setup your steps
const steps = ['section-0', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5'].map(id => document.getElementById(id));
// let currentZoom = 0.45;

// Initialize Scrollama
scroller
    .setup({
        step: steps,
        offset: 0.5,
        debug: false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

// Scroll event handlers
function handleStepEnter({ index, direction }) {
    console.log(`Entering step ${index}, direction: ${direction}`);

    if (index === 0) {
      // graph.setLinkColors(new Float32Array(linkColorsHigh));

      // graph.setLinkColors(linkColorsLow);


        //       // Disable simulation and freeze nodes
        // graph.setConfig({  
        //   // spaceSize: 4096,
        //   disableSimulation: true, // Will use fixed positions
        //   simulationDecay: 0 // Immediate stop
        // });

        graph.setConfig({
            spaceSize: cosmosSpaceSize,
            disableSimulation: false, // Will use fixed positions
            // simulationDecay: 100000, // Immediate stop
            simulationDecay: 10000, // Immediate stop
            linkWidth: 0.1,
            linkColor: linkColorsLow
        });
        // graph.setPointPositions(new Float32Array(pointPositions));
        //       // Disable simulation and freeze nodes
        console.log("graph Config", graph.setConfig)
        cosmosLabels.update(graph);
        cosmosLabels.labelRenderer.draw(false);

        
        // Reset positions to the original normalized positions if needed
        // graph.setPointPositions(new Float32Array(pointPositions), 0);
        // graph.setPointPositions(new Float32Array(pointPositions));
        
        // currentZoom = 0.45;
        currentZoom = initialZoom;
        graph.setZoomLevel(currentZoom, 500);


        // currentZoom = 0.5;
        // graph.setZoomLevel(currentZoom, 500);
        mainContent.classList.add('visible');
        mainContent.classList.add('top-layer');
        mainContent.classList.remove('invisible');
        mainContent.classList.remove('bottom-layer');
        canvas.classList.add('bottom-layer');
        canvas.classList.remove('top-layer');

        // cosmosLabels.update(graph);
        graph.render();
        
    }

    if (index === 1) {
        // graph.setLinkColors(linkColorsHigh);

      graph.setConfig({
        linkWidth: 0.0,
        linkColor: linkColorsDisabled,
        disableSimulation: false,
        simulationDecay: 10000
      });


        currentZoom = 3;
        graph.setZoomLevel(currentZoom, 500);
        mainContent.classList.add('invisible');
        mainContent.classList.add('bottom-layer');
        mainContent.classList.remove('visible');
        mainContent.classList.remove('top-layer');
        canvas.classList.add('top-layer');
        canvas.classList.remove('bottom-layer');
        cosmosLabels.update(graph);
        cosmosLabels.labelRenderer.draw(true);
        // cosmosLabels.update(graph);
        graph.render();

    }

    if (index === 2) {
        // graph.setLinkColors(new Float32Array(linkColorsHigh));
        graph.setConfig({
          linkWidth: 0.4,
          linkColor: linkColorsHigh,
          disableSimulation: false,
          simulationDecay: 5000,


      });
      cosmosLabels.update(graph);


        currentZoom = 1.5;
        graph.setZoomLevel(currentZoom, 500);
        mainContent.classList.add('invisible');
        mainContent.classList.add('bottom-layer');
        mainContent.classList.remove('visible');
        mainContent.classList.remove('top-layer');
        canvas.classList.add('top-layer');
        canvas.classList.remove('bottom-layer');
        cosmosLabels.update(graph);
        cosmosLabels.labelRenderer.draw(true);
        console.log("cosmosLabels", cosmosLabels)
        graph.render();


        // labelsDiv.add('invisible');
        // cosmosLabels.update(graph);
    }

    if (index === 3) {
        // graph.setLinkColors(new Float32Array(linkColorsDisabled));
      //   graph.setConfig({
      //     linkWidth: 0.1,
      //     linkColor: linkColorsLow,


      // });


        graph.setPointPositions(new Float32Array(pointPositions));
              //       // Disable simulation and freeze nodes
        console.log("graph Config", graph.setConfig)
        graph.setConfig({  
          // spaceSize: 4096,
          disableSimulation: true, // Will use fixed positions
          simulationDecay: 0, // Immediate stop
          linkWidth: 0.1,
          linkColor: linkColorsDisabled,
        });
        // graph.fitViewByPointPositions(new Float32Array(pointPositions), 2500, 1.1);
        cosmosLabels.update(graph);
        cosmosLabels.labelRenderer.draw(true);

        graph.render();



        currentZoom = 0.50;
        graph.setZoomLevel(currentZoom, 500);
        mainContent.classList.add('visible');
        mainContent.classList.add('top-layer');
        mainContent.classList.remove('invisible');
        mainContent.classList.remove('bottom-layer');
        canvas.classList.remove('top-layer');
        canvas.classList.add('bottom-layer');
        graph.render();

        // labelsDiv.add('invisible');
        // cosmosLabels.labelRenderer.draw(false);

        // cosmosLabels.update(graph);

        // canvas.classList.add('lowlight');


        // Enable simulation with appropriate settings
        // graph.setConfig({
        //   spaceSize: cosmosSpaceSize,
        //   disableSimulation: false, // Enable simulation
        //   simulationDecay: 10000, // Use a high decay to slow down movement
        //   simulationGravity: 0.07,
        //   simulationRepulsion: 0.2
        // });
    }

    if (index === 4) {
      // graph.setLinkColors(new Float32Array(linkColorsDisabled));
    //   graph.setConfig({
    //     linkWidth: 0.1,
    //     linkColor: linkColorsLow,


    // });


      graph.setPointPositions(new Float32Array(pointPositions));
            //       // Disable simulation and freeze nodes
      console.log("graph Config", graph.setConfig)
      graph.setConfig({  
        // spaceSize: 4096,
        disableSimulation: true, // Will use fixed positions
        simulationDecay: 0, // Immediate stop
        linkWidth: 0.1,
        linkColor: linkColorsDisabled,
      });
      // graph.fitViewByPointPositions(new Float32Array(pointPositions), 2500, 1.1);
      // graph.fitViewByPointIndices([0], 20000, 0.1);
      cosmosLabels.update(graph);
      graph.fitViewByPointPositions(new Float32Array(pointPositions), 2500, 1.1);

      cosmosLabels.labelRenderer.draw(true);

      graph.render();



      currentZoom = 0.25;
      graph.setZoomLevel(currentZoom, 500);
      mainContent.classList.add('invisible');
      mainContent.classList.add('bottom');
      mainContent.classList.remove('visible');
      mainContent.classList.remove('top-layer');
      canvas.classList.remove('bottom-layer');
      canvas.classList.add('top-layer');
      // labelsDiv.add('invisible');
      // cosmosLabels.labelRenderer.draw(false);

      // cosmosLabels.update(graph);

      // canvas.classList.add('lowlight');


      // Enable simulation with appropriate settings
      // graph.setConfig({
      //   spaceSize: cosmosSpaceSize,
      //   disableSimulation: false, // Enable simulation
      //   simulationDecay: 10000, // Use a high decay to slow down movement
      //   simulationGravity: 0.07,
      //   simulationRepulsion: 0.2
      // });
  }

    if (index === 5) {
        graph.setConfig({
          linkWidth: 0.0,
          linkColor: linkColorsDisabled,
          disableSimulation: false,
          simulationDecay: 10000,

        });
        cosmosLabels.update(graph);

        currentZoom = 8;
        graph.setZoomLevel(currentZoom, 500);
        mainContent.classList.add('visible');
        mainContent.classList.add('top-layer');
        mainContent.classList.remove('invisible');
        mainContent.classList.remove('bottom-layer');
        canvas.classList.remove('top-layer');
        canvas.classList.add('bottom-layer');
        // cosmosLabels.update(graph);
        cosmosLabels.labelRenderer.draw(true);
        // cosmosLabels.update(graph);
        graph.render();

    }

    steps[index].classList.add('is-active');
}

function handleStepExit({ index, direction }) {
    console.log(`Exiting step ${index}, direction: ${direction}`);
    steps[index].classList.remove('is-active');
}

window.addEventListener('resize', scroller.resize);

// Cosmos settings
let updatedPointPositions: number[] = [...pointPositions];

let graph: Graph;

graph = new Graph(canvas, config);

// 1. Set point positions using the new pointPositions from data.ts
graph.setPointPositions(new Float32Array(pointPositions));
graph.setPointColors(new Float32Array(pointColors));

graph.setPointSizes(new Float32Array(pointSizes));
graph.setLinks(new Float32Array(links));
graph.setLinkColors(new Float32Array(linkColorsHigh));

graph.render();
graph.setZoomLevel(currentZoom);

// 2. Track all points, using sentence label to get the ID from label mapping
graph.trackPointPositionsByIndices(
    sentences.map(sentence => pointLabelToIndex.get(sentence.label) as number)
);

let hoveredNodeIndex: number | undefined = undefined;








// // Node hover handling for metadata retrieval
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

  // if (closestPointIndex !== undefined && minDistance < 10) {
  //   if (closestPointIndex !== hoveredNodeIndex) {
  //     hoveredNodeIndex = closestPointIndex;
  //     const metadata = pointMetadata[closestPointIndex];

  //     if (metadata) {
  //       // const nodeType = metadata.type || "unknown";
  //       // console.log(`Hovered over ${nodeType} node`);
  //       // console.log("Node metadata:", metadata);


  //       const nodeType = metadata?.type || "unknown";
  //       console.log(`Hovered over ${nodeType} node`);
  //       console.log("Node metadata:", metadata || "No metadata available");

  //     }
  //   }
  // } else {
  //   hoveredNodeIndex = undefined;
  // }

  // cosmosLabels.update(graph);
  if (closestPointIndex !== undefined && minDistance < 5) {
    if (closestPointIndex !== hoveredNodeIndex) {
      hoveredNodeIndex = closestPointIndex;
      const metadata = pointMetadata[closestPointIndex];

      const nodeType = metadata?.type || "unknown";
      console.log(`Hovered over ${nodeType} node`);
      console.log("Node metadata:", metadata || "No metadata available");
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

// canvas.addEventListener('mousemove', handleCanvasHover);

// canvas.addEventListener('mouseout', () => {
//     hoveredNodeIndex = undefined;
//     cosmosLabels.update(graph);
// });

