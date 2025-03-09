const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(
      `environment variable ${key} is not set. Using default value: ${defaultValue}`,
    );
  }
  return value || defaultValue;
};

export { getEnvVar };
