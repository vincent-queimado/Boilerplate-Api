module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Admins', {
      id: {
        field: 'id',
        type:  DataTypes.UUID,
        defaultValue:  DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      name: {
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING
      },
      avatar: {
        field: 'avatar',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      google_signin: {
        field: 'google_signin',
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      google_given_name: {
        field: 'google_given_name',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      google_family_name: {
        field: 'google_family_name',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      google_locale: {
        field: 'google_locale',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      google_avatar: {
        field: 'google_avatar',
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      password: {
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING
      },
      signupConfirmation: {
        field: 'signupConfirmation',
        allowNull: false,
        defaultValue: 'pending',
        type: DataTypes.STRING
      },
      tokenSignupConfirmation: {
        field: 'tokenSignupConfirmation',
        type: DataTypes.STRING
      },
      tokenResetPassword: {
        field: 'tokenResetPassword',
        type: DataTypes.STRING
      },
      deleted: {
        field: 'deleted',
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      status: {
        field: 'status',
        allowNull: false,
        defaultValue: 'pending',
        type: DataTypes.STRING
      },
      createdAt: {
        field: 'createdAt',
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        field: 'updatedAt',
        allowNull: false,
        type: DataTypes.DATE
      },
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Admins')
  }
}