import { LabelRenderer, LabelOptions } from "@interacta/css-labels";
import { Graph } from "@cosmograph/cosmos";
import { pointIndexToLabel, pointMetadata } from "./data"; // Import pointMetadata

export class CosmosLabels {
  private labelRenderer: LabelRenderer;
  private labels: LabelOptions[] = [];

  constructor(div: HTMLDivElement) {
    this.labelRenderer = new LabelRenderer(div, { pointerEvents: "none" });
  }

  update(graph: Graph): void {
    const trackedNodesPositions = graph.getTrackedPointPositionsMap();
    this.labels = [];

    trackedNodesPositions.forEach((positions, pointIndex) => {
      // Access the metadata for the current point
      const metadata = pointMetadata[pointIndex];

      // Check if the node is a topic
      if (metadata && metadata.type === "topic") {
        // if (metadata && metadata.type === 'text') {
        // const label = pointIndexToLabel.get(pointIndex) ?? '';
        const label = metadata["topic_label_str"];
        const screenPosition = graph.spaceToScreenPosition([
          positions?.[0] ?? 0,
          positions?.[1] ?? 0,
        ]);

        const radius = graph.spaceToScreenRadius(
          graph.getPointRadiusByIndex(pointIndex) as number
        );

        this.labels.push({
          id: `${pointIndex}`,
          text: label,
          x: screenPosition[0],
          y: screenPosition[1] - (radius + 2),
          opacity: 1,
          // color: "#ECE6F0;",
        });
      }
    });

    this.labelRenderer.setLabels(this.labels);
    this.labelRenderer.draw(false);
  }
}
