import React, { useState, useEffect, useRef, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarEvent } from '../api/CalendarEvent';
import { Meal, MealParams, useManyMeal, usePostMeal } from '../api/Meal';
import ModalMeal from '../components/ModalMeal';
import { Dialog, Transition } from '@headlessui/react';

const Meals = () => {
    const [open, setOpen] = useState(false)
  
    const cancelButtonRef = useRef(null)
    const [event, setEvent] = useState([])
    const { data : dataMeal } = useManyMeal()
    const meals : Meal[] = dataMeal?.data
    const [mealId, setMealId] = useState<number>()
    const [mealPost, setMealPost] = useState<MealParams>()

    const postMeal = usePostMeal()

    useEffect(() => {
        if(meals) {
            const events : CalendarEvent[] = []
            meals.forEach(meal => {
                const where_lunch = (meal.is_lunch === 0) ? 'du soir' : 'du midi' 
                let start = ""
                let end = ""

                if(meal.is_lunch === 1) {
                    start = "12:00"
                    end = "14:00"
                } else if(meal.is_lunch === 0) {
                    start = "19:00"
                    end = "21:00"
                }
    
                const event : CalendarEvent = {
                    title: 'Repas ' + where_lunch,
                    start: meal.day + " " + start,
                    end: meal.day + " " + end,
                    id: meal.id
                }            
                events.push(event)
            });
  
            setEvent(events)
        }
    },[meals])
      
    const handleEventClick = (info : EventClickArg) => {
        setMealId(parseInt(info.event.id))
    };

    const handleChange = (e : any) => {
        if(e.target.name === "is_lunch"){
            setMealPost({
                ...mealPost,
                    [e.target.name]: e.target.id === "is_lunch_0" ? 0 : 1,
                });
        } else {
            setMealPost({
                ...mealPost,
                    [e.target.name]: new Date(e.target.value),
                });
        }
    }

    const handleSubmit = () => {
        postMeal.mutate(mealPost)
        setOpen(false)
    }

    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:justify-center">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Création d'un menu
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className='flex flex-row justify-center gap-6 py-4'>
                                        <div className='flex flex-col'>
                                            <div className="relative flex items-center gap-3">
                                                <input
                                                    id={`is_lunch_1`}
                                                    name="is_lunch"
                                                    onChange={handleChange}
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
                                                />
                                                <div className="min-w-0 flex-1 text-sm leading-6">
                                                    <label htmlFor={`is_lunch_1`} className="select-none font-medium text-gray-900">
                                                        Repas du midi
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="relative flex items-center gap-3 py-4">
                                                <input
                                                id={`is_lunch_0`}
                                                name="is_lunch"
                                                type="radio"
                                                onChange={handleChange}
                                                className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
                                                />
                                                <div className="min-w-0 flex-1 text-sm leading-6">
                                                    <label htmlFor={`is_lunch_0`} className="select-none font-medium text-gray-900">
                                                        Repas du soir
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className="flex rounded-md bg-black/5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 sm:max-w-md">
                                                <input
                                                    type="date"
                                                    name="day"
                                                    onChange={handleChange}
                                                    id="day"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                            onClick={handleSubmit}
                        >
                            Créer
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Annluer
                        </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>

        <div className="flex justify-center flex-col">
    
          {/* Horaires de travail */}
          <div className="mt-8 max-h-lg">
            <div className='flex justify-between'>
                <h3 className="text-xl font-bold mb-4">Repas de la semaine</h3> 
                <button 
                    type='button'
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                        Nouveau menu
                </button>
            </div>
            {mealId && 
                <ModalMeal meal_id={mealId} />
            }
            {event && 
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                locale={'fr'}
                scrollTime={"10:00:00"}
                height={800}
                events={event}
                headerToolbar={{
                  start: 'prev,next',
                  center:'title',
                  end:"",
                }}
                eventClick={handleEventClick} 
                // eventContent={eventContent} 
              />
            }
          </div>
    
        </div>
      </div>
    );
};

export default Meals;

