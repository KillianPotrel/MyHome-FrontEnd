import React from 'react';
import { ExitRequest, useManyExitRequest, useResponseExitRequest } from '../api/ExitRequest';
import { format } from '../_utils/FormatDate';

  
const TableExitRequest = () => {
    const { data: dataExitRequests } = useManyExitRequest("waiting")
    const exitRequests : ExitRequest[] = dataExitRequests?.data

    const responseExitRequest = useResponseExitRequest()

    const handleSubmit = (exit_request_id : number, accepted : number) => {
        const param = {
            exit_request_id,
            accepted,
        }
        responseExitRequest.mutate(param)
    }

    return (
    <div className="mx-auto px-10 sm:px-6 lg:px-8">
        <hr className="my-5"/>
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Liste des demandes de sorties</h1>
                <p className="mt-2 text-sm text-gray-700">
                Autoriser ou refuser les demandes de sorties des membres.
                </p>
            </div>
        </div>
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Membre
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date de sortie
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date de retour
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Raison
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Action</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {(exitRequests !== undefined || exitRequests?.length > 0) && 
                            exitRequests.map((exitRequest : ExitRequest) => (
                            <tr key={exitRequest.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {exitRequest.user.firstname}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(exitRequest.date_debut)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(exitRequest.date_fin)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <p className="whitespace-normal break-words">{exitRequest.motif}</p></td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button
                                        type="submit"
                                        onClick={() => handleSubmit(exitRequest.id, 1)}
                                        className="mx-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
                                    >
                                        Autoriser
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => handleSubmit(exitRequest.id, 0)}
                                        className="mx-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                    >
                                        Refuser
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    
                    {(exitRequests === undefined || exitRequests?.length === 0) && 
                        <p className="text-center mt-4 text-lg leading-8 text-gray-600">Aucune demandes de sorties en attentes</p>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default TableExitRequest;

