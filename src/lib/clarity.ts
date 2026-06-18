import Clarity from '@microsoft/clarity';

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID || 'x8vimdlq54';

export function initializeClarity() {
  if (!clarityProjectId || import.meta.env.DEV) {
    return;
  }

  Clarity.init(clarityProjectId);
}
