export const up = async ({ context: { connection, models } }) => {
  const { Message } = models
  await Message.create({
    key: 'first',
    text: 'hello'
  })
}

export const down = async ({ context: { connection, models } }) => {
  const { Message } = models
  await Message.deleteOne({
    key: 'first'
  })
}
