import React, { useEffect, useRef, useState } from "react";

export const useCanvas = () => {
  const [ctx, setCtx] = useState() as any;
  const [isDrawing, setIsDrawing] = useState(false);

  const ref = useRef(null) as any;
  const contextRef = useRef(null) as any;

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      context.lineWidth = 2.5;
      context.strokeStyle = "black";
      contextRef.current = context;
      setCtx(context);
    }
  }, []);

  const draw = (e: any) => {
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
