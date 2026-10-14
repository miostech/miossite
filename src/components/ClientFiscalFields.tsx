"use client";

import { useState } from "react";
import { COUNTRIES, DEFAULT_TAX_LABEL, taxLabelFor } from "@/lib/tax";

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export function ClientFiscalFields() {
  const [country, setCountry] = useState("");
  const taxLabel = country ? taxLabelFor(country) : DEFAULT_TAX_LABEL;

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="label mb-1 block">
            País
          </label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={FIELD}
          >
            <option value="">—</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="taxId" className="label mb-1 block">
            {taxLabel}
          </label>
          <input id="taxId" name="taxId" className={FIELD} />
        </div>
      </div>
    </>
  );
}
