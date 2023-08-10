import { ReactNode } from 'react';

export default function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="
      bg-primary-800
      py-10 xs:py-14 mb-20
      shadow-dp12 shadow-shadow/25
    ">
      <h2 className="
        text-4xl
        text-center
      ">
        {children}
      </h2>
    </div>
  );
}