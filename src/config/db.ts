import mongoose from 'mongoose'

export default class DatabaseConfiguration {
  private static _instance: DatabaseConfiguration

  private constructor() {}

  static getInstance() {
    return this._instance || (this._instance = new DatabaseConfiguration())
  }

  public config(url: string) {
    mongoose
      .connect(url)
      .then(() => console.log(`Connected to mongo db`))
      .catch((err) => {
        console.log(err)
        process.exit(1)
      })
  }
}
