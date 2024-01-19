import { use, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useCanvas } from "@/hooks/useCanvas";
import { useTopalbums } from "@/hooks/useTopalbums";
import { cn } from "@/lib/utils";

export const CellAction = ({ rowId }: any) => {
  const [open, setOpen] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  const mergedCanvasRef = useRef(null) as any;

  const { ref, startDraw, endDraw, draw } = useCanvas();

  const {
    ref: ref2,
    startDraw: startDraw2,
    endDraw: endDraw2,
    draw: draw2,
  } = useCanvas();

  const { mutate } = useTopalbums();

  const getMergedCanvas = () => {
    const canvas = ref.current;
    const canvasB = ref2.current;
    const mergedCanvas = mergedCanvasRef?.current;

    const context1 = canvas.getContext("2d");
    const context2 = canvasB.getContext("2d");
    const mergedContext = mergedCanvas?.getContext("2d");

    const imageData1 = context1.getImageData(0, 0, canvas.width, canvas.height);
    const imageData2 = context2.getImageData(
      0,
      0,
      canvasB.width,
      canvasB.height
    );

    for (let i = 0; i < imageData1.data.length; i++) {
      const value1 = imageData1.data[i];
      const value2 = imageData2.data[i];

      if (imageData1.data[i] === imageData2.data[i]) {
        imageData1.data[i] = Math.min(value1 + value2, 10);
      } else {
        imageData1.data[i] = Math.min(value1 + value2, 255);
      }

      // if (i % 4 === 3) {
      //   if (value1 === value2) {
      //     imageData1.data[i] = Math.min(value1 + value2, 90);
      //   } else {
      //     imageData1.data[i] = Math.min(value1 + value2, 255);
      //   }
      // } else {
      //   imageData1.data[i] = value1 + value2;
      // }
    }

    mergedCanvas.width = canvas.width;
    mergedCanvas.height = canvas.height;

    mergedContext.putImageData(imageData1, 0, 0);

    setOpen(false);
    setIsDisplay(true);
  };

  return (
    <div>
      <canvas
        ref={mergedCanvasRef}
        width={200}
        height={200}
        className={cn("border-2 block", !isDisplay && "hidden")}
      />
      <Button
        className={cn("border-2 block", isDisplay && "hidden")}
        onClick={() => setOpen(true)}
      >
        오픈
      </Button>
      <Modal
        open={open}
        setOpen={(prev) => setOpen(!prev)}
        title="앨범 생성"
        createBtn={() => getMergedCanvas()}
      >
        <div className="flex">
          <canvas
            width={200}
            height={200}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            className="border-2 border-red "
            ref={ref}
          />
          <canvas
            width={200}
            height={200}
            onMouseDown={startDraw2}
            onMouseMove={draw2}
            onMouseUp={endDraw2}
            className="border-2 border-red "
            ref={ref2}
          />
        </div>
      </Modal>
    </div>
  );
};
