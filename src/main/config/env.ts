export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://root:root@clean-node-api.lbiuf.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5050
}
