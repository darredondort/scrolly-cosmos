import { sentences } from './sentences.ts';

function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;

    
}

export const categoriesToShowLabelsFor = [
    '0000002-topic',
    '0000003-topic',
    '0000004-topic'
];

const pointLabelToIndex = new Map<string, number>();
const pointIndexToLabel = new Map<number, string>();
const pointPositions: number[] = [];
const pointColors: number[] = [];

const linkColorsA: number[] = [];
// const linkColorsB: number[] = [];
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

    // Access metadata from sentences array
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
    const colorA = 0.7;
    // rgb(81,66,93)
    // rgb(85,176,148)
    // rgb(244,253,117)
    pointColors.push(colorR);
    pointColors.push(colorG);
    pointColors.push(colorB);
    pointColors.push(colorA);



    // // Initial link color (can be adjusted for better layout)
    let linkColorAR = 1;
    let linkColorAG = 0;
    let linkColorAB = 0;
    const linkColorAA = 0.8;
    // rgb(81,66,93)
    // rgb(85,176,148)
    // rgb(244,253,117)
    linkColorsA.push(linkColorAR);
    linkColorsA.push(linkColorAG);
    linkColorsA.push(linkColorAB);
    linkColorsA.push(linkColorAA);





    


    // pointSizes.push(categoriesToShowLabelsFor.includes(point.includes('topic') ? point.split(':')[1] : point) ? 80 : 2);

    // Example conditional visual coding based on metadata
    let size = isTopic ? 6 : 4; // Default size

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
    linkColorsA,
    pointSizes,
    pointLabelToIndex,
    pointIndexToLabel,
    pointMetadata, // Export the pointMetadata array
};



export { sentences }; // Export sentences

































// // data.ts

// import { sentences } from './sentences.ts';

// function getRandom(min: number, max: number): number {
//     return Math.random() * (max - min) + min;
// }

// export const categoriesToShowLabelsFor = [
//     '0000002-topic',
//     '0000003-topic',
//     '0000004-topic'
// ];

// const pointLabelToIndex = new Map<string, number>();
// const pointIndexToLabel = new Map<number, string>();
// const pointPositions: number[] = [];  // Will now hold *actual* x, y coords
// const pointColors: number[] = [];
// const pointSizes: number[] = [];

// // Create an array to store the point metadata
// const pointMetadata: any[] = [];

// Array.from(
//     new Set([
//         ...sentences.map((p) => `P:${p.label}`),
//         ...sentences.map((p) => p.topic_label_str),
//     ])
// ).forEach((point, index) => {
//     pointLabelToIndex.set(point, index);
//     pointIndexToLabel.set(index, point);

//     // Access metadata from sentences array
//     let metadata;
//     let isTopic = false;
//     if (point.startsWith('P:')) {
//         const label = point.substring(2); // Remove "P:" prefix
//         metadata = sentences.find(p => p.label === label);
//     } else {
//         metadata = sentences.find(p => p.topic_label_str === point);
//         isTopic = true; // Mark category_label nodes as topics
//     }

//     // Store the metadata of the point
//     pointMetadata.push(metadata || {});

//     //  Use actual x, y coordinates from data (assuming 'x' and 'y' properties exist)
//     //  Important:  Adjust scaling/translation if needed to fit within Cosmos's coordinate space
//     //  Cosmos expects values generally in the -1 to 1 or 0 to 1 range after rescaling
//     const x = metadata?.x ?? 0;  //  Use a default if 'x' is missing
//     const y = metadata?.y ?? 0;  // Use a default if 'y' is missing

//     pointPositions.push(x); // x
//     pointPositions.push(y); // y

//     // Initial color (can be adjusted for better layout)
//     let colorR = isTopic ? 244 / 256 : 81 / 256;
//     let colorG = isTopic ? 253 / 256 : 66 / 256;
//     let colorB = isTopic ? 117 / 256 : 93 / 256;
//     const colorA = 1;

//     pointColors.push(colorR);
//     pointColors.push(colorG);
//     pointColors.push(colorB);
//     pointColors.push(colorA);

//     pointSizes.push(categoriesToShowLabelsFor.includes(point.includes('topic') ? point.split(':')[1] : point) ? 8 : 2);

//     // Example conditional visual coding based on metadata
//     let size = isTopic ? 14 : 4; // Default size

//     // Visual coding based on category
//     pointSizes.push(size);
// });

// // Custom function to sort links with topics in the center
// function sortLinks(links: number[], pointMetadata: any[]): number[] {
//     const topicLinks: number[][] = [];
//     const textLinks: number[][] = [];

//     for (let i = 0; i < links.length; i += 2) {
//         const source = links[i];
//         const target = links[i + 1];
//         const sourceMetadata = pointMetadata[source];
//         const targetMetadata = pointMetadata[target];

//         if (sourceMetadata && sourceMetadata.type === 'topic' || targetMetadata && targetMetadata.type === 'topic') {
//             topicLinks.push([source, target]);
//         } else {
//             textLinks.push([source, target]);
//         }
//     }

//     return topicLinks.flat().concat(textLinks.flat());
// }

// export const links = sortLinks(
//     sentences
//         .map((p) => [
//             pointLabelToIndex.get(p.topic_label_str),
//             pointLabelToIndex.get(`P:${p.label}`),
//         ])
//         .flat() as number[],
//     pointMetadata
// );

// export {
//     pointPositions,
//     pointColors,
//     pointSizes,
//     pointLabelToIndex,
//     pointIndexToLabel,
//     pointMetadata, // Export the pointMetadata array
// };

// export { sentences }; // Export sentences
