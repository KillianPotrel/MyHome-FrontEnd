import React from 'react';
import '../../style/schedule_user.css'
import Switch from '../Switch';

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

type ScheduleType = {
  id?: number,
  day: string,
  morning_hour_start?: Date,
  morning_hour_end?: Date, 
  afternoon_hour_start?: Date,
  afternoon_hour_end?: Date,
  lunch_outside?: boolean,
  evening_meal_outside?: boolean,
}

type DaySchedule = {
  day: string,
}

const Schedule = ():JSX.Element => {
    const day_value : DaySchedule[] = [{
        day: "Lundi",
      },{
        day: "Mardi",
      },{
        day: "Mercredi",
      },{
        day: "Jeudi",
      },{
        day: "Vendredi",
      },{
        day: "Samedi",
      },{
        day: "Dimanche",
      }]


    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-black">Horaire</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Renseigner vos horaires de travail ainsi que les jours auxquels vous mangerez à la maison.
            </p>
          </div>

          <div className="px-4  col-span-2 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="flex flex-wrap flex-row place-content-around table-schedule">
                    {day_value.map((item) => (
                      <div className='day-schedule  mb-5 mr-5'>
                        <div className='text-base font-semibold leading-7 text-center text-black '>
                          {item.day}
                        </div>
                        <div>
                          <label htmlFor="morning_hour_start" className="block text-sm font-medium leading-6 text-black">Matinée</label>
                          <div className="flex">
                            <input
                              type="time"
                              name="morning_hour_start"
                              id="morning_hour_start"
                              className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                              />
                              <input
                                type="time"
                                name="morning_hour_end"
                                id="morning_hour_end"
                                className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                                />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lunch_outside" className="block text-sm font-medium leading-6 text-black">Manger midi</label>
                          <Switch />
                        </div>
                        <div>
                          <label htmlFor="afternoon_hour_end" className="block text-sm font-medium leading-6 text-black">Fin aprem</label>
                          <div className="flex">  
                            <input
                              type="time"
                              name="afternoon_hour_start"
                              id="afternoon_hour_start"
                              className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                              />                           
                            <input
                                type="time"
                                name="afternoon_hour_end"
                                id="afternoon_hour_end"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                                />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="evening_meal_outside" className="block text-sm font-medium leading-6 text-black">Manger soir</label>
                          <Switch />
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>

          <form className="flex items-start md:col-span-2">
            
            <button 
                className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Sauvegarder
            </button>
          </form>
        </div>
    );
};

export default Schedule;