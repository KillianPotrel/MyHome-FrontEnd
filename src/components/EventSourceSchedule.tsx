import React from 'react';
import { Schedule, useOneSchedule } from '../api/Schedule';

type EventSourceRenderProps = {
    source_id : number
}

const EventSourceSchedule = ({ source_id } : EventSourceRenderProps) : JSX.Element => {
    const { data: dateSchedule } = useOneSchedule(source_id)
    const schedule : Schedule = dateSchedule?.data
    console.log(schedule)

    return (
        <div>
            <hr className="my-3"/>
            <h3 className='font-semibold underline underline-offset-2'>Informations supplémentaires de l'horaire</h3>
            
            <ul role="list">
                <li className="px-4 py-2 sm:px-0 text-sm">
                    {schedule?.lunch_outside === 0 ? "Mange à la maison à midi" : "Mange dehors à midi"}
                </li>
                <li className="px-4 py-2 sm:px-0 text-sm">
                    {schedule?.evening_meal_outside === 0 ? "Mange à la maison ce soir" : "Mange dehors ce soir"}
                </li>
            </ul>
        </div>
    );
};

export default EventSourceSchedule;