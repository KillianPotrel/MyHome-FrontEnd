import React from 'react';
import Password from '../components/Profile/Password';
import ExitRequest from '../components/Profile/ExitRequest';
import WarningArticle from '../components/Profile/WarningArticle';
import Schedule from '../components/Profile/Schedule';
import Informations from '../components/Profile/Informations';

const Profile = (): JSX.Element => {

  return (
    <>
      <div>
        <div>
          <main>
            <div className="divide-y divide-black/5">

              <Informations />
              <Schedule />
              <WarningArticle />
              <ExitRequest />
              <Password />

              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-black">Suppression du compte</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Vous ne souhaitez plus utiliser nos services ? Vous pouvez supprimer votre compte ici. 
                    Cette action n'est pas réversible. Toutes les informations relatives à ce compte seront 
                    définitivement supprimées.
                  </p>
                </div>

                <form className="flex items-start md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                  >
                    Oui, supprimer mon compte
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Profile;