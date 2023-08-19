export default function Loader() {
  return (
    <>
      <div></div>
      <style jsx>{`
        div {
          width: 1em;
          height: 1em;
          border-radius: 50%;
          border: 0.15em solid currentColor;
          animation: radial-clip 1.25s infinite linear alternate, rotate 2.5s infinite linear;
        }

        @keyframes rotate {
          0% {
            transform: scaleX(1) rotate(0deg);
          }
          49.99% {
            transform: scaleX(1) rotate(225deg);
          }
          50% {
            transform: scaleX(-1) rotate(180deg);
          }
          100% {
            transform: scaleX(-1) rotate(-45deg);
          }
        } 

        @keyframes radial-clip {
          /* 315deg */
          0% { 
            clip-path: polygon(50% 50%, 25% 75%, 15% 85%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 100%);
            animation-timing-function: ease-in;
          }
          /* 270deg, 16.6% */
          16.6% { 
            clip-path: polygon(50% 50%, 15% 50%, 0% 50%, -21% 50%, 0% 0%, 100% 0%, 100% 100%, 50% 100%);
            animation-timing-function: ease-out;
          } 
          /* 225deg, 33.3% */
          33.3% { 
            clip-path: polygon(50% 50%, 25% 25%, 15% 15%, 0% 0%, 0% 0%, 100% 0%, 100% 100%, 50% 100%);
          }
          /* 180deg, 50% */
          50% { 
            clip-path: polygon(50% 50%, 50% 15%, 50% 0%, 50% -21%, 50% -21%, 100% 0%, 100% 100%, 50% 100%);
          }
          /* 135deg, 66.6% */
          66.6% { 
            clip-path: polygon(50% 50%, 75% 25%, 85% 15%, 100% 0%, 100% 0%, 100% 0%, 100% 100%, 50% 100%);
          }
          /* 90deg, 83.33% */
          83.3% { 
            clip-path: polygon(50% 50%, 85% 50%, 100% 50%, 121% 50%, 121% 50%, 121% 50%, 100% 100%, 50% 100%);
            animation-timing-function: ease-out;
          }
          /* 45deg, 100% */
          100% { 
            clip-path: polygon(50% 50%, 75% 75%, 85% 85%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%);
            animation-timing-function: ease-in;
          }
        }
    `}</style>
    </>
  )
}