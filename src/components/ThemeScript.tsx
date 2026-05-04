export function ThemeScript() {
  const code = `
    try {
      const theme = localStorage.getItem("subtrack-theme") || "system";
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && prefersDark));
    } catch {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
