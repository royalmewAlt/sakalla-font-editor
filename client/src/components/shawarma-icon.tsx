export function ShawarmaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 20 C4 20 6 12 12 6 C18 12 20 20 20 20" />
      <path d="M6 18 C8 14 10 11 12 9 C14 11 16 14 18 18" />
      <ellipse cx="12" cy="19" rx="7" ry="2" />
      <path d="M8 15 Q12 13 16 15" />
      <path d="M9 17 Q12 15.5 15 17" />
    </svg>
  );
}
