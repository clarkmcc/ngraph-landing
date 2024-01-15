import {
  useBuildGraphConfig,
  useNodeFieldValue,
  type InputProps,
} from "@clarkmcc/ngraph";
import { Sketch } from "@uiw/react-color/src/index";
import "./Hero.css";
import { BaseNodeGraphExample } from "./BaseNodeGraphExample";

function ColorPicker({ id, onFocus, onBlur, slots, ...rest }: InputProps) {
  const Handle = slots?.Handle;
  const [hex, setHex] = useNodeFieldValue(id, "#f87171");
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!rest.isConstant && Handle && <Handle />}
      <Sketch
        onFocus={onFocus}
        onBlur={onBlur}
        color={hex}
        draggable
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
  );
}

export default function Hero({ zoom }) {
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
          defaultValue: "0",
        },
        boolean: {
          name: "Boolean",
          color: "#a1a1a1",
          inputType: "checkbox",
          defaultValue: false,
        },
        microfacetDistribution: {
          name: "Microfacet Distribution",
          color: "#a1a1a1",
          inputType: "options",
          defaultValue: "ggx",
          options: [{ value: "ggx", name: "GGX" }],
        },
        shader: {
          name: "Shader",
          color: "#8b5cf6",
          inputType: "shader",
        },
        bsdf: {
          name: "BSDF",
          color: "#4ade80",
          inputType: null,
        },
      },
      nodeGroups: {
        materials: {
          name: "Materials",
          color: "#ef4444",
        },
        inputs: {
          name: "Inputs",
          color: "#f59e0b",
        },
      },
      nodes: {
        roughness: {
          group: "inputs",
          name: "Roughness",
          inputs: [
            {
              name: "Roughness",
              id: "roughness",
              valueType: "number",
              isConstant: true,
              defaultValue: "0.55",
            },
          ],
          outputs: [
            {
              name: "Roughness",
              id: "roughness",
              valueType: "number",
            },
          ],
        },
        glassBsdf: {
          group: "materials",
          name: "Glass BSDF",
          style: { minWidth: "300px" },
          inputs: [
            {
              name: "Distribution",
              id: "distribution",
              valueType: "microfacetDistribution",
              defaultValue: "ggx",
            },
            {
              name: "Color",
              id: "color",
              valueType: "color",
            },
            {
              name: "Roughness",
              id: "roughness",
              valueType: "number",
              defaultValue: 0.0,
            },

            {
              name: "IOR",
              id: "ior",
              valueType: "number",
              defaultValue: 0.145,
            },
            {
              name: "Normal",
              id: "normal",
              valueType: "shader",
              defaultValue: 0.145,
            },
          ],
          outputs: [
            {
              name: "BSDF",
              id: "bsdf",
              valueType: "bsdf",
            },
          ],
        },
        color: {
          group: "materials",
          name: "Color",
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
      },
    },
    (config) => {
      config.registerInput("color", ColorPicker, {
        name: "Color",
        color: "#f43f5e",
        shape: "diamondDot",
      });
    },
  );

  return (
    <BaseNodeGraphExample
      zoom={zoom}
      config={config}
      defaultNodes={[
        {
          id: "1",
          type: "color",
          position: { x: 30, y: 30 },
          data: {},
        },
        {
          id: "2",
          type: "glassBsdf",
          position: { x: 350, y: 100 },
          data: {},
        },
        {
          id: "3",
          type: "roughness",
          position: { x: 30, y: 430 },
          data: {},
        },
      ]}
      defaultEdges={[
        {
          id: "e1",
          source: "1",
          sourceHandle: "color",
          target: "2",
          targetHandle: "color",
        },
        {
          id: "e2",
          source: "3",
          sourceHandle: "roughness",
          target: "2",
          targetHandle: "roughness",
        },
      ]}
    />
  );
}
