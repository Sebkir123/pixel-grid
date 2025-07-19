import React, { useEffect, useState } from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";

// CRA only exposes env vars prefixed with REACT_APP_
const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const App = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [grid, setGrid] = useState([]);

  // ── Fetch grid (or build a blank one) on mount ──────────────────────────────
  useEffect(() => {
    console.log("Fetching grid from:", `${URL}/grid`);
    fetch(`${URL}/grid`)
      .then((res) => res.json())
      .then((data) => setGrid(data.grid))
      .catch((error) => {
        console.error("Error fetching grid data:", error);
        // Fallback: build a 20×20 blank grid so UI renders
        const fallback = [];
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 20; x++) {
            fallback.push({ x, y, color: "#ffffff" });
          }
        }
        setGrid(fallback);
      });
  }, []);

  // ── Optimistic pixel recolor + server sync ─────────────────────────────────
  const updateColor = (x, y) => {
    // 1 — optimistic UI update (instant feedback)
    setGrid((prev) =>
      prev.map((cell) =>
        cell.x === x && cell.y === y ? { ...cell, color: selectedColor } : cell
      )
    );

    // 2 — async server update; if it succeeds, sync with server’s grid
    fetch(`${URL}/setGridColor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y, color: selectedColor }),
    })
      .then((res) => res.json())
      .then(({ grid: updatedGrid }) => {
        if (Array.isArray(updatedGrid)) setGrid(updatedGrid);
      })
      .catch((err) =>
        console.error("Server update failed; keeping optimistic state:", err)
      );
  };

  console.log("Grid length:", grid.length);

  return (
    <div className="content-wrapper">
      <h1>Pixel Grid</h1>
      <PixelGrid grid={grid} updateColor={updateColor} />
      <Toolbar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default App;
