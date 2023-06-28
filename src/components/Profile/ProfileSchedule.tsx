import React, { useEffect, useState } from 'react';
import '../../style/schedule_user.css'
import { Day, useManyDay } from '../../api/Day';
import { Schedule, useManySchedule, usePostSchedule } from '../../api/Schedule';
import DaySchedule from './DaySchedule';
import { errorToast } from '../../services/toastify.service';

type DaySchedule = {
  day: string,
}

const ProfileSchedule = ():JSX.Element => {
    const {data: dataDay } = useManyDay()
    const { data: dataSchedules } = useManySchedule()
    const schedulesData : Schedule[] = dataSchedules?.data
    const [schedules, setSchedules] = useState<Schedule[]>(schedulesData || [])
    const days : Day[] = dataDay?.data

    const postSchedules = usePostSchedule()

    useEffect(() => {
      if (schedulesData) {
        setSchedules(schedulesData)
      }
    }, [dataSchedules])

    const handleChildStateChange = (newSchedule : Schedule) => {
      const updatedSchedules = [...schedules];
      const existingSchedule = updatedSchedules.find(item => item?.day_id === newSchedule.day_id);
  
      if (existingSchedule) {
        Object.assign(existingSchedule, newSchedule);
      } else {
        updatedSchedules.push(newSchedule);
      }
  
      setSchedules(updatedSchedules);
    };

    const handleSubmit = () => {
      let flagerror = false 
      schedules.forEach(schedule => {
        if(schedule.morning_hour_start > schedule.morning_hour_end || 
          schedule.afternoon_hour_start > schedule.afternoon_hour_end ){
            flagerror = true
          }
      });

      if(flagerror){
        errorToast("Les horaires renseignés ne sont pas valides");
      } else {
        postSchedules.mutate(schedules)
      }
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
                          <DaySchedule 
                            index={index} 
                            day={day} 
                            schedule={schedules?.find(x => x?.day_id === day.id)} 
                            handleStateChange={handleChildStateChange} />
                        </div> 
                      ))}
                  </div>
                  
                <button 
                    type='button'
                    className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    onClick={handleSubmit}>
                        Sauvegarder
                </button>
              </div>
            </div>
          </div>

        </div>
    );
};

export default ProfileSchedule;