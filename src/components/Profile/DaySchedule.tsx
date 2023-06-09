import React from 'react';
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

    const handleChange = (e : any) => {
        let tempSchedule : Schedule = {day_id : day.id}

        const splited_target = (e.target.name).split('_')
        const id_day_target : number = splited_target[splited_target.length - 1]
        let property = e.target.name.replace("_"+id_day_target,"")

        if(property === "morning_hour_start" || property === "morning_hour_end" || 
            property === "afternoon_hour_start" || property === "afternoon_hour_end"){
                tempSchedule = {...tempSchedule, [property]: e.target.value}
        } else {
            property = property.replace('switch_','')
            tempSchedule = { ...tempSchedule, [property]: e.target.checked ? 1 : 0 };
        }
        handleStateChange(tempSchedule)
    }

    return (    
        <div key={index} className='day-schedule  mb-5 mr-5'>
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
                    value={schedule?.morning_hour_start ? schedule?.morning_hour_start : ""}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                    <input
                    type="time"
                    name={"morning_hour_end_" + day.id}
                    id={"morning_hour_end_" + day.id}
                    onChange={handleChange}
                    value={schedule?.morning_hour_end ? schedule?.morning_hour_end : ""}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor={"lunch_outside_" + day.id} className="block text-sm font-medium leading-6 text-black">Déjeuner dehors</label>
                <Switch 
                    id={day.id} 
                    category="lunch_outside" 
                    isChecked={schedule?.lunch_outside === undefined || schedule?.lunch_outside === 0 ? false : true} 
                    handleClick={handleChange} />
            </div>
            <div>
                <label htmlFor={"afternoon_hour_start_" + day.id} className="block text-sm font-medium leading-6 text-black">Fin aprem</label>
                <div className="flex">  
                <input
                    type="time"
                    name={"afternoon_hour_start_" + day.id}
                    id={"afternoon_hour_start_" + day.id}
                    onChange={handleChange}
                    value={schedule?.afternoon_hour_start  ? schedule?.afternoon_hour_start : ""}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />                           
                <input
                    type="time"
                    name={"afternoon_hour_end_" + day.id}
                    id={"afternoon_hour_end_" + day.id}
                    autoComplete="family-name"
                    onChange={handleChange}
                    value={schedule?.afternoon_hour_end ? schedule?.afternoon_hour_end : ""}
                    className="block rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor={"switch_evening_meal_outside_" + day.id} className="block text-sm font-medium leading-6 text-black">Dîner dehors</label>
                
                <Switch 
                    id={day.id} 
                    category="evening_meal_outside" 
                    isChecked={ !schedule?.evening_meal_outside || schedule?.evening_meal_outside === 0  ? false : true } 
                    handleClick={handleChange } />
            </div>
        </div>
    )
}
export default DaySchedule;