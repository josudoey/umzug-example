export const up = async ({ context: { connection, models } }) => {
  const { Message } = models
  await Message.create({
    key: 'second',
    text: 'world'
  })
}

export const down = async ({ context: { connection, models } }) => {
  const { Message } = models
  await Message.deleteOne({
    key: 'second'
  })
}
