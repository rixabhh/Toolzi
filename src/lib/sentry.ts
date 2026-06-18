import * as Sentry from '@sentry/react';

const sentryDsn =
  import.meta.env.VITE_SENTRY_DSN ||
  'https://501457346ad3cf3fc19732b35bec485e@o4511585916157952.ingest.de.sentry.io/4511585919959120';

export function initializeSentry() {
  if (!sentryDsn || import.meta.env.DEV) {
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    dataCollection: {
      userInfo: false,
      httpBodies: [],
    },
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', window.location.origin],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
}
