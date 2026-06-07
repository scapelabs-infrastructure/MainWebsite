---
name: Fast Refresh provider split
description: Why the LanguageProvider lives in its own file separate from the context/hook
---

A React Context **Provider component** and the **hook/context** that consumes it must NOT
be exported from the same module when using Vite + @vitejs/plugin-react.

**Why:** Mixing a component export with non-component exports (context object, hook) in one
file makes the module Fast-Refresh-incompatible. On HMR, Vite reloads the consumers against a
fresh module copy while the Provider keeps the old context instance — so consumers throw
"useLanguage must be used within LanguageProvider" even though the tree is correct. Symptom in
console: `invalidate /src/i18n/LanguageContext.tsx: Could not Fast Refresh ("useLanguage"
export is incompatible)`.

**How to apply:** Keep `LanguageProvider.tsx` (the component) separate from `LanguageContext.tsx`
(context object + `useLanguage` hook + types). Components import the hook from the context file;
only `main.tsx` imports the Provider. After such a refactor, fully restart the workflow — HMR
alone won't clear the stale module graph.
