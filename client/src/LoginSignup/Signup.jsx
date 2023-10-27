
import UploadWidget from '/src/UploadWidget.jsx'

function Signup(){
    return(
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-16 lg:px-8 bg-grey-500 -mt-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7,22.45a3.88,3.88,0,1,1,3.87-3.87A3.88,3.88,0,0,1,7,22.45ZM7,16.2a2.38,2.38,0,1,0,2.37,2.38A2.39,2.39,0,0,0,7,16.2Z"/>
            <path d="M7,9.3a3.88,3.88,0,1,1,3.87-3.88A3.88,3.88,0,0,1,7,9.3ZM7,3.05A2.38,2.38,0,1,0,9.38,5.42,2.38,2.38,0,0,0,7,3.05Z"/>
            <path d="M17,16.45a3.88,3.88,0,1,1,3.88-3.87A3.87,3.87,0,0,1,17,16.45Zm0-6.25a2.38,2.38,0,1,0,2.38,2.38A2.38,2.38,0,0,0,17,10.2Z"/>
            <path d="M7,16.2a.74.74,0,0,1-.75-.75V8.55a.75.75,0,0,1,1.48-.19c0,.14,1,3.47,6.13,3.47a.75.75,0,0,1,0,1.5,8.21,8.21,0,0,1-6.11-2.19v4.31A.75.75,0,0,1,7,16.2Z"/></svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create Your Free Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Already a member?{' '}
            <a href="#" className="font-semibold leading-6 text-purple-300 hover:text-indigo-400">
              Login
            </a>
          </p>
        </div>
      </div>
    )
}

export default Signup