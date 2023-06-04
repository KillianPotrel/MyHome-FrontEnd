import React, { useState, useEffect } from 'react';
import { errorToast, successToast } from '../../services/toastify.service';
import { ChangePassword, usePutPassword } from '../../api/User';
import { accountService } from '../../services/account.service';

const ProfilePassword = ():JSX.Element => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const putPassword = usePutPassword()

    useEffect(() => {
      if (putPassword.isSuccess) {
        successToast("Changement de mot de passe réussi");
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else if (putPassword.isError) {
        errorToast("Erreur lors des modifications du profil");
        if(putPassword.failureReason.response.status === 404)
          errorToast("L'ancien mot de passe n'est pas correct");
        if(putPassword.failureReason.response.status === 403)
          errorToast("Le mot de passe doit faire au minimum 7 caractères");
      }
    }, [putPassword]);

    const handleChangeCurrent = (e : any) => {
        setCurrentPassword(e.target.value)
    }
    const handleChangeNew = (e : any) => {
        setNewPassword(e.target.value)
    }
    const handleChangeConfirm = (e : any) => {
        setConfirmPassword(e.target.value)
    }
    
    const handleSubmit = () => {
      if(currentPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0){
          errorToast("Veuillez remplir tous les champs");
          return
      }
      if(currentPassword === newPassword){
          errorToast("Le nouveau mot de passe doit être différent de l'ancien");
          return
      }
      if(newPassword !== confirmPassword){
          errorToast("Le nouveau mot de passe est différent de la confirmation");
          return
      }
      if(newPassword.length < 7){
        errorToast("Le mot de passe doit faire au minimum 7 caractères");
        return
      }
      const passwordChange : ChangePassword = {
        oldpassword: currentPassword,
        newpassword: newPassword,
      }
      putPassword.mutate(passwordChange)
      
  }

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-black">Changer de mot de passe</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Mise à jour du mot de passe associé à votre compte.
            </p>
          </div>

          <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="currentpassword" className="block text-sm font-medium leading-6 text-black">
                Mot de passe actuel
              </label>
              <div className="mt-2">
                <input
                  id="currentpassword"
                  name="currentpassword"
                  type="password"
                  onChange={handleChangeCurrent}
                  value={currentPassword}
                  autoComplete="currentpassword"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-black">
                Nouveau mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  onChange={handleChangeNew}
                  value={newPassword}
                  autoComplete="newpassword"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-black">
                Confirmer le mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  onChange={handleChangeConfirm}
                  value={confirmPassword}
                  autoComplete="newpassword"
                  className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex">
              <button 
                onClick={handleSubmit}
                  className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                      Sauvegarder
              </button>
          </div>
        </div>
    </div>
    );
};

export default ProfilePassword;