module.exports = {
  development: {
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
