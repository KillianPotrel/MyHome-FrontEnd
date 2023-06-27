import React, { useEffect, useState }from 'react';
import { User, usePutUser } from '../../api/User';
import { errorToast, successToast } from '../../services/toastify.service';
import { format } from '../../_utils/FormatDate';

type Image = {
    picturePreview : string,
    pictureAsFile : any
}

type InformationsProps = {
    user : User
}

const ProfileInformations = ({user} : InformationsProps):JSX.Element => {
    const [userPost, setUser] = useState<User>({
        firstname: null,
        lastname: null,
        birthday: new Date("1998-11-28"),
        avatar: null,
        email: null,
        password: null})
    const [imageAvatar, setImageAvatar] = useState<Image>({
        picturePreview: null, 
        pictureAsFile: null})
    const [image, setImage] = useState({ files: null});

    const putUser = usePutUser()
    //const InfoUser : User | undefined = dataInfo?.data
    
    useEffect(() => {
        setUser(user)
    }, [user])

    const handleChange = (e : any) => {
        if(e.target.name === "birthday"){
            setUser({
                ...userPost,
                    ["birthday"]: new Date(e.target.value),
                });
        } else {
            setUser({
            ...userPost,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleChangeImage = (e : any)  => {
        // console.log(e.target.files[0])
        // const reader = new FileReader();
        // reader.onloadend = function() {
        //   const base64Data = reader.result;
        //   console.log("here")
        //   setUser({
        //   ...userPost,
        //       ["avatar"]: {file:base64Data},
        //   });
        //   console.log(userPost)
        // };
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = function () {
          const base64Data = reader.result as string;
          setUser({
            ...userPost,
            avatar: { file: base64Data },
          });
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
    };

    const setImageAction = () => {
        const formData = new FormData();
        formData.append(
            "file",
            imageAvatar.pictureAsFile
        );
        // do your post request
    };

    const handleSubmit = () => {
        console.log(userPost)
        if(user.email.length === 0 || !user.email.includes("@")){
            errorToast("Email incorrect");
            return
        }
        if(user.firstname.length === 0){
            errorToast("Prénom incorrect");
            return
        }
        putUser.mutate(userPost)
    }

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-black">Informations personnelles</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Utilisez une adresse email à jour pour garantir la reception des mails.
                </p>
            </div>

            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                        <img
                            src={(userPost?.avatar || typeof user?.avatar !== 'string')  ? "../../images/avatar_family.svg" : userPost?.avatar}
                            onChange={handleChange}
                            alt="User avatar"
                            className="h-24 w-24 flex-none rounded-lg object-cover"
                        />
                        <div>
                            <input type='file' 
                                accept="image/*"
                                name='avatar' 
                                className='file:cursor-pointer file:rounded-md file:border-none file:mt-5 file:bg-amber-600 file:px-3.5 file:py-2.5 file:text-sm file:font-semibold file:text-white file:shadow-sm file:hover:bg-amber-500 file:focus-visible:outline file:focus-visible:outline-2 file:focus-visible:outline-offset-2 file:focus-visible:outline-amber-600' 
                                onChange={handleChangeImage}/>
                            <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-black">
                            Prénom
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={handleChange}
                            value={userPost?.firstname ?? ""}
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
                            value={userPost?.birthday ? format(userPost?.birthday) : ""}
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
                            value={userPost?.email ?? ""}
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
                        onClick={handleSubmit}>
                            Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInformations;