import logo from "./logo.svg"
import "./GitHubSearch.css"
import { useEffect, useState } from "react"
import axios from "axios"
import RepoDetails from "./RepoDetails"
function GitHubSearch() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    setRepos([])
    setDetails({})
  }, [username])

  function handleSubmit(e) {
    e.preventDefault()
    searchRepos()
  }

  function searchRepos() {
    setLoading(true)
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then((res) => {
      setLoading(false)
      setRepos(res.data)
    })
  }

  function getDetails(repoName) {
    setDetailsLoading(true)
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then((res) => {
      setDetailsLoading(false)
      setDetails(res.data)
    })
  }

  function renderRepo(repo) {
    return (
      <div className='row' key={repo.id} onClick={() => getDetails(repo.name)}>
        <h2 className='repo-name'>{repo.name}</h2>
      </div>
    )
  }

  return (
    <div className='page'>
      <div className='landing-page-container'>
        <div className='left-side'>
          <form className='form'>
            <input
              className='input'
              value={username}
              placeholder='GitHub Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className='button' onClick={handleSubmit}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          <div className='results-container'>{repos.map(renderRepo)}</div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  )
}

export default GitHubSearch
