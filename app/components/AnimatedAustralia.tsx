'use client'
import React from 'react';

export default function AnimatedAustralia() {
  return (
    <div className="australia-container">
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="australia-svg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M395,330 L405,325 L420,335 L430,330 L440,335 L450,345 L460,355 L470,365 L480,375 L490,385 L500,395"
          className="glow-path"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1000"
            to="0"
            dur="4s"
            fill="freeze"
            begin="0s"
          />
        </path>
      </svg>

      <style jsx>{`
        .australia-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .australia-svg {
          width: 100%;
          height: auto;
        }

        .glow-path {
          stroke: #00f6ff;
          stroke-width: 3;
          fill: none;
          filter: url(#glow);
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      `}</style>
    </div>
  );
}
