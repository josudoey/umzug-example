import { Umzug, MongoDBStorage } from 'umzug'
import path from 'path'

export const createMigrator = ({ connection, models }) => {
  return new Umzug({
    migrations: {
      glob: ['migrations/*.{js,cjs,mjs}', { cwd: path.dirname(import.meta.url.replace('file://', '')) }],
      resolve: params => {
        if (params.path.endsWith('.mjs') || params.path.endsWith('.js')) {
          const getModule = () => import(`file:///${params.path.replace(/\\/g, '/')}`)
          return {
            name: params.name,
            path: params.path,
            up: async upParams => (await getModule()).up(upParams),
            down: async downParams => (await getModule()).down(downParams)
          }
        }
        return {
          name: params.name,
          path: params.path,
          ...require(params.path)
        }
      }
    },
    context: { connection, models },
    storage: new MongoDBStorage({
      connection
    }),
    logger: console
  })
}
