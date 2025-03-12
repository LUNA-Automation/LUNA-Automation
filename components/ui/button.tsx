import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return asChild ? (
      <Slot
        className={cn(
          buttonVariants({ variant, size, className }),
          "group h-10 px-4 py-2 text-sm font-medium transition-colors",
          "inline-flex items-center justify-center",
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </Slot>
    ) : (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          "group h-10 px-4 py-2 text-sm font-medium transition-colors",
          "inline-flex items-center justify-center relative overflow-hidden",
          className?.includes("play") &&
            "rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
        )}
        ref={ref}
        {...props}
      >
        {className?.includes("play") && (
          <span className="absolute inset-0 bg-black bg-opacity-10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        )}
        {props.children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

