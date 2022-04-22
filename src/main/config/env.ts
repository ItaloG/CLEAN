export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://root:root@clean-node-api.lbiuf.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5050
}
