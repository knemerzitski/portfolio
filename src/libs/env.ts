


export function isEnvVarTruthy(envVar: string | undefined, _default: boolean): boolean {
  if (envVar === undefined) return _default;
  return envVar === 'true' || envVar === '1';
}