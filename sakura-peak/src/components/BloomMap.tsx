// src/components/BloomMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icons (TypeScript-safe version)
const fixLeafletIcons = () => {
    L.Icon.Default.prototype.options.iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png';
    L.Icon.Default.prototype.options.iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png';
    L.Icon.Default.prototype.options.shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png';
};

fixLeafletIcons();

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface BloomMapProps {
  selectedLocation: Location;
  locations: Location[];
}

export default function BloomMap({ selectedLocation, locations }: BloomMapProps) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[600px] w-full">
      <MapContainer
        center={[selectedLocation.lat, selectedLocation.lon]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker 
            key={loc.name} 
            position={[loc.lat, loc.lon]}
          >
            <Popup>
              <strong>{loc.name}</strong><br />
              Click to see bloom prediction
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}