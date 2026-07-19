import { signal } from '@/lib/crossroads-content';

/**
 * SignalWindow - the little radio listening to the sky.
 *
 * One public, keyless API (open-meteo.com), fetched server-side with
 * a timeout and a 30-minute cache. If anything fails - offline, slow,
 * disabled in config - the window shows the fallback line and the
 * page never notices. Turn it off in lib/crossroads-content.ts.
 */

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
}

// WMO weather codes, condensed to the realm's vocabulary
function describeCode(code?: number): string {
  if (code === undefined) return 'unreadable sky';
  if (code === 0) return 'clear sky';
  if (code <= 2) return 'partly cloudy';
  if (code === 3) return 'overcast';
  if (code <= 48) return 'fog on the road';
  if (code <= 67) return 'rain';
  if (code <= 77) return 'snow';
  if (code <= 82) return 'showers';
  if (code <= 86) return 'snow showers';
  if (code >= 95) return 'thunder over the canopy';
  return 'strange sky';
}

async function readSignal(): Promise<string | null> {
  if (!signal.enabled) return null;

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${signal.latitude}&longitude=${signal.longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m`;

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(signal.timeoutMs),
      next: { revalidate: signal.revalidateSeconds },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OpenMeteoResponse;
    const temp = data.current?.temperature_2m;
    if (temp === undefined) return null;
    const sky = describeCode(data.current?.weather_code);
    const wind = data.current?.wind_speed_10m;
    return `${sky}, ${Math.round(temp)}°C${wind !== undefined ? `, wind ${Math.round(wind)} km/h` : ''}`;
  } catch {
    return null;
  }
}

export default async function SignalWindow() {
  const reading = await readSignal();

  return (
    <div className="signal-window">
      <div className="flex items-center gap-2 mb-2">
        <span className={`led ${reading ? 'led-green' : 'led-amber led-blink'}`} aria-hidden="true" />
        <span className="font-nav text-meta uppercase tracking-wider text-fg-secondary">
          signal received: {signal.station}
        </span>
      </div>
      <div className="readout-row">
        <span className="readout-label">reading</span>
        <span className="readout-value">{reading ?? signal.fallback}</span>
      </div>
    </div>
  );
}
