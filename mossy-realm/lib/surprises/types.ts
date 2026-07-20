export type LocalSurpriseKind =
  | 'field-note'
  | 'site-artifact'
  | 'frog-message'
  | 'footer-message';

export interface LocalSurprise {
  id: string;
  kind: LocalSurpriseKind;
  message: string;
  href?: string;
  linkLabel?: string;
}

export interface WikipediaSignal {
  title: string;
  extract: string;
  url: string;
}

export interface WikipediaSignalResponse {
  signal: WikipediaSignal;
  source: 'wikimedia' | 'fallback';
  error?: 'invalid-response' | 'timeout' | 'upstream-failure';
}
