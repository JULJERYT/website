## 2026-02-06 - [Accessibility: Button Semantics]
**Learning:** When converting a non-semantic interactive element (like a `span` or `div`) into a semantic `button`, it is crucial to perform a full CSS reset to avoid visual regressions from browser defaults. Specifically, `border`, `background`, `font-family`, and `line-height` should be explicitly set or inherited to match the original design.
**Action:** Always use a comprehensive reset (e.g., `border: none; background: none; font-family: inherit;`) when introducing semantic buttons to existing designs.
