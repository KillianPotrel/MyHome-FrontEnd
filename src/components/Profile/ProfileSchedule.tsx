import React, { useEffect, useState } from 'react';
import '../../style/schedule_user.css'
import Switch from '../Switch';
import { Day, useManyDay } from '../../api/Day';
import { Schedule, useManySchedule } from '../../api/Schedule';
import DaySchedule from './DaySchedule';

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

type DaySchedule = {
  day: string,
}

const ProfileSchedule = ():JSX.Element => {
    const {data: dataDay } = useManyDay()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const days : Day[] = dataDay?.data
    const { data: dataWarning } = useManySchedule()
    const schedulesData : Schedule[] = dataWarning?.data

    useEffect(() => {
      setSchedules(schedulesData)
    }, [dataWarning])

    const handleChange = (e : any) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const trouve = false 
        const splited_target = (e.target.name).split('_')
        const id_day_target : number = splited_target[splited_target.length - 1]
        console.log(id_day_target)
        // schedules.forEach(schedule => {
        //   const splited_target = (e.target.name).split('_')
        //   const id_day_target : number = splited_target[splited_target.length - 1]
        //   console.log(id_day_target)
        //   //if(schedule.day === e.target.name)
        // });
    };

    const handleChildStateChange = (newSchedule : Schedule) => {
      console.log(newSchedule)
      const tempSchedules = schedules
      console.log(schedules.some(item => item.day === newSchedule.day))
      if(!schedules.some(item => item.day === newSchedule.day)){
        tempSchedules.push(newSchedule)
      } else {
        tempSchedules.forEach(schedule => {
          if(schedule.day === newSchedule.day){
            schedule = newSchedule
          }
        });
      }

      console.log(tempSchedules)
      setSchedules(tempSchedules);
    };

    const handleSubmit = () => {

    }

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-black">Horaire</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Renseigner vos horaires de travail ainsi que les jours auxquels vous mangerez à la maison.
            </p>
          </div>

          <div className="col-span-2 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="flex flex-wrap flex-row place-content-around table-schedule">
                    {(days !== undefined || days?.length > 0) && 
                      days.map((day : Day, index : any) => (
                        <div key={index}>
                          <DaySchedule index={index} day={day} schedule={schedules?.find(x => x.day == day.id)} handleStateChange={handleChildStateChange} />
                   
                        </div> 
                      ))}
                  </div>
                <form className="flex items-start col-start-2">
                  
                  <button 
                      className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                          Sauvegarder
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
    );
};

export default ProfileSchedule;