// Country → tax document(s), shared by the client form (labels) and the API
// route (Stripe tax id type). Plain data only — safe to import on the client.

export type TaxDoc = {
  label: string; // what the document is called (e.g. "CNPJ", "CPF", "NIF")
  // Stripe tax id type, when there's a confident mapping. null = store only.
  stripeTaxType: string | null;
};

export type Country = {
  code: string; // ISO-2
  name: string;
  docs: TaxDoc[]; // first entry is the default
};

export const COUNTRIES: Country[] = [
  {
    code: "BR",
    name: "Brasil",
    docs: [
      { label: "CNPJ", stripeTaxType: "br_cnpj" },
      { label: "CPF", stripeTaxType: "br_cpf" },
    ],
  },
  { code: "PT", name: "Portugal", docs: [{ label: "NIF", stripeTaxType: "eu_vat" }] },
  { code: "US", name: "Estados Unidos", docs: [{ label: "EIN", stripeTaxType: "us_ein" }] },
  { code: "GB", name: "Reino Unido", docs: [{ label: "VAT", stripeTaxType: "gb_vat" }] },
  { code: "ES", name: "Espanha", docs: [{ label: "NIF / CIF", stripeTaxType: "eu_vat" }] },
  { code: "FR", name: "França", docs: [{ label: "TVA", stripeTaxType: "eu_vat" }] },
  { code: "DE", name: "Alemanha", docs: [{ label: "USt-IdNr.", stripeTaxType: "eu_vat" }] },
  { code: "AO", name: "Angola", docs: [{ label: "NIF", stripeTaxType: null }] },
];

export const DEFAULT_TAX_LABEL = "Documento fiscal";

export function countryByCode(code: string | null | undefined) {
  return COUNTRIES.find((c) => c.code === code) ?? null;
}

// Resolve which document applies given a country and (optional) chosen label.
// Falls back to the country's default document.
export function resolveDoc(
  code: string | null | undefined,
  docLabel: string | null | undefined,
): TaxDoc | null {
  const country = countryByCode(code);
  if (!country) return null;
  return country.docs.find((d) => d.label === docLabel) ?? country.docs[0];
}
