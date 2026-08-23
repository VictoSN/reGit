import thinkingIcon from '../assets/thinking.png'
import wavingIcon from '../assets/waving.png'
import type { Status } from '../hooks/useGitHubUser'

interface StatusMessageProps {
    status: Status
    query: string
}

function StatusMessage({ status, query }: StatusMessageProps) {
    if (status !== "notFound" && status !== "error" && status !== "idle" && status !== "empty") return null

    const text = {
        idle:     { main: "Hm...we couldn't receive anything", sub: "Couldn't load popular repos. Check your connection or try again in a few minutes", button: "Try again" },
        empty:    { main: "Welcome!", sub: "This user doesn't have any repositories yet, but check out their stats to learn more about them.", button: "Adjust your search" },
        notFound: { main: `Hm...we couldn't find any results for ${query}`, sub: "Double-check your spelling or try different keywords", button: "Adjust your search" },
        error:    { main: "Hm...we receive an error, please try again later", sub: "Double-check your spelling or try different keywords", button: "Adjust your search" },
    }[status]

    return  (
        <div className={`flex flex-col items-center text-center ${status === "empty" ? "" : "pt-20"} gap-1 text-white`}>
            <img src={status === "empty" ? wavingIcon : thinkingIcon} className='max-w-[128px]'/>
            <p className="text-lg font-bold">{text.main}</p> 
            <p className="text-base text-[#8ba2ad]">{text.sub}</p>

            {/* Used href address to focus to input */}
            <button className='cursor-pointer bg-white rounded-3xl px-3 py-2 mt-3 text-black font-semibold'>{text.button}</button>
        </div>   
    )     
}

export default StatusMessage