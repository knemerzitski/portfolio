import { InputHTMLAttributes } from "react";

type CheckBoxProps = {
  label: string,
} & InputHTMLAttributes<HTMLInputElement>;

const HEAVY_CHECK_MARK = '\\2714';

export function CheckBox({
  label,
  className = '',
  ...restProps
}: CheckBoxProps) {
  const id = `checkbox-${label}`;
  return (
    <>
      <input id={id} className={`
        rounded-sm
        relative inline-block
        border border-solid border-text/80
        checked:border-secondary-600
        hover:cursor-pointer

        focus:ouline-0
        focus-visible:outline
        focus-visible:outline-1
        focus-visible:outline-secondary-500
        checked:focus-visible:outline-secondary-300

        checked:after:text-secondary-600

        ${className}
      `}
        type="checkbox"
        {...restProps}
      />
      <label className="pl-2 hover:cursor-pointer" htmlFor={id}>{label}</label>
      <style jsx>{`
        input {
          appearance: none;
          width: 1.25em;
          height: 1.25em;
        }

        input:checked::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 1em;
          content: "${HEAVY_CHECK_MARK}";
        }
      `}</style>
    </>
  );
}