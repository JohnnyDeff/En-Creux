import { themes, mechanisms } from './taxonomy.mjs';
export { themes, mechanisms };
export type ThemeId = keyof typeof themes;
export type MechanismId = keyof typeof mechanisms;
