import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAuthorization from '../components/ModalAuthorization';
import { Permission, useManyPermission } from '../api/Permission';
import { Member, useManyMembersByFamily } from '../api/Family';
import TableExitRequest from '../components/TableExitRequest';
import { format } from '../_utils/FormatDate';
import { accountService } from '../services/account.service';
import PermissionGates from '../_utils/PermissionGates';
import ModalInviteUser from '../components/ModalInviteUser';
import Skeleton from 'react-loading-skeleton';

  
const FamilyMember = (): JSX.Element => {
    let navigate = useNavigate();
    const { data : dataPermissions, isLoading : isLoadingPermission } = useManyPermission()
    const permissions : Permission[] | undefined = dataPermissions?.data
    
    const { data : dataMembers, isLoading : isLoadingMember } = useManyMembersByFamily()
    const members : Member[] | undefined = dataMembers?.data

    const handleClickRedirect = async (member_id : number) => {
        const isCurrentUser = await accountService.isMe(member_id);

        if (isCurrentUser) {
          navigate('/profile')
        } else {
            navigate('/family/member/' + member_id)
        }
    }

    return (
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            {isLoadingMember || isLoadingPermission ? (
              <div className='mt-10'>
                <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
                <Skeleton count={5} />
              </div>
            ) : (
                <>
                    <div className='mt-5 flex justify-end'>
                        <ModalInviteUser />
                    </div>
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
                        {(members !== undefined) && members.map((member) => (
                        <li key={member.id}>
                            <img className="mx-auto h-56 w-56 rounded-full object-cover" 
                                src={member?.avatar ?? "../images/avatar_family.svg" /*member.avatar*/} alt="" />
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{member.name}</h3>
                            <p className="text-sm leading-6 text-gray-600">{member?.birthday !== undefined && format(member?.birthday)}</p>
                            
                            <ul role="list" className="mt-6 flex justify-center gap-x-6">
                                <PermissionGates permission_key='gerer_les_permissions'>
                                    <li>
                                        <ModalAuthorization permissions={permissions} user_id={member.id} />
                                    </li>
                                </PermissionGates>
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleClickRedirect(member.id)
                                        }
                                        className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                    >
                                        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </li>
                            </ul>
                        </li>
                        ))}
                    </ul>
                <PermissionGates permission_key='accepter_les_demandes_de_sorties'>
                    <TableExitRequest />
                </PermissionGates>
            </>
            )}
        </div>
            
    )
  }
  

export default FamilyMember;