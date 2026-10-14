// Country → tax document, shared by the client form (label) and the API
// route (Stripe tax id type). Plain data only — safe to import on the client.

export type Country = {
  code: string; // ISO-2
  name: string;
  taxLabel: string; // what the field is called in that country
  // Stripe tax id type, when there's a confident mapping. null = store only.
  stripeTaxType: string | null;
};

export const COUNTRIES: Country[] = [
  { code: "BR", name: "Brasil", taxLabel: "CNPJ", stripeTaxType: "br_cnpj" },
  { code: "PT", name: "Portugal", taxLabel: "NIF", stripeTaxType: "eu_vat" },
  { code: "US", name: "Estados Unidos", taxLabel: "EIN", stripeTaxType: "us_ein" },
  { code: "GB", name: "Reino Unido", taxLabel: "VAT", stripeTaxType: "gb_vat" },
  { code: "ES", name: "Espanha", taxLabel: "NIF / CIF", stripeTaxType: "eu_vat" },
  { code: "FR", name: "França", taxLabel: "TVA", stripeTaxType: "eu_vat" },
  { code: "DE", name: "Alemanha", taxLabel: "USt-IdNr.", stripeTaxType: "eu_vat" },
  { code: "AO", name: "Angola", taxLabel: "NIF", stripeTaxType: null },
];

export const DEFAULT_TAX_LABEL = "Documento fiscal";

export function countryByCode(code: string | null | undefined) {
  return COUNTRIES.find((c) => c.code === code) ?? null;
}

export function taxLabelFor(code: string | null | undefined) {
  return countryByCode(code)?.taxLabel ?? DEFAULT_TAX_LABEL;
}
