import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAuthorization from '../components/ModalAuthorization';
import { Permission, useManyPermission } from '../api/Permission';
import { Member, useManyMembersByFamily } from '../api/Family';
import TableExitRequest from '../components/TableExitRequest';
import { format } from '../_utils/FormatDate';

  
const FamilyMember = (): JSX.Element => {
    let navigate = useNavigate();
    const { data : dataPermissions } = useManyPermission()
    const { data : dataMembers } = useManyMembersByFamily()
    
    const members : Member[] | undefined = dataMembers?.data
    const permissions : Permission[] | undefined = dataPermissions?.data
    
    return (
        <>
            <div className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Membres de votre famille</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Gérer les accès ou consulter en détail les infomations de vos proches sur leurs profils.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {(members !== undefined || members?.length > 0) && members.map((member) => (
                    <li key={member.id}>
                        <img className="mx-auto h-56 w-56 rounded-full" src={member.avatar ?? "../images/avatar_family.svg"} alt="" />
                        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{member.name}</h3>
                        <p className="text-sm leading-6 text-gray-600">{format(member.birthday.toDateString)}</p>
                        
                        <ul role="list" className="mt-6 flex justify-center gap-x-6">
                        <li>
                            <ModalAuthorization permissions={permissions} user_id={member.id} />
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => navigate(`/member/${member.id}`)}
                                className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </li>
                        </ul>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            <TableExitRequest />
        </>
    )
  }
  

export default FamilyMember;