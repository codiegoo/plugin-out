// app/docs/page.jsx
'use client'
import { useEffect } from 'react'

export default function SwaggerRedirect() {
  useEffect(() => {
    window.location.href = '/swagger/docs.html'
  }, [])

  return <p>Cargando documentación en Swagger...</p>
}
  