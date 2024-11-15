import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import "./App.css";

const colors = ["red", "blue", "green"];
const colorToClassName = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
};

const spheres = [
  { x: "70%", y: "10%" },
  { x: "35%", y: "15%" },
  { x: "50%", y: "28%" },
  { x: "10%", y: "25%" },
  { x: "85%", y: "25%" },
  { x: "20%", y: "65%" },
  { x: "35%", y: "45%" },
  { x: "75%", y: "45%" },
  { x: "55%", y: "65%" },
  { x: "80%", y: "75%" },
  { x: "15%", y: "90%" },
  { x: "45%", y: "85%" },
  { x: "70%", y: "90%" },
];

const ConfettiSpheres = () => {
  const [showStripes, setShowStripes] = useState(true);

  const height = 450;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Optical Illusion Breaker</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="relative h-[450px] bg-white rounded-lg overflow-hidden">
            {/* Background stripes */}
            {showStripes && (
              <div className="flex flex-col">
                {Array.from({ length: Math.ceil(height / 9) }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="inset-0 bg-red-500 h-[3px]" />
                    <div className="inset-0 bg-blue-500 h-[3px]" />
                    <div className="inset-0 bg-green-500 h-[3px]" />
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Spheres */}
            {spheres.map((sphere, i) => (
              <Sphere key={`sphere-${i}`} sphere={sphere} height={height} showStripes={showStripes} />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Switch checked={showStripes} onCheckedChange={setShowStripes} />
            <Label htmlFor="stripes">Toggle Stripes (To see true sphere color)</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function Sphere({
  sphere,
  height,
  showStripes = true,
}: {
  sphere: { x: string; y: string };
  height: number;
  showStripes: boolean;
}) {
  const topPosition =
    Number(sphere.y.slice(0, 2)) * height * 0.01 - ((Number(sphere.y.slice(0, 2)) * height * 0.01) % 3);

  return (
    <div
      style={{
        // background: "blue",
        height: "48px",
        width: "48px",
        position: "absolute",
        left: sphere.x,
        top: `${topPosition}px`,
        transform: "translate(-25%, -50%)",
      }}
    >
      <div
        className="w-11 h-11 rounded-full bg-[#D2B48C]"
        style={{
          position: "relative",
          background: `radial-gradient(circle at 35% 35%,
          white 0%, 
          rgb(150, 150, 150) 40%,
          rgba(100,100,100,0.8) 100%)`,
          zIndex: 1,
        }}
      />
      {showStripes && <Stripes top={topPosition} />}
    </div>
  );
}

function Stripes({ top }: { top: number }) {
  const topOffset = top % 9;

  let firstColor, secondColor, thirdColor;
  const [firstZIndex, secondZIndex, thirdZIndex] = getZIndex();
  if (topOffset > 6 || topOffset === 0) {
    firstColor = colorToClassName.blue;
    secondColor = colorToClassName.green;
    thirdColor = colorToClassName.red;
  } else if (topOffset > 3) {
    firstColor = colorToClassName.red;
    secondColor = colorToClassName.blue;
    thirdColor = colorToClassName.green;
  } else {
    firstColor = colorToClassName.green;
    secondColor = colorToClassName.red;
    thirdColor = colorToClassName.blue;
  }

  return (
    <div className="absolute inset-0 flex flex-col h-[9px">
      {Array.from({ length: Math.ceil(45 / 9) }).map((_, i) => (
        <React.Fragment key={i}>
          <div className={`relative inset-0 ${firstColor} h-[3px]`} style={{ zIndex: firstZIndex }} />
          <div className={`relative inset-0 ${secondColor} h-[3px]`} style={{ zIndex: secondZIndex }} />
          <div className={`relative inset-0 ${thirdColor} h-[3px]`} style={{ zIndex: thirdZIndex }} />
        </React.Fragment>
      ))}
    </div>
  );
}

function getZIndex() {
  const options = [
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2],
  ];

  return options[Math.floor(Math.random() * 3)];
}

function App() {
  return <ConfettiSpheres />;
}

export default App;
