"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCanvas } from "@/hooks/useCanvas";
import Image from "next/image";
import { useToast } from "../ui/use-toast";

export const CellAction = () => {
  const [open, setOpen] = useState(false);
  const [mergedImage, setMergedImage] = useState("");

  const mergedCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { ref, startDraw, endDraw, draw } = useCanvas();
  const { toast } = useToast();

  const {
    ref: ref2,
    startDraw: startDraw2,
    endDraw: endDraw2,
    draw: draw2,
  } = useCanvas();

  const getMergedCanvas = () => {
    const canvas = ref.current;
    const canvas2 = ref2.current;
    const mergedCanvas = mergedCanvasRef.current;

    if (canvas && canvas2 && mergedCanvas) {
      const context1 = canvas.getContext("2d");
      const context2 = canvas2.getContext("2d");
      const mergedContext = mergedCanvas?.getContext("2d");

      if (context1 && context2) {
        const imageData1 = context1.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imageData2 = context2.getImageData(
          0,
          0,
          canvas2.width,
          canvas2.height
        );

        for (let i = 0; i < imageData1.data.length; i++) {
          const value1 = imageData1.data[i];
          const value2 = imageData2.data[i];

          if (imageData1.data[i] === imageData2.data[i]) {
            imageData1.data[i] = Math.min(value1 + value2, 0);
          } else {
            imageData1.data[i] = Math.min(value1 + value2, 255);
          }
        }

        mergedCanvas.width = canvas.width;
        mergedCanvas.height = canvas.height;
        mergedContext?.putImageData(imageData1, 0, 0);

        const mergedImage = mergedCanvas.toDataURL();
        setMergedImage(mergedImage);
        toast({
          title: "앨범표지가 생성되었습니다.",
        });
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <canvas
        ref={mergedCanvasRef}
        width={100}
        height={100}
        className="hidden"
      />
      {mergedImage !== "" ? (
        <Image
          width={150}
          height={150}
          src={mergedImage}
          alt=""
          className="bg-[#1e1e1e]"
        />
      ) : (
        <Button size="sm" onClick={() => setOpen(true)}>
          앨범 생성
        </Button>
      )}
      <Modal
        open={open}
        setOpen={setOpen}
        title="앨범 생성"
        createBtn={() => getMergedCanvas()}
      >
        <div className="flex flex-col justify-center items-center py-[8px] h-full  md:flex-row">
          <canvas
            width={300}
            height={300}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            className="border-2 border-[#272727] bg-[#1a1a1a] m-[8px] md:m-[26px]"
            ref={ref}
          />
          <canvas
            width={300}
            height={300}
            onMouseDown={startDraw2}
            onMouseMove={draw2}
            onMouseUp={endDraw2}
            className="border-2 border-[#272727] bg-[#1a1a1a] m-[8px] md:m-[26px]"
            ref={ref2}
          />
        </div>
      </Modal>
    </div>
  );
};
