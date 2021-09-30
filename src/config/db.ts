import mongoose from 'mongoose'

//!Singelton Class
export default class DatabaseConfiguration {
  private static _instance: DatabaseConfiguration

  private constructor() {}

  static getInstance() {
    console.log('Starting database ......')
    return this._instance || (this._instance = new DatabaseConfiguration())
  }

  public config(url: string): Promise<void> {
    return mongoose
      .connect(url)
      .then(() => console.log(`Connected to mongo db`))
      .catch((err) => {
        console.log(err)
        process.exit(1)
      })
  }
}
