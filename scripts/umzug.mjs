import { createMigrator } from '../umzug/index.mjs'
import mongoose, { models } from '../mongoose/index.mjs'

(async function main () {
  // see https://www.mongodb.com/docs/manual/reference/connection-string/#std-label-connections-connection-options
  await mongoose.connect('mongodb://mongo5:27017/umzug-example?directConnection=true')
  const { connection } = mongoose
  const migrator = createMigrator({ connection, models })
  await migrator.runAsCLI()
  connection.close()
})()
