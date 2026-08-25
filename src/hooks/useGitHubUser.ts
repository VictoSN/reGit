import { useState } from 'react'
import { getGitHubRepos, getGitHubStars, getGitHubUser } from '../api/github'
import type { GitHubRepo, GitHubUser } from '../api/github'

// One status per UI screen
export type Status = "idle" | "loading" | "notFound" | "error" | "success" | "empty"

function useGitHubUsers() {
    const [user, setUser] = useState<GitHubUser | null>(null)
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [stars, setStars] = useState<GitHubRepo[]>([])
    const [status, setStatus] = useState<Status>("idle")

    const searchUser = async(username: string) => {
        setStatus("loading")
        try {
            // Make the api call concurrently
            const [user, repos, stars] = await Promise.all([getGitHubUser(username), getGitHubRepos(username), getGitHubStars(username)])
            setUser(user)
            setRepos(repos)
            setStars(stars)

            setStatus(repos.length === 0 ? "empty" : "success")
        } catch (error) {
            // Ensure its a known error
            if (error instanceof Error && error.message === "User not found") {
                setStatus("notFound")
            } else {
                setStatus("error")
            }
        }
    }

    const returnHome = () => {
        setStatus("idle")
    }

    return { user, repos, stars, status, searchUser, returnHome }
}

export default useGitHubUsers