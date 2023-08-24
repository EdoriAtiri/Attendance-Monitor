import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="w-1/2 py-10 space-y-32">
        <div className="font-bold text-2xl ml-10">
          <span className="text-3xl">A</span>
          <span className="-ml-2">M</span>
        </div>
        <div className="px-10 xl:px-20 m-auto space-y-6">
          <h1 className="font-bold text-4xl lg:text-6xl">
            Track Event Attendance{' '}
          </h1>
          <p className="text-sm lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ad
            provident, deleniti ipsum molestias illo aut!
          </p>
          <div className="flex flex-row space-x-4 lg:space-x-6 xl:space-x-8">
            <Link to="/signup">
              <Button text="Sign Up" />
            </Link>
            <Link to="/login">
              <Button text="Login" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 py-10 px-10 flex flex-col relative">
        <ul className="text-sm h-fit py-4 xl:text-base flex flex-row gap-6 justify-end w-full">
          <li className="nav">About</li>
          <li className="nav">Contact</li>
        </ul>
        <div className="font-bold text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-8xl xl">A</span>
          <span className="-ml-4">M</span>
        </div>
      </div>
    </div>
  )
}

export default Home
