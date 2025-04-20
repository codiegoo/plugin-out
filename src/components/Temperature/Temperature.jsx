'use client';
import Image from 'next/image';
import './temperature.sass';

import { useEffect, useState } from 'react';

export default function Temperature({ temperatura }) {
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);

  useEffect(() => {
    const temp = parseFloat(temperatura);
    if (isNaN(temp)) return;

    setMinTemp((prev) => (prev === null || temp < prev ? temp : prev));
    setMaxTemp((prev) => (prev === null || temp > prev ? temp : prev));
  }, [temperatura]);

  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">Temperatura</p>
        <Image src="/images/temp.png" width={100} height={100} alt="temperature term" />
        <p className="temp">{temperatura}°</p>

        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Min</p>
            <p className="minTemp">{minTemp !== null ? `${minTemp}°` : '--'}</p>
          </div>
          <div className="max">
            <p className="maxHeading">Max</p>
            <p className="maxTemp">{maxTemp !== null ? `${maxTemp}°` : '--'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
