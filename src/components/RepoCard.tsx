import type { GitHubRepo } from "../api/github"
import DetailCard from "./DetailCard"

interface RepoCardProps {
    repo: GitHubRepo
    openUser: (login: string) => void
    openRepo: (owner: string, repo: string) => void
}

function RepoCard({ repo, openUser, openRepo }: RepoCardProps) {
    return (
        <div key={repo.name} className="flex flex-col border-solid border-t border-gray-700">
            <div className="flex flex-col gap-1 py-3 my-1 pl-4 hover:bg-[#181c1f] hover:rounded-2xl">
                <div className="flex flex-row gap-2 items-center">
                    <img src={repo.owner.avatar_url} className="max-w-[24px] rounded-full"/>
                    <button onClick={() => openUser(repo.owner.login)} className="cursor-pointer hover:text-[#7286c6]">
                        <p className="text-sm">{repo.owner.login}</p>
                    </button>
                    <p className="text-[#8ba2ad] text-xs">•</p>
                    <p className="text-[#8ba2ad] text-xs">{new Date(repo.created_at).toLocaleDateString()}</p>
                </div>

                <button onClick={() => openRepo(repo.owner.login, repo.name)} className="cursor-pointer">
                    <p className="justify-left text-lg font-semibold text-start">{repo.name}</p>
                </button>
                <p className="text-[#8ba2ad] text-sm">{repo.description}</p>

                <DetailCard repo={repo}/>
            </div>
        </div>
    )
}

export default RepoCard