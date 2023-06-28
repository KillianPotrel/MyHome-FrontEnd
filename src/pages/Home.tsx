import React from 'react';
import { useUserInfo } from '../api/User';
import { ArrowLeftOnRectangleIcon, ListBulletIcon, NewspaperIcon } from '@heroicons/react/20/solid'
import { Meal, useManyMealToday } from '../api/Meal';
import { EventCalendar, useManyEventHousework } from '../api/EventCalendar';
import { ExitRequest, useManyExitRequest } from '../api/ExitRequest';
import { format } from '../_utils/FormatDate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () : JSX.Element=> {
  
  const { data : dataInfo, isLoading: isLoadingUser } = useUserInfo()
  const user = dataInfo?.data

  const { data : dataHousework, isLoading: isLoadingHousework } = useManyEventHousework()
  const houseworks : EventCalendar[] = dataHousework?.data

  const { data : dataMeal, isLoading: isLoadingMeal } = useManyMealToday()
  const meals : Meal[] = dataMeal?.data
  
  const { data : dataExitRequest, isLoading: isLoadingExitRequest } = useManyExitRequest("accepted")
  const exitRequests : ExitRequest[] = dataExitRequest?.data

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {isLoadingUser || isLoadingHousework || isLoadingMeal || isLoadingExitRequest ? (
        <div className='mt-10'>
          <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
          <Skeleton count={5} />
        </div>
      ) : (
        <div className="relative isolate overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h1 className="text-4xl sm:text-6xl font-semibold text-gray-900">Bonjour {user?.firstname}</h1>
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
                                <ul role="list" className="mt-5">
                                  {houseworks?.map((item) => (
                                      <li key={item.id}>
                                        <div
                                          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                                        >
                                          <div className="min-w-0 flex-1">
                                              <span className="absolute inset-0" aria-hidden="true" />
                                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                          </div>
                                        </div>
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
                                <ul role="list" className="mt-5">
                                {meals?.map((meal) => (
                                  <li key={meal.id}>
                                    {(meal?.recipes.length + meal?.recipes_custom.length) > 0 &&
                                      <>
                                        <div
                                          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                                        >
                                          <div className="min-w-0 flex-1">
                                              <span className="absolute inset-0" aria-hidden="true" />
                                              <p className="text-sm font-medium text-gray-900">{meal.is_lunch === 0 ? "Dîner :" : "Déjeuner :"}</p>
                                              {meal?.recipes?.map((recipe) => (
                                              <p key={recipe.id} className="truncate text-sm text-gray-500">{recipe.title}</p>
                                                // <li key={recipe.id}>
                                                //   - {recipe.title}
                                                // </li>
                                              ))}
                                              {meal?.recipes_custom?.map((recipe) => (
                                              <p key={recipe.id} className="truncate text-sm text-gray-500">{recipe.title}</p>
                                                // <li key={recipe.id}>
                                                //   - {recipe.title}
                                                // </li>
                                              ))}
                                          </div>
                                        </div>
                                          {/* <li className="mt-3 font-semibold">{meal.is_lunch === 0 ? "Dîner :" : "Déjeuner :"}</li>
                                          {meal?.recipes?.map((recipe) => (
                                            <li key={recipe.id}>
                                              - {recipe.title}
                                            </li>
                                          ))}
                                          {meal?.recipes_custom?.map((recipe) => (
                                            <li key={recipe.id}>
                                              - {recipe.title}
                                            </li>
                                          ))} */}
                                      </>
                                    }
                                  </li>
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
                              {exitRequests?.length > 0 
                                ?
                                <ul role="list" className="mt-5">
                                {exitRequests?.map((item) => (
                                      <li key={item?.id} className='mb-2'>
                                          <div
                                            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                                          >
                                            <div className="min-w-0 flex-1">
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                <p className="text-sm font-medium text-gray-900">{item?.user.firstname}</p>
                                                <p className="truncate text-sm text-gray-500">De {format(item?.date_debut)}</p>
                                                <p className="truncate text-sm text-gray-500">À {format(item?.date_fin)}</p>
                                            </div>
                                          </div>
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
    )}
    </div>
  );
};

export default Home;