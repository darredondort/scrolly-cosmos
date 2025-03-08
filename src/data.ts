import { sentences } from "./sentences.ts";

function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const pointLabelToIndex = new Map<string, number>();
const pointIndexToLabel = new Map<number, string>();
const pointPositions: number[] = [];
const pointColors: number[] = [];
const pointSizes: number[] = [];
const pointMetadata: any[] = [];
const linkColorsA: number[] = [];

// Color constants
const TOPIC_COLOR = [244 / 255, 253 / 255, 117 / 255];
const TEXT_COLOR = [81 / 255, 66 / 255, 93 / 255];

// 1. Create nodes (text and topic)
sentences.forEach((p, index) => {
  pointLabelToIndex.set(p.label, index);
  pointIndexToLabel.set(index, p.label);

  pointMetadata.push(p);

  pointPositions.push(4096 * getRandom(0.495, 0.505));
  pointPositions.push(4096 * getRandom(0.495, 0.505));

  const [r, g, b] = p.type === "topic" ? TOPIC_COLOR : TEXT_COLOR;
  pointColors.push(r, g, b, 0.7);

  linkColorsA.push(1, 0, 0, 0.8);

  const isTopic = p.type === "topic";
  const scaleParams = isTopic
    ? { scale: 0.8, min: 6, max: 18 }
    : { scale: 1, min: 4, max: 4 };

  const rawValue = Number(p.value);
  let size = Math.min(
    scaleParams.max,
    Math.max(scaleParams.min, rawValue * scaleParams.scale)
  );

  pointSizes.push(size);
});

// 2. Create links (only text -> topic)
const links: number[] = [];
sentences.forEach((source) => {
  if (source.type === "text") {
    const targetTopicLabel = source.topic_label_str;
    const target = sentences.find(
      (s) => s.topic_label_str === targetTopicLabel && s.type === "topic"
    ); // Find corresponding topic
    if (target) {
      const sourceIndex = pointLabelToIndex.get(source.label);
      const targetIndex = pointLabelToIndex.get(target.label);
      if (sourceIndex !== undefined && targetIndex !== undefined) {
        links.push(sourceIndex, targetIndex);
      }
    }
  }
});

export {
  pointPositions,
  pointColors,
  linkColorsA,
  pointSizes,
  pointLabelToIndex,
  pointIndexToLabel,
  pointMetadata,
  links, // Export the generated links
};

export { sentences };
