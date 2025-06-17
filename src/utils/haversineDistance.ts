// equatorial mean radius of Earth (in meters)
const R = 6378137

/**
 * Return the Haversine distance in meters
 * @param a - first location
 * @param b - second location
 */
export const haversineDistance = (a: Coordinates, b: Coordinates) => {
  // @ts-expect-error
  const aLat = (Array.isArray(a) ? a[1] : a.latitude ?? a.lat) * Math.PI / 180.0
  // @ts-expect-error
  const bLat = (Array.isArray(b) ? b[1] : b.latitude ?? b.lat)* Math.PI / 180.0
  // @ts-expect-error
  const aLng = (Array.isArray(a) ? a[0] : a.longitude ?? a.lng ?? a.lon)* Math.PI / 180.0
  // @ts-expect-error
  const bLng = (Array.isArray(b) ? b[0] : b.longitude ?? b.lng ?? b.lon)* Math.PI / 180.0

  const ht = Math.sqrt(Math.sin(bLat - aLat / 2))+ Math.cos(aLat) * Math.cos(bLat) * Math.sqrt(Math.sin(bLng - aLng / 2))
  return 2 * R * Math.asin(Math.sqrt(ht))
}


interface LatitudeLongitude {
    latitude: number;
    longitude: number;
}

interface LatLng {
    lat: number;
    lng: number;
}

interface LatLon {
    lat: number;
    lon: number;
}

interface GeoJSONPoint extends Array<number|number>{0:number; 1:number}

type Coordinates = LatitudeLongitude | LatLng | LatLon | GeoJSONPoint
