import React, { useEffect, useState }from 'react';
import { User, useUserInfo } from '../../api/User';



const Informations = ():JSX.Element => {
    const [user, setUser] = useState<User>({
        firstname: null,
        lastname: null,
        birthday: new Date(),
        avatar: null,
        email: null,
        password: null})
    const [imageAvatar, setImageAvatar] = useState()
    // const { data : dataInfo } = useUserInfo()
    // const InfoUser : User | undefined = dataInfo.data
    // console.log(InfoUser)

    const handleChange = (e : any) => {
        setUser({
        ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-black">Informations personnelles</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Utilisez une adresse email à jour pour garantir la reception des mails.
                </p>
            </div>

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                    <img
                        src={user.avatar ?? "../../images/avatar_family.svg"}
                        onChange={handleChange}
                        alt="User avatar"
                        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                    <div>
                        <input type='file' name='avatar' />
                        <button
                        type="button"
                        className="rounded-md bg-black/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/20"
                        >
                        
                        Changer la photo
                        </button>
                        <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                    </div>

                    <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
                        Prénom
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={handleChange}
                        value={user.firstname}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-3">
                    <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-black">
                        Date de naissance
                    </label>
                    <div className="mt-2">
                        <input
                        type="date"
                        name="birthday"
                        value={user.birthday?.toDateString()}
                        onChange={handleChange}
                        id="birthday"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                        Adresse email
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                </div>

                <div className="mt-8 flex">
                    <button 
                        className="rounded-md mt-5 bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={() => console.log("fjsdjfds")}>
                            Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Informations;