import SearchBar from './components/SearchBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RepoPageView from './pages/RepoPageView'
import UserPage from './pages/UserPage'

function App() {
  return (
    <BrowserRouter basename='/reGit/'>
      <div className="flex flex-col min-h-dvh justify-top items-center bg-[#0e1113] pb-4 gap-4">
        <SearchBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path=":username" element={<UserPage />} />
          <Route path=":owner/:repo" element={<RepoPageView />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
