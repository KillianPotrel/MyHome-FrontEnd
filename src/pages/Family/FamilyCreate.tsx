import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserGroupIcon } from '@heroicons/react/20/solid';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Role, useManyRole } from '../../api/Role';
import { Member, usePostCreateFamily } from '../../api/Family';
import { useNavigate } from 'react-router';
import { errorToast } from '../../services/toastify.service';


const FamilyCreate = (): JSX.Element => {
    const [open, setOpen] = useState(false)
    const [familyName, setFamilyName] = useState("")
    const [members, setMember] = useState<Member[]>([])
    const { data: dataRoles } = useManyRole()
    const roles : Role[] | undefined = dataRoles?.data
    const usePostFamily = usePostCreateFamily()
    const navigate = useNavigate();

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (usePostFamily.isSuccess) {
          navigate("/family/dashboard");
        }
      }, [usePostFamily,navigate]);

    const handleAddMember = () => {
        setMember([...members, {email:"", role:1}]);
    };

    const handleRemoveMember = (index : number) => {
        let newMembers = [...members];
        newMembers.splice(index, 1);

        setMember(newMembers);
    };

    const handleMemberChange = (index : number, event : any) => {
        const newMember = [...members];
        if(event.target.id === "email")
            newMember[index].email = event.target.value;
        else if(event.target.id === "role"){
            newMember[index].role = event.target.value;
        }
        
        setMember(newMember);
    };

    const handleFamilyNameChange = (event : any) => {
        setFamilyName(event.target.value);
    };

    const handleSubmitFamily = () => {
        if(familyName === undefined || familyName === ""){
            errorToast("Veuillez remplir le nom de la famille");
            return 
        }

        let error_member = false;

        members.forEach(member => {
            if(member.email === undefined || member.email === "" || !member.email.includes("@")){
                errorToast("L'un des membres n'est pas correctement renseigné");
                error_member = true 
            }
        });

        if(error_member)
            return

        usePostFamily.mutate({
            family_name: familyName, 
            members: members
        })
        setOpen(false)
    }

  return (
    <>
    <div className="bg-white mx-2 mt-10 py-2 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-xl font-bold  font-medium text-gray-500">Créer sa famille</h2>
        <div className="flex justify-center mt-5">
            <button
                type="button"
                className="rounded-md mt-5 bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                onClick={() => setOpen(true)}
            >
                Je la créée !
            </button>
        </div>
    </div>
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
                    <UserGroupIcon className="h-6 w-6 text-amber-600" aria-hidden="true"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Formulaire de création de la famille
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Veuillez remplir tous les champs avec les membres que vous souhaitez invitez au sein de votre famille.
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="family-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom de la famille
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="family-name"
                                id="family-name"
                                value={familyName}
                                onChange={handleFamilyNameChange}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-amber-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {members.map((member, index) => (
                            <div key={index} className="col-span-full">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            onChange={(event) => handleMemberChange(index, event)}
                                            value={member.email}
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-amber-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                            Rôle
                                        </label>
                                        <div className="mt-2">
                                            <select
                                            id="role"
                                            name="role"
                                            onChange={(event) => handleMemberChange(index, event)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-amber-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                {roles.map((role, index) => (
                                                    <option id={ role.id.toString()} value={ role.id } key={index}>{role.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    
                                    <div className="mt-8 sm:col-span-1">
                                        <button
                                            type="button"
                                            className="rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                            onClick={() => handleRemoveMember(index)}
                                        >
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    
                        </div>
                        <div className="flex justify-center mt-5">
                            <button
                                type="button"
                                className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                onClick={handleAddMember}
                            >
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:col-start-2"
                    onClick={() => handleSubmitFamily()}
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
    </>
  )
}

export default FamilyCreate;