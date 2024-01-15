import React from "react";
import { BaseNodeGraphExample } from "./BaseNodeGraphExample.tsx";
import { useBuildGraphConfig } from "@clarkmcc/ngraph";

export function HandleShapesExample() {
  const config = useBuildGraphConfig({
    valueTypes: {
      circle: {
        name: "Circle",
        color: "#38bdf8",
        inputType: "value",
        defaultValue: "0",
        shape: "circle",
      },
      diamondDot: {
        name: "Diamond Dot",
        color: "#38bdf8",
        inputType: null,
        shape: "diamondDot",
      },
      diamond: {
        name: "Diamond",
        color: "#38bdf8",
        inputType: null,
        shape: "diamond",
      },
    },
    nodeGroups: {
      geometry: {
        name: "Geometry",
        color: "#0284c7",
      },
    },
    nodes: {
      shapes: {
        group: "geometry",
        name: "Shapes",
        outputs: [
          {
            name: "Circle",
            id: "circle",
            valueType: "circle",
          },
          {
            name: "Diamond",
            id: "diamond",
            valueType: "diamond",
          },
          {
            name: "Diamond Dot",
            id: "diamondDot",
            valueType: "diamondDot",
          },
        ],
      },
    },
  });
  return (
    <BaseNodeGraphExample
      zoom={1.25}
      config={config}
      defaultNodes={[
        {
          id: "1",
          type: "shapes",
          position: {
            x: 150,
            y: 50,
          },
          data: {
            label: "Shapes",
          },
        },
      ]}
      defaultEdges={[]}
    />
  );
}
