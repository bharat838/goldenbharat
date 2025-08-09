// client/src/components/Icons.jsx

export const AirforceIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l4 10h-8l4-10zm0 14a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

export const NavyIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h18M12 3v18" />
  </svg>
);

export const ArmyIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const EngineerIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
  </svg>
);

export const ScientistIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12h20" />
  </svg>
);

export const IndianFlag = (props) => (
  <svg {...props} viewBox="0 0 640 480" fill="none">
    <rect width="640" height="160" fill="#FF9933" />
    <rect y="160" width="640" height="160" fill="#fff" />
    <rect y="320" width="640" height="160" fill="#128807" />
    <circle cx="320" cy="240" r="40" stroke="#000088" strokeWidth="6" fill="none" />
    {/* Add spokes for chakra if desired */}
  </svg>
);
