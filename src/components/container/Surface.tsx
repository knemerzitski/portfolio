import { ComponentPropsWithRef, ElementType, createContext, useContext } from 'react';
import classNames from 'classnames';

const LevelContext = createContext<number>(0);

export type SurfaceProps<C extends ElementType> = {
  as?: C,
  className?: string,
} & ComponentPropsWithRef<C>

function getLevelColor(level: number): string {
  if (level == 0) return 'background';
  return level % 2 == 0 ? 'primary-700' : 'primary-800';
}

export function useSurfaceColor(offset: number = 0) {
  const level = useContext(LevelContext) + offset;
  return getLevelColor(level);
}

export default function Surface<C extends ElementType = 'div'>({
  as = 'div',
  children,
  className = '',
  ...restProps
}: SurfaceProps<C>) {
  const Component = as;

  const level = useContext(LevelContext) + 1;
  const color = getLevelColor(level);

  return (
    <Component className={classNames(
      `bg-${color}`,
      className
    )} {...restProps}>
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </Component>
  );
}