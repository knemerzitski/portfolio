"use client";
import classNames from 'classnames';

export default function HeroParticles() {
  const particles = [
    {
      className: classNames(
        '[--particle-offset:0]',
        '[--circle-offset:0]',
        '[--eight-offset:0]',
      ),
    },
    {
      className: classNames(
        '[--particle-offset:0.33]',
        '[--circle-offset:0.2]',
        '[--eight-offset:0.5]',
      ),
    },
    {
      className: classNames(
        '[--particle-offset:0.66]',
        '[--circle-offset:0.1]',
        '[--eight-offset:0.8]',
      ),
    }
  ];

  return (
    <svg
      version="1.1"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute top-0 left-0 w-full h-full motion-reduce:hidden"
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
    <>
      <g className={classNames('particleRoot', className)}>
        <g className="xCircleAnim"><g className="yCircleAnim">
          <g className="xShape8Anim"><g className="yShape8Anim">
            <g className="moveAroundGearAnim">
              <rect className="particleGlow fill-accent2" rx="100%" />
              <rect className="particleCore fill-white" rx="100%" />
            </g>
          </g></g>
        </g></g>
      </g>
      <style jsx>{`
      .particleRoot {
        --particle-duration: 25s;
        /* --particle-offset: 0.5; */
        --particle-delay: calc(
          -1 * var(--particle-offset) * var(--particle-duration)
        );

        --circle-duration: 5s;
        /* --circle-offset: 0; */
        --circle-delay: calc(-1 * var(--circle-offset) * var(--circle-duration));

        --eight-duration: 13s;
        /* --eight-offset: 0; */
        --eight-delay: calc(-1 * var(--eight-offset) * var(--eight-duration));

        animation: gearClipPath infinite linear;
        animation-duration: var(--particle-duration);
        animation-delay: var(--particle-delay);
      }

      /* ############# Gear clip path animations ############### */

      @keyframes gearClipPath {
        43.19% {
          clip-path: none;
        }

        43.2% {
          clip-path: url("#hero-gear-clip");
        }

        79.6% {
          clip-path: url("#hero-gear-clip");
        }

        82% {
          clip-path: none;
        }
      }
      @supports (offset-path: path("m0 0")) {
        @keyframes gearClipPath {
          44.99% {
            clip-path: none;
          }

          45% {
            clip-path: url("#hero-gear-clip");
          }

          75% {
            clip-path: url("#hero-gear-clip");
          }

          75.01% {
            clip-path: none;
          }
        }
      }

      /* ############# Circle animation offset ############# */

      .xCircleAnim {
        animation: xCircleAnim infinite ease-in-out;
        animation-duration: var(--circle-duration);
        animation-delay: var(--circle-delay);
      }
      @keyframes xCircleAnim {
        50% {
          transform: translateX(1.6875%);
        }
      }

      .yCircleAnim {
        animation: yRotAnim infinite ease-in-out;
        animation-duration: var(--circle-duration);
        animation-delay: calc(0.25 * var(--circle-duration) + var(--circle-delay));
      }
      @keyframes yCircleAnim {
        50% {
          transform: yCircleAnim(3%);
        }
      }

      /* ############# Eight shape animation offset ############# */
      .xShape8Anim {
        animation: xShape8Anim infinite reverse ease-in-out;
        animation-duration: calc(0.5 * var(--eight-duration));
        animation-delay: calc(0.25 * var(--eight-duration) + var(--eight-delay));
      }
      @keyframes xShape8Anim {
        50% {
          transform: translateX(1.125%);
        }
      }

      .yShape8Anim {
        animation: yShape8Anim infinite reverse ease-in-out;
        animation-duration: var(--eight-duration);
        animation-delay: calc(0.125 * var(--eight-duration) + var(--eight-delay));
      }
      @keyframes yShape8Anim {
        50% {
          transform: translateY(2%);
        }
      }

      /* ############# Particle translations around gear ############# */

      .moveAroundGearAnim {
        animation: moveAroundGearAnim infinite ease-in-out;
        animation-duration: var(--particle-duration);
        animation-delay: var(--particle-delay);
      }

      @keyframes moveAroundGearAnim {
        0% {
          transform: translate(54%, 63%);
        }

        24.6% {
          transform: translate(42%, 84%);
        }

        43.2% {
          transform: translate(29%, 77%);
        }

        62.9% {
          transform: translate(28%, 60%);
        }

        79.6% {
          transform: translate(40%, 57%);
        }

        100% {
          transform: translate(54%, 63%);
        }
      }

      @supports (offset-path: path("m0 0")) {
        .moveAroundGearAnim {
          offset-path: path(
            "m1051.7 728.69c56.132 71.499-51.771 171.33-241.31 178.69-140.41-0.54909-228.42-53.41-229.57-115.9-1.1583-160.41 22.963-191.74 195.66-167.89 140.12 18.582 208.42 32.578 275.22 105.09z"
          );
          animation: offsetPathMove infinite linear;
          animation-duration: var(--particle-duration);
          animation-delay: var(--particle-delay);
        }

        @keyframes offsetPathMove {
          from {
            offset-distance: 0%;
          }

          to {
            offset-distance: 100%;
          }
        }
      }

      .particleGlow {
        width: 8px;
        height: 8px;
        transform: translate(-4px, -4px);

        fill: theme("colors.accent2");
        filter: blur(2px);
        animation: blurGrow 10s infinite ease-in-out;
      }

      @keyframes blurGrow {
        50% {
          filter: blur(4px);
        }
      }

      .particleCore {
        width: 2px;
        height: 2px;
        transform: translate(-1px, -1px);
        fill: theme("colors.white");
      }
      `}</style>
    </>
  );
}