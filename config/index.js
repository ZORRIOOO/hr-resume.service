module.exports.development = {
  connect: {
    client: 'pg',
    connection: {
      host: 'space-dev-common-pgsql-m.esoft.team',
      port: '5432',
      user: 'test_user',
      password: 'test_password',
      database: 'resume-business'
    },
    migrations: {
      tableName: 'migrations_templates',
      directory: './migrations'
    },
    closeTimeout: 500
  },
  hh: {
    clientId: 'TQ7TSCBTDNH8H7SCR9I35HPHPMNTII507MKTLR533F1I843MBCPSFU86I9P94ANR',
    clientSecret: 'NCB6QUDSM60UGH3IK4JL5AJAA8M2HM1AU9GQ58O2BIKR7PMJ0852AV4U55VIU7N2',
    redirectUri: 'https://neptune.esoft.team/oauth/hh/handle',
    hhUserAgent: 'CRM HR/1.0 DEV (o.v.mayer@etagi.com)',
    baseUrl: 'https://api.hh.ru/',
    timeout: 5000,
    directoryName: 'ecosystem'
  }
};

module.exports.test = {
  connect: {
    client: 'pg',
    connection: {
      host: 'space-dev-common-pgsql-m.esoft.team',
      port: '5432',
      user: 'test_user',
      password: 'test_password',
      database: 'resume-business-test'
    },
    migrations: {
      tableName: 'migrations_templates',
      directory: './migrations'
    },
    closeTimeout: 500
  },
  hh: {
    baseUrl: 'https://96bef92d-79a0-4d92-90fa-ae3dda3d0a47.mock.pstmn.io/',
    timeout: 5000,
    directoryName: 'ecosystem'
  }
};

module.exports.production = {
  connect: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: 'migrations_templates',
      directory: './migrations'
    },
    closeTimeout: 500
  },
  hh: {
    clientId: process.env.HH_CLIENT_ID,
    clientSecret: process.env.HH_CLIENT_SECRET,
    redirectUri: process.env.HH_REDIRECT_URI,
    hhUserAgent: process.env.HH_USER_AGENT,
    baseUrl: 'https://api.hh.ru/',
    timeout: 5000,
    directoryName: 'ecosystem'
  }
};
