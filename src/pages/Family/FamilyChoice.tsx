import React, {Fragment, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Family, ResponseInvitationArgs, useLeaveFamily, useManyFamilyByUser, useManyInvitationByUser, usePostResponseInvitation } from '../../api/Family';
import { accountService } from '../../services/account.service';
import FamilyCreate from './FamilyCreate';
import { usePostGenerateEventCalendar } from '../../api/EventCalendar';
import Skeleton from 'react-loading-skeleton';
import { Menu, Transition, Dialog } from "@headlessui/react";

const FamilyChoice = (): JSX.Element => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [familyId, setFamilyId] = useState(-1)
    const [familyName, setfamilyName] = useState("")
    const cancelButtonRef = useRef(null)

    const { data: dataFamilies, isLoading : isLoadingFamily } = useManyFamilyByUser()
    const families : Family[] | undefined = dataFamilies?.data

    const { data: dataInvitations, isLoading : isLoadingInvitations } = useManyInvitationByUser()
    const invitations : Family[] | undefined = dataInvitations?.data

    const usePostInvitation = usePostResponseInvitation()

    const generateEvent = usePostGenerateEventCalendar()

    const leaveFamily = useLeaveFamily()

    const handleConnectFamily = (id : number) => {
        accountService.saveFamily(id)
        generateEvent.mutate()
        navigate("/family/dashboard");
    }

    const handleSubmitInvitation = (args : ResponseInvitationArgs) => {
        usePostInvitation.mutate(args)
    }

    const handleModalLeaveFamily = (family_id : number, family_name : string) => {
        setFamilyId(family_id)
        setfamilyName(family_name)
        setOpen(true)
    }

    const handleLeaveFamily = () => {
        leaveFamily.mutate(familyId)
        setOpen(false)
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-2">
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
                                            Quitter la famille {familyName} ?
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Êtes-vous sûr de vouloir quitter cette famille ? Toutes vos données liées à cette famille seront définitivement supprimées de nos serveurs. 
                                                Cette action ne peut être annulée.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleLeaveFamily}
                                    >
                                        Quitter
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
            <div className="bg-white mx-2 mt-10 py-2 px-4 shadow sm:rounded-lg sm:px-10">
                <h2 className="text-xl font-bold font-medium text-gray-500">Vos familles</h2>
                
                {isLoadingFamily ? (
                    <div className='w-full'>
                        <Skeleton count={1} height={100}/>
                    </div>
                ) : (
                    <>
                        { families === undefined || families?.length === 0 ? 
                            <h1>Vous n'avez pas de famille</h1> 
                        :
                            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                {families.map((family : Family) => (
                                    <li key={family.id} className="col-span-1 flex rounded-md shadow-sm">
                                        <div className="flex flex-1 items-center justify-between rounded-md border border-gray-200 bg-white">
                                            <div className="flex-1 cursor-pointer truncate px-4 py-2 text-sm" onClick={() =>handleConnectFamily(family.id)}>
                                                <button className="rounded-full">
                                                    <p className="flex flex-row font-medium text-gray-900 hover:text-gray-600">
                                                        {family.name}
                                                    {/* <CursorArrowRaysIcon className='h-5 w-5' /> */}
                                                    </p>
                                                </button>
                                                <p className="text-gray-500">{family.nbMembres} membres</p>
                                            </div>
                                            <div className="flex-shrink-0 pr-2">
                                                <Menu as="div" className="relative ml-3">
                                                    <div>
                                                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                                                        <span className="sr-only">Open user menu</span>
                                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white 
                                                        py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <button
                                                                onClick={() => handleModalLeaveFamily(family?.id, family?.name)}
                                                                className={"w-full font-semibold text-red-500 h-full text-left block px-4 py-2 text-sm text-gray-700"}>
                                                                Quitter la famille
                                                            </button>
                                                        </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }
                    </>)
                }
            </div>

            <div className="bg-white mx-2 mt-10 py-2 px-4 shadow sm:rounded-lg sm:px-10">
                <h2 className="text-xl font-bold  font-medium text-gray-500">Vos invitations</h2>
                
                {isLoadingInvitations ? (
                    <div>
                        <Skeleton count={1} height={100}/>
                    </div>
                ) : (
                    <>
                        { invitations === undefined || invitations?.length === 0 ? 
                            <h1>Vous n'avez pas d'invitations</h1> 
                        :
                            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                {invitations.map((invitation : Family) => (
                                    <li key={invitation.id} className="col-span-1 flex rounded-md shadow-sm">
                                        <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
                                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                                <p className="font-medium text-gray-900 hover:text-gray-600">
                                                    Famille {invitation.name}
                                                </p>
                                                <button 
                                                    className="rounded-md mt-5 bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                    onClick={() => handleSubmitInvitation({family_id: invitation.id, accepted: 1})}>
                                                        Accepter
                                                </button>
                                                <button 
                                                    className="rounded-md mt-5 ml-4 bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                    onClick={() => handleSubmitInvitation({family_id: invitation.id, accepted: 0})}>
                                                        Refuser
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }
                    </>
                )}
            </div>
                
            <FamilyCreate />
        </div>
    );
};


export default FamilyChoice;