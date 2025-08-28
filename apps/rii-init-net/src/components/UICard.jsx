import React, { useRef } from "react";

const cards = [
  { title: "rii-init.net", content: "" },
  { title: "federated micro blogging framework", content: "" },
  { title: "dream within a dream within a dream", content: "" }
];

export default function WelcomeCards() {
  const dragging = useRef(null);

  function handleDragStart(e, idx) {
    dragging.current = e.target;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => dragging.current.classList.add("dragging"), 0);
  }
  function handleDragEnd(e) {
    if (dragging.current) dragging.current.classList.remove("dragging");
    dragging.current = null;
  }

  return (
    <>
      <div className="card-grid">
        {cards.map((card, i) => (
          <div
            className="glass-card"
            draggable
            key={i}
            onDragStart={e => handleDragStart(e, i)}
            onDragEnd={handleDragEnd}
          >
            <div className="window-bar">
              <span className="window-title">{card.title}</span>
              <div className="window-controls">
                <button aria-label="Minimize" tabIndex={-1}>─</button>
                <button aria-label="Maximize" tabIndex={-1}>□</button>
                <button aria-label="Close" tabIndex={-1}>✕</button>
              </div>
            </div>
            <div className="window-content-glass-reflection">{card.content}</div>
          </div>
        ))}
      </div>
      <style>{`
        .card-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 900px;
        }
        .glass-card {
          min-width: 320px;
          min-height: 240px;
          max-width: 98vw;
          background: rgba(255,255,255,0.20);
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative;
          cursor: grab;
          user-select: none;
          margin: 0 auto;
        }
        .glass-card.dragging {
          opacity: 0.7;
          box-shadow: 0 0 0 4px #FFD700;
          z-index: 10;
        }
        .window-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.80);
          /* fallback for dark mode */
          color: #222;
          padding: 0.5em 1em;
          z-index: 999999;
          position: relative;

          font-size: 1.1em;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          cursor: grab;
          /* Glass effect for bar */
          backdrop-filter: blur(8px) saturate(1.2);
          -webkit-backdrop-filter: blur(8px) saturate(1.2);
        }
        @media (prefers-color-scheme: dark) {
          .glass-card {
            background: rgba(30,30,40,0.20);
            border: 1.5px solid rgba(255,255,255,0.12);
          }
          .window-bar {
            background: rgba(30,30,40,0.80);
            color: #f3f4f6;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
        }
        .window-title {
          flex: 1;
          color: inherit;
          text-shadow: 0 1px 2px #fff8;
        }
        .window-controls button {
          background: none;
          border: none;
          color: #888;
          font-size: 1em;
          margin-left: 0.5em;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.15s;
          padding: 0 0.3em;
        }
        .window-controls button:hover {
          background: #e0e0e0aa;
        }
        .window-content-glass-reflection {
          transform: rotate(60deg);
          position: relative;
          right: 10em;

          padding: 1.5em 1em 8em 1em;
          color: inherit;
          font-size: 1.1em;
          background: rgba(255,255,255,0.20);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          height: 100%;
        }
        @media (max-width: 700px) {
          .card-grid {
            flex-direction: column;
            gap: 1.5rem;
            align-items: stretch;
          }
          .glass-card {
            max-width: 98vw;
            min-width: 0;
          }
        }
      `}</style>
    </>
  );
}