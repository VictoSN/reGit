import { useState } from 'react'
import { getGitHubCommitCount, getGitHubCommits, getGitHubContents, getGitHubRepo } from '../api/github'
import type { GitHubRepo, GitHubRepoCommit, GitHubRepoContent } from '../api/github'

function useGitHubRepo() {
    const [specificRepo, setSpecificRepo] = useState<GitHubRepo>()
    const [repoCommits, setRepoCommits] = useState<GitHubRepoCommit[]>()
    const [repoContents, setRepoContents] = useState<GitHubRepoContent[]>()
    const [repoCount, setRepoCount] = useState(0)
    const [failedRepo, setFailed] = useState(false)

    const searchRepo = async(owner: string, repo: string) => {
        try {
            const data = await getGitHubRepo(owner, repo)
            setSpecificRepo(data)

            // Make the api call concurrently
            const [commits, contents, count] = await Promise.all([getGitHubCommits(owner, repo), getGitHubContents(owner, repo), getGitHubCommitCount(owner, repo)])
            setRepoCommits(commits)
            setRepoContents(contents)
            setRepoCount(count)

            return data
        } catch (error) {
            setFailed(true)
        }
    }

    return { specificRepo, setSpecificRepo, repoCommits, repoContents, repoCount, failedRepo, searchRepo }
}

export default useGitHubRepo