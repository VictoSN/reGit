import { useNavigate, useParams } from "react-router-dom"
import TwoColumnLayout from "../components/TwoColumnLayout"
import UserCard from "../components/UserCard"
import ProfileCard from "../components/ProfileCard"
import useGitHubUsers from "../hooks/useGitHubUser"
import { useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner"

function UserPage() {
    const navigate = useNavigate()
    const { username } = useParams()
    const { user, repos, stars, searchUser } = useGitHubUsers()

    const openUser = (login: string) => navigate(`/${login}`)
    const openRepo = (owner: string, repo: string) => navigate(`/${owner}/${repo}`)

    useEffect(() => { 
        if (username) searchUser(username) 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    return user ?
        <TwoColumnLayout
            left={<UserCard user={user} repos={repos} openUser={openUser} openRepo={openRepo} />}
            right={<ProfileCard user={user} stars={stars} openUser={openUser} openRepo={openRepo} />} 
        /> : <LoadingSpinner />
}

export default UserPage