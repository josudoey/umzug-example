import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
const __filename = fileURLToPath(import.meta.url)

const Schema = mongoose.Schema

const schema = new Schema({
  key: Schema.Types.String,
  text: Schema.Types.String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

schema.index({
  createdAt: 1
}, {

})

schema.index({
  key: 1
}, {
  unique: true
})

const CollectionName = path.basename(__filename, '.mjs')
const ModelName = CollectionName
export { CollectionName, ModelName }

export const Message = mongoose.model(
  ModelName, schema, CollectionName
)
