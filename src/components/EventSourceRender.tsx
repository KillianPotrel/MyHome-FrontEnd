
import React, { useEffect, useState } from 'react';
import EventSourceSchedule from './EventSourceSchedule';
import EventSourceMeal from './EventSourceMeal';
import EventSourceHousework from './EventSourceHousework';
import EventSourceExitRequest from './EventSourceExitRequest';

type EventSourceRenderProps = {
    source : string
    source_id : number
}
const EventSourceRender = ({ source, source_id } : EventSourceRenderProps) : JSX.Element => {
    const [renderComponent, setRenderComponent] = useState<JSX.Element | null>(null);
    useEffect(() => {
        let component: JSX.Element | null = null;
        switch (source) {
            case "menu":
                component = <EventSourceMeal source_id={source_id} />;
                break;
            case "housework":
                component = <EventSourceHousework source_id={source_id} />;
                break;
            case "exit_request":
                component = <EventSourceExitRequest source_id={source_id} />;;
                break;
            case "schedule":
                component = <EventSourceSchedule source_id={source_id} />;
                break;
            default:
                component = <div></div>;
                break;
        }
        setRenderComponent(component);
    }, [source, source_id]);

    return (
        <div>
            {renderComponent}
        </div>
    );
};

export default EventSourceRender;