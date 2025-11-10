// Lightweight runtime checks to surface common misconfig issues early.
// This runs on import and is non-blocking.

(() => {
  try {
  const isProd = Boolean((import.meta as any)?.env?.PROD);
    const host = typeof window !== 'undefined' ? window.location.hostname : '';

    // Warn if running from an unexpected origin in production (helps notice unrestricted API keys)
    if (isProd && host && !/^(localhost|127\.0\.0\.1|sweetchebbi\.com)$/i.test(host)) {
      // eslint-disable-next-line no-console
      console.warn(
        `This app is running on an unrecognized origin: ${host}. Ensure your Firebase API key is restricted to sweetchebbi.com and localhost.`,
      );
    }

    // Detect common Storage bucket misconfig
    const bucket = (import.meta as any)?.env?.VITE_FIREBASE_STORAGE_BUCKET;
    if (bucket && /firebasestorage\.app$/i.test(String(bucket))) {
      // eslint-disable-next-line no-console
      console.error(
        `VITE_FIREBASE_STORAGE_BUCKET appears invalid: ${bucket}. Use <project-id>.appspot.com to avoid DNS errors.`,
      );
    }
  } catch {
    // Swallow errors; checks are best-effort only.
  }
})();
