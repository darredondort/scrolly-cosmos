import { sentences } from './sentences.ts';

function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const pointLabelToIndex = new Map<string, number>();
const pointIndexToLabel = new Map<number, string>();
const pointPositions: number[] = [];
const pointColors: number[] = [];
const pointSizes: number[] = [];

// Create an array to store the point metadata
const pointMetadata: any[] = [];

Array.from(
    new Set([
        ...sentences.map((p) => `P:${p.label}`),
        ...sentences.map((p) => p.topic_label_str),
    ])
).forEach((point, index) => {
    pointLabelToIndex.set(point, index);
    pointIndexToLabel.set(index, point);

    // Access metadata from performances array
    let metadata;
    let isTopic = false;
    if (point.startsWith('P:')) {
        const label = point.substring(2); // Remove "P:" prefix
        metadata = sentences.find(p => p.label === label);
    } else {
        metadata = sentences.find(p => p.topic_label_str === point);
        isTopic = true; // Mark category_label nodes as topics
    }

    // Store the metadata of the point
    pointMetadata.push(metadata || {});

    // Initial position (can be adjusted for better layout)
    pointPositions.push(4096 * getRandom(0.495, 0.505)); // x
    pointPositions.push(4096 * getRandom(0.495, 0.505)); // y

    // Initial color (can be adjusted for better layout)
    let colorR = isTopic ? 244 / 256 : 81 / 256;
    let colorG = isTopic ? 253 / 256 : 66 / 256;
    let colorB = isTopic ? 117 / 256 : 93 / 256;
    const colorA = 1;
    // rgb(81,66,93)
    // rgb(85,176,148)
    // rgb(244,253,117)
    pointColors.push(colorR);
    pointColors.push(colorG);
    pointColors.push(colorB);
    pointColors.push(colorA);

    // Example conditional visual coding based on metadata
    let size = isTopic ? 14 : 4; // Default size

    // Visual coding based on category
    pointSizes.push(size);

    // Log the data
    // console.log(metadata);
});

// Custom function to sort links with topics in the center
function sortLinks(links: number[], pointMetadata: any[]): number[] {
    const topicLinks: number[][] = [];
    const textLinks: number[][] = [];

    for (let i = 0; i < links.length; i += 2) {
        const source = links[i];
        const target = links[i + 1];
        const sourceMetadata = pointMetadata[source];
        const targetMetadata = pointMetadata[target];

        if (sourceMetadata && sourceMetadata.type === 'topic' || targetMetadata && targetMetadata.type === 'topic') {
            topicLinks.push([source, target]);
        } else {
            textLinks.push([source, target]);
        }
    }

    return topicLinks.flat().concat(textLinks.flat());
}

export const links = sortLinks(
    sentences
        .map((p) => [
            pointLabelToIndex.get(p.topic_label_str),
            pointLabelToIndex.get(`P:${p.label}`),
        ])
        .flat() as number[],
    pointMetadata
);

export {
    pointPositions,
    pointColors,
    pointSizes,
    pointLabelToIndex,
    pointIndexToLabel,
    pointMetadata, // Export the pointMetadata array
};



export { sentences }; // Export performances
