
const NewLinkModal = ({ showModal, setShowModal }) => {

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='bg-white dark:bg-slate-900 mx-60 my-50 dark:text-white md:mx-80 md:my-80'>
      <section className="text-gray-200 body-font relative transition-all duration-200">
        <div className="container py-3 px-30 mx-auto">
          <div className="lg:w-full md:w-full mx-auto">
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="email" className="leading-7 font-medium text-sm text-gray-600 dark:text-gray-200">
                    Client
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    className="  w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 font-medium text-sm text-gray-600 dark:text-gray-200"
                  >
                    Link's Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Name'
                    className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="whiteLink"
                    className="leading-7 text-sm font-medium text-gray-600 dark:text-gray-200"
                  >
                    White Link
                  </label>
                  <input
                    type="text"
                    id="whiteLink"
                    name="whiteLink"
                    placeholder='Link'
                    className="w-full dark:text-white bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="blackLink"
                    className="leading-7 font-medium text-sm text-gray-600 dark:text-gray-200"
                  >
                    Black Link
                  </label>
                  <input
                    type="text"
                    id="blackLink"
                    name="blackLink"
                    placeholder='Link'
                    className="w-full dark:text-white bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 font-medium text-sm text-gray-600 dark:text-gray-200"
                  >
                    Map
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full dark:text-white bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-500 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="flex w-full justify-center text-center mt-2">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-white border border-stroke rounded-lg text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white dark:bg-gray-600 dark:border-0 mr-6"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3">
                  Generate Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLinkModal