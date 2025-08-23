/**
 * This interface is declaring all the necessary environment variables to be used inside the application
 */
declare interface Env {
  readonly NODE_ENV: string;

  NG_APP_OPEN_METEO_API_KEY: string;
}

/**
 * This interface is responsible for accessing all declared environment variables in the application using developer
 * endorsed method.
 *
 * Usage example:
 * @example
 * import.meta.env.YOUR_ENV_VAR
 */
declare interface ImportMeta {
  readonly env: Env;
}
