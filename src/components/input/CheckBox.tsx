import styles from './Checkbox.module.css';

import { InputHTMLAttributes } from "react";


type CheckBoxProps = {
  label: string,
} & InputHTMLAttributes<HTMLInputElement>;

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

        ${styles.checkbox}

        ${className}
      `}
        type="checkbox"
        {...restProps}
      />
      <label className="pl-2 hover:cursor-pointer" htmlFor={id}>{label}</label>
    </>
  );
}

// input[type="checkbox"] {
//   @apply 
//     appearance-none 
//     relative
//     inline-block
//     rounded-sm
//     p-2
//     border border-solid border-text/80;
// }

// input[type="checkbox"]:checked {
//   @apply border-secondary-600;
// }

// input[type="checkbox"]:checked::after {
//   content: '\2714';
// }