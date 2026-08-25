import { useNavigate } from "react-router-dom"
import usePopularRepos from "../hooks/usePopularRepos"
import StatusMessage from "../components/StatusMessage"
import TwoColumnLayout from "../components/TwoColumnLayout"
import RecommendedCard from "../components/RecommendedCard"
import PopularCard from "../components/PopularCard"

function HomePage() {
    const navigate = useNavigate()
    const { popularRepos, forkedRepos, failedPopular } = usePopularRepos()

    const openUser = (login: string) => navigate(`/${login}`)
    const openRepo = (owner: string, repo: string) => navigate(`/${owner}/${repo}`)

    if (failedPopular) {
        return <StatusMessage status="idle" query="" />
    }

    return (
        <TwoColumnLayout
            left={<RecommendedCard repos={popularRepos} openUser={openUser} openRepo={openRepo} />}
            right={<PopularCard forks={forkedRepos} openRepo={openRepo} />}
        />
    )
}

export default HomePage