import { useEffect, useState } from "react"
import { getGitHubPopular, getGitHubForks } from "../api/github"
import type { GitHubRepo } from "../api/github"

function usePopularRepos() {
    const [popularRepos, setPopularRepos] = useState<GitHubRepo[]>([])
    const [forkedRepos, setForkedRepos] = useState<GitHubRepo[]>([])
    const [failedPopular, setFailed] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                // Make the api call concurrently
                const [repos, forked] = await Promise.all([getGitHubPopular(), getGitHubForks()])
                setPopularRepos(repos)
                setForkedRepos(forked)
            } catch {
                setFailed(true)
            }
        }
        load()
    }, [])

    return { popularRepos, forkedRepos, failedPopular }
}

export default usePopularRepos