'use client';
import Image from 'next/image';
import '../Temperature/temperature.sass'; // puedes renombrar si necesitas

import { useEffect, useState } from 'react';

export default function Humedity({ humedad }) {
  const [minHum, setMinHum] = useState(null);
  const [maxHum, setMaxHum] = useState(null);

  useEffect(() => {
    const hum = parseFloat(humedad);
    if (isNaN(hum)) return;

    setMinHum((prev) => (prev === null || hum < prev ? hum : prev));
    setMaxHum((prev) => (prev === null || hum > prev ? hum : prev));
  }, [humedad]);

  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">Humedad</p>
        <Image src="/images/humed.png" width={100} height={100} alt="humedity water" />
        <p className="temp">{humedad}%</p>
        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Min</p>
            <p className="minTemp">{minHum !== null ? `${minHum}%` : '--'}</p>
          </div>
          <div className="max">
            <p className="maxHeading">Max</p>
            <p className="maxTemp">{maxHum !== null ? `${maxHum}%` : '--'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
