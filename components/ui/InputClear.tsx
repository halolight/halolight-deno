/**
 * InputClear 带清除按钮的输入框组件
 */
import { useEffect, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";
import Input from "./Input.tsx";

interface InputClearProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  showClear?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export function InputClear({
  className,
  wrapperClassName,
  type = "text",
  value: valueProp,
  defaultValue,
  onChange,
  onClear,
  showClear = true,
  placeholder,
  disabled,
  name,
  id,
  required,
  autoComplete,
  autoFocus,
  readOnly,
  maxLength,
  minLength,
  pattern,
}: InputClearProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(() => {
    if (typeof defaultValue === "string") {
      return defaultValue;
    }
    if (typeof valueProp === "string") {
      return valueProp;
    }
    return "";
  });

  const value = isControlled ? valueProp ?? "" : internalValue;

  useEffect(() => {
    if (!isControlled && typeof defaultValue === "string") {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (isControlled && typeof valueProp === "string") {
      setInternalValue(valueProp);
    }
  }, [isControlled, valueProp]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const next = target.value;
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onClear?.();
    onChange?.("");
  };

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <Input
        type={type}
        value={value}
        onInput={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("pr-9", className)}
        name={name}
        id={id}
        required={required}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
      />
      {showClear && value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default InputClear;
