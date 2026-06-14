// import React, { useState, useMemo } from 'react';
import { useShops } from '@/hooks/useShops';
// import Navbar from '../../components/location/Navbar';
// import Sidebar from '../../components/location/Sidebar';
// import LaundryCard from '../../components/location/LaundryCard';
// import GridCard from '../../components/location/GridCard';
// import MapPanel from '../../components/location/MapPanel';
// import TopBar from '../../components/location/TopBar';


import { useState, useMemo } from 'react';
import Sidebar from '../components/LOCATION/Sidebar';
import LaundryCard from '../components/LOCATION/LaundryCard';
import GridCard from '../components/LOCATION/GridCard';
import MapPanel from '../components/LOCATION/MapPanel';
import TopBar from '../components/LOCATION/TopBar';
interface Filters {
  services: string[];
  price: string;
  fastDelivery: boolean;
  distance: number;
  search: string;
}

interface Location {
  lat: number;
  lng: number;
  name: string;
}

export function CleannovyPage() {
  const [view, setView] = useState<string>('map');
  const [sort, setSort] = useState<string>('rating');
  const [location, setLocation] = useState<Location>({ lat: 30.0626, lng: 31.2497, name: 'القاهرة' });
  const [filters, setFilters] = useState<Filters>({
    services: ['laundry', 'iron', 'dry_cleaning', 'category'],
    price: 'متوسط',
    fastDelivery: true,
    distance: 15,
    search: '',
  });

  const filtersWithLocation = useMemo(() => ({
    ...filters,
    lat: location.lat,
    lng: location.lng,
  }), [filters, location]);

  const { shops, loading, error, usingMock } = useShops(filtersWithLocation, sort);

  function handleLocationChange(lat: number, lng: number, name: string) {
    setLocation({ lat, lng, name });
    setFilters((f) => ({ ...f, search: '' }));
  }

  return (
    <div style={{
      fontFamily: "'Tajawal', sans-serif",
      direction: 'rtl',
      background: '#f0f4f8',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* <Navbar /> */}

      {usingMock && (
        <div style={{
          background: '#fff3cd',
          borderBottom: '1px solid #ffc107',
          padding: '6px 18px',
          fontSize: 12,
          color: '#856404',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}>
          <span>⚠️</span>
          <span>الـ API مش متاح حالياً — تأكدي إن الـ backend شغال على port 5000</span>
          {error && <code style={{ fontSize: 10, color: '#c0392b', marginRight: 8 }}>{error}</code>}
        </div>
      )}

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          onLocationChange={handleLocationChange}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <TopBar
            view={view}
            setView={setView}
            total={shops.length}
            sort={sort}
            setSort={setSort}
          />

          {loading && (
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#f4f7fb', flexDirection: 'column', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '3px solid #e0e5eb',
                borderTopColor: '#00b89c',
                animation: 'spin 0.8s linear infinite',
              }} />
              <span style={{ fontSize: 13, color: '#6b7a8d' }}>جاري التحميل...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && (
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
              {view === 'map' && (
                <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                  <div style={{
                    width: '55%', overflowY: 'auto', padding: 14,
                    display: 'flex', flexDirection: 'column', gap: 11, background: '#f4f7fb',
                  }}>
                    {shops.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: 40, color: '#9aa5b4' }}>
                        لا توجد مغاسل مطابقة للفلاتر المحددة
                      </div>
                    ) : (
                      shops.map((shop) => <LaundryCard key={shop.id} shop={shop} />)
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <MapPanel
                      onLocate={(lat, lng) => handleLocationChange(lat, lng, 'موقعي الحالي')}
                      shops={shops}
                    />
                  </div>
                </div>
              )}

              {view === 'grid' && (
                <div style={{ width: '100%', overflowY: 'auto', padding: 16, background: '#f4f7fb' }}>
                  {shops.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40, color: '#9aa5b4' }}>
                      لا توجد مغاسل مطابقة للفلاتر المحددة
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                      gap: 14,
                    }}>
                      {shops.map((shop) => <GridCard key={shop.id} shop={shop} />)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
