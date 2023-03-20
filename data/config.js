const config = {
  user: "linkedinuser",
  password: "123456",
  database: "basicapi",
  server: "DESKTOP-9N7PBP3",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export default config;
