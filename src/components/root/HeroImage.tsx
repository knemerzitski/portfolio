import styles from './HeroImage.module.css';

import Image from "next/image";

import portfolioHeroImg from '@/assets/images/hexagons-gear.webp'

export default function HeroImage() {
  return (
    <>
      <Image priority
        className="absolute object-cover w-full h-full"
        quality={100}
        src={portfolioHeroImg}
        placeholder="blur"
        sizes="100vw"
        alt="Hexagon terrain, a big gear and wires under night sky" />
      <Particles />
    </>
  );
}

export function Particles() {
  const particles = [
    {
      className: `
        [--particle-offset:0]
        [--circle-offset:0]
        [--eight-offset:0]
      `,
    },
    {
      className: `
        [--particle-offset:0.33]
        [--circle-offset:0.2]
        [--eight-offset:0.5]
      `,
    },
    {
      className: `
        [--particle-offset:0.66]
        [--circle-offset:0.1]
        [--eight-offset:0.8]
      `
    }
  ];

  return (
    <svg
      version="1.1"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={styles.svg}
    >
      <defs>
        <clipPath id="hero-gear-clip" transform="scale(2)">
          {/* Gear clip svg */}
          <path d="m0 0v540h960v-540zm334.46 306.73 3.3066 0.39844 9.9277 1.1914 1.6426 0.19726 3.0195 0.36328 9.9277 1.1914 0.87305 0.52344 8.5723 5.1484 8.5723 5.1504 2.377 1.1309 9.1328 2.4395 9.0703 2.4199 0.39648-0.0371 5.123-3.6172 1.9512-0.78906 5.1055 1.9648 9.3301 3.5957 1.4394 1.2441 0.0703 0.0605 2.0312 0.32227 1.1562 0.18359 5.5645 2.1426 9.332 3.5957 0.87305 1.873 2.5449 6.1973 0.91992 0.90625 8.5684 4.3652 8.6133 4.3867 2.4434 0.72266 9.6523 1.7988 9.8281 1.8301 3.0879 2.1152 8.248 5.6543 1.4355 0.98438 3.3047 2.2656 8.25 5.6543 0.55469 2.1172-0.0488 0.11133-3.834 9.2363 4.5586 2.0215 9.1406 4.0547 9.1426 4.0527 0.90039 2.0684 0.35742 5.5195 0.0449 0.70703 0.36718 5.6895-0.99218 2.3574-3.8809 9.2188-3.8789 9.2148-1.1973 0.97266-0.43164 2.8984-2.9785 7.0742-3.8789 9.2168-2.1562 0.92773-3.3047-1.0312-9.5469-2.9746-1.8398 4.3965-3.8574 9.2266-1.6562 0.66797-3.0488-0.0234-10-0.0703-1.6562-0.0117-3.3711-0.0215-10-0.0703-4.4082-2.8477-8.4004-5.4277-8.4004-5.4238-2.7949-1.3398-0.18946-0.043-9.75-2.2188-0.16406-0.0371-9.752-2.2109-6.3203 6.9766-2.3066 0.89258-0.26953-0.10352-9.3496-3.5449-9.3516-3.5449-2.3789-0.9043-0.30664-0.11523-9.3496-3.5469-9.3516-3.5449-1.0723-2.1758-1.9844-9.8047-0.41992-0.49219-0.57813-0.31445-8.7852-4.7754-0.5332-0.28906-8.7891-4.7715-2.9473-0.84179-4.2539-0.60938-9.8984-1.4238-9.8984-1.4219-3.5547-2.9336-7.7129-6.3633-1.3984-1.1543-3.3125-2.7324-7.7129-6.3652-0.66406-1.5606 0.15234-0.79687 1.3633-3.584 3.5566-9.3476-7.582-3.4238-9.1133-4.1172-0.98437-2.1406 1.7266-4.584 3.5254-9.3574 3.5273-9.3574 3.5254-9.3594 3.5254-9.3574 2.7871-4.541 0.34571-0.56446 0.1289-0.21093 0.6211-0.27735 1.0273-2.4082 0.92578-1.5078 2.1191-0.92578 1.4492 0.47265 9.5059 3.1035 9.5078 3.1035 0.13672-0.36133 3.5625-9.3438 0.47852-0.44335z"
          />
        </clipPath>
      </defs>
      {particles.map((p, index) => (
        <Particle key={index} className={p.className} />
      ))}
    </svg>
  );
}

export function Particle(
  {
    className = ''
  }: {
    className: string
  }) {

  return (
    <g className={`${styles.particleRoot} ${className}`}>
      <g className={styles.xCircleAnim}><g className={styles.yCircleAnim}>
        <g className={styles.xShape8Anim}><g className={styles.yShape8Anim}>
          <g className={`${styles.moveAroundGearAnim}`}>
            <rect
              transform="translate(-4,-4)"
              width="8"
              height="8"
              fill="rgb(238, 160, 15)"
              rx="100%"
              filter="blur(2px)"
            />
            <rect
              transform="translate(-1.5,-1.5)"
              width="3"
              height="3"
              fill="white"
              rx="100%"
            />
          </g>
        </g></g>
      </g></g>
    </g>
  );
}