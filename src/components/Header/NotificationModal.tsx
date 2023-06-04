import React from 'react';
import { Notification, useDeleteNotification, useManyNotification } from '../../api/Notification';
import { XMarkIcon } from '@heroicons/react/24/outline';

const NotificationModal = () :JSX.Element => {
    const { data: dataNotifications } = useManyNotification()
    const notifications : Notification[] = dataNotifications?.data

    const deleteNotification = useDeleteNotification()

    const handleSubmit = (notification_id : number) => {
      deleteNotification.mutate(notification_id)
    }

    return (
        <>
        {(notifications !== undefined && notifications?.length > 0) ? 
            <>
                {notifications?.map((notificationUser) => (
                    <div key={notificationUser?.id} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            {/* <notification.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> */}
                        </div>
                        <div>
                            <a href={notificationUser.url} className="cursor-pointer font-semibold text-gray-900">
                            {notificationUser.category}
                            {/* <span className="absolute inset-0" /> */}
                            <p className="mt-1 text-gray-600">{notificationUser.text}</p>
                            </a>
                        </div>
                        <div className='mt-1 flex h-11 w-5 flex-none items-center justify-center'>
                            <button
                                type="button"
                                className="cursor-pointer rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                onClick={() => handleSubmit(notificationUser.id)}
                            >
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <a className='cursor-pointer '>
                            </a>
                        </div>
                    </div>
                ))}
            </>
        : 
            <>Vous n'avez pas de notifications</>
        }
        </>
    )
};

export default NotificationModal;

