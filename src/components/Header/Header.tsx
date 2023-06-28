import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { accountService } from "../../services/account.service";
import { User, usePostUserLogout, useUserInfo } from "../../api/User";
import { Fragment } from "react";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, EyeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NotificationModal from "./NotificationModal";
import { useDeleteNotification } from "../../api/Notification";

function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = (): JSX.Element => {
    let navigate = useNavigate();
    const location = useLocation();

    const { data : dataInfo } = useUserInfo()
    const user : User = dataInfo?.data
    const userPostLogout = usePostUserLogout();

    const deleteNotification = useDeleteNotification()

    const handleDeleteAll = () => {
      deleteNotification.mutate(null)
    }

    useEffect(() => {
        if (userPostLogout.isSuccess) {
          navigate("/");
        } 
    });

  const logout = () => {
    userPostLogout.mutate({token : accountService.getToken()});
  };

  const disconnectFamily = () => {
    accountService.disconnectFamily();
    navigate("/family/choice");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={'/family/dashboard'}>                 
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="/images/logo.png"
                      alt="MyHome"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/images/logo.png"
                      alt="MyHome"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-amber-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link className={`inline-flex items-center border-b-2 ${location.pathname === '/family/dashboard' ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                    to={'/family/dashboard'}>
                      Accueil
                  </Link>
                  <Link className={`inline-flex items-center border-b-2 ${location.pathname === '/family/members' ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                   to={'/family/members'}>
                    Famille
                  </Link>
                  <Link to={'/family/planning'}
                    className={`inline-flex items-center border-b-2 ${location.pathname === '/family/planning' ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                  >
                    Planning
                  </Link>
                  <Link
                    to={'/family/recipes'}
                    className={`inline-flex items-center border-b-2 ${location.pathname.includes('/family/recipe') ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                  >
                    Recette
                  </Link>
                  <Link
                    to={'/family/shoppings'}
                    className={`inline-flex items-center border-b-2 ${location.pathname.includes('/family/shopping') ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                  >
                    Courses
                  </Link>
                  <Link
                    to={'/family/meals'}
                    className={`inline-flex items-center border-b-2 ${location.pathname === '/family/meals' ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                  >
                    Repas
                  </Link>
                  <Link
                    to={'/family/housework'}
                    className={`inline-flex items-center border-b-2 ${location.pathname === '/family/housework' ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-1 pt-1 text-sm font-medium`}
                  >
                    Ménage
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Popover className="relative mt-3">
                  <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-30 mt-5 flex w-screen max-w-max  sm:-translate-x-72 md:-translate-x-1/2  px-4"
                      style={visualViewport.width < 800 ? {left: "-275px"} : {left: "-170px"}}>
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4 overflow-y-scroll max-h-96">
                          <NotificationModal />
                        </div>
                        <div className="divide-x divide-gray-900/5 bg-gray-50">
                            <a
                              onClick={() => handleDeleteAll()}
                              className="cursor-pointer flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                              <TrashIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                              Supprimer tout
                            </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>


                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user?.avatar ?? "../../images/avatar_family.svg"}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-30 right-0 mt-2 w-48 origin-top-right rounded-md bg-white 
                    py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to={'/profile'}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full h-full text-left block px-4 py-2 text-sm text-gray-700"
                            )}>
                            Profil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type='button'
                            onClick={disconnectFamily}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full h-full text-left block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Changer de famille
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type='button'
                            onClick={logout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full h-full text-left block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Déconnexion
                          </button>
                        )}
                      </Menu.Item>
                      
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {/* Current: "bg-amber-50 border-amber-500 text-amber-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname === '/family/dashboard' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/dashboard'}>
                  Accueil
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname === '/family/members' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/members'}>
                  Famille
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname === '/family/planning' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/planning'}>
                  Planning
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname.includes('/family/recipe') ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/recipes'}>
                  Recette
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname.includes('/family/shopping') ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/shoppings'}>
                  Course
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname === '/family/meals' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/meals'}>
                  Repas
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`w-full block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${location.pathname === '/family/housework' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Link to={'/family/housework'}>
                  Ménage
                </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
