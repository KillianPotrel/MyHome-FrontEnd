import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import { usePostUserLogin } from "../api/User";
import { errorToast, successToast } from "../services/toastify.service";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "kpotrel@gmail.com",
    password: "azerty",
  });

  const userPostLogin = usePostUserLogin();

  useEffect(() => {
    if (userPostLogin.isSuccess) {
      successToast("Connexion réussi");
      navigate("/family/choice");
    } else if (userPostLogin.isError) {
      errorToast("Erreur lors de la connexion");
      if(userPostLogin.failureReason.response.status === 403)
        errorToast("Merci de confirmer votre adresse email");
      if(userPostLogin.failureReason.response.status === 405)
        errorToast("Email ou mot de passe incorrect");
    }
  }, [userPostLogin,navigate]);

  const onChange = (e : any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e : any) => {
    e.preventDefault()
    userPostLogin.mutate({
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <div className="bg-no-repeat bg-cover bg-left-top bg-famille min-h-screen">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/images/logo.png"
            alt="MyHome"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 opacity-95">
            <h2 className="text-center text-3xl font-bold tracking-tight text-amber-400">
              Connectez-vous
            </h2>
            <form className="space-y-6">
              <div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>

              <div>
                <Input
                  id="password"
                  label="Mot de passe"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div>
                <a
                  type="submit"
                  className="flex w-full justify-center cursor-pointer rounded-md border border-transparent bg-amber-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  onClick={login}
                >
                  Connexion
                </a>
              </div>
            </form>

            <div className="text-sm mt-4">
              <a href="http://my-home.back.kpotrel.fr/forgot-password" className="font-medium text-amber-400 hover:text-amber-500">
                Mot de passe oublié ?
              </a>
            </div>
            <div className="text-sm mt-4">
              <a 
                onClick={() => navigate("/register")}
                className="font-medium text-amber-400 hover:text-amber-500 cursor-pointer">
                Pas encore de compte ? Inscrivez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
