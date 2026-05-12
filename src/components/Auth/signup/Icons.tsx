import React from "react";

type EyeIconProps = {
  open: boolean;
};

export const UserIcon = (): React.ReactElement => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M20.5 21.6c0-4.1-3.8-7.4-8.5-7.4s-8.5 3.3-8.5 7.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const PhoneIcon = (): React.ReactElement => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

export const MailIcon = (): React.ReactElement => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M2 8l10 6 10-6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const LockIcon = (): React.ReactElement => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8 11V7a4 4 0 118 0v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

export const EyeIcon = ({ open }: EyeIconProps): React.ReactElement =>
  open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );

export const WashingMachineIcon = (): React.ReactElement => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="#2dd4bf" strokeWidth="1.5" />
    <circle cx="12" cy="13" r="5" stroke="#2dd4bf" strokeWidth="1.5" />
    <circle cx="12" cy="13" r="2" fill="#2dd4bf" opacity="0.35" />
    <rect x="5" y="5" width="2" height="2" rx="0.5" fill="#2dd4bf" />
    <rect x="9" y="5" width="6" height="1" rx="0.5" fill="#2dd4bf" opacity="0.5" />
  </svg>
);

export const CustomerIcon = (): React.ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20.5 21.6c0-4.1-3.8-7.4-8.5-7.4s-8.5 3.3-8.5 7.4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const LaundryIcon = (): React.ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
    <rect x="10" y="6" width="5" height="1" rx="0.5" fill="currentColor" opacity="0.5" />
  </svg>
);

export const CheckCircleIcon = (): React.ReactElement => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#14b8a6" />
    <path
      d="M8 12l3 3 5-5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);