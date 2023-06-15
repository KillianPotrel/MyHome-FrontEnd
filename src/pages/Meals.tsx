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

    // const meals : Meal[] =  [
    //     {
    //         id: 10,
    //         family_id: 1,
    //         jour: "2023-06-13",
    //         is_lunch: 1,
    //         recipes: [],
    //         recipes_custom: [
    //             {
    //                 id: 1,
    //                 title: "macdo",
    //                 pivot: {
    //                     menu_id: 10,
    //                     recipe_custom_id: 1
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         id: 11,
    //         family_id: 1,
    //         jour: "2023-06-11",
    //         is_lunch: 1,
    //         recipes: [],
    //         recipes_custom: [
    //             {
    //                 id: 2,
    //                 title: "macdo v2",
    //                 pivot: {
    //                     menu_id: 11,
    //                     recipe_custom_id: 2
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         id: 12,
    //         family_id: 1,
    //         jour: "2023-06-12",
    //         is_lunch: 0,
    //         recipes: [
    //             {
    //                 id: 2,
    //                 title: "pate bolo",
    //                 category_id: null,
    //                 cooking_time: null,
    //                 preparation_time: null,
    //                 difficulty: null,
    //                 image: null,
    //                 family_id: 1,
    //                 warning_user: [
    //                     "Kiwim n'aime pas : pic & croque"
    //                 ],
    //                 pivot: {
    //                     menu_id: 12,
    //                     recipe_id: 2
    //                 },
    //                 recipe_articles: [
    //                     {
    //                         id: 2,
    //                         recipe_id: 2,
    //                         article_id: 15649,
    //                         article_custom: null,
    //                         quantity: 1256,
    //                         unit: "Brin",
    //                         product_name: "Kiwi"
    //                     },
    //                     {
    //                         id: 3,
    //                         recipe_id: 2,
    //                         article_id: null,
    //                         article_custom: 2,
    //                         quantity: 2,
    //                         unit: "Brin",
    //                         product_name: "pic & croque"
    //                     }
    //                 ]
    //             }
    //         ],
    //         recipes_custom: []
    //     }
    // ]

    useEffect(() => {
        console.log(meals)
        if(meals) {
            const events : CalendarEvent[] = []
            meals.forEach(meal => {
                const where_lunch = (meal.is_lunch === 0) ? 'du midi' : 'du soir'
                let start = ""
                let end = ""

                if(meal.is_lunch === 1) {
                    start = "19:00"
                    end = "21:00"
                } else if(meal.is_lunch === 0) {
                    start = "12:00"
                    end = "14:00"
                }
    
                const event : CalendarEvent = {
                    title: 'Repas ' + where_lunch,
                    start: meal.jour + " " + start,
                    end: meal.jour + " " + end,
                    id: meal.id
                }            
                events.push(event)
            });
  
            setEvent(events)
        }
    },[])

    // const event : CalendarEvent[] = [{
    //     title: "Repas",
    //     start: "2023-06-14 12:00",
    //     end: "2023-06-14 14:00",
    //   }    ]
      
    // const event : CalendarEvent[] = [{ 
    //         // id: 1, 
    //         title: 'Événement 1', 
    //         start: "2023-06-14 12:00",
    //         end: "2023-06-14 14:00", 
    //     },
    //     { 
    //         // id: 2,
    //         title: 'Événement 2', 
    //         start: "2023-06-14 12:00",
    //         end: "2023-06-14 14:00", 
    //     }];

    // const eventContent = ({ event } : any) => {
    //     return (
    //     <div>
    //         <strong>{event.title}</strong>
    //         <div>ID: {event.id}</div>
    //         <div>Catégorie: {event.category}</div>
    //     </div>
    //     );
    // };
      
    const handleEventClick = (info : EventClickArg) => {
        setMealId(parseInt(info.event.id))
    };

    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-12 flex justify-center flex-col">
    
          {/* Horaires de travail */}
          <div className="mt-8 max-h-lg">
            <h3 className="text-xl font-bold mb-4">Repas de la semaine</h3>
            <ModalMeal meal_id={mealId} />
            {event && 
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                locale={'fr'}
                // headerToolbar={
                //   left: 'prev,next',
                //   center: 'title',
                //   right: 'timeGridWeek,timeGridDay' // user can switch between the two
                // }
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

