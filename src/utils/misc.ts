export const randomBoolean = (): boolean => Math.random() >= 0.5;
export const randomInt  = (max=10): number => Math.floor(Math.random() * max);