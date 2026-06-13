import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const shopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface RecenterMapProps {
  lat: number;
  lng: number;
}

function RecenterMap({ lat, lng }: RecenterMapProps) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng]);
  return null;
}

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

interface Shop {
  id: string | number;
  name: string;
  rating: number;
  distance: number | string;
  address?: string;
  lat?: number;
  lng?: number;
}

interface MapPanelProps {
  onLocate?: (lat: number, lng: number) => void;
  shops?: Shop[];
}

export default function MapPanel({ onLocate, shops = [] }: MapPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [center] = useState({ lat: 30.0626, lng: 31.2497 });

  function handleMapClick(lat: number, lng: number) {
    setUserPos({ lat, lng });
    if (onLocate) onLocate(lat, lng);
  }

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError('المتصفح مش بيدعم تحديد الموقع');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPos({ lat: latitude, lng: longitude });
        setLoading(false);
        if (onLocate) onLocate(latitude, longitude);
      },
      () => {
        setLoading(false);
        setError('مش قادر يحدد موقعك');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%', cursor: 'crosshair' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={handleMapClick} />

        {userPos && <RecenterMap lat={userPos.lat} lng={userPos.lng} />}

        {userPos && (
          <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
            <Popup>
              <div style={{ fontFamily: "'Tajawal', sans-serif", direction: 'rtl' }}>
                📍 موقعك المحدد
              </div>
            </Popup>
          </Marker>
        )}

        {shops.map((shop) =>
          shop.lat && shop.lng ? (
            <Marker key={shop.id} position={[shop.lat, shop.lng]} icon={shopIcon}>
              <Popup>
                <div style={{ fontFamily: "'Tajawal', sans-serif", direction: 'rtl', minWidth: 150 }}>
                  <strong style={{ fontSize: 13 }}>{shop.name}</strong><br />
                  <span style={{ fontSize: 11, color: '#666' }}>⭐ {shop.rating} · {shop.distance} كم</span><br />
                  <span style={{ fontSize: 11, color: '#666' }}>{shop.address}</span>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)', padding: '6px 14px',
        borderRadius: 20, fontSize: 11, color: '#0a2342',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 1000,
        fontFamily: "'Tajawal', sans-serif", whiteSpace: 'nowrap',
      }}>
        {userPos ? '✅ تم تحديد موقعك — جاري البحث عن المغاسل القريبة' : '👆 اضغطي على الخريطة لتحديد موقعك'}
      </div>

      <button onClick={handleLocate} disabled={loading} style={{
        position: 'absolute', top: 12, left: 12,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(255,255,255,0.95)',
        color: '#0a2342',
        fontSize: 11, border: 'none',
        padding: '8px 12px', borderRadius: 20,
        cursor: loading ? 'wait' : 'pointer',
        fontFamily: "'Tajawal', sans-serif",
        zIndex: 1000, transition: 'all 0.3s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }} />

      {error && (
        <div style={{
          position: 'absolute', top: 52, left: 12,
          background: 'rgba(220,38,38,0.9)', color: '#fff',
          fontSize: 11, padding: '6px 12px', borderRadius: 8,
          zIndex: 1000, fontFamily: "'Tajawal', sans-serif",
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
