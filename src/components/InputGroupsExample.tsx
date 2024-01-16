import React from "react";
import { BaseNodeGraphExample } from "./BaseNodeGraphExample.tsx";
import { useBuildGraphConfig } from "@clarkmcc/ngraph";
import { Wheel } from "@uiw/react-color/src/index";
import { useNodeFieldValue } from "@clarkmcc/ngraph";

function ColorPicker({ slots, ...config }) {
  const [hsva, setHsva] = useNodeFieldValue(config.id, "#f87171");
  const Handle = slots?.Handle;
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "12px 12px",
      }}
    >
      {Handle && <Handle />}
      <Wheel
        width={140}
        height={140}
        color={hsva}
        onChange={(color) => setHsva(color.hex)}
        onFocus={config.onFocus}
        onBlur={config.onBlur}
      />
    </div>
  );
}

export function InputGroupsExample() {
  const config = useBuildGraphConfig(
    {
      valueTypes: {
        string: {
          name: "String",
          color: "#a1a1a1",
          inputType: "value",
          defaultValue: "",
        },
        number: {
          name: "Number",
          color: "#a1a1a1",
          inputType: "value",
          defaultValue: "0.000",
        },
        boolean: {
          name: "Boolean",
          color: "#a1a1a1",
          inputType: "checkbox",
          defaultValue: true,
        },
        specularDistribution: {
          name: "Specular Distribution",
          color: "#06b6d4",
          inputType: "options",
          options: [
            { name: "GGX", value: "ggx" },
            { name: "Beckmann", value: "beckmann" },
            { name: "Phong", value: "phong" },
          ],
          defaultValue: "GET",
        },
      },
      nodeGroups: {
        default: {
          name: "Default",
          color: "#CE4040",
        },
        inputs: {
          name: "Inputs",
          color: "#83324A",
        },
      },
      nodes: {
        number: {
          group: "default",
          name: "Number",
          inputs: [
            {
              name: "Value",
              id: "value",
              valueType: "number",
              isConstant: true,
            },
          ],
          outputs: [
            {
              name: "Value",
              id: "value",
              valueType: "number",
            },
          ],
        },
        color: {
          group: "inputs",
          name: "Color",
          style: {
            width: "100px",
          },
          inputs: [
            {
              name: "Color",
              id: "color",
              valueType: "color",
              isConstant: true,
            },
          ],
          outputs: [
            {
              name: "Color",
              id: "color",
              valueType: "color",
            },
          ],
        },
        bsdf: {
          group: "default",
          name: "Principled BSDF",
          inputs: [
            {
              name: "Metallic",
              id: "metallic",
              valueType: "number",
            },
            {
              name: "Roughness",
              id: "roughness",
              valueType: "number",
              defaultValue: "0.550",
            },
            {
              name: "IOR",
              id: "ior",
              valueType: "number",
              defaultValue: "1.450",
            },
            {
              name: "Alpha",
              id: "alpha",
              valueType: "number",
              defaultValue: "1.000",
            },
            {
              name: "Distribution",
              id: "distribution",
              group: "Specular",
              valueType: "specularDistribution",
            },
            {
              name: "IOR Level",
              id: "iorLevel",
              group: "Specular",
              valueType: "number",
            },
            {
              name: "Tint",
              id: "tint",
              group: "Specular",
              valueType: "color",
            },
            // {
            //   name: "Anisotropic",
            //   id: "anisotropic",
            //   group: "Specular",
            //   valueType: "number",
            // },
            // {
            //   name: "Anisotropic Rotation",
            //   id: "anisotropicRotation",
            //   group: "Specular",
            //   valueType: "number",
            // },
            {
              name: "Strength",
              id: "strength",
              group: "Emission",
              valueType: "number",
            },
          ],
        },
      },
    },
    (config) => {
      config.registerInput("color", ColorPicker, {
        name: "Color",
        color: "#C7C728",
      });
    },
  );
  return (
    <BaseNodeGraphExample
      zoom={1}
      config={config}
      defaultNodes={[
        {
          id: "2",
          type: "bsdf",
          position: { x: 250, y: 20 },
          data: {
            __inputGroupsExpanded: ["Specular"],
          },
        },
        {
          id: "1",
          type: "color",
          position: { x: 20, y: 20 },
          data: {},
        },
      ]}
      defaultEdges={[
        {
          id: "e1",
          source: "1",
          sourceHandle: "color",
          target: "2",
          targetHandle: "tint",
        },
      ]}
    />
  );
}
