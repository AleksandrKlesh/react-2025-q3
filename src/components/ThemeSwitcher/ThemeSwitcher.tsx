import { useTheme } from '../../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
