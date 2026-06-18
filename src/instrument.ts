import React from 'react';
import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router';

declare const __TOOLZI_SENTRY_DSN__: string;
declare const __TOOLZI_APP_VERSION__: string;

const sentryDsn = __TOOLZI_SENTRY_DSN__;

type MetricAttributes = Record<string, unknown>;

export function initializeSentry() {
  if (!sentryDsn) {
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    release: __TOOLZI_APP_VERSION__,
    dataCollection: {
      userInfo: false,
      httpBodies: [],
    },
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.consoleLoggingIntegration({
        levels: ['log', 'warn', 'error'],
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^\//],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
}

export function trackButtonClick(buttonId: string, attributes: MetricAttributes = {}) {
  Sentry.metrics.count('button_click', 1, {
    attributes: {
      button_id: buttonId,
      ...attributes,
    },
  });
}

export function trackPageLoadTime() {
  const navigation = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;

  const loadTime = navigation?.loadEventEnd ? navigation.loadEventEnd : performance.now();

  Sentry.metrics.gauge('page_load_time', Math.round(loadTime), {
    unit: 'millisecond',
  });
}

export function trackResponseTime(responseTime: number, attributes: MetricAttributes = {}) {
  Sentry.metrics.distribution('response_time', responseTime, {
    unit: 'millisecond',
    attributes,
  });
}
