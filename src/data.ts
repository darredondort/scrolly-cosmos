// Import necessary modules
import { sentences } from "./sentences_03.ts";
import { scaleLog, scalePow, scaleSymlog } from 'd3-scale';
import { extent } from 'd3-array';
// data.ts
import * as d3 from 'd3';


// Define constants for Cosmos space
// This sets up the boundaries and usable area for our visualization
const cosmosSpaceSize = 4096;
const paddingRatio = 0.001; // 0.1% padding on each side
const usableSpaceSize = cosmosSpaceSize * (1 - (paddingRatio * 2));
const spaceMin = -cosmosSpaceSize / 2 + (cosmosSpaceSize * paddingRatio);
const spaceMax = cosmosSpaceSize / 2 - (cosmosSpaceSize * paddingRatio);

// Define color constants for visual coding
// Topics and text will have different colors
const TOPIC_COLOR = [244 / 255, 253 / 255, 117 / 255];
const TEXT_COLOR = [81 / 255, 66 / 255, 93 / 255];

// Define link color constants
// These will be used to visually distinguish different types of connections
// const linkColorsHigh = 'rgba(255,0,117,0.9)';
const linkColorsHigh = 'rgba(244,253,117,0.3)';
const linkColorsLow = 'rgba(244,253,117,0.2)';
const linkColorsDisabled = 'rgba(244,253,117,0.0)';

// Helper function: Apply non-linear scaling to spread out data points
function applyNonLinearScaling(values: number[], targetRange: [number, number]): number[] {
  const [min, max] = extent(values);
  
  // If the range is small, use power scale to spread data
  if (max - min < 1) {
    const scale = scalePow()
      // .exponent(5) // Adjust exponent as needed
      .exponent(1)
      .domain([min, max])
      .range(targetRange);
    return values.map(v => scale(v));
  }

  // Use symlog for data with negative/zero values or clustered points
  if (min < 0 || values.some(v => v === 0)) {
    const scale = scaleSymlog()
      // .constant(0.1)
      // .constant(15)
      .constant(5)
      .domain([min, max])
      .range(targetRange);
    return values.map(v => scale(v));
  }

  // Use log scale for positive-only data
  const scale = scaleLog()
    .domain([Math.max(0.001, min), max])
    .range(targetRange);
  
  return values.map(v => scale(Math.max(0.001, v)));
}

// Apply scaling to both X and Y coordinates
function scaleCoordinates(allX: number[], allY: number[]): { scaledX: number[], scaledY: number[] } {
  const scaledX = applyNonLinearScaling(allX, [spaceMin, spaceMax]);
  const scaledY = applyNonLinearScaling(allY, [spaceMin, spaceMax]);

  console.log("Scaled X range:", Math.min(...scaledX), "to", Math.max(...scaledX));
  console.log("Scaled Y range:", Math.min(...scaledY), "to", Math.max(...scaledY));

  return { scaledX, scaledY };
}

// Extract all X and Y coordinates from the sentences data
const allX = sentences.map(p => p.x);
const allY = sentences.map(p => p.y);

// Scale the coordinates to fit within our Cosmos space
const { scaledX, scaledY } = scaleCoordinates(allX, allY);

// Initialize data structures for storing node information
const pointLabelToIndex = new Map<string, number>();
const pointIndexToLabel = new Map<number, string>();
const pointPositions: number[] = [];
// const pointColors: number[] = [];
const pointSizes: number[] = [];
const pointMetadata: any[] = [];



// Create nodes with scaled positions
sentences.forEach((p, index) => {
  // Map labels to indices and vice versa
  pointLabelToIndex.set(p.label, index);
  pointIndexToLabel.set(index, p.label);

  // Store metadata for each point
  pointMetadata.push(p || {});

  // Use scaled coordinates for point positions
  pointPositions.push(scaledX[index], scaledY[index]);

  // Set colors based on whether the point is a topic or text
  // const [r, g, b] = p.type === "topic" ? TOPIC_COLOR : TEXT_COLOR;
  // pointColors.push(r, g, b, 0.7);

  // const [lr, lg, lb, la] = LINK_COLOR_HIGH;
  // linkColorsHigh.push(lr, lg, lb, la);
  // console.log("")
  // console.log(lilinkColorsHighnkColorsHigh)

  // const [lr, lg, lb] = LINK_COLOR_HIGH;
  // const [lr, lg, lb] = LINK_COLOR_HIGH;
  // linkColorsHigh.push(r, g, b, 0.7);
  
  // linkColorsHigh.push(1, 0, 0, 0.5);
  // linkColorsLow.push(1, 0, 0, 0.1);
  // linkColorsDisabled.push(1, 0, 0, 0);


  // Determine point size based on type and value
  const isTopic = p.type === "topic";
  const scaleParams = isTopic
    ? { scale: 0.8, min: 32, max: 80 }
    : { scale: 1, min: 18, max: 18 };

  const rawValue = Number(p.value);
  
  let size = Math.min(
    scaleParams.max,
    Math.max(scaleParams.min, rawValue * scaleParams.scale)
  );
  
  pointSizes.push(size);
});


const topicLabels = [...new Set(pointMetadata.map(metadata => metadata.topic_label_str))];
const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(topicLabels);
const pointColors = pointMetadata.flatMap(metadata => {
  const topicLabel = metadata.topic_label_str;
  const color = colorScale(topicLabel) as string; // Get the color from the scale

  // Convert the color to rgba with 0.5 opacity
  const rgbaColor = d3.color(color)?.rgb();
  const r = rgbaColor?.r || 0;
  const g = rgbaColor?.g || 0;
  const b = rgbaColor?.b || 0;

  return [r / 255, g / 255, b / 255, 0.5]; // Normalize to 0-1 range and set opacity to 0.5
});




// Create links between nodes
const links: number[] = [];
sentences.forEach((source) => {
  if (source.type === "document") {
    const targetTopicLabel = source.topic_label_str;
    const target = sentences.find(
      (s) => s.topic_label_str === targetTopicLabel && s.type === "topic"
    );
    
    if (target) {
      const sourceIndex = pointLabelToIndex.get(source.label);
      const targetIndex = pointLabelToIndex.get(target.label);

      if (sourceIndex !== undefined && targetIndex !== undefined) {
        links.push(sourceIndex, targetIndex);
      }
    }
  }
});

// Export data structures for use in other parts of the application
export {
  pointPositions,
  pointColors,
  linkColorsHigh,
  linkColorsLow,
  linkColorsDisabled,
  pointSizes,
  pointLabelToIndex,
  pointIndexToLabel,
  pointMetadata,
  links,
  cosmosSpaceSize,
  usableSpaceSize,
  sentences
};
