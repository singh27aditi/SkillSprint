// components/ui/progress.jsx
'use client'

import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

export const Progress = ({ className, value, ...props }) => (
  <ProgressPrimitive.Root
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-black transition-transform"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
)
