require ('dotenv-safe').config({ silent: true, allowEmptyValues: true })

module.exports = {
  'development': {
    'host': process.env.DATABASE_HOST || 'localhost',
    'port': process.env.DATABASE_PORT || '5432',
    'schema': process.env.DATABASE_SCHEMA || 'public',
    'database': process.env.DATABASE_DATABASE || 'database',
    'username': process.env.DATABASE_USERNAME || 'admin',
    'password': process.env.DATABASE_PASSWORD || 'pass',
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      }
    },
    'pool': {
      'max': 5,
      'min': 0,
      'acquire': 30000,
      'idle': 10000
    },
    'logging': false
  },
  'staging': {
    'host': process.env.DATABASE_HOST || 'localhost',
    'port': process.env.DATABASE_PORT || '5432',
    'schema': process.env.DATABASE_SCHEMA || 'public',
    'database': process.env.DATABASE_DATABASE || 'database',
    'username': process.env.DATABASE_USERNAME || 'admin',
    'password': process.env.DATABASE_PASSWORD || 'pass',
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      }
    },
    'pool': {
      'max': 5,
      'min': 0,
      'acquire': 30000,
      'idle': 10000
    },
    'logging': false
  },
  'production': {
    'host': process.env.DATABASE_HOST || 'localhost',
    'port': process.env.DATABASE_PORT || '5432',
    'schema': process.env.DATABASE_SCHEMA || 'public',
    'database': process.env.DATABASE_DATABASE || 'database',
    'username': process.env.DATABASE_USERNAME || 'admin',
    'password': process.env.DATABASE_PASSWORD || 'pass',
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      } 
    },
    'pool': {
      'max': 5,
      'min': 0,
      'acquire': 30000,
      'idle': 10000
    },
    'logging': false
  }
}
