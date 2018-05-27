const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools')
const { HttpLink } = require('apollo-link-http')
const fetch = require('node-fetch')
var cors = require('cors')

const PORT = 5050

const link = new HttpLink({ uri: 'https://us1.prisma.sh/yaniv-tal/voting-graphql-server/dev', fetch })

const app = express()

const startApp = async () => {
  const schema = await introspectSchema(link)
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  })
  return app.use(cors())
    .use('/graphql', bodyParser.json(), graphqlExpress({ schema: executableSchema }))
    .get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
    .listen(PORT)
}

startApp()
