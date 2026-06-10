/**
 * Icons.tsx
 * Uses Material Symbols Outlined (loaded via index.html or global CSS).
 * All icons accept an optional `className` and `style` prop.
 */
import type { CSSProperties } from 'react';

interface IconProps {
  style?: CSSProperties;
}

interface ServiceIconProps {
  name?: string;
  style?: CSSProperties;
}

const MSO_BASE: CSSProperties = {
  fontFamily: 'Material Symbols Outlined',
  fontWeight: 'normal',
  fontStyle: 'normal',
  lineHeight: 1,
  display: 'inline-block',
  verticalAlign: 'middle',
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const MSO_FILLED: CSSProperties = {
  ...MSO_BASE,
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

export const StarIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_FILLED, fontSize: 13, color: '#d97706', ...style }}>star</span>
);

export const PinIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 15, color: '#00897b', ...style }}>location_on</span>
);

export const ClockIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 13, ...style }}>schedule</span>
);

export const BoltIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 13, ...style }}>local_shipping</span>
);

export const GridIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 15, ...style }}>grid_view</span>
);

export const MapViewIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 15, ...style }}>map</span>
);

export const UserIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 20, ...style }}>person</span>
);

export const ChevronDownIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 14, ...style }}>expand_more</span>
);

export const LocateIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 13, ...style }}>my_location</span>
);

export const CheckIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 12, color: '#fff', ...style }}>check</span>
);

export const DistanceIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 14, color: '#6b7a8d', ...style }}>distance</span>
);

export const PaymentsIcon = ({ style = {} }: IconProps) => (
  <span style={{ ...MSO_BASE, fontSize: 14, color: '#6b7a8d', ...style }}>payments</span>
);

export const ServiceIcon = ({ name, style = {} }: ServiceIconProps) => (
  <span style={{ ...MSO_FILLED, fontSize: 16, ...style }}>{name}</span>
);
