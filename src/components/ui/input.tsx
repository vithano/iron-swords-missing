import * as React from "react"
import Image from "next/image";
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    isLoading?: boolean,
    iconSrc?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading,iconSrc, ...props }, ref) => {
    return (
      <div className="relative">
      {iconSrc && <Image width={20} height={20} src={iconSrc} alt="" className="absolute right-3 top-3 w-5 h-5 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" />}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          [iconSrc && "pl-3 pr-10"],
          [!iconSrc && "px-3"],
          className
        )}
        ref={ref}
        {...props}
      />
      {isLoading && (
      <div className="absolute inset-y-0 left-0 pl-8 flex items-center">
        <div className={"inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"} role="status"></div>
      </div>
    )}
    </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
