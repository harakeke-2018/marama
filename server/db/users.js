const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const hash = require('../auth/hash')

module.exports = {
  createUser,
  getAllUsers,
  userExists,
  getUserById,
  getUserByName
  // updateUser
}

function createUser (username, password, testConn) {
  const conn = testConn || connection
  return userExists(username, conn)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User Exists'))
      }
    })
    .then(() => {
      const passwordHash = hash.generate(password)
      return conn('users')
        .insert({username, hash: passwordHash})
        .then(ids => {
          return conn('users')
            .where('id', ids[0] || 0)
            .first()
        })
    })
}

function getAllUsers (testConn) {
  const conn = testConn || connection
  return conn('users')
    .select('id', 'username')
}

function userExists (username, testConn) {
  const conn = testConn || connection
  return conn('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserById (id, testConn) {
  const conn = testConn || connection
  return conn('users')
    .select('id', 'username')
    .where('id', id)
    .first()
}

function getUserByName (username, testConn) {
  const conn = testConn || connection
  return conn('users')
    .select('id', 'username')
    .where('username', username)
    .first()
}

// function updateUser (id, username, currentPassword, newPassword, conn) {
//   const conn = conn || connection
//   return getUserByName(username, conn)
//     .then(user => {
//       if (!user || !hash.verify(user.hash, currentPassword)) {
//         return Promise.reject(new Error('Username password match not found'))
//       }
//       return Promise.resolve(user)
//     })
//     .then(user => {
//       const newPasswordHash = hash.generate(newPassword)
//       if (id !== user.id) Promise.reject(new Error('Username and ID mismatch'))
//       return conn('users')
//         .update({username, hash: newPasswordHash})
//         .where('id', user.id)
//     })
// }
