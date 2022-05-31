export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://root:979899Mongo@clean-node-api.lbiuf.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5050
}
