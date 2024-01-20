import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { FC } from "react";

const SpacerVariant = cva("", {
  variants: {
    variant: {
      sm: "h-[40px]",
      md: "h-[80px]",
      lg: "h-[120px]",
    },
  },
  defaultVariants: {
    variant: "sm",
  },
});

interface SpacerProps extends VariantProps<typeof SpacerVariant> {}

export const Spacer: FC<SpacerProps> = ({ variant }) => {
  return <div className={cn(SpacerVariant({ variant }))} />;
};
