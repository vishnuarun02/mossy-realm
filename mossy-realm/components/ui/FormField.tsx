import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

/**
 * FormField - labeled form controls on inset wells.
 *
 * Every control gets a visible Cormorant label, bound with htmlFor.
 * Inputs sit in dark inset wells with amber borders; focus uses the
 * global green ring. Errors render below in warning text; FormField
 * injects aria-describedby + aria-invalid into the child control.
 *
 * Use Input / Textarea from this file so all forms share the well.
 */

const controlClasses = `
  w-full
  bg-surface-inset
  border-panel border-border-structural
  rounded-sm
  px-3 py-2
  font-body text-base text-fg-primary
  placeholder:text-fg-secondary placeholder:italic
  focus:border-border-strong
  transition-colors duration-fast
`;

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...rest }: InputProps) {
  return <input className={`${controlClasses} ${className}`} {...rest} />;
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = '', rows = 4, ...rest }: TextareaProps) {
  return <textarea rows={rows} className={`${controlClasses} resize-y ${className}`} {...rest} />;
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactElement;
}

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  className = '',
  children,
}: FormFieldProps) {
  const describedBy = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        'aria-describedby': describedBy,
        ...(error ? { 'aria-invalid': true } : {}),
      })
    : children;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="font-nav text-meta uppercase tracking-wider text-fg-heading"
      >
        {label}
      </label>
      {control}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-caption text-fg-secondary italic">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-caption text-fg-warning">
          {error}
        </p>
      )}
    </div>
  );
}
