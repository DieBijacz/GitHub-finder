import PropTypes from 'prop-types'
import {FaEye, FaInfo, FaLink, FaStar, FaUtensils} from 'react-icons/fa'

function RepoItem({repo}) {

  const {name, description, html_url, forks, open_issues, watchers_count, stargazers_count} = repo

  return (
    <div className='mb-2 rounded-md card bg-base-200'>
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={html_url}>
            <FaLink className='inline mr-5'/>
            {name}
          </a>
        </h3>
        {description && (
          <p className="p mb-3">{description}</p>
        )}
        {/* BADGES */}
        <div>
          {watchers_count > 0 &&(
            <div className="mr-2 badge badge-info badge-lg">
              <FaEye className='mr-2' /> {watchers_count}
            </div>        
          )}
          {stargazers_count > 0 &&(
            <div className="mr-2 badge badge-warning badge-lg">
              <FaStar className='mr-2' /> {stargazers_count}
            </div>        
          )}
          {open_issues > 0 &&(
            <div className="mr-2 badge badge-error badge-lg">
              <FaInfo className='mr-2' /> {open_issues}
            </div>        
          )}
          {forks > 0 &&(
            <div className="mr-2 badge badge-success badge-lg">
              <FaUtensils className='mr-2' /> {forks}
            </div>        
          )}
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes= {
  repo: PropTypes.object.isRequired
}

export default RepoItem
