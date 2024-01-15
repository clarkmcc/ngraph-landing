import React from "react";
import { BaseNodeGraphExample } from "./BaseNodeGraphExample.tsx";
import { useBuildGraphConfig } from "@clarkmcc/ngraph";

export function InputsExample() {
  const config = useBuildGraphConfig({
    valueTypes: {
      string: {
        name: "String",
        color: "#a1a1a1",
        inputType: "value",
        defaultValue: "",
      },
      boolean: {
        name: "Boolean",
        color: "#a1a1a1",
        inputType: "checkbox",
        defaultValue: true,
      },
      httpMethod: {
        name: "HTTP Method",
        color: "#06b6d4",
        inputType: "options",
        options: [
          {
            name: "GET",
            value: "GET",
          },
          {
            name: "POST",
            value: "POST",
          },
          {
            name: "PUT",
            value: "PUT",
          },
          {
            name: "DELETE",
            value: "DELETE",
          },
        ],
        defaultValue: "GET",
      },
      httpProtocol: {
        name: "HTTP Method",
        color: "#0284c7",
        inputType: "buttonGroup",
        options: [
          {
            name: "HTTP",
            value: "HTTP",
          },
          {
            name: "HTTPS",
            value: "HTTPS",
          },
        ],
        defaultValue: "HTTP",
      },
    },
    nodeGroups: {
      default: {
        name: "Default",
        color: "#0284c7",
      },
    },
    nodes: {
      inputFields: {
        group: "default",
        name: "Input Fields",
        inputs: [
          {
            name: "Value",
            id: "value",
            valueType: "string",
          },
          {
            name: "Constant",
            id: "constant",
            valueType: "string",
            isConstant: true,
          },
          {
            name: "Array",
            id: "array",
            valueType: "string",
            isArray: true,
          },
          {
            name: "Options",
            id: "options",
            valueType: "httpMethod",
          },
          {
            name: "Button Group",
            id: "buttonGroup",
            valueType: "httpProtocol",
          },
          {
            name: "Checkbox",
            id: "checkbox",
            valueType: "boolean",
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
          type: "inputFields",
          position: {
            x: 200,
            y: 50,
          },
          data: {
            label: "Input Node",
          },
        },
      ]}
      defaultEdges={[]}
    />
  );
}
