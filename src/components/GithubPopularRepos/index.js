import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const initialStateDetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'IN_PROCESS',
  failure: 'FAILURE',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    storeData: [],
    activeLanguage: languageFiltersData[0].id,
    apiStatus: initialStateDetails.initial,
  }

  componentDidMount() {
    this.getApi()
  }

  getApi = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: initialStateDetails.inProcess})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const fetchData = await fetch(url)
    if (fetchData.ok) {
      const data = await fetchData.json()
      const dataDetails = data.popular_repos.map(eachValue => ({
        name: eachValue.name,
        id: eachValue.id,
        issueCount: eachValue.issues_count,
        forksCount: eachValue.forks_count,
        starsCount: eachValue.stars_count,
        imgUrl: eachValue.avatar_url,
      }))
      this.setState({
        storeData: dataDetails,
        apiStatus: initialStateDetails.success,
      })
    } else {
      this.setState({apiStatus: initialStateDetails.failure})
    }
  }

  getRenderLanguageSuccessView = () => {
    const {storeData} = this.state
    return (
      <div className="popular-language">
        <ul className="ul-container">
          {storeData.map(eachValue => (
            <RepositoryItem key={eachValue.id} eachItemDetails={eachValue} />
          ))}
        </ul>
      </div>
    )
  }

  getRenderLanguageFailure = () => (
    <div className="failure-language">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="img"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  callSwitchFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialStateDetails.inProcess:
        return this.renderLoader()
      case initialStateDetails.success:
        return this.getRenderLanguageSuccessView()
      case initialStateDetails.failure:
        return this.getRenderLanguageFailure()

      default:
        return null
    }
  }

  setNewId = newId => {
    this.setState({activeLanguage: newId}, this.getApi)
  }

  repoHeader = () => {
    const {activeLanguage} = this.state

    return (
      <ul className="button_list">
        {languageFiltersData.map(eachValue => (
          <LanguageFilterItem
            key={eachValue.id}
            filterDetails={eachValue}
            isActive={activeLanguage === eachValue.id}
            setNewId={this.setNewId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading"> Popular</h1>
        <div> {this.repoHeader()}</div>
        <div>{this.callSwitchFunction()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
