import { Dialog, Transition } from '@headlessui/react';
import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useRef, useState } from 'react';
import { MutationArgs, Permission, useManyPermissionUserFamily, usePutPermissionUser } from '../api/Permission';
import Switch from './Switch';

type PermissionsModalProps = {
    permissions : Permission[],
    user_id: number
}

const ModalAuthorization = ({permissions, user_id} : PermissionsModalProps):JSX.Element => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const { data: datePermissionUser } = useManyPermissionUserFamily(user_id)
    const permissionUser : Permission[] = datePermissionUser?.data
    
    const updatePermissionUser = usePutPermissionUser(user_id)
    
    const handleUpdate = (permission: Permission, activate : number) => {
        const args : MutationArgs = {
            permission,
            activate
        }
        updatePermissionUser.mutate(args)
      }
    return (
        <>
            <button
                type="button"
                className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                onClick={() => setOpen(true)}
            >
                <ShieldCheckIcon className="h-5 w-5" aria-hidden="true" />
            </button>
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
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <LockClosedIcon className="h-6 w-6 text-amber-600" aria-hidden="true"/>
                                </div>
                                </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Gérer les permissions de Emma
                                </Dialog.Title>
                                <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Les droits donne accès à certaines fonctionnalités de l'application.
                                </p>
                                </div>
                            </div>

                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="-mx-4 mt-8 sm:-mx-0">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Nom permission
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {(permissions !== undefined && permissions?.length > 0) &&
                                            permissions.map((permission, index) => (
                                                <tr key={index}>
                                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                        {permission.label}
                                                    </td>
                                                    
                                                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <Switch
                                                            id={user_id}
                                                            category={"permission_" + permission.key}
                                                            isChecked={permissionUser?.some(x => x.id === permission.id)}
                                                            handleClick={() => {
                                                                handleUpdate(permission, permissionUser?.find(x => x.id === permission.id) ? 0 : 1)
                                                              }}
                                                            />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                            >
                                Fermer
                            </button>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ModalAuthorization;