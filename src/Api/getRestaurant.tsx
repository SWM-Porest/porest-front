import axios from 'axios'

const getRestaurant = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  return response.data
}
