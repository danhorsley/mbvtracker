import React, { useEffect } from 'react';

const SpriteExtractor = () => {
  const frameWidth = 48;
  const frameHeight = 48;
  const frameCount = 5;
  const frameNames = ['idle', 'walk_0', 'walk_1', 'walk_2', 'walk_3'];

  useEffect(() => {
    const img = new Image();

    img.onload = function() {
      frameNames.forEach((_, i) => {
        const displayCanvas = document.getElementById(`frame-${i}`);
        if (displayCanvas) {
          const ctx = displayCanvas.getContext('2d');
          // Clear the canvas first
          ctx.clearRect(0, 0, frameWidth, frameHeight);
          // Draw the specific frame from the sprite sheet
          ctx.drawImage(img, 
            i * frameWidth, 0, frameWidth, frameHeight,
            0, 0, frameWidth, frameHeight
          );
        }
      });
    };

    // Create the sprite sheet SVG
    img.src = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48">
        <!-- Idle Pose -->
        <g transform="translate(0,0)">
          <rect x="18" y="8" width="12" height="12" fill="#FFD700"/>
          <rect x="20" y="20" width="8" height="16" fill="#4169E1"/>
          <rect x="16" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="28" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="20" y="36" width="4" height="8" fill="#000080"/>
          <rect x="24" y="36" width="4" height="8" fill="#000080"/>
        </g>
        <!-- Walk Frame 1 -->
        <g transform="translate(48,0)">
          <rect x="18" y="9" width="12" height="12" fill="#FFD700"/>
          <rect x="20" y="21" width="8" height="16" fill="#4169E1"/>
          <rect x="16" y="23" width="4" height="12" fill="#4169E1"/>
          <rect x="28" y="23" width="4" height="12" fill="#4169E1"/>
          <rect x="20" y="37" width="4" height="8" fill="#000080"/>
          <rect x="24" y="35" width="4" height="8" fill="#000080"/>
        </g>
        <!-- Walk Frame 2 -->
        <g transform="translate(96,0)">
          <rect x="18" y="8" width="12" height="12" fill="#FFD700"/>
          <rect x="20" y="20" width="8" height="16" fill="#4169E1"/>
          <rect x="14" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="30" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="20" y="36" width="4" height="8" fill="#000080"/>
          <rect x="24" y="36" width="4" height="8" fill="#000080"/>
        </g>
        <!-- Walk Frame 3 -->
        <g transform="translate(144,0)">
          <rect x="18" y="9" width="12" height="12" fill="#FFD700"/>
          <rect x="20" y="21" width="8" height="16" fill="#4169E1"/>
          <rect x="16" y="23" width="4" height="12" fill="#4169E1"/>
          <rect x="28" y="23" width="4" height="12" fill="#4169E1"/>
          <rect x="20" y="35" width="4" height="8" fill="#000080"/>
          <rect x="24" y="37" width="4" height="8" fill="#000080"/>
        </g>
        <!-- Walk Frame 4 -->
        <g transform="translate(192,0)">
          <rect x="18" y="8" width="12" height="12" fill="#FFD700"/>
          <rect x="20" y="20" width="8" height="16" fill="#4169E1"/>
          <rect x="14" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="30" y="22" width="4" height="12" fill="#4169E1"/>
          <rect x="20" y="36" width="4" height="8" fill="#000080"/>
          <rect x="24" y="36" width="4" height="8" fill="#000080"/>
        </g>
      </svg>
    `)}`;
  }, []);

  const downloadFrame = (index) => {
    const canvas = document.getElementById(`frame-${index}`);
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${frameNames[index]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {frameNames.map((name, i) => (
          <div key={i} className="border rounded p-4 flex flex-col items-center space-y-2 bg-white">
            <canvas
              id={`frame-${i}`}
              width={frameWidth}
              height={frameHeight}
              className="border border-gray-300"
              style={{ 
                imageRendering: 'pixelated',
                width: '144px',
                height: '144px',
                backgroundColor: 'white'
              }}
            />
            <div className="text-sm font-medium">{name}</div>
            <button
              onClick={() => downloadFrame(i)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download Frame
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpriteExtractor;