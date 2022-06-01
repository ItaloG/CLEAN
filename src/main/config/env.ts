export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://mongo:mongo@clean-node-api.kr3jksf.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5050
}
