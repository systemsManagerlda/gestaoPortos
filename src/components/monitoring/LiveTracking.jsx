"use client"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: -25.9655,
  lng: 32.5892,
}

const cargos = [
  { id: 1, position: { lat: -25.9655, lng: 32.5892 }, label: "Carga 1" },
  { id: 2, position: { lat: -25.9700, lng: 32.5800 }, label: "Carga 2" },
  { id: 3, position: { lat: -25.9608, lng: 32.5835 }, label: "Carga 3" },
  { id: 4, position: { lat: -25.9680, lng: 32.5962 }, label: "Carga 4" },
  { id: 5, position: { lat: -25.9731, lng: 32.5910 }, label: "Carga 5" },
  { id: 6, position: { lat: -25.9642, lng: 32.5758 }, label: "Carga 6" },
  { id: 7, position: { lat: -25.9580, lng: 32.6000 }, label: "Carga 7" },
  { id: 8, position: { lat: -25.9715, lng: 32.5869 }, label: "Carga 8" },
];

export default function LiveTracking() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const [map, setMap] = useState(null)

  const onLoad = (mapInstance) => {
    setMap(mapInstance)
  }

  const onUnmount = () => {
    setMap(null)
  }

  if (!isLoaded) return <div>Carregando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {cargos.map((cargo) => (
        <Marker key={cargo.id} position={cargo.position} label={cargo.label} />
      ))}
    </GoogleMap>
  )
}
