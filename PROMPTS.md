### Perplexity AI:
You have a working prototype with Vite and Cosmograph/Cosmos to visualize in WebGL graph and embedding data in data driven web and mobile experiences. It seeks to find order and patterns in unstructured data that can enable inductive observation for a deeper deductive assessment of multimodal datasets, starting with textual data.

You are visualizing text-based sentence embeddings, using preprocessed data with the sentence-transformers library, BERTopic and UMAP. You have a so far a Vite app with Cosmos and Chart.js.

Please step through in a beginner-friendly way for someone starting with Vite, how to integrate d3.js modules that would serve better as a data toolkit and for DOM manipulation


### Perplexity AI:
Please make a comprehensive cheatsheet of d3 DOM manipulation, specially for inner HTML text variation, element styling based, and other common attribute controls, such as src, htext, add class, remove class, etc. Please make sure its syntaxis s all up to date to 2025


### Perplexity AI:
Great. Now please help me integrate Scrollama for a vertical scroll detection between section-0 to section-4. Please propose a scroll event system compatible with the following main code, were HTML elements are revealed and hidden with simple CSS animations and setZoomLevel changes (zoom in when scrolling down to section-01, scroll out when scrolling to section-02 or back to section-00.

```
import {
    pointPositions,
    pointColors,
    pointSizes,
    pointLabelToIndex,
    links,
    pointIndexToLabel,
    sentences
} from './data';
import { CosmosLabels } from './labels';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const div = document.querySelector('#labels') as HTMLDivElement;

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


// currentLocationContainer.selectAll('#current-location')
//     .data("HOLI")
//     .transition()
//     .duration(500)
    // .attr('y', d => y(d.value))
    // .attr('height', d => height - y(d.value));

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
    linkArrows: false,
    fitViewOnInit: false,
    enableDrag: true,
    // simulationGravity: 0.8,
    // simulationLinkDistance: 20,
    // simulationLinkSpring: 0.8,
    // simulationRepulsion: 0.9,
    // setZoomLevel: [10,20],
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
graph.setZoomLevel(0.5);

// Track all points
graph.trackPointPositionsByIndices(
    Array.from(pointLabelToIndex.keys()).map(label => pointLabelToIndex.get(label) as number)
);

let hoveredNodeIndex: number | undefined = undefined;

function showEgoNetworkLabels(nodeIndex: number) {
    const visibleNodes = new Set<number>([nodeIndex]);
    cosmosLabels.setVisibleNodes(visibleNodes);
}

function hideAllLabels() {
    cosmosLabels.setVisibleNodes(new Set());
}

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

                showEgoNetworkLabels(closestPointIndex);
            } else {
                console.warn('Node ID is undefined.');
            }
        }
    } else {
        // If the mouse is not over a node
        if (hoveredNodeIndex !== undefined) {
            hoveredNodeIndex = undefined;
            hideAllLabels();
        }
    }

    cosmosLabels.update(graph);
}

canvas.addEventListener('mousemove', handleCanvasHover);

canvas.addEventListener('mouseout', () => {
    hoveredNodeIndex = undefined;
    hideAllLabels();
    cosmosLabels.update(graph);
});


index.html
<!-- <!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cosmos: Node Labels Example</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div class="app">
      <div id="labels"></div>
      <canvas />
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html> -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Topics of decidim.barcelona</title>
    <meta charset="UTF-8" />


    <style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
    </style>
  </head>
  <body>
    <div class="main-content">
      <section id="section-0">

      </section>
      <section id="section-1">
        
      </section>
      <section id="section-2">
        
      </section>
      <section id="section-3">
        
      </section>
      <div id="cosmos-01-container" class="row">
        <div id="cosmos-01" class="app">
          <div id="labels"></div>
          <canvas />
        </div>
      </div>
      <div class="row row-full">
        <div class="col-center" id="title-container">
          <h1 id="title">Tracing the discussion<br/>in <span id="current-src"></span></h1>.
          <h2 id="subtitle">Open data from <span id="current-location"></span>, <br/>a Decidim-based participatory platform.</h1></h2>
        </div>
      </div>
      <div class="row row-full">
        <div class="col-center" id="title-container">

        </div>
      </div>

      <div class="row">
        <div class="col-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        >
      </div>
      >
      <div class="row">
        <div style="width: 800px" class="chart-container">
          <canvas id="acquisitions"></canvas>
        </div>
      </div>
    </div>

    <script type="module" src="/src/main.ts"></script>
    <script type="module" src="/src/acquisitions.ts"></script>
  </body>
</html>

style.css
html, body {
  margin: 0;
  max-width: 100%;
  overflow-x: hidden;
}

body {
  /* font-family: sans-serif; */
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 24px;
  margin: 0px;
  /* background-color: #282130; */
  background-color: #51425d;
  /* background-color: #ECE6F0; */
}

.app {
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
}

canvas {
  width: 100%;
  height: 100%;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.row-full {
  /* width: 100%; */
  height: 100vh;
  pointer-events: none;
}

.col-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
}



#title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  flex-direction: column;
  padding: 4em 0;
  /* pointer-events: none; */
}

#title, #subtitle {
  text-align: left;
  margin: 0;
  padding: 0;
  width: 100%;
  /* color: #2B0538; */
  color: #ECE6F0;

}

#title {
  font-size: 3em;
  font-weight: 600;
  line-height: 1.5em;
  padding: 0;
  /* color: #f4fd75; */
  /* color: #EDCD61; */

}

#subtitle {
  font-size: 2em;
  font-weight: 400;
  line-height: 1.25em;
  /* padding: 0em; */
  color: #ECE6F0;
}

#current-src {
  background-color: #ECE6F0;
  background-color: #282130;
  color: #f4fd75;

  padding: 0.08em 0.24em;
}


p {
  font-size: 1em;
  color: #ECE6F0;
}

.lowlight {
  opacity: 0.75;
}












#labels {
  z-index: 10;
} */


#cosmos-01 {
  /* pointer-events: none; */
  z-index: 0;
  width: 100%;
  height: 100vh;
}

#cosmos-01-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;

}


.chart-container {
  z-index: 20;
  position: relative;
  height: 600px; /* Adjust as needed */
  width: 100%;
  max-width: 800px; /* Optional: set a maximum width */
  margin: 0 auto; /* Optional: center the chart */
}
```

### Perplexity AI
Please write a function that allows toggling between a graph simulation based view and an embeddings plot view with x, y positions from the data.  Integrate it into the current Scrollama implementation for triggering code on section scroll change. Use the same dataset and try to animate smoothly the transition between graph simulation and x, y embeddings, even if the Graph object from Cosmos has to be reloaded. Add logic to display labels by type and scale point and label sizes by numerical value in the data.

Here is the current version of the code:

[ current code ]


### Perplexity AI
Please implement a graph to embedding view using this new function when stepping into section 03.


### Perplexity AI
Do not use d3 for data visualization, only for data tooling, like scales and color palettes. Please try again using the implementation of cosmos WebGL library in the code I gave you. Here is the basic documentation of Cosmos:

[ Cosmos API documentation]


### Perplexity AI
Adjust the steps of this code so that it starts with a slow transition of all points from out of the screen into their corrresponding x,y coordinates from the data and with fitView. Transition into a Graph simulation with edges as implemented now when stepping into step 3.


### Perplexity AI
Try again. Adjust the code so that it starts in step 0 no edges, simulation turned off, and a slow transition of all points from random coordinates from out of the screen into their corrresponding x,y coordinates from the data and with fitView. Transition into a Graph simulation with edges as implemented now when stepping into step 3.




### Perplexity AI
Please change the following code so that the initial point positions are maped to the x, y values in the sentences_02 data, with links but simulation disabled. When stepping into step 3 enable graph simulation.

[ Current code ]




### Claude 3.7 Sonnet
You are an expert in clear an accessible javascript coding for interactive and data visualization sites. Please read the following documentation of cosmos.js and write a boiler plate example that takes a dummy dataset (make it) of 40 points with x,y coordinates emulating a clusterized text embedding x,y distribution.

Write a guide for beginners, first time using node and npm, so that they can run it localy from terminal.


### Claude 3.7 Sonnet
Error:
```
Error: (regl) webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org
    raise index.5baa4167.js:6759
    onDone index.5baa4167.js:7342
    parseArgs index.5baa4167.js:7394
    wrapREGL index.5baa4167.js:13638
    Graph index.5baa4167.js:2965
    igcvL app.js:28
    igcvL app.js:4
    newRequire index.5baa4167.js:71
    <anonymous> index.5baa4167.js:122
    <anonymous> index.5baa4167.js:145
index.5baa4167.js:6760:17
Failed to initialize graph:Error: (regl) webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org
    raise index.5baa4167.js:6759
    onDone index.5baa4167.js:7342
    parseArgs index.5baa4167.js:7394
    wrapREGL index.5baa4167.js:13638
    Graph index.5baa4167.js:2965
    igcvL app.js:28
    igcvL app.js:4
    newRequire index.5baa4167.js:71
    <anonymous> index.5baa4167.js:122
    <anonymous> index.5baa4167.js:145
```


### Claude 3.7 Sonnet
You are working with a Typescript we app that uses cosmograph/cosmos and scrollama for visualizing and transitioning views of a graph.

Currently, you are trying to first position the nodes with normalized and projected positions into the cosmos space from their x, y data when steping into step 0, with the graph simulation disabled, and then, when steping into the step 3, the graph simulation is enabled and points move by forces.

This transition is currently working, but what is totally off is the projection of the original positions, where some points are being mapped consistently, but others are being squished into a straight line at the bottom and to the left, creating border-like patter with totally inconsistent coordinates (some points with higher x values are positioned more to the left, as it happens also with some y values). However, many points are being accurately positioned. 

Check the current code normalization and projection strategy, an propose a refined strategy that takes into account, proportionally, the negative x and y values in the data to project all points consistently.

Here is the current version of the data.ts that extracts metadata, normalizes and projects positions:


### Claude 3.7 Sonnet
Hundreds of points are still being squished into a bottom horizontal and left vertical lines. The original point coordinate range has x values that go as far as a bit lower than -2 and y values lower than -6.



### Claude 3.7 Sonnet
Still not working, better spaced projection, but all squished points are still squished. Check if there is something to be done differently in this data.ts or on the other main.ts file


### Claude 3.7 Sonnet
Much better, points are now being consistently mapped, proportionally to their original x and y values, however, many points are being squished to the bottom and to the left side, in almost straight lines, because of the minimal distance between them in the original coordinates, that are numerically very small distances (in decimals). Please propose another projection strategy which applies some kind of non linear scale to spread these close points, such as a logarithmic. d3 is currently installed in the project, so if it is better to use d3 scaling functions for more efficient code than doing it from scratch go ahead.



### Claude 3.7 Sonnet
You have a working prototype with Vite and Cosmograph/Cosmos to visualize in WebGL graph and embedding data in data driven web and mobile experiences. It seeks to find order and patterns in unstructured data that can enable inductive observation for a deeper deductive assessment of multimodal datasets, starting with textual data. You are visualizing text-based sentence embeddings, using preprocessed data with the sentence-transformers library, BERTopic and UMAP. You have a so far a Vite app with Cosmos and Chart.js. Please check the following code and add functionality to display labels by type and scale their size by the numerical 'value' of data.  

We are trying to make sure that all data visualization with Cosmos for WebGL with large datasets and rely on d3.js just for data tooling (such as scales and color palettes) and DOM manipulation.  

Before writing the actual code suggestions from the code I will give you, check the following documentation of Cosmos:



### Perplexity AI:
You have a working prototype with Vite and Cosmograph/Cosmos to visualize in WebGL graph and embedding data in data driven web and mobile experiences. It seeks to find order and patterns in unstructured data that can enable inductive observation for a deeper deductive assessment of multimodal datasets, starting with textual data. You are visualizing text-based sentence embeddings, using preprocessed data with the sentence-transformers library, BERTopic and UMAP. You have a so far a Vite app with Cosmos and Chart.js. Please check the following code and add functionality to display labels by type and scale their size by the numerical 'value' of data.  



### Perplexity AI:
Change as little in the following code to enable visibility of labels of topic type nodes:
[ current code ]


### Perplexity AI:
You are trying to adapt a working prototype with Vite, Scrollama and Cosmograph/Cosmos to visualize in WebGL large datasets that so far uses Cosmos for graph visualization and simulation. The data also has x and y values, currently not used. Please look through the following example embeddings visualization code and current working code and suggest a implementation for plotting embeddings with x, y coordinates and no simulation



### Perplexity AI:
Here is the current version of the data.ts and main.ts scripts, please examine them carefully, do not change a single line of code, only add comments to explain the current functionality of each code block and relevant lines and put also in comments code that is problematic or inconsistent in its current state, but do not change the code, only add comments and code examples of fixes in comments.

I will give you also the cosmos/cosmograph library documentation so that you can make grounded suggestions based on the actual functionality and documentation of the library:

[ Current code ]

[ Cosmos API Reference documentation ]




### Perplexity AI:
I have updated and adjusted the code. Please add comments to the following code to explain in a clear and friendly way what is happening, specially with the lines dealing with data partsing, visual codings of data and position projection. We will go script by script, this is the data.ts file:



### Perplexity AI:
I have a working prototype of a web Vite app with Cosmos + Scrollama implemented to visualize data both in graph simulation and fixed projected positions from x, y coordinates in the data, transitioning between these views by Scrollama step triggers.

Please check the following code, analyze it and do not change a single line of the existing code. Keep everything, including commented lines, but add additional explanatory comments to explain what is currently happening.



### Perplexity AI:
When stepping into step 4, with the prefixed and projected positions of nodes, the hover function to print node metadata of hovered nodes is not working consistently with all nodes. There are regions and specific nodes of the plot where nodes indicate a hover state in the cursor, but do not print the metadata, as should happen with all nodes in the visualization. Here are the main.ts and data.st scripts, please examine what might  be happening and propose a solution:


### Perplexity AI:
In the data.ts file, currently, nodes are being colored by checking their type, if "topic" or "document" with prefixed colors for each one.  Lets explore now coloring each node by checking their "topic_label_str" value, and assigning the same random color, using d3 color palette generation functionality optimal for categorical color coding, to each found "topic_label_str", which should be applied consistently to each code sharing the same "topic_label_str" value. All colors should have 0.5 opacity.


Use the same logic but instead of pulling colors from d3 do it from a fixed array of rgba strings, following this color list, with a 0.5 alpha value in each one:
```
rgb(207,153,92)
rgb(87,124,235)
rgb(140,179,63)
rgb(90,87,186)
rgb(92,192,106)
rgb(176,115,217)
rgb(198,178,68)
rgb(76,53,137)
rgb(161,187,105)
rgb(205,110,198)
rgb(74,192,143)
rgb(194,71,145)
rgb(62,125,60)
rgb(115,44,115)
rgb(51,212,209)
rgb(204,63,92)
rgb(88,136,224)
rgb(200,136,50)
rgb(88,139,207)
rgb(193,83,44)
rgb(158,129,207)
rgb(98,114,30)
rgb(220,128,187)
rgb(169,99,55)
rgb(138,43,89)
rgb(213,87,79)
rgb(217,90,136)
rgb(132,39,32)
rgb(221,111,120)
rgb(149,48,70)
```


### Perplexity AI:
Currently labels, which are drawn in their own HTML canvas, are not visible in any step and their corresponding cosmosLabels label rendered object has an empty array. Only "topic" type nodes display labels. Check the following main.ts, labels.ts and style.css files, examine what might be happening and propose a solution so that topic node labels are visible in the steps where cosmosLabels.labelRenderer.draw(true);

### Perplexity AI:
Please check carefully the following current Cosmos documentation and look for relevant methods which can solve this label display issue. Propose an implementation as close as possible to the code I gave you:

[Cosmos API documentation]


### Perplexity AI:
Got an error, am I missing someting? Keep looking for a solution as close to the available Cosmos documentation and methods:

```
Uncaught TypeError: graph.getCanvas is not a function
```

### Perplexity AI:
Implemented the code and the CSS class. It does not return any errors, but there are still no labels and the array inside cosmosLabels is still empty.


### Perplexity AI:
I have a working prototype of a Vite app with Cosmos and Scrollama implemented for visualizing data in graph simulation and and prefixed embeddings x,y coordinates, depending on the scrollama step.

Before reviewing my code, examine the following Cosmos documentation and try to understand and deeply as possible how labels are handled with Cosmos methods. 

Make a short text based outline, no code yet, of how labels should be handled for populating them from data and displaying them conditionally, based on data (such as a type property in the data, used as reference to display or not labels). 

Try to understand specially how labels are handled by the Cosmos renderer depending on the currently visible nodes.

No code yet, just deep understanding and clear explanations.


### Perplexity:
You are right, Cosmos uses labels with @interacta/css-labels, here is the example code for adding and customizing point labels from the Cosmos documentation:

Please try again to outline the label functionality based solely on insights from these code example, no custom methods yet.

Cosmos ineracta css labels example:

[Cosmos interacta/css-labels example from documentation]


### Perplexity:
Based on this knowledge about Cosmos and interacta labels, specially con the CosmosLabels class, now check my current code, composed by main.ts, data.ts, labels.ts and style.css files.

Currently, no labels are visible, while points with "topic" type in their metadata should be displaying labels in steps where labelRenderer is set to true. Please examine my code, try to change only what is strictly necessary to make the labels visible as expected and customizable as far as the interacta/css-labels library allows.

[complete code fromt main.ts, data.ts, labels.ts and style.css]



## Claude 3.7 Sonnet:
I have a working prototype of a Vite app with Cosmos and Scrollama implemented for visualizing data in graph simulation and and prefixed embeddings x,y coordinates, depending on the scrollama step.
Currently labels, which are drawn in their own HTML canvas, are not visible in any step and their corresponding cosmosLabels class based object has an empty array. Only "topic" type nodes should display labels. Check the following main.ts, labels.ts and style.css files, examine what might be happening and propose a solution so that topic node labels are visible in the steps where cosmosLabels.labelRenderer.draw(true);
Cosmos uses interacta/css-labels methods.


## Claude 3.7 Sonnet:
Thank you, the 21 corresponding topic labels are now being populated in the array inside cosmosLabels, but their display and positioning is erratic. The data issues are solved, now it has do to with updating positions. In the first steps, position of nodes changes dynamically by the graph simulation. When entering step 3, they set to a projected/scaled coordinate space, as defined in this data.ts file

Thank you, it is almost working. It is now showing label with the implemented timeout, but just one label of the 21 which are loaded. It may be unrelated, but the label being displayed is the only one that does not have valid x,y values in the data. But this should not be an issue, specially in the steps where graph simulation determines the positions. Please examine the situation and suggest possible adjustments or things to check to see if I implemented the code correctly.


## Claude 3.7 Sonnet:
I have a working prototype of a Vite app with Cosmos and Scrollama implemented for visualizing data in graph simulation and and prefixed embeddings x,y coordinates, depending on the scrollama step. It is currently loading into the cosmosLabels class the 21 desired labels to be displayed, which are "topic" type from their point metadata, but the current implementation allows only one displaying at a time with the set timeout, it should try to always display all 21 of them or at least of all the visible topic points. Please check the following main.ts and labels.ts and try to propose a solution so that topic labels can be displayed simultaneously.

Keep the step structure and event handling of scrollama as it, propose a solution with the closest logic possible to the current implementation.