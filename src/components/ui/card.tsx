import * as React from "react"
import { cn } from "../../lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'ghost'
  isLoading?: boolean
}

export function Card({ 
  className, 
  variant = 'default',
  isLoading = false,
  ...props 
}: CardProps) {
  const baseStyles = "rounded-lg transition-all duration-200"
  const variantStyles = {
    default: "bg-white shadow-lg hover:shadow-xl",
    bordered: "border-2 border-gray-200 hover:border-gray-300",
    ghost: "bg-gray-50 hover:bg-gray-100"
  }
  
  return (
    <div 
      className={cn(
        baseStyles,
        variantStyles[variant],
        isLoading && "animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
}

export function CardHeader({ 
  className,
  isLoading = false,
  ...props 
}: CardHeaderProps) {
  return (
    <div 
      className={cn(
        "p-6 border-b border-gray-100",
        isLoading && "animate-pulse",
        className
      )}
      {...props} 
    />
  )
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function CardTitle({ 
  className,
  as: Component = 'h3',
  ...props 
}: CardTitleProps) {
  return (
    <Component 
      className={cn(
        "text-2xl font-semibold tracking-tight",
        className
      )}
      {...props} 
    />
  )
}

export function CardContent({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props} 
    />
  )
}

export function CardFooter({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "p-6 pt-0 flex items-center",
        className
      )}
      {...props} 
    />
  )
}