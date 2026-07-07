/**
 * Provider-agnostic analytics abstraction.
 *
 * All tracking calls go through this module. Swap the implementation
 * inside each function when a real provider is added — call sites stay unchanged.
 *
 * Environment variables (all optional — omitting them disables that provider):
 *   NEXT_PUBLIC_GA_ID       — Google Analytics measurement ID  (e.g. G-XXXXXXXXXX)
 *   NEXT_PUBLIC_CLARITY_ID  — Microsoft Clarity project ID
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

  // TODO: forward to provider SDK
  // Example (GA4):
  //   window.gtag?.('event', event.name, { ...event })
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

  // TODO: forward to provider SDK
}
