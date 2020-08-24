'use strict'

const fp = require('fastify-plugin')
const SequelizeClient = require('./../models');
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('sequelize', SequelizeClient)
  await fastify.sequelize.sequelize.authenticate()
  // if the fastify is closed, the db will also be closed
  fastify.addHook('onClose', (app, done) => {
    app.sequelize.sequelize.close().then(() => {
      // app.log.info(logs.closure.success)

      done()
    }).catch((err) => {
      // app.log.error(logs.closure.error)

      done(err)
    })
  })
})
