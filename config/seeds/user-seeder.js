const User = require('../../api/models/User')

// Constructing each user in an array
const users = [
  new User({
    _id: '5d4155cfcd68f4086d8df490',
      name: 'User user',
      email: 'user@gmail.com',
      password: 'userus',
      isAdmin: false
  }),
  new User({
    _id: '5d4155cfcd68f4086d8df491',
      name: 'Admin admin',
      email: 'admin@gmail.com',
      password: 'adminad',
      isAdmin: true
  })
];

module.exports = users;
