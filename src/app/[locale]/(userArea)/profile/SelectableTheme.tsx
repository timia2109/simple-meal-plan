"use client";

import { setThemeAction } from "@/actions/setThemeAction";
import type { FC } from "react";

export const SelectableTheme: FC<{ theme: string; active: boolean }> = ({
  theme,
  active,
}) => (
  <input
    type="radio"
    name="selectedTheme"
    className="theme-controller btn join-item"
    aria-label={theme}
    checked={active}
    onChange={(e) => setThemeAction(theme)}
    value={theme}
  />
);
