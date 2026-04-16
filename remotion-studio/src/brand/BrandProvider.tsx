import { createContext, ReactNode, useContext } from "react";
import { Brand, FAUX_THINKER } from "./tokens";

const BrandContext = createContext<Brand>(FAUX_THINKER);

export interface BrandProviderProps {
  brand?: Brand;
  children: ReactNode;
}

// Context-based brand injection so deep components don't have to thread props.
// Pattern ported from claude-code-video-toolkit/lib/theme/ThemeProvider.tsx.
export function BrandProvider({ brand = FAUX_THINKER, children }: BrandProviderProps) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand(): Brand {
  return useContext(BrandContext);
}
