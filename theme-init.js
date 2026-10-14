try { document.documentElement.dataset.theme = localStorage.getItem('balkiz_theme_v2') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch {}
