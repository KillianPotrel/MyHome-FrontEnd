import React from 'react';
import { useUserInfo } from '../api/User';
import ProfileInformations from '../components/Profile/ProfileInformations';
import ProfilePassword from '../components/Profile/ProfilePassword';
import ProfileWarningArticle from '../components/Profile/ProfileWarningArticle';
import ProfileExitRequest from '../components/Profile/ProfileExitRequest';
import ProfileSchedule from '../components/Profile/ProfileSchedule';
import { ErrorBoundary } from '../_utils/ErrorBoundary';
import PermissionGates from '../_utils/PermissionGates';
import Skeleton from 'react-loading-skeleton';

const Profile = (): JSX.Element => {
  const { data : dataInfo, isLoading : isLoadingUser } = useUserInfo()

  return (
    <div className="divide-y divide-black/5">
    {isLoadingUser ? (
      <div className='mt-10'>
        <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
        <Skeleton count={5} />
      </div>
    ) : (
      <>
        <ProfileInformations user={dataInfo?.data} />
        <ProfilePassword />
        <ProfileWarningArticle />
          
        <PermissionGates permission_key='accept_exit_request' inversed={true}>
          <ProfileExitRequest />
        </PermissionGates>
        <ProfileSchedule />

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
      </>
      )}
    </div>
  )
}

export default Profile;