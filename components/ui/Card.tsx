import type { ComponentChildren, JSX } from "preact";
import { forwardRef } from "preact/compat";

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "glass";
  padding?: "sm" | "md" | "lg";
  children: ComponentChildren;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = "default",
  padding = "md",
  children,
  className = "",
  ...props
}, ref) => {
  const baseClasses =
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm";

  const variantClasses = {
    default: "",
    hover: "card-custom card-hover cursor-pointer",
    glass: "card-custom card-glass",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    paddingClasses[padding]
  } ${className}`;

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

// Card子组件
export interface CardHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
}

export const CardHeader = (
  { children, className = "", ...props }: CardHeaderProps,
) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export interface CardTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  children: ComponentChildren;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = (
  { children, as: Component = "h3", className = "", ...props }: CardTitleProps,
) => (
  <Component
    className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
    {...props}
  >
    {children}
  </Component>
);

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
}

export const CardContent = (
  { children, className = "", ...props }: CardContentProps,
) => (
  <div className={`text-gray-600 dark:text-gray-300 ${className}`} {...props}>
    {children}
  </div>
);

export interface CardFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
}

export const CardFooter = (
  { children, className = "", ...props }: CardFooterProps,
) => (
  <div
    className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export interface CardDescriptionProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {
  children: ComponentChildren;
}

export const CardDescription = (
  { children, className = "", ...props }: CardDescriptionProps,
) => (
  <p
    className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

export default Card;
