import React, {Fragment, useRef, useState}  from 'react';
import { useDeleteAccount, useUserInfo } from '../api/User';
import ProfileInformations from '../components/Profile/ProfileInformations';
import ProfilePassword from '../components/Profile/ProfilePassword';
import ProfileWarningArticle from '../components/Profile/ProfileWarningArticle';
import ProfileExitRequest from '../components/Profile/ProfileExitRequest';
import ProfileSchedule from '../components/Profile/ProfileSchedule';
import PermissionGates from '../_utils/PermissionGates';
import Skeleton from 'react-loading-skeleton';
import { Transition, Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router"

const Profile = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const cancelButtonRef = useRef(null)
  const navigate = useNavigate()

  const { data : dataInfo, isLoading : isLoadingUser } = useUserInfo()

  const deleteAccount = useDeleteAccount()

  const handleChange = (e : any) => {
    setPasswordConfirm(e.target.value)
  } 

  const handleDeleteAccount = () => {
      deleteAccount.mutate(passwordConfirm)
      setOpen(false)
      if(deleteAccount.isSuccess) {
        navigate('/')
      }
  }
  
  return (
    <div className="divide-y divide-black/5">
    {isLoadingUser ? (
      <div className='mt-10'>
        <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
        <Skeleton count={5} />
      </div>
    ) : (
      <>
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Attention vous allez supprimer votre compte !
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront définitivement supprimées de nos serveurs. 
                                            Cette action ne peut être annulée.
                                        </p>
                                    </div>
                                    
                                    <div className='text-sm font-semibold w-full mt-3'>
                                        <label htmlFor="start">
                                            Confirmer avec le mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="start"
                                            id="start"
                                            value={passwordConfirm}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={handleDeleteAccount}
                                >
                                    Supprimer le compte
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Annuler
                                </button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
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
              type="button"
              onClick={() => setOpen(true)}
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