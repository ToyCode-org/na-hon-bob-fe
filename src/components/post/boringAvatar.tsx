export const BoringAvatar = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
    >
      <title>Susan B</title>
      <mask
        id="mask__beam"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="36" height="36" fill="#3d1c00"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-4 8) rotate(88 18 18) scale(1.1)"
          fill="#f2d694"
          rx="36"
        ></rect>
        <g transform="translate(0 4) rotate(8 18 18)">
          <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
          <rect
            x="11"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          ></rect>
          <rect
            x="23"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          ></rect>
        </g>
      </g>
    </svg>
  );
};
