import type { CSSProperties } from "react";
import FactorScreen, { screen } from "@/components/FactorScreen";

// The dashboard's building blocks on a board, side by side without overlapping: the tiles with the
// stop reasons beside them, then the big cards in two columns. Positions are on a 1000-wide board:
// x, y and width per element.
const elements = [
  { image: screen("el-tile-plants", 348, 346, "Plants tile button, active"), x: 0, y: 0, w: 136 },
  { image: screen("el-tile-planning", 348, 346, "Planning tile button"), x: 150, y: 0, w: 136 },
  { image: screen("el-tile-projects", 348, 346, "Projects tile button"), x: 300, y: 0, w: 136 },
  { image: screen("el-tile-kanban", 348, 346, "Kanban tile button"), x: 450, y: 0, w: 136 },
  { image: screen("el-tile-monitoring", 348, 346, "Monitoring tile button"), x: 600, y: 0, w: 136 },
  { image: screen("el-stops", 456, 266, "Stop reasons"), x: 770, y: 0, w: 230 },
  { image: screen("el-forming-cycle", 1142, 1244, "Forming cycle card"), x: 0, y: 170, w: 440 },
  { image: screen("el-chart", 1020, 772, "WF-13R bar chart card"), x: 470, y: 170, w: 530 },
  { image: screen("el-oil", 1060, 760, "Oil level card"), x: 470, y: 601, w: 530 },
  { image: screen("el-heating", 950, 756, "Heating cartridges card"), x: 0, y: 679, w: 440 },
];
const BOARD_HEIGHT = 1030;

export default function FactorElements() {
  return (
    <div className="factor-elements" style={{ "--board-h": BOARD_HEIGHT } as CSSProperties}>
      {elements.map(({ image, x, y, w }) => (
        <div key={image.name} className="factor-element" style={{ "--x": x, "--y": y, "--w": w } as CSSProperties}>
          <FactorScreen image={image} />
        </div>
      ))}
    </div>
  );
}
