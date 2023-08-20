
import Image, { ImageProps, unstable_getImgProps as getImgProps } from "next/image";

import desktopImg from '@/assets/images/hexagons-gear-night-sky.webp';
import mobileImg from '@/assets/images/hexagons-gear-night-sky-mobile.webp';

import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import('@/components/root/HeroParticles'));

export default function HeroImage() {
  const commonImgProps: Omit<ImageProps, 'src' | 'alt'> = {
    className: 'absolute object-cover w-full h-full',
    quality: 100,
    placeholder: "blur",
    sizes: "100vw",
  };

  // Extract srcset from image props using unstable Next feature
  const { props: { srcSet: mobileSrcSet } } = getImgProps({
    ...commonImgProps,
    alt: '',
    src: mobileImg
  });

  return (
    <>
      <picture>
        <source media="(max-aspect-ratio: 9/16)" srcSet={mobileSrcSet} />
        <Image
          priority
          src={desktopImg}
          alt="Hexagon terrain, a big gear in night starry sky"
          {...commonImgProps}
        />
      </picture>
      <HeroParticles />
    </>
  );
}

