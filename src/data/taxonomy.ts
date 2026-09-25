import { themes, mechanisms } from './taxonomy.mjs';
export { themes, mechanisms };
export type ThemeId = keyof typeof themes;
// The canonical navigation families are defined once, in the shared registry.
export type MechanismId = keyof typeof mechanisms;
