module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: '5432',
      database: 'unlit',
      user: 'unlit',
      password: 'unlit'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seed'
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'pg',
    connection: 'postgres://localhost:5432/unlit',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seed'
    },
    useNullAsDefault: true
  },
}
