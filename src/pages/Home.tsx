import React from 'react';
import { useUserInfo } from '../api/User';
import { ArrowLeftOnRectangleIcon, LifebuoyIcon, ListBulletIcon, NewspaperIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { Meal, useManyMealToday } from '../api/Meal';
import { EventCalendar, useManyEventHousework } from '../api/EventCalendar';
import { ExitRequest, useManyExitRequest } from '../api/ExitRequest';
import { format } from '../_utils/FormatDate';

const cards = [
  {
    name: 'Sales',
    description: 'Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.',
    icon: PhoneIcon,
  },
  {
    name: 'Technical Support',
    description: 'Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Media Inquiries',
    description: 'Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.',
    icon: NewspaperIcon,
  },
]
const Home = () : JSX.Element=> {
  
  const { data : dataInfo } = useUserInfo()
  const user = dataInfo?.data

  const { data : dataHousework } = useManyEventHousework()
  const houseworks : EventCalendar[] = dataHousework?.data
  const { data : dataMeal } = useManyMealToday()
  const meals : Meal[] = dataMeal?.data
  console.log(meals)
  const { data : dataExitRequest } = useManyExitRequest("accepted")
  const exitRequests : ExitRequest[] = dataExitRequest?.data

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h1 className="text-4xl sm:text-6xl font-semibold text-gray-900">Bonjour {user?.name}</h1>
                    <p className="mt-6 text-lg leading-8">
                      Voici un résumé de ce qui vous concerne pour aujourd'hui.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">                  
                    <div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                        <ListBulletIcon className="h-7 w-7 flex-none text-amber-400" aria-hidden="true" />
                        <div className="text-base leading-7">
                            <h3 className="font-semibold">Vos tâches à faire</h3>
                            <div className="overflow-hidden">
                              {houseworks?.length > 0 
                                ?
                                <ul role="list" className="divide-y divide-gray-200">
                                  {houseworks?.map((item) => (
                                      <li key={item.id}>
                                        - {item.title}
                                      </li>
                                    ))}
                                </ul>
                                : <p>Aucunes tâches</p>}
                            </div>
                        </div>
                    </div>
                        
                    <div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                        <NewspaperIcon className="h-7 w-7 flex-none text-amber-400" aria-hidden="true" />
                        <div className="text-base leading-7">
                            <h3 className="font-semibold">Repas prévu aujourd'hui</h3>
                            <div className="overflow-hidden">
                              {meals?.length > 0 
                                ?
                                <ul role="list" className="divide-y divide-gray-200">
                                {meals?.map((meal) => (
                                  <div key={meal.id}>
                                    <li className="mt-3 font-semibold">{meal.is_lunch === 0 ? "Dîner :" : "Déjeuner :"}</li>
                                    {meal?.recipes?.map((recipe) => (
                                      <li key={recipe.id}>
                                        - {recipe.title}
                                      </li>
                                    ))}
                                    {meal?.recipes_custom?.map((recipe) => (
                                      <li key={recipe.id}>
                                        - {recipe.title}
                                      </li>
                                    ))}
                                  </div>
                                ))}
                                </ul>
                                : <p>Aucuns repas</p>}
                            </div>
                        </div>
                    </div>
                        
                    <div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                        <ArrowLeftOnRectangleIcon className="h-7 w-7 flex-none text-amber-400" aria-hidden="true" />
                        <div className="text-base leading-7">
                            <h3 className="font-semibold">Sortie d'enfant prévu</h3>
                            <div className="overflow-hidden">
                              {houseworks?.length > 0 
                                ?
                                <ul role="list" className="divide-y divide-gray-200">
                                  {exitRequests?.map((item) => (
                                      <li key={item?.id} className=''>
                                        <p>{item?.user.firstname}</p>
                                        <p>De {format(item?.date_debut)}</p> 
                                        <p>À {format(item?.date_fin)}</p>
                                      </li>
                                    ))}
                                </ul>
                                : <p>Aucunes sorties</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;