import { NAV_LINKS } from '../data/constants';
import { UserIcon } from './Icons';

export default function Navbar() {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e8edf2',
      padding: '0 28px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      boxShadow: '0 1px 8px rgba(13,31,60,0.06)',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 22, color: '#0a2342', letterSpacing: -0.5 }}>
        clean<span style={{ color: '#00b89c' }}>novy</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {NAV_LINKS.map(({ label, active }) => (
          <a
            key={label}
            href="#"
            style={{
              fontSize: 13.5,
              color: active ? '#0a2342' : '#6b7a8d',
              textDecoration: 'none',
              fontFamily: "'Tajawal', sans-serif",
              fontWeight: active ? 700 : 400,
              borderBottom: active ? '2px solid #00b89c' : 'none',
              paddingBottom: active ? 2 : 0,
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{
          background: 'none',
          border: '1px solid #e0e5eb',
          borderRadius: '50%',
          width: 34,
          height: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#6b7a8d',
        }}>
          <UserIcon />
        </button>
        <button style={{
          background: '#0a2342',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          padding: '7px 20px',
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
        }}>
          تسجيل الدخول
        </button>
      </div>
    </nav>
  );
}
