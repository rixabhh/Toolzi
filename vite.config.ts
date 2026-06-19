import { fileURLToPath, URL } from 'node:url';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

const toolCategories = [
  'pdf',
  'image',
  'text',
  'calculate',
  'create',
  'productivity',
  'developer',
  'privacy',
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const enableSentrySourceMaps = Boolean(
    env.SENTRY_ORG && env.SENTRY_PROJECT && env.SENTRY_AUTH_TOKEN
  );
  const disableGeneratedPwa = mode === 'ssg';

  return {
    define: {
      __TOOLZI_SENTRY_DSN__: JSON.stringify(env.VITE_SENTRY_DSN || ''),
      __TOOLZI_APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || ''),
    },
    plugins: [
      react(),
      VitePWA({
        disable: disableGeneratedPwa,
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        manifest: false,
        includeAssets: ['manifest.webmanifest', 'favicon.svg', 'icon-192.png', 'icon-512.png'],
        workbox: {
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
            },
            {
              urlPattern: ({ request }) =>
                ['style', 'script', 'worker', 'image', 'font'].includes(request.destination),
              handler: 'CacheFirst',
            },
          ],
        },
      }),
      !disableGeneratedPwa &&
        compression({
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
        disable: !enableSentrySourceMaps,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: enableSentrySourceMaps ? 'hidden' : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');

            if (
              normalizedId.includes('/node_modules/react/') ||
              normalizedId.includes('/node_modules/react-dom/')
            ) {
              return 'vendor-react';
            }

            const category = toolCategories.find((name) =>
              normalizedId.includes(`/src/tools/${name}/`)
            );

            return category;
          },
        },
      },
    },
  };
});
