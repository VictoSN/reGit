import { useNavigate, useParams } from "react-router-dom"
import TwoColumnLayout from "../components/TwoColumnLayout"
import RepoPage from "../components/RepoPage"
import ProfileCard from "../components/ProfileCard"
import useGitHubRepo from "../hooks/useGitHubRepo"
import useGitHubUsers from "../hooks/useGitHubUser"
import { useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner"

function RepoPageView() {
    const navigate = useNavigate()
    const { owner, repo } = useParams()
    const { specificRepo, repoCommits, repoContents, repoCount, searchRepo } = useGitHubRepo()
    const { user, stars, searchUser } = useGitHubUsers()

    const openUser = (login: string) => navigate(`/${login}`)
    const openRepo = (owner: string, repo: string) => navigate(`/${owner}/${repo}`)

    useEffect(() => { 
        if (owner && repo) {
            searchRepo(owner, repo).then(r => {
                if (r) searchUser(r.owner.login)
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [owner, repo])

    return specificRepo && repoCommits && repoContents && user ?
        <TwoColumnLayout
            left={<RepoPage repo={specificRepo} repoCommits={repoCommits} repoContents={repoContents} repoCount={repoCount} openUser={openUser} />}
            right={<ProfileCard user={user} stars={stars} openUser={openUser} openRepo={openRepo}  />}
        /> : <LoadingSpinner />
}

export default RepoPageView