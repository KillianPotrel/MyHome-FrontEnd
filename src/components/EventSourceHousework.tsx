import React from 'react';
import { Housework, useOneHousework } from '../api/Housework';
import { Day, useManyDay } from '../api/Day';
type EventSourceRenderProps = {
    source_id : number
}

const EventSourceHousework = ({ source_id } : EventSourceRenderProps) : JSX.Element => {
    const { data: dataHousework } = useOneHousework(source_id)
    const housework : Housework = dataHousework?.data
    const { data: dataDay } = useManyDay()
    const days : Day[] = dataDay?.data

    return (
        <div>
            {housework?.periodicity &&
            <div>
                <hr className="my-3"/>
                <h3 className='font-semibold underline underline-offset-2'>Informations supplémentaires de la tâche ménagère</h3>
                <ul role="list">
                    <li className="px-4 py-2 sm:px-0 text-sm">
                        <div className='flex flex-row'>
                            <p className='underline underline-offset-2'>Jour</p>
                            <p> :  {days?.find(item => item.id === housework?.day_id)?.label}</p>
                        </div>
                    </li>
                    <li className="px-4 py-2 sm:px-0 text-sm">
                        <div className='flex flex-row'>
                            <p className='underline underline-offset-2'>Périodicité</p>
                            <p> : {housework?.periodicity}{housework?.periodicity > 1 ? " jours" : " jour" }</p>
                        </div>
                    </li>
                </ul>
            </div>
            }
        </div>
    );
};

export default EventSourceHousework;