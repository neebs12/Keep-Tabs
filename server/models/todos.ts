import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: String, 
  description: String,
  userId: String
})

todoSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const _id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    returnedObject._id = _id    
  }
})

// small note: this governs collection name
// --> where mongoDB assigns name as plural-ised & lowercased version
// --> eg. 'Todo' appears as 'todos'
const Todo = mongoose.model('Todo', todoSchema)

export default Todo