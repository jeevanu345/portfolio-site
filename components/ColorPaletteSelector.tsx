import React, { useState, useCallback } from 'react';
import { useThemeManager } from '../hooks/useThemeManager';
import { Button } from './ui/button';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import ReactGA from 'react-ga4';

interface ColorPaletteSelectorProps {
  className?: string;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({
  className = '',
}) => {
  const {
    currentTheme,
    themes,
    mode,
    setTheme,
    toggleMode,
    isLoading,
    previewTheme,
    cancelPreview,
  } = useThemeManager();

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const handleThemeClick = useCallback(
    (themeName: string) => {
      const theme = themes.find((t) => t.name === themeName);
      if (!theme) return;

      // If clicking the already-applied theme → deselect
      if (currentTheme?.name === themeName) {
        setSelectedTheme(null);
        cancelPreview();
        return;
      }

      // Select this theme for preview
      setSelectedTheme(themeName);
      previewTheme(theme, mode);

      ReactGA.event({
        category: 'Theme',
        action: 'Palette Theme Selected',
        label: themeName,
        value: 1,
      });
    },
    [themes, currentTheme, mode, previewTheme, cancelPreview]
  );

  const handleApply = useCallback(() => {
    if (!selectedTheme) return;

    ReactGA.event({
      category: 'Theme',
      action: 'Palette Theme Applied',
      label: selectedTheme,
      value: 1,
    });
    setTheme(selectedTheme);
    setSelectedTheme(null);
  }, [selectedTheme, setTheme]);

  const handleCancel = useCallback(() => {
    cancelPreview();
    setSelectedTheme(null);
  }, [cancelPreview]);

  const handleMouseEnter = useCallback(
    (themeName: string) => {
      const theme = themes.find((t) => t.name === themeName);
      if (theme && theme.name !== currentTheme?.name) {
        setHoveredTheme(themeName);
        previewTheme(theme, mode);
      }
    },
    [themes, currentTheme, mode, previewTheme]
  );

  const handleMouseLeave = useCallback(() => {
    if (hoveredTheme) {
      setHoveredTheme(null);
      // If we have a selected theme, re-preview that instead of cancelling
      if (selectedTheme && selectedTheme !== currentTheme?.name) {
        const theme = themes.find((t) => t.name === selectedTheme);
        if (theme) {
          previewTheme(theme, mode);
          return;
        }
      }
      cancelPreview();
    }
  }, [hoveredTheme, selectedTheme, currentTheme, themes, mode, previewTheme, cancelPreview]);

  const isThemeActive = (themeName: string) =>
    currentTheme?.name === themeName && !selectedTheme;

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium text-foreground">
            Color Palette
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            ReactGA.event({
              category: 'Theme',
              action: 'Palette Mode Toggle',
              label: `${mode} to ${mode === 'light' ? 'dark' : 'light'}`,
              value: 1,
            });
            toggleMode();
          }}
          className="flex items-center gap-1.5"
        >
          {mode === 'light' ? (
            <Moon className="h-3.5 w-3.5" />
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )}
          <span className="text-xs">{mode === 'light' ? 'Dark' : 'Light'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {themes.map((theme) => {
          const colors = theme.colors[mode];
          const isApplied = isThemeActive(theme.name);
          const isSelected = selectedTheme === theme.name;
          const isHovered = hoveredTheme === theme.name;

          return (
            <button
              key={theme.name}
              onClick={() => handleThemeClick(theme.name)}
              onMouseEnter={() => handleMouseEnter(theme.name)}
              onMouseLeave={handleMouseLeave}
              className={`group relative flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                isApplied
                  ? 'border-primary ring-2 ring-primary/30 scale-[1.02]'
                  : isSelected
                    ? 'border-primary/60 ring-1 ring-primary/20 scale-[1.01]'
                    : 'border-border hover:border-primary/50 hover:scale-[1.01]'
              } ${isHovered ? 'border-primary/70 shadow-md' : ''}`}
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.background
                    : colors.card,
              }}
              aria-label={`Select ${theme.displayName} theme`}
            >
              {/* Color dots row */}
              <div className="flex gap-1.5 mb-2">
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colors.primary }}
                  title={`Primary: ${colors.primary}`}
                />
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colors.secondary }}
                  title={`Secondary: ${colors.secondary}`}
                />
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colors.accent }}
                  title={`Accent: ${colors.accent}`}
                />
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colors.foreground }}
                  title={`Text: ${colors.foreground}`}
                />
              </div>

              {/* Theme name */}
              <span
                className={`text-xs font-medium truncate w-full text-center ${
                  isApplied || isSelected ? 'text-primary' : ''
                }`}
                style={{ color: isApplied || isSelected ? colors.primary : colors.mutedForeground }}
              >
                {theme.displayName}
              </span>

              {/* Applied indicator */}
              {isApplied && (
                <div className="absolute top-1.5 right-1.5">
                  <Check className="h-3.5 w-3.5" style={{ color: colors.primary }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Apply / Cancel bar */}
      {selectedTheme && selectedTheme !== currentTheme?.name && (
        <div className="mt-4 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="text-sm text-muted-foreground">
            Previewing{' '}
            <span className="font-medium text-foreground">
              {themes.find((t) => t.name === selectedTheme)?.displayName || selectedTheme}
            </span>
          </span>
          <Button
            size="sm"
            onClick={handleApply}
            className="flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            Apply
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Current theme label */}
      {!selectedTheme && (
        <div className="mt-3 text-center">
          <span className="text-xs text-muted-foreground">
            Current:{' '}
            <span className="font-medium text-foreground">
              {currentTheme?.displayName || 'Default'}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteSelector;
