import { useNavigate, useParams } from 'react-router-dom';
import logoIcon from '../assets/logo-circle.png'
import searchIcon from '../assets/search.svg'
import { useState } from 'react';

function SearchBar() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [inputValue, setInputValue] = useState(username ?? "")

    const onSearch = () => {
        if (!inputValue.trim()) return
        navigate(`/${inputValue.trim()}`)
    }

    const onReturnHome = () => {
        setInputValue("")
        navigate("/")
    }


    return (
        <div className="flex sticky top-0 bg-[#0e1113] justify-between items-center w-full text-white px-5 border-solid border-b border-gray-700">
            <button onClick={onReturnHome} className='cursor-pointer'>
                <h1 className="text-left font-bold text-3xl">reGit</h1>
            </button>
            <form className="flex py-2 gap-5" onSubmit={(e) => {e.preventDefault(); onSearch() }}>
                <div className='relative'>
                    <img src={searchIcon} className="max-w-[20px] absolute left-3 top-1/2 -translate-y-1/2"/>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border border-orange-500 rounded-[30px] h-[40px] w-[560px] pl-10 pr-5 mr-20" placeholder="Find Anything"></input>
                </div>
            </form>
            <a href='https://github.com/VictoSN' target="_blank" rel="noopener noreferrer">
                <img src={logoIcon} className="max-w-[40px] rounded-full"/>
            </a>
        </div>
    )
}

export default SearchBar