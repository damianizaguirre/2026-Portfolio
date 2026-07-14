export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <svg
        viewBox="0 0 130 110"
        fill="currentColor"
        style={{ width: "clamp(70px, 8.07vw, 155px)", height: "clamp(55px, 6.3vw, 121px)" }}
      >
        <path transform="translate(45,42) scale(2.2)" d="M0,-10 C1,-4 4,-1 10,0 C4,1 1,4 0,10 C-1,4 -4,1 -10,0 C-4,-1 -1,-4 0,-10 Z" />
        <path transform="translate(103,22) scale(1)" d="M0,-10 C1,-4 4,-1 10,0 C4,1 1,4 0,10 C-1,4 -4,1 -10,0 C-4,-1 -1,-4 0,-10 Z" />
        <path transform="translate(20,82) scale(0.85)" d="M0,-10 C1,-4 4,-1 10,0 C4,1 1,4 0,10 C-1,4 -4,1 -10,0 C-4,-1 -1,-4 0,-10 Z" />
        <path transform="translate(88,88) scale(0.6)" d="M0,-10 C1,-4 4,-1 10,0 C4,1 1,4 0,10 C-1,4 -4,1 -10,0 C-4,-1 -1,-4 0,-10 Z" />
      </svg>
      <p style={{ fontSize: "clamp(20px, 2.08vw, 40px)", marginTop: "clamp(14px, 2.13vw, 41px)" }}>
        currently designing and building...
      </p>
    </div>
  );
}
