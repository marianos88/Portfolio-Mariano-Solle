/**
 * Provider-agnostic analytics abstraction.
 *
 * All tracking calls go through this module. Swap the implementation
 * inside each function when a real provider is added — call sites stay unchanged.
 *
 * Google Tag Manager is the single analytics entry point for this project.
 * GA4, Clarity, and any future tools are configured inside GTM — not here.
 *
 * Environment variables:
 *   NEXT_PUBLIC_GTM_ID  — GTM container ID (e.g. GTM-XXXXXXX)
 */

// ---------------------------------------------------------------------------
// Event catalog — extend this union as new events are needed
// ---------------------------------------------------------------------------

export type AnalyticsEvent =
  | { name: 'page_view'; path: string; title?: string }
  | { name: 'contact_form_submit' }
  | { name: 'contact_form_error'; reason: string }
  | { name: 'project_view'; slug: string; title: string }
  | { name: 'portfolio_plus_unlock_attempt' }
  | { name: 'portfolio_plus_unlock_success' }
  | { name: 'portfolio_plus_case_view'; slug: string }
  | { name: 'theme_toggle'; theme: 'light' | 'dark' }
  | { name: 'language_switch'; locale: string }
  | { name: 'external_link_click'; url: string; label?: string }

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function isEnabled(): boolean {
  return typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Track a typed event. No-op in development and on the server.
 * Replace the body of this function when integrating a provider.
 */
export function track(event: AnalyticsEvent): void {
  if (!isEnabled()) return

  // TODO: push to GTM dataLayer
  // window.dataLayer?.push({ event: event.name, ...event })
}

/**
 * Track a page view. Called automatically by AnalyticsProvider on route change.
 * Can also be called manually for virtual page views.
 */
export function pageview(path: string, title?: string): void {
  track({ name: 'page_view', path, title })
}

/**
 * Identify the current user session (e.g. after authentication).
 * No-op until a provider that supports identity is integrated.
 */
export function identify(_userId: string, _traits?: Record<string, unknown>): void {
  if (!isEnabled()) return

  // TODO: push identity traits to GTM dataLayer
}
