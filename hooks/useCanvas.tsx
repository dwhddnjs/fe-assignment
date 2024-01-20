import React, { useEffect, useRef, useState } from "react";

export const useCanvas = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const ref = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = 2.5;
        context.strokeStyle = "white";
        contextRef.current = context;
        setCtx(context);
      }
    }
  }, []);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const startDraw = () => {
    setIsDrawing(true);
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  return {
    ref,
    startDraw,
    endDraw,
    draw,
  };
};
