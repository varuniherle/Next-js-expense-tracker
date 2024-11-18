import { AppMessages, AuthMessages, ExpenseMessages } from '../pages/taglines'; // adjust the import path accordingly

export function Homepage() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">{AppMessages.HEADER}</h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">{AppMessages.ABOUT}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{AuthMessages.SIGNUP_TAGLINE}</h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{ExpenseMessages.ADD_EXPENSE}</p>
              <a href="/pages/signup" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
                {AuthMessages.SIGNUP_BUTTON}
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{AuthMessages.SIGNIN_TAGLINE}</h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{ExpenseMessages.ADD_EXPENSE}</p>
              <a href="/pages/login" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
                {AuthMessages.SIGNIN_BUTTON}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
