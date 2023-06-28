import React from 'react';
import { Meal, useOneMeal } from '../api/Meal';
import { Link } from 'react-router-dom';
import { CursorArrowRaysIcon } from '@heroicons/react/20/solid';
type EventSourceRenderProps = {
    source_id : number
}

const EventSourceMeal = ({ source_id } : EventSourceRenderProps) : JSX.Element => {
    
    const { data: dataMeal } = useOneMeal(source_id)
    const meal : Meal = dataMeal?.data

    return (
        <div>
            <hr className="my-3"/>
            <h3 className='font-semibold underline underline-offset-2'>Informations supplémentaires du repas</h3>
            <div className='w-full flex justify-center mt-2 font-semibold'>
                {meal?.is_lunch 
                    ? <p>Liste des recettes du midi</p>
                    : <p>Liste des recettes du soir</p>
                }
            </div>
            {(meal?.recipes.length === 0 && meal?.recipes_custom.length === 0) && <p className='text-sm'>Pas de recette prévu</p>}
            <ul role="list">
                {meal?.recipes.map((item) => (
                    <li key={item.title} className="flex justify-between px-4 py-2 sm:px-0 text-sm">
                        {item.title}
                        
                        <Link to={'/family/recipe/'+item.id}
                            className="rounded-md bg-amber-600 px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                            Recette
                        </Link>
                    </li>
                ))}
                {meal?.recipes_custom.map((item) => (
                    <li key={item.title} className="px-4 py-2 sm:px-0 text-sm">
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventSourceMeal;