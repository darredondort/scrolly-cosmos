
import './style.css';
import { Graph, GraphConfigInterface } from '@cosmograph/cosmos';
import { select, selectAll } from 'd3-selection';
import scrollama from 'scrollama';



import {
    pointPositions,
    pointColors,
    // linkColorsA,
    pointSizes,
    pointLabelToIndex,
    links,
    pointIndexToLabel,
    sentences
} from './data';
import { CosmosLabels } from './labels';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasContainer = document.querySelector('#cosmos-01-container') as HTMLCanvasElement;
// const canvas = select('#cosmos-01-canvas')
const div = document.querySelector('#labels') as HTMLDivElement;
const mainContent = document.querySelector('#main-content') as HTMLDivElement;

// canvas.attr(class, 'lowlight');

const cosmosLabels = new CosmosLabels(div);

// Current question, instance and location:
let currentLocationLabel = ['Barcelona']
let currentSourceLabel = ['decidim.barcelona'];
// console.log(visited); 
console.log(currentLocationLabel); 
console.log(currentSourceLabel); 

// visited counter
// let counter = 0;

const currentSourceContainer = select('#current-src');
currentSourceContainer.html(currentLocationLabel);


const currentLocationContainer = select('#current-location');
currentLocationContainer.html(currentSourceLabel);


// Scrollama setup
const scroller = scrollama();

// Setup your steps
const steps = ['section-0', 'section-1', 'section-2', 'section-3', 'section-4'].map(id => document.getElementById(id));
let currentZoom = 0.5;

// Scroller
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
  
  // Zoom in when scrolling down to section-01
//   if (index === 1 && direction === 'down') {
    if (index === 0) {

      currentZoom = 0.5;
      graph.setZoomLevel(currentZoom, 500);
      mainContent.classList.add('visible');
      mainContent.classList.add('top-layer');

      mainContent.classList.remove('invisible');
      mainContent.classList.remove('bottom-layer');


      canvas.classList.add('bottom-layer');
      canvas.classList.remove('top-layer');

      cosmosLabels.labelRenderer.draw(false);



      
    
        
    }

  if (index === 1) {
    
    currentZoom = 0.75;
    graph.setZoomLevel(currentZoom, 500);
    mainContent.classList.add('invisible');
    mainContent.classList.add('bottom-layer');
    mainContent.classList.remove('visible');
    mainContent.classList.remove('top-layer');


    canvas.classList.add('top-layer');
    canvas.classList.remove('bottom-layer');
    
    // div.classList.add('top-layer');

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);


   
  }

  if (index === 2) {
    
    currentZoom = 3;
    graph.setZoomLevel(currentZoom, 500);
    mainContent.classList.add('invisible');
    mainContent.classList.add('bottom-layer');

    mainContent.classList.remove('visible');
    mainContent.classList.remove('top-layer');

    canvas.classList.add('top-layer');
    canvas.classList.remove('bottom-layer');
    // graph.setLinkColors(244,253,117,0.8);
    // graph.setLinkColors(new Float32Array(linkColorsA));
    // graph.render();
    // console.log("new link color");

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);






   
  }

  if (index === 3) {
    
    currentZoom = 0.3;
    graph.setZoomLevel(currentZoom, 500);
    mainContent.classList.add('visible');
    mainContent.classList.add('top-layer');
    mainContent.classList.remove('invisible');
    mainContent.classList.remove('bottom-layer');


    canvas.classList.remove('top-layer');
    canvas.classList.add('bottom-layer');


    
    // mainContent.classList.add('visible');
    cosmosLabels.labelRenderer.draw(false);
    canvas.classList.add('lowlight');



   
  }

  
  // Zoom out when scrolling to section-02 or back to section-00
//   if ((index === 2 && direction === 'down') || (index === 0 && direction === 'up')) {
  if ( index === 4) {
    currentZoom = 8; 
    graph.setZoomLevel(currentZoom, 500); 
    mainContent.classList.add('visible');
    mainContent.classList.add('top-layer');
    mainContent.classList.remove('invisible');
    mainContent.classList.remove('bottom-layer');
    // canvas.classList.add('lowlight');

    canvas.classList.remove('top-layer');
    canvas.classList.add('bottom-layer');

    cosmosLabels.labelRenderer.draw(true);
    cosmosLabels.update(graph);



    
    // if ((index === 2 && direction === 'down') || (index === 0 && direction === 'up')) {
    // currentZoom = 0.5;
    // graph.setZoomLevel(0.5);
  }
  
  // Add CSS class to reveal the current section
  steps[index].classList.add('is-active');
}

function handleStepExit({ index, direction }) {
  console.log(`Exiting step ${index}, direction: ${direction}`);
  
  // Remove CSS class to hide the previous section
  steps[index].classList.remove('is-active');
}

// Update Scrollama on window resize
window.addEventListener('resize', scroller.resize);




// Cosmos settings
// Store the updated point positions
let updatedPointPositions: number[] = [...pointPositions];

let graph: Graph;
export const config: GraphConfigInterface = {
    // backgroundColor: '#ECE6F0',
    // backgroundColor: 'rgb(81,66,93)',
    // backgroundColor: 'rgb(254,235,201)',
    backgroundColor: 'rgb(47, 40, 54)',
    linkWidth: 0.1,
    // linkColor: 'rgba(236,204, 5, 0.5)',
    // linkColor: 'rgba(85,176,148,0.3)',
    
    linkColor: 'rgba(244,253,117,0.1)',
    // linkColor: 'rgba(244,253,117,0.0)',
    linkArrows: false,
    fitViewOnInit: false,
    enableDrag: true,
    // simulationGravity: 0.8,
    // simulationLinkDistance: 20,
    // simulationLinkSpring: 0.8,
    // simulationRepulsion: 0.9,
    // setZoomLevel: [10,20],
    disableZoom: true,
    simulationGravity: 0.02,
    simulationLinkDistance: 200,
    simulationLinkSpring: 1,
    simulationRepulsion: 0.2,
    simulationRepulsionTheta: 1.5,
    // simulationRepulsionFromMouse: 100,
    simulationFriction: 1.5,
    // simulationCluster: 0.5,
    simulationDecay: 100000,

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
    Array.from(pointLabelToIndex.keys()).map(label => pointLabelToIndex.get(label) as number)
);

let hoveredNodeIndex: number | undefined = undefined;

  // function showEgoNetworkLabels(nodeIndex: number) {
  //     const visibleNodes = new Set<number>([nodeIndex]);
  //     // cosmosLabels.setVisibleNodes(visibleNodes);
  // }

  // function hideAllLabels() {
  //     // cosmosLabels.setVisibleNodes(new Set());
  // }

function handleCanvasHover(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert screen coordinates to space coordinates
    const spaceCoordinates = graph.screenToSpacePosition([x, y]);

    // Find the closest point to the mouse
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

    if (closestPointIndex !== undefined && minDistance < 10) { // Adjust the threshold as needed
        // If the mouse is over a node
        if (closestPointIndex !== hoveredNodeIndex) {
            hoveredNodeIndex = closestPointIndex;
            // Access Node ID
            const nodeId = closestPointIndex;

            // Check if nodeId is defined before proceeding
            if (nodeId !== undefined) {
                // Access Node Metadata
                const nodeLabel = pointIndexToLabel.get(nodeId);
                const isPerformance = nodeLabel?.startsWith('P:') ?? false; // Use optional chaining and nullish coalescing operator
                const metadata = sentences.find(p => (isPerformance ? `P:${p.label}` : p.topic_label_str) === nodeLabel);

                // Log Node ID and Metadata to Console
                console.log('Hovered Node ID:', nodeId);
                console.log('Hovered Node Metadata:', metadata);

                // showEgoNetworkLabels(closestPointIndex);
            } else {
                console.warn('Node ID is undefined.');
            }
        }
    } else {
        // If the mouse is not over a node
        // if (hoveredNodeIndex !== undefined) {
        //     hoveredNodeIndex = undefined;
        //     hideAllLabels();
        // }
    }

    cosmosLabels.update(graph);
}

canvas.addEventListener('mousemove', handleCanvasHover);

canvas.addEventListener('mouseout', () => {
    hoveredNodeIndex = undefined;
    // hideAllLabels();
    cosmosLabels.update(graph);
});
























