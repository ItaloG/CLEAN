export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://mongo:mongo@clean-node-api.kr3jksf.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'tj670==5H'
}
