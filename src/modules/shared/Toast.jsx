import toast from 'react-hot-toast';

const showToast = (message) => {
    toast.custom((t) => (
        <div
            className={`
        ${t.visible ? 'animate-custom-enter' : ''} 
        max-w-md w-full bg-gray-50 dark:bg-gray-800 shadow-md rounded-xl pointer-events-auto flex ring-1 ring-gray-200 dark:ring-gray-700
      `}
        >
            {/* Contenido principal */}
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/logo-login.webp"
                            alt="Safe City Logo"
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Safe City
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex border-l border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-xl p-3 flex items-center justify-center text-sm font-medium text-black hover:text-black focus:outline-none cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    ));
};

export { showToast };
