// import mongoose from 'mongoose'
import {Schema, model} from 'mongoose'
import { Todo } from '../types'

// Steps to create a schema in mongoose
// 1. Create a TS interface representing a document in MongoDB
// 2. Create a Schema according to the Interface
// 3. Create a model

const todoSchema = new Schema<Todo>({
  title: {type: String, required: true}, 
  description: {type: String, required: true},
  userId: {type: String, required: true},
  completed: {type: Boolean, required: true, default: false}
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
const ModelTodo = model<Todo>('Todo', todoSchema)

export default ModelTodo