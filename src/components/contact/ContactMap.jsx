import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, ExternalLink, RotateCcw, Compass } from 'lucide-react';

// Confirmed Academy Location in Pune, Maharashtra
const ACADEMY_COORDS = [18.5204, 73.8567];
const DEFAULT_ZOOM = 13.5;

export default function ContactMap({
  searchUrl,
  directionsUrl,
  academyName = "The Consistent Academy",
  locationText = "Pune, Maharashtra, India"
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent duplicate map initialization
    if (mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: ACADEMY_COORDS,
      zoom: DEFAULT_ZOOM,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false, // We reposition zoom control for cleaner aesthetics
      scrollWheelZoom: true,
      attributionControl: true
    });

    mapInstanceRef.current = map;

    // Position Zoom Control neatly in top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap Tile Layer
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c']
    });

    tileLayer.on('load', () => {
      setIsMapLoaded(true);
    });

    tileLayer.addTo(map);

    // Custom Branded SVG Pin Icon
    const customIcon = L.divIcon({
      className: 'tca-custom-pin-container',
      html: `
        <div class="tca-pin-wrapper" style="position: relative; width: 44px; height: 56px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <!-- Pin Head -->
          <div style="width: 42px; height: 42px; border-radius: 50% 50% 50% 0; background: linear-gradient(135deg, #9636F5 0%, #6815B3 100%); transform: rotate(-45deg); box-shadow: 0 4px 14px rgba(104, 21, 179, 0.45); border: 2.5px solid #FFFFFF; display: flex; align-items: center; justify-center; margin: 0 auto; transition: transform 0.2s ease;">
            <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3" fill="#C5A16A" stroke="#FFFFFF" stroke-width="1"/>
              </svg>
            </div>
          </div>
          <!-- Ground Ripple/Shadow -->
          <div style="width: 18px; height: 6px; background: rgba(38, 19, 45, 0.28); border-radius: 50%; filter: blur(1px); margin-top: 2px;"></div>
        </div>
      `,
      iconSize: [44, 56],
      iconAnchor: [22, 54],
      popupAnchor: [0, -52]
    });

    // Create Marker
    const marker = L.marker(ACADEMY_COORDS, {
      icon: customIcon,
      title: `${academyName} — ${locationText}`,
      alt: `Location marker for ${academyName} in Pune`
    }).addTo(map);

    markerRef.current = marker;

    // Popup Content with Academy Branding
    const popupHtml = `
      <div style="font-family: inherit; padding: 4px 2px; min-width: 220px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);"></span>
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #7B22D3;">Verified Academy Centre</span>
        </div>
        <h3 style="font-size: 15px; font-weight: 700; color: #26132D; margin: 0 0 3px 0; line-height: 1.25;">
          ${academyName}
        </h3>
        <p style="font-size: 12px; color: #6E5E73; margin: 0 0 10px 0; line-height: 1.4;">
          ${locationText}
        </p>
        <div style="display: flex; align-items: center; gap: 8px; padding-top: 8px; border-top: 1px solid #F1E5D8;">
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 600; color: #9636F5; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #F8F4EE; border-radius: 6px; transition: background 0.15s ease;">
            <span>Get Directions</span> &rarr;
          </a>
          <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 500; color: #6E5E73; text-decoration: underline;">
            Google Maps
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, {
      className: 'tca-custom-popup',
      closeButton: true,
      autoPan: true,
      autoPanPadding: [40, 40]
    });

    // Automatically open popup on desktop so visitors immediately see verified status
    if (window.innerWidth >= 640) {
      setTimeout(() => {
        marker.openPopup();
      }, 400);
    }

    // Invalidate size to guarantee crisp tile rendering on load and resize
    const invalidateTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(mapContainerRef.current);

    return () => {
      clearTimeout(invalidateTimer);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [searchUrl, directionsUrl, academyName, locationText]);

  // Recenter map back to Academy coordinates
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(ACADEMY_COORDS, DEFAULT_ZOOM, {
        duration: 1.0,
        easeLinearity: 0.25
      });
      if (markerRef.current) {
        setTimeout(() => {
          markerRef.current.openPopup();
        }, 800);
      }
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-brand-border shadow-card bg-[#F4F1EA]">
      {/* Map Interactive Canvas */}
      <div
        ref={mapContainerRef}
        id="contact-interactive-map"
        tabIndex={0}
        aria-label={`Interactive navigation map centered on ${academyName} in Pune, Maharashtra. Use mouse or touch to pan and zoom.`}
        className="w-full h-[340px] sm:h-[440px] md:h-[480px] lg:h-[550px] z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      />

      {/* Floating Header Badge (Top-Left) */}
      <div className="absolute top-3.5 left-3.5 z-[500] pointer-events-none max-w-[calc(100%-110px)] sm:max-w-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-brand-border/90 shadow-subtle flex items-center gap-2.5 transition-all hover:shadow-card">
          <div className="w-7 h-7 rounded-md bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 border border-brand-mauve-border">
            <MapPin className="w-4 h-4 text-brand-purple" />
          </div>
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-heading font-bold text-brand-aubergine leading-tight truncate">
                {academyName}
              </p>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                Live Map
              </span>
            </div>
            <p className="text-[11px] font-sans text-brand-charcoal-muted truncate mt-0.5">
              {locationText}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Recenter Button (Top-Right, next to Zoom controls) */}
      <div className="absolute top-[82px] right-2.5 z-[500]">
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map on The Consistent Academy"
          title="Recenter on Academy"
          className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] bg-white hover:bg-stone-50 active:bg-stone-100 text-brand-aubergine hover:text-brand-purple rounded-md border border-brand-border shadow-sm flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-aubergine hover:text-brand-purple transition-transform hover:-rotate-45" />
        </button>
      </div>

      {/* Subtle Mobile Gesture Helper Pill */}
      <div className="sm:hidden absolute bottom-2 left-2 z-[500] pointer-events-none">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white/90">
          <Compass className="w-3 h-3" />
          Drag to explore Pune
        </span>
      </div>
    </div>
  );
}
