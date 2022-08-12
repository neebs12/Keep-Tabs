import {Schema, model} from "mongoose"
import config from '../utils/config'

import { User } from "../types"

const userSchema = new Schema<User>({
  username: {type: String, unique: true, required: true}, 
  passwordHash: {type: String, required: true}
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // here, mutate the object
    // remove __v and stringinfy and remove old _id
    const _id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    returnedObject.id = _id
    if (config.ENV !== 'dev') {
      delete returnedObject.passwordHash
    }
  }
})

const UserModel = model<User>('User', userSchema)

export default UserModel