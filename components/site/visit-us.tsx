"use client";

import * as React from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { WhatsAppGlyph } from "@/components/site/whatsapp-button";
import { shop, shopAddressLine, telHref } from "@/lib/shop";
import { greetingMessage, waLink } from "@/lib/whatsapp";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

/** "Open now · closes at 8 pm" in shop time (IST), whatever the visitor's time zone. */
function openStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const today = shop.hours[day];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, text: `Open now · closes at ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, text: `Closed now · opens today at ${formatTime(today.open)}` };
  }
  for (let step = 1; step <= 7; step += 1) {
    const next = shop.hours[(day + step) % 7];
    if (next) {
      const label = step === 1 ? "tomorrow" : days[(day + step) % 7];
      return { open: false, text: `Closed now · opens ${label} at ${formatTime(next.open)}` };
    }
  }
  return { open: false, text: "Closed" };
}

export function VisitUs() {
  const [status, setStatus] = React.useState<{ open: boolean; text: string } | null>(null);

  React.useEffect(() => {
    const update = () => setStatus(openStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const action =
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition";

  return (
    <div>
      <ul className="mt-8 space-y-4 text-[13.5px] text-white/80">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
          {shopAddressLine}
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
          <span>
            <span
              aria-live="polite"
              className={
                status?.open ? "font-medium text-[#7fdca4]" : status ? "font-medium text-gold-300" : "text-white/80"
              }
            >
              {status?.text ?? shop.hoursNote}
            </span>
            {status && <span className="mt-0.5 block text-white/55">{shop.hoursNote}</span>}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" />
          <a href={telHref} className="transition hover:text-gold-300">
            {shop.phone}
          </a>
        </li>
      </ul>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <a
          href={shop.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${action} bg-gold-400 text-maroon-950 hover:bg-gold-300`}
        >
          <Navigation className="size-4" />
          Get directions
        </a>
        <a href={telHref} className={`${action} border border-white/20 text-white hover:border-white/45`}>
          <Phone className="size-4" />
          Call the shop
        </a>
        <a
          href={waLink(greetingMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${action} border border-white/20 text-white hover:border-white/45`}
        >
          <WhatsAppGlyph className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
