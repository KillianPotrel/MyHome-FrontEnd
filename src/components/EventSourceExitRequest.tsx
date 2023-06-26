import React from 'react';
import { ExitRequest, useOneExitRequest } from '../api/ExitRequest';
type EventSourceRenderProps = {
    source_id : number
}

const EventSourceExitRequest = ({ source_id } : EventSourceRenderProps) : JSX.Element => {
    const { data: dateExitRequest } = useOneExitRequest(source_id)
    const exitRequest : ExitRequest = dateExitRequest?.data
    console.log(exitRequest)

    return (
        <div>
            <hr className="my-3"/>
            <h3 className='font-semibold underline underline-offset-2'>Informations supplémentaires de la demande de sortie</h3>
            <ul role="list">
                <li className="px-4 py-2 sm:px-0 text-sm">
                    <div className='flex flex-row'>
                        <p className='underline underline-offset-2'>Motif</p>
                        <p> : {exitRequest?.motif}</p>
                    </div>
                </li>
                <li className="px-4 py-2 sm:px-0 text-sm">
                    Accepté par {exitRequest?.userResponse}
                </li>
            </ul>
        </div>
    );
};

export default EventSourceExitRequest;