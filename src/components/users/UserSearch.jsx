import { useState, useContext } from "react"
import AlertContext from "../../context/alerts/AlertContext"
import GithubContext from "../../context/github/GithubContext"
import {searchUsers} from '../../context/github/GithubActions'

function UserSearch() {
  const [text, setText] = useState('')

  // USE CONTEXT
  const {users, dispatch} = useContext(GithubContext)
  const {setAlert} = useContext(AlertContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validation
    if(text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({
        type: 'SET_LOADING'
      })
      // Search for users, text comes from form input(handleChange)
      const users = await searchUsers(text)
      dispatch({
        type: 'GET_USERS',
        payload: users,
      })
    }
    setText('')
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input 
              type="text" 
              value={text}
              onChange={handleChange}
              className="w-full pr-40 bg-primary input input-lg text-black"
              placeholder="Search" />
              <button 
              type="submit" 
              className="absolute top-0 right-0 rounded-l-none rounded-r w-36 btn btn-lg"
              >Go</button>
            </div>
          </div>
        </form>
      </div>
      {/* show only if there are displayed users */}
      {users.length > 0 &&
        <div>
          <button 
          onClick={() => dispatch({type: 'CLEAR_USERS'})}
          className="btn btn-ghost btn-lg">Clear</button>
        </div>
      }
    </div>
  )
}

export default UserSearch
