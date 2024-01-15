import React from "react";
import { BaseNodeGraphExample } from "./BaseNodeGraphExample.tsx";
import { useBuildGraphConfig } from "@clarkmcc/ngraph";

export function ArrayInputsExample() {
  const config = useBuildGraphConfig({
    valueTypes: {
      number: {
        name: "Number",
        color: "#a1a1a1",
        inputType: "value",
        defaultValue: "0",
      },
      vector: {
        name: "Vector",
        color: "#fca5a5",
        inputType: null,
      },
      geometry: {
        name: "Geometry",
        color: "#059669",
        inputType: null,
      },
    },
    nodeGroups: {
      geometry: {
        name: "Geometry",
        color: "#ce4040",
      },
    },
    nodes: {
      combineXYZ: {
        group: "geometry",
        name: "Combine XYZ",
        inputs: [
          {
            name: "X",
            id: "x",
            valueType: "number",
          },
          {
            name: "Y",
            id: "y",
            valueType: "number",
          },
          {
            name: "Z",
            id: "z",
            valueType: "number",
          },
        ],
        outputs: [
          {
            name: "Vector",
            id: "vector",
            valueType: "vector",
          },
        ],
      },
      viewer: {
        group: "geometry",
        name: "Viewer",
        inputs: [
          {
            name: "Vectors",
            id: "vectors",
            valueType: "vector",
            isArray: true,
          },
        ],
      },
    },
  });
  return (
    <BaseNodeGraphExample
      zoom={1}
      config={config}
      defaultNodes={[
        {
          id: "1",
          type: "combineXYZ",
          position: {
            x: 30,
            y: 30,
          },
          data: {
            label: "Combine XYZ",
          },
        },
        {
          id: "2",
          type: "combineXYZ",
          position: {
            x: 30,
            y: 200,
          },
          data: {
            __collapsed: true,
          },
        },
        {
          id: "3",
          type: "viewer",
          position: {
            x: 300,
            y: 50,
          },
          selected: true,
          data: {
            label: "Viewer",
          },
        },
      ]}
      defaultEdges={[
        {
          id: "e1",
          source: "1",
          sourceHandle: "vector",
          target: "3",
          targetHandle: "vectors",
        },
        {
          id: "e2",
          source: "2",
          sourceHandle: "vector",
          target: "3",
          targetHandle: "vectors",
        },
      ]}
    />
  );
}
