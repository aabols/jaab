import React, { useEffect } from 'react';
import './index.css';

// Constant scale: pixels per duration unit (server will supply real numbers later)
const UNIT_PX = 3;

// Sample steps. Each step may later include a `start` value supplied by the server.
const steps = [
    { id: 1, caption: 'Heat up frying pan', duration: 60, start: 0 },
    { id: 3, caption: 'Peel and dice onions', duration: 60, start: 10 },
    { id: 2, caption: 'Add onions to pan', duration: 180, prerequisites: [1, 3], start: 70 }
];

export default function Food() {
    useEffect(() => {
        document.title = 'Food';
    }, []);

    const chartWidth = 700; // visual canvas width; bars may overflow and be scrollable

    return (
        <div id="food">
            <div className="gantt">
                <div
                    className="gantt__chart"
                    style={{ width: `${chartWidth}px` }}
                    role="list"
                    aria-label="Recipe steps timeline"
                >
                    {steps.map(({ id, caption, duration, start = 0 }, index) => {
                        const widthPx = Math.max(8, duration * UNIT_PX); // ensure visible min width
                        const leftPx = Math.max(0, start * UNIT_PX);
                        const topPx = index * 44; // vertical stacking spacing

                        return (
                            <div
                                key={id}
                                role="listitem"
                                className="gantt__bar"
                                style={{ width: `${widthPx}px`, left: `${leftPx}px`, top: `${topPx}px` }}
                                title={`${caption} — ${duration} units`}
                            >
                                <div className="gantt__bar__label">{caption}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};
