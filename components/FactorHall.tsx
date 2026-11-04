"use client";

import { useEffect, useState } from "react";

// The plant map from the Factor-MES dashboard, redrawn from the old case-study picture so every
// building can light up on its own. One at a time turns blue, the rest stay grey glass, and the
// lit one's label turns purple, the way the dashboard marks the hall you're looking at.
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const STEP_MS = 2400;

type Hall = {
  name: string;
  // The top face's left corner, its length up-right (a), depth down-right (b) and height (h).
  at: [number, number];
  a: number;
  b: number;
  h: number;
  // Where the label sits, which side, and where its line bends towards the building.
  label: { y: number; side: "left" | "right"; bend: number };
};

const halls: Hall[] = [
  { name: "Big hall", at: [176, 220], a: 214, b: 120, h: 25, label: { y: 196, side: "left", bend: 210 } },
  { name: "Milling 1", at: [383, 267], a: 164, b: 46, h: 24, label: { y: 260, side: "left", bend: 380 } },
  { name: "Cutting torch", at: [403, 352], a: 166, b: 70, h: 24, label: { y: 325, side: "left", bend: 415 } },
  { name: "Laser & water cutting", at: [546, 390], a: 189, b: 70, h: 24, label: { y: 390, side: "left", bend: 560 } },
  { name: "Milling 2", at: [381, 101], a: 95, b: 97, h: 34, label: { y: 41, side: "right", bend: 541 } },
  { name: "Offices", at: [546, 174], a: 143, b: 47, h: 23, label: { y: 106, side: "right", bend: 703 } },
  { name: "Warehouse", at: [567, 257], a: 142, b: 70, h: 24, label: { y: 171, side: "right", bend: 768 } },
];

const LEFT_X = 35;
const RIGHT_X = 955;

function geometry(hall: Hall) {
  const [x, y] = hall.at;
  const back = [x + hall.a * COS, y - hall.a * SIN];
  const front = [x + hall.b * COS, y + hall.b * SIN];
  const right = [back[0] + hall.b * COS, back[1] + hall.b * SIN];
  const pts = (list: number[][]) => list.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
  const down = (p: number[]) => [p[0], p[1] + hall.h];
  return {
    front: front[1],
    top: pts([[x, y], back, right, front]),
    left: pts([[x, y], front, down(front), down([x, y])]),
    right: pts([front, right, down(right), down(front)]),
    // The edges behind the glass, which show through faintly.
    hidden: pts([down([x, y]), down(back), down(right)]),
    post: pts([back, down(back)]),
    dot: [x + (hall.a * COS + hall.b * COS) / 2, y + (hall.b * SIN - hall.a * SIN) / 2],
  };
}

// Drawn back to front, so nearer buildings cover the ones behind them.
const drawn = halls
  .map((hall, index) => ({ hall, index, ...geometry(hall) }))
  .sort((p, q) => p.front - q.front);

export default function FactorHall() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % halls.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <svg
      className="factor-hall"
      viewBox="0 0 990 470"
      role="img"
      aria-label={`Factor-MES plant map with ${halls.map((hall) => hall.name).join(", ")}; ${halls[active].name} is selected`}
    >
      <defs>
        <linearGradient id="hall-top" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4cc3e6" />
          <stop offset="1" stopColor="#2f78dd" />
        </linearGradient>
      </defs>

      {drawn.map(({ hall, index, top, left, right, hidden, post }) => (
        <g key={hall.name} className={`factor-hall-box${index === active ? " is-active" : ""}`}>
          <polygon className="factor-hall-left" points={left} />
          <polygon className="factor-hall-right" points={right} />
          <polygon className="factor-hall-top" points={top} />
          <polyline className="factor-hall-hidden" points={hidden} />
          <polyline className="factor-hall-hidden" points={post} />
          <g className="factor-hall-lit">
            <polygon points={left} fill="#3a9ad8" />
            <polygon points={right} fill="#2864c4" />
            <polygon points={top} fill="url(#hall-top)" />
          </g>
        </g>
      ))}

      {drawn.map(({ hall, index, dot }) => {
        const { y, side, bend } = hall.label;
        const edge = side === "left" ? LEFT_X : RIGHT_X;
        return (
          <g key={hall.name} className={`factor-hall-label${index === active ? " is-active" : ""}`}>
            <polyline points={`${edge},${y} ${bend},${y} ${dot[0].toFixed(1)},${dot[1].toFixed(1)}`} />
            <circle cx={dot[0]} cy={dot[1]} r="4" />
            <text x={edge} y={y - 12} textAnchor={side === "left" ? "start" : "end"}>
              {hall.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
