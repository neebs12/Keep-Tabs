import mongoose from "mongoose"
import config from '../utils/config'

const userSchema = new mongoose.Schema({
  userName: String, 
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // here, mutate the object
    // remove __v and stringinfy and remove old _id
    const _id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    returnedObject._id = _id
    if (config.ENV !== 'dev') {
      delete returnedObject.passwordHash
    }
  }
})

const User = mongoose.model('User', userSchema)

export default User