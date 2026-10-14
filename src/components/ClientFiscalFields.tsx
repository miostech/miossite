"use client";

import { useState } from "react";
import { COUNTRIES, DEFAULT_TAX_LABEL, countryByCode } from "@/lib/tax";

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

type CepStatus = "idle" | "loading" | "ok" | "notfound" | "error";

export function ClientFiscalFields() {
  const [country, setCountry] = useState("");
  const [docLabel, setDocLabel] = useState("");

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cep, setCep] = useState<CepStatus>("idle");

  const info = countryByCode(country);
  const docs = info?.docs ?? [];
  const multiDoc = docs.length > 1;
  const effectiveLabel = info
    ? (docs.find((d) => d.label === docLabel)?.label ?? docs[0].label)
    : DEFAULT_TAX_LABEL;

  function onCountryChange(code: string) {
    setCountry(code);
    setDocLabel(countryByCode(code)?.docs[0].label ?? "");
  }

  // Fill address from the postal code, using the free per-country service
  // (no API key, all CORS-enabled):
  //   BR → ViaCEP (street + city + state)
  //   PT → GeoAPI.pt (street + locality + district)
  //   US → Zippopotam.us (city + state only — ZIP doesn't map to a street)
  async function lookupPostal(raw: string) {
    const digits = raw.replace(/\D/g, "");
    // Brazil is the only one we auto-detect when no country is chosen yet.
    const target = country || (digits.length === 8 ? "BR" : "");

    try {
      if (target === "BR" && digits.length === 8) {
        setCep("loading");
        const d = await (await fetch(`https://viacep.com.br/ws/${digits}/json/`)).json();
        if (d.erro) return setCep("notfound");
        if (d.logradouro) setLine1(d.logradouro);
        if (d.localidade) setCity(d.localidade);
        if (d.uf) setState(d.uf);
        if (!country) onCountryChange("BR");
        return setCep("ok");
      }
      if (target === "PT" && digits.length === 7) {
        setCep("loading");
        const cp = `${digits.slice(0, 4)}-${digits.slice(4)}`;
        const d = await (await fetch(`https://json.geoapi.pt/cp/${cp}`)).json();
        if (!d || !d.Localidade) return setCep("notfound");
        const street = d.partes?.[0]?.["Artéria"];
        if (street) setLine1(street);
        setCity(d.Localidade);
        if (d.Distrito) setState(d.Distrito);
        return setCep("ok");
      }
      if (target === "US" && digits.length >= 5) {
        setCep("loading");
        const zip = digits.slice(0, 5);
        const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!res.ok) return setCep("notfound");
        const d = await res.json();
        const place = d.places?.[0];
        if (!place) return setCep("notfound");
        setCity(place["place name"]);
        setState(place["state abbreviation"]);
        return setCep("ok");
      }
    } catch {
      setCep("error");
    }
  }

  const cepHint =
    cep === "loading"
      ? "Buscando endereço…"
      : cep === "notfound"
        ? "CEP não encontrado."
        : cep === "error"
          ? "Não foi possível buscar o CEP."
          : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="label mb-1 block">
            País
          </label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
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

        {multiDoc ? (
          <div>
            <label htmlFor="taxDoc" className="label mb-1 block">
              Tipo de documento
            </label>
            <select
              id="taxDoc"
              name="taxDoc"
              value={docLabel}
              onChange={(e) => setDocLabel(e.target.value)}
              className={FIELD}
            >
              {docs.map((d) => (
                <option key={d.label} value={d.label}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div />
        )}

        <div className={multiDoc ? "col-span-2" : ""}>
          <label htmlFor="taxId" className="label mb-1 block">
            {effectiveLabel}
          </label>
          <input id="taxId" name="taxId" className={FIELD} />
          {info && !multiDoc && (
            <input type="hidden" name="taxDoc" value={effectiveLabel} />
          )}
        </div>
      </div>

      <fieldset className="space-y-6 border-t border-line pt-6">
        <legend className="label text-muted">Endereço (opcional)</legend>
        <div>
          <label htmlFor="addressPostalCode" className="label mb-1 block">
            CEP / Código postal
          </label>
          <input
            id="addressPostalCode"
            name="addressPostalCode"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              setCep("idle");
              void lookupPostal(e.target.value);
            }}
            onBlur={(e) => void lookupPostal(e.target.value)}
            className={FIELD}
          />
          {cepHint && <p className="mt-1 text-xs text-muted">{cepHint}</p>}
        </div>
        <div>
          <label htmlFor="addressLine1" className="label mb-1 block">
            Endereço
          </label>
          <input
            id="addressLine1"
            name="addressLine1"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="addressLine2" className="label mb-1 block">
            Complemento
          </label>
          <input
            id="addressLine2"
            name="addressLine2"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            className={FIELD}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="addressCity" className="label mb-1 block">
              Cidade
            </label>
            <input
              id="addressCity"
              name="addressCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="addressState" className="label mb-1 block">
              Estado / Província
            </label>
            <input
              id="addressState"
              name="addressState"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={FIELD}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
