import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as any as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
