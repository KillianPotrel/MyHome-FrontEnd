import React from 'react';
import Searchbar from '../Searchbar';
import Switch from '../Switch';
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
const WarningArticle = ():JSX.Element => {
    return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">Aliment à surveiller</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Informez les autres utilisateurs des articles que vous n'aimez pas ou de ceux auxquels vous êtes allergiques.
          </p>
        </div>


        <div className="col-start-2 col-span-2">
          <Searchbar />
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Nom de l'aliment (ou article)
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        <div className='text-base font-semibold leading-7 text-black'>
                          </div>N'aime pas ou allergique
                        <div className='mt-1 text-xs leading-6 text-gray-400'>(Coché pour allergique et non coché pour n'aime pas)</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          Artichaut
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                          <Switch />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <form className="col-start-2 col-span-2 flex items-start">
            <button 
                className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Sauvegarder
            </button>
        </form>
    </div>
    );
};

export default WarningArticle;