import { 
  NewUser,
  UnassignedTodo 
} from '../types'

const seedUsers: NewUser[] = [
  {
    username: "jason",
    passwordHash: "flower"
  },
  {
    username: "jemimah",
    passwordHash: "sun flower"
  },
  {
    username: "isaac",
    passwordHash: "central america"
  },
]

const seedTodos: UnassignedTodo[] = [
  {
    title: "Clean Bedroom",
    description: "Guests are coming over today! Will need to be presentable"
  },
  {
    title: "Babysit Neighbour's Kid",
    description: "Need to impress, this is my first job!"
  },  
  {
    title: "Buy Dog Collars",
    description: "They need new collars, the old ones got really muddy and dirty"
  },
  {
    title: "Make Dinner",
    description: "Its my turn to cook in the flat today"
  },  
  {
    title: "Read Intro to JS",
    description: "I need to read this book before class next month!"
  },  
]

export default {
  seedUsers,
  seedTodos
}