export const up = async ({ context: { connection, models } }) => {
  const { Message } = models
  const session = await connection.startSession()
  try {
    await session.withTransaction(async function () {
      await Message.create([{
        key: 'second',
        text: 'world'
      }, {
        key: 'foo',
        text: 'bar'
      }], { session })
    })
  } finally {
    await session.endSession()
  }
}

export const down = async ({ context: { connection, models } }) => {
  const { Message } = models
  const session = await connection.startSession()
  await session.withTransaction(async function () {
    await Message.deleteOne({
      key: 'second'
    }, { session })
    await Message.deleteOne({
      key: 'foo'
    }, { session })
  })
}
