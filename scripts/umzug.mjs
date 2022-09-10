import { createMigrator } from '../umzug/index.mjs'
import mongoose from '../mongoose/index.mjs'

(async function main () {
  await mongoose.connect('mongodb://localhost:27017/umzug-example')
  const { connection, models } = mongoose
  const migrator = createMigrator({ connection, models })
  await migrator.runAsCLI()
  connection.close()
})()
