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

  // Brazil only: fill street/city/state from the CEP via ViaCEP (free, no key).
  async function lookupCep(raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (digits.length !== 8) return;
    if (country && country !== "BR") return;

    setCep("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCep("notfound");
        return;
      }
      if (data.logradouro) setLine1(data.logradouro);
      if (data.localidade) setCity(data.localidade);
      if (data.uf) setState(data.uf);
      if (!country) onCountryChange("BR");
      setCep("ok");
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
              void lookupCep(e.target.value);
            }}
            onBlur={(e) => void lookupCep(e.target.value)}
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
