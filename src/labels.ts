import { LabelRenderer, LabelOptions } from '@interacta/css-labels';
import { Graph } from '@cosmograph/cosmos';
import { pointIndexToLabel } from './data';

export class CosmosLabels {
  private labelRenderer: LabelRenderer;
  private labels: LabelOptions[] = [];
  private visibleNodes: Set<number> = new Set();

  constructor(div: HTMLDivElement) {
    this.labelRenderer = new LabelRenderer(div, { pointerEvents: 'none' });
  }

  setVisibleNodes(nodes: Set<number>) {
    this.visibleNodes = nodes;
  }

  update(graph: Graph): void {
    const trackedNodesPositions = graph.getTrackedPointPositionsMap();
    this.labels = [];

    trackedNodesPositions.forEach((positions, pointIndex) => {
      if (this.visibleNodes.has(pointIndex)) {
        const label = pointIndexToLabel.get(pointIndex) ?? '';
        const isPerformance = label.startsWith('P:');
        const text = isPerformance ? label.split(':')[1] : label;

        const screenPosition = graph.spaceToScreenPosition([
          positions?.[0] ?? 0,
          positions?.[1] ?? 0,
        ]);

        const radius = graph.spaceToScreenRadius(
          graph.getPointRadiusByIndex(pointIndex) as number
        );

        this.labels.push({
          id: `${pointIndex}`,
          text,
          x: screenPosition[0],
          y: screenPosition[1] - (radius + 2),
          opacity: 1,
        });
      }
    });

    this.labelRenderer.setLabels(this.labels);
    this.labelRenderer.draw(true);
  }
}
