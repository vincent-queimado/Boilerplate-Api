
export default {  
    // *** DEVELOPMENT CONFIGURATIONS ***
    'development': {
        'sendgrid': {
            'key': process.env.SENDGRID_API_KEY || '1234567890abcdef',
            'fromEmail': process.env.SENDGRID_API_FROM_EMAIL || '"WebApi Time" <support@gmail.com>',
            'useLocalTemplates': process.env.SENDGRID_API_USE_LOCAL_TEMPLATE || true,
            'templates': {
              'welcome': 'd-677012bdb66642608537dccd9a4713da',
              'signup_confirmation': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_request': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_reset': 'd-677012bdb66642608537dccd9a4713da'
            }
          },
        'smtp': {
            'service': process.env.SMTP_SERVICE || 'gmail',
            'user': process.env.SMTP_USER || 'admin',
            'password': process.env.SMTP_PASSWORD || 'password',
        }
    },

    // *** STAGING CONFIGURATIONS ***
    'staging': {
        'sendgrid': {
            'key': process.env.SENDGRID_API_KEY || '1234567890abcdef',
            'fromEmail':process.env.SENDGRID_API_FROM_EMAIL || '"WebApi Time" <support@gmail.com>',
            'useLocalTemplates': process.env.SENDGRID_API_USE_LOCAL_TEMPLATE || true,
            'templates': {
              'welcome': 'd-677012bdb66642608537dccd9a4713da',
              'signup_confirmation': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_request': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_reset': 'd-677012bdb66642608537dccd9a4713da'
            }
          },
        'smtp': {
            'service': process.env.SMTP_SERVICE || 'gmail',
            'user': process.env.SMTP_USER || 'admin',
            'password': process.env.SMTP_PASSWORD || 'password',
        }
    },

    // *** PRODUCTION CONFIGURATIONS ***
    'production': {
        'sendgrid': {
            'key': process.env.SENDGRID_API_KEY || '1234567890abcdef',
            'fromEmail':process.env.SENDGRID_API_FROM_EMAIL || '"WebApi Time" <support@gmail.com>',
            'useLocalTemplates': process.env.SENDGRID_API_USE_LOCAL_TEMPLATE || true,
            'templates': {
              'welcome': 'd-677012bdb66642608537dccd9a4713da',
              'signup_confirmation': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_request': 'd-677012bdb66642608537dccd9a4713da',
              'forgot_password_reset': 'd-677012bdb66642608537dccd9a4713da'
            }
          },
        'smtp': {
            'service': process.env.SMTP_SERVICE || 'gmail',
            'user': process.env.SMTP_USER || 'admin',
            'password': process.env.SMTP_PASSWORD || 'password',
        }
    }
}