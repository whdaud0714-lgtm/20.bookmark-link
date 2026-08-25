export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l8 4.5-8 4.5-8-4.5L12 3z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M4 12.5L12 17l8-4.5M4 16.5L12 21l8-4.5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5A1.5 1.5 0 0 1 5.5 5h4.17a1.5 1.5 0 0 1 1.06.44L12 6.5h6.5A1.5 1.5 0 0 1 20 8v9.5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={1.6} />
      <path
        d="M4 12h16M12 4c2.2 2.2 3.3 5 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-5-3.3-8s1.1-5.8 3.3-8z"
        stroke="currentColor"
        strokeWidth={1.6}
      />
    </svg>
  );
}
