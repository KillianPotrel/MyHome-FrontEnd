import React from 'react';

const ExitRequest = ():JSX.Element => {
    return (              
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
        <h2 className="text-base font-semibold leading-7 text-black">Demande de sortie</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
            Demandez la permission pour sortir, bien sûr il faut avoir une raison valable ...!
        </p>
        </div>

        <form className="flex items-start md:col-span-2">
        <button
            type="submit"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
        >
            Yes, delete my account
        </button>
        </form>
    </div>
    );
};

export default ExitRequest;