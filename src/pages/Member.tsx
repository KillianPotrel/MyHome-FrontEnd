import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, useUserInfo } from '../api/User';
import { format } from '../_utils/FormatDate';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ArticleWarning, useManyArticleWarning } from '../api/Article';
import { CalendarEvent } from '../api/CalendarEvent';


const Member = () => {
    const { id } = useParams();
    const { data : dataInfo } = useUserInfo(Number(id))
    const [event, setEvent] = useState([])
    const memberInfo : User = dataInfo?.data

    const { data: dataWarning } = useManyArticleWarning(Number(id))
    const articlesWarning : ArticleWarning[] = dataWarning?.data

    useEffect(() => {
      const schedules = memberInfo?.schedules

      if(schedules) {
        const events : CalendarEvent[] = []
        schedules.forEach(schedule => {
          const today = new Date();
          const currentDayId = today.getDay(); 
          const dayDiff = schedule.day_id - currentDayId;
          const targetDate = new Date(today.getTime() + dayDiff * 24 * 60 * 60 * 1000);
          let dateString = targetDate.toLocaleDateString()
          const dateSplit = dateString.split('/')      
          dateString = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`

          
          if(schedule.morning_hour_start && schedule.morning_hour_end) {
            const morning_work = {
              title: 'Travail',
              start: dateString + " " + schedule?.morning_hour_start,
              end: dateString + " " +schedule?.morning_hour_end,
            }
            events.push(morning_work)
          }
          if(schedule.morning_hour_end || schedule.afternoon_hour_start) {
            const where_lunch = (schedule.lunch_outside === 0) ? 'à la maison' : 'dehors'
            const start_lunch = schedule.morning_hour_end ?  schedule.morning_hour_end : '12:00'
            const end_lunch = schedule.afternoon_hour_start ? schedule.afternoon_hour_start : '13:00'

            const lunch : CalendarEvent = {
              title: 'Déjeuner ' + where_lunch,
              start: dateString + " " + start_lunch,
              end: dateString + " " + end_lunch,
            }            
            events.push(lunch)
          }
          
          if(schedule.afternoon_hour_start && schedule.afternoon_hour_end) {
            const afternoon_work = {
              title: 'Travail',
              start: dateString + " " + schedule?.afternoon_hour_start,
              end: dateString + " " +schedule?.afternoon_hour_end,
            }
            events.push(afternoon_work)
          }
          
          const where_evening_meal = (schedule.evening_meal_outside === 0) ? 'à la maison' : 'dehors'
          const evening_meal = {
            title: 'Diner ' + where_evening_meal,
            start: dateString + ' 20:00',
            end:  dateString + ' 21:00',
            
          }
          events.push(evening_meal)

        });

        setEvent(events)
      }
    }, [memberInfo])


    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white py-12 flex justify-center flex-col">
          <div className='flex justify-between items-center flex-row'>
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <img className="mx-auto h-56 w-56 rounded-full" src={"../../images/avatar_family.svg"/*member.avatar ??*/ } alt="" />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{memberInfo?.firstname}</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        { format(memberInfo?.birthday) }
                    </p>
                </div>
            </div>

            {/* Allergies */}
            <div className="mx-auto mt-8 w-fit">
              <h3 className="text-xl text-center font-bold mb-4">Allergies</h3>
              <table className="min-w-xl divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Nom de l'aliment (ou article)
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      N'aime pas ou allergique
                    </th>
                  </tr>
                </thead>
                {/* <tbody className="divide-y divide-gray-200"> divide-y divide-gray-200 overflow-y-scroll max-h-96*/}
                <tbody>
                  {(articlesWarning && articlesWarning?.length > 0) && articlesWarning.map((article) => (
                    <tr key={article.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {article.label}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          { article.is_allergic === 0 ? "Allergique" : "N'aime pas" } 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
    
          {/* Horaires de travail */}
          <div className="mt-8 max-h-lg">
            <h3 className="text-xl font-bold mb-4">Horaires de travail</h3>
            {event && 
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                locale={'fr'}
                scrollTime={"07:00:00"}
                height={800}
                events={event}
                headerToolbar={{
                  start: "",
                  center:"",
                  end:"",
                }}
              />
            }
          </div>
    
        </div>
      </div>
    );
};

export default Member;

