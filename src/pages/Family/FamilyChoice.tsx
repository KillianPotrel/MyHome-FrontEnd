import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Family, ResponseInvitationArgs, useManyFamilyByUser, useManyInvitationByUser, usePostResponseInvitation } from '../../api/Family';
import { accountService } from '../../services/account.service';
import FamilyCreate from './FamilyCreate';
import { usePostGenerateEventCalendar } from '../../api/EventCalendar';
import Skeleton from 'react-loading-skeleton';

const FamilyChoice = (): JSX.Element => {
    const navigate = useNavigate();
    const { data: dataFamilies, isLoading : isLoadingFamily } = useManyFamilyByUser()
    const families : Family[] | undefined = dataFamilies?.data

    const { data: dataInvitations, isLoading : isLoadingInvitations } = useManyInvitationByUser()
    const invitations : Family[] | undefined = dataInvitations?.data

    const usePostInvitation = usePostResponseInvitation()

    const generateEvent = usePostGenerateEventCalendar()

    const handleConnectFamily = (id : number) => {
        accountService.saveFamily(id)
        generateEvent.mutate()
        navigate("/family/dashboard");
    }

    const handleSubmitInvitation = (args : ResponseInvitationArgs) => {
        usePostInvitation.mutate(args)
    }

    return (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-2">
            <div className="bg-white mt-10 py-2 px-4 shadow sm:rounded-lg sm:px-10">
                <h2 className="text-xl font-bold font-medium text-gray-500">Vos familles</h2>
                
                {isLoadingFamily ? (
                    <div className='w-full'>
                        <Skeleton count={1} height={100}/>
                    </div>
                ) : (
                    <>
                { families === undefined || families?.length === 0 ? 
                    <h1>no family</h1> 
                :
                    <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {families.map((family : Family) => (
                            <li key={family.id} className="col-span-1 flex rounded-md shadow-sm">
                                <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
                                    <div className="flex-1 truncate px-4 py-2 text-sm">
                                        <button className="rounded-full" onClick={() =>handleConnectFamily(family.id)}>
                                            <p className="font-medium text-gray-900 hover:text-gray-600">
                                                {family.name}
                                            </p>
                                        </button>
                                        <p className="text-gray-500">{family.nbMembres} membres</p>
                                    </div>
                                    <div className="flex-shrink-0 pr-2">
                                        <button
                                        type="button"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                        >
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    }
                    </>)}
                </div>

                <div className="bg-white mt-10 py-2 px-4 shadow sm:rounded-lg sm:px-10">
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