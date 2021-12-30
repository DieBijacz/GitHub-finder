import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"

function UserSearch() {
  const [text, setText] = useState('')

  const {users} = useContext(GithubContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // validation
    if(text === '') {
      alert('please enter something')
    } else {
      // Search for users
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
          className="btn btn-ghost btn-lg">Clear</button>
        </div>
      }
    </div>
  )
}

export default UserSearch
