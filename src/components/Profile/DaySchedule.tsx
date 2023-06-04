import React, { useState } from 'react';
import { Day } from '../../api/Day';
import { Schedule } from '../../api/Schedule';
import Switch from '../Switch';


type DayScheduleProps = {
    index: number,
    day : Day,
    schedule : Schedule,
    handleStateChange: any
  }
const DaySchedule = ({index, day, schedule, handleStateChange } : DayScheduleProps ):JSX.Element => {
    const [newSchedules, setSchedules] = useState<Schedule>({
            day: day.id
        })


    const handleChange = (e : any) => {
        const splited_target = (e.target.name).split('_')
        const id_day_target : number = splited_target[splited_target.length - 1]
        const property = e.target.name.replace("_"+id_day_target,"")
        // if(schedule?.day === undefined) {
        //     schedule.day = id_day_target
        // }
        if(property === "morning_hour_start" || property === "morning_hour_end" || 
            property === "afternoon_hour_start" || property === "afternoon_hour_end"){
                const date = new Date();
                date.setHours(e.target.value.split(':')[0]);
                date.setMinutes(e.target.value.split(':')[1]);
                setSchedules({
                    ...newSchedules,
                        [property]: date,})
        } else {
            
            // schedule = {
            // ...schedule,
            //     [property]: e.target.value,
            // };
        }
        handleStateChange(newSchedules)
    }

    return (    
        <div key={index} className='day-schedule  mb-5 mr-5'>
            {/* {{ const schedule = schedules.find((schedule : Schedule) => schedule.day == day.id) }} */}
            <div className='text-base font-semibold leading-7 text-center text-black '>
                {day?.label}
            </div>
            <div>
                <label htmlFor={"morning_hour_start_" + day.id} className="block text-sm font-medium leading-6 text-black">Matinée</label>
                <div className="flex">
                <input
                    type="time"
                    name={"morning_hour_start_" + day.id}
                    id={"morning_hour_start_" + day.id}
                    onChange={handleChange}
                    value={schedule?.morning_hour_start ? schedule.morning_hour_start.toLocaleTimeString() : "08:00"}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                    <input
                    type="time"
                    name={"morning_hour_end_" + day.id}
                    id={"morning_hour_end_" + day.id}
                    onChange={handleChange}
                    value={"12:00"}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor={"lunch_outside_" + day.id} className="block text-sm font-medium leading-6 text-black">Déjeuner dehors</label>
                <Switch 
                id={day.id} 
                category="evening_meal_outside" 
                isChecked={ false /*schedules.evening_meal_outside === 0 ? false : true*/ } 
                handleClick={() => {
                    const schedule : Schedule = {day: day.id}
                //   handleUpdate(schedule)
                }} />
            </div>
            <div>
                <label htmlFor={"afternoon_hour_start_" + day.id} className="block text-sm font-medium leading-6 text-black">Fin aprem</label>
                <div className="flex">  
                <input
                    type="time"
                    name={"afternoon_hour_start_" + day.id}
                    id={"afternoon_hour_start_" + day.id}
                    onChange={handleChange}
                    value={"14:00"}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />                           
                <input
                    type="time"
                    name={"afternoon_hour_end_" + day.id}
                    id={"afternoon_hour_end_" + day.id}
                    autoComplete="family-name"
                    onChange={handleChange}
                    value={"17:00"}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor={"evening_meal_outside_" + day.id} className="block text-sm font-medium leading-6 text-black">Dîner dehors</label>
                
                <Switch 
                id={day.id} 
                category="evening_meal_outside" 
                isChecked={ true /*schedules.evening_meal_outside === 0 ? false : true*/ } 
                handleClick={() => {
                    const schedule : Schedule = {day: day.id}
                //   handleUpdate(schedule)
                }} />
            </div>
        </div>
    )
}
export default DaySchedule;