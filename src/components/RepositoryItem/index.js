import './index.css'

// Write your code here
const RepositoryItem = props => {
  const {eachItemDetails} = props
  const {name, issueCount, forksCount, starsCount, imgUrl} = eachItemDetails

  return (
    <li className="card-container">
      <img src={imgUrl} alt={name} className="card-img" />
      <h1 className="h1">{name}</h1>
      <div className="card-details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p>{starsCount} stars</p>
      </div>

      <div className="card-details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p>{forksCount} forks</p>
      </div>

      <div className="card-details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="icon"
        />
        <p>{issueCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
