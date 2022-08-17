import { 
  SeedUser,
  SeedTodo 
} from '../types/custom/types'

const seedUsers: SeedUser[] = [
  {
    username: "jason",
    password: "flower"
  },
  {
    username: "jemimah",
    password: "sun flower"
  },
  {
    username: "isaac",
    password: "central america"
  },
]

const seedTodos: SeedTodo[] = [
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
  {
    title: "Practise TypeScript",
    description: "This is just a superset of JS, how HARD could it be XD"
  },  
  {
    title: "Cry about MUI :(",
    description: "Ugh, I need to make my application somewhat presentable. Use MUI, we can do this"
  },  
  {
    title: "Rockclimbing with friends!",
    description: "Ive been invited by mates to do some rockclimbing, ive never done this before"
  },  
  {
    title: "Go to gym",
    description: "I havent gone in two weeks T_T, I need to get back at it again!"
  },  
  {
    title: "Catch up with Carvalho",
    description: "He just came back from auckland, I want to see him again!"
  },            
]

export default {
  seedUsers,
  seedTodos
}