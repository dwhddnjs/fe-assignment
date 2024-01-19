import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  setOpen: (prev: any) => void;
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
        "w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black/80",
        !open && "hidden"
      )}
    >
      <div className="w-[1200px] h-[700px] border-2 bg-[white] rounded-lg">
        <div className="border-b-2">
          <h3 className="p-[24px] font-bold text-[22px]">{title}</h3>
        </div>
        <div className="border-2 border-black h-[600px] flex flex-col justify-between">
          {children}
          <div className="flex justify-end">
            <Button onClick={setOpen}>취소</Button>
            <Button onClick={createBtn}>생성</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
