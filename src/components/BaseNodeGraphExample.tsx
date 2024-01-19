import React from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "@xyflow/react";
import { GraphConfigProvider, NodeGraphEditor } from "@clarkmcc/ngraph";
import "./BaseNodeGraphExample.css";

export function BaseNodeGraphExample({
  config,
  defaultNodes,
  defaultEdges,
  zoom,
}) {
  return (
    <ReactFlowProvider>
      <GraphConfigProvider defaultConfig={config}>
        <NodeGraphEditor
          minZoom={zoom ?? 1}
          maxZoom={zoom ?? 1}
          panOnDrag={false}
          backgroundStyles={{
            backgroundColor: "rgba(20, 20, 20, 0.6)", // allow the background to bleed through
          }}
          defaultNodes={defaultNodes}
          defaultEdges={defaultEdges}
        >
          <Background color="#aaa" variant={BackgroundVariant.Dots} />
        </NodeGraphEditor>
      </GraphConfigProvider>
    </ReactFlowProvider>
  );
}
