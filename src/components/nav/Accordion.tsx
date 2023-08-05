import { ReactNode } from "react";
import Icon from "@/components/info/Icon";

export default function Accordion({ label, children }: { label: ReactNode, children: ReactNode }) {
  return (
    <details className="group">
      <summary className={`
        list-none
        relative p-3 font-medium hover:cursor-pointer   
        flex justify-between items-center
        bg-primary-200 rounded-t-sm

        shadow-dp4 shadow-shadow/20
        group-open:shadow-dp2 group-open:shadow-shadow/50
      `}>
        {label}
        <Icon type="arrowDown" className={`
          w-auto h-2 
          group-open:rotate-180 transition-transform ease-in-out duration-200
        `} />
      </summary>
      <div className={`
        px-3 py-4 bg-primary-400/50
        rounded-b-sm
        transition-transform origin-top ease-in-out duration-200
        scale-y-0 group-open:scale-y-100
        shadow-dp4 shadow-shadow/20
      `}>
        {children}
      </div>
    </details>
  );
}