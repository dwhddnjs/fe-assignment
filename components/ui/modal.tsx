import React, { Dispatch, FC, SetStateAction } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  createBtn?: () => void;
}

export const Modal: FC<ModalProps> = ({
  open,
  setOpen,
  children,
  title,
  createBtn,
}) => {
  return (
    <div
      className={cn(
        "w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black/60",
        !open && "hidden"
      )}
    >
      <div className="w-[380px] bg-[#1e1e1e] rounded-lg md:w-[800px] ">
        <div className="">
          <h3 className="p-[24px] font-bold text-[22px] text-[#eeeeee]">
            {title}
          </h3>
        </div>
        <div className=" border-y-2 border-y-[#272727]">{children}</div>
        <div className="flex justify-end  mr-[24px] py-[12px] space-x-5">
          <Button
            size="lg"
            variant="destructive"
            onClick={() => setOpen((prev) => !prev)}
          >
            취소
          </Button>
          {createBtn && (
            <Button size="lg" onClick={createBtn}>
              생성
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
