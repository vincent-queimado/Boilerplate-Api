export default {
  // *** DEVELOPMENT CONFIGURATIONS ***
  'development': {
    'app': {
      'name': process.env.APP_NAME || 'API-PROJECT-BASE',
      'welcome': {
        'urlWelcome': 'http://localhost:3333/api/v1/mocks/welcome'
      },
      'signup': {
        'emailConfirmExpired': 72,
        'urlEmailVerification': 'http://localhost:3333/api/v1/client/auth/signup/confirmation/'
      },
      'forgotPassword': {
        'resetPasswordExpired': 24,
        'urlForgotPasswordReset': 'http://localhost:3333/api/v1/mocks/forgotpassword/form/'
      }
    },
    'superadmin': {
      'email': process.env.SUPER_ADMIN_EMAIL || 'appentregapronta@gmail.com',
      'password': process.env.SUPER_ADMIN_PASSWORD || '123123'
    },
    'server': {
      'host': process.env.APP_WEB_URL || 'localhost',
      'port': process.env.APP_WEB_PORT || 3333,
      'debug': true
    },
    'api': {
      'version' : 1,
      'host': process.env.APP_API_URL || 'localhost',
      'port': process.env.APP_API_PORT || 8080
    },
    'socketio': {
      'port': process.env.APP_SOCKETIO_PORT || 3334,
    },
    'session': {
      'name': 'sessionID',
      'secret': process.env.APP_SESSION_SECRET || 'secretsession',
      'maxAge': process.env.APP_SESSION_MAX_AGE || 3600000,
      'httpOnly': true, 
      'secure': false, 
      'resave': true,
      'saveUninitialized': true
    },
    'jwt': {
      'expiredIn': process.env.APP_JWT_EXPIRED_IN || "24h"
    }
  },
  // *** STAGING CONFIGURATIONS ***
  'staging': {
    'app': {
      'name': process.env.APP_NAME || 'API-PROJECT-BASE',
      'welcome': {
        'urlWelcome': 'http://localhost:3333/api/v1/mocks/welcome'
      },
      'signup': {
        'emailConfirmExpired': 72,
        'urlEmailVerification': 'http://localhost:3333/api/v1/client/auth/signup/confirmation/'
      },
      'forgotPassword': {
        'resetPasswordExpired': 24,
        'urlForgotPasswordReset': 'http://localhost:3333/api/v1/mocks/forgotpassword/form/'
      }
    },
    'superadmin': {
      'email': process.env.SUPER_ADMIN_EMAIL || 'appentregapronta@gmail.com',
      'password': process.env.SUPER_ADMIN_PASSWORD || '123123'
    },
    'server': {
      'host': process.env.APP_WEB_URL || 'localhost',
      'port': process.env.APP_WEB_PORT || 3333,
      'debug': true
    },
    'api': {
      'version' : 1,
      'host': process.env.APP_API_URL || 'localhost',
      'port': process.env.APP_API_PORT || 8080
    },
    'socketio': {
      'port': process.env.SOCKETIO_PORT || 3334,
    },
    'session': {
      'name': 'sessionID',
      'secret': process.env.APP_SESSION_SECRET || 'secretsession',
      'maxAge': process.env.APP_SESSION_MAX_AGE || 3600000,
      'httpOnly': true, 
      'secure': true,
      'resave': false,
      'saveUninitialized': true
    },
    'jwt': {
      'expiredIn': process.env.APP_JWT_EXPIRED_IN || "24h"
    }
  },
  // *** PRODUCTION CONFIGURATIONS ***
  'production': {
    'app': {
      'name': process.env.APP_NAME || 'API-PROJECT-BASE',
      'welcome': {
        'urlWelcome': 'http://localhost:3333/api/v1/mocks/welcome'
      },
      'signup': {
        'emailConfirmExpired': 72,
        'urlEmailVerification': 'http://localhost:3333/api/v1/client/auth/signup/confirmation/'
      },
      'forgotPassword': {
        'resetPasswordExpired': 24,
        'urlForgotPasswordReset': 'http://localhost:3333/api/v1/mocks/forgotpassword/form/'
      }
    },
    'superadmin': {
      'email': process.env.SUPER_ADMIN_EMAIL || 'appentregapronta@gmail.com',
      'password': process.env.SUPER_ADMIN_PASSWORD || '123123'
    },
    'server': {
      'host': process.env.APP_WEB_URL || 'localhost',
      'port': process.env.APP_WEB_PORT || 3333,
      'debug': true
    },
    'api': {
      'version' : 1,
      'host': process.env.APP_API_URL || 'localhost',
      'port': process.env.APP_API_PORT || 8080
    },
    'socketio': {
      'port': process.env.SOCKETIO_PORT || 3334,
    },
    'session': {
      'name': 'sessionID',
      'secret': process.env.APP_SESSION_SECRET || 'secretsession',
      'maxAge': process.env.APP_SESSION_MAX_AGE || 3600000,
      'httpOnly': true, 
      'secure': true, 
      'resave': false,
      'saveUninitialized': true
    },
    'jwt': {
      'expiredIn': process.env.APP_JWT_EXPIRED_IN || "24h"
    },

  }
}