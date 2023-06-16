import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarEvent } from '../api/CalendarEvent';
import { Meal, useManyMeal } from '../api/Meal';
import ModalMeal from '../components/ModalMeal';

const Meals = () => {
    const [event, setEvent] = useState([])
    const { data : dataMeal } = useManyMeal()
    const meals : Meal[] = dataMeal?.data
    const [mealId, setMealId] = useState<number>()

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

    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-12 flex justify-center flex-col">
    
          {/* Horaires de travail */}
          <div className="mt-8 max-h-lg">
            <h3 className="text-xl font-bold mb-4">Repas de la semaine</h3> 
            
            <button 
                type='button'
                // onClick={() => handleRegenerate(recipe.id, 1)}
                className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Nouveau menu
            </button>
            <ModalMeal meal_id={mealId} />
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

