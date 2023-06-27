import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router'
import { Recipe, useDeleteRecipe, useOneRecipeById } from '../api/Recipe';
import { CakeIcon, ClockIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import { Dialog, Transition } from '@headlessui/react';
import { Difficulty, useManyDifficulty } from '../api/Difficulty';
import { Category, useManyCategory } from '../api/Category';
import Skeleton from 'react-loading-skeleton';
import PermissionGates from '../_utils/PermissionGates';


const RecipeItem = () : JSX.Element => {
    const { id } = useParams();
    let navigate = useNavigate();
    
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    
    const { data : dataRecipe, isLoading : isLoadingRecipe } = useOneRecipeById(parseInt(id))
    const recipeData : Recipe = dataRecipe?.data

    const { data : dataDifficulty, isLoading : isLaodingDifficulty } = useManyDifficulty()
    const difficulty : Difficulty[] = dataDifficulty?.data
    
    const { data : dataCategory, isLoading : isLoadingCategory } = useManyCategory()
    const category : Category[] = dataCategory?.data

    const deleteRecipe = useDeleteRecipe()

    const handleDelete = () => {
        deleteRecipe.mutate(parseInt(id))
    }

    const handleModify = () => {
        navigate('/family/recipe/edit/' + id)
    }

    useEffect(() => {
      if (deleteRecipe.isSuccess) {
        navigate("/family/recipes");
      } else if (deleteRecipe.isError) {
      }
    }, [deleteRecipe,navigate]);

    return (
    <>   
    {isLoadingRecipe || isLaodingDifficulty || isLoadingCategory ? (
      <div className='mt-10'>
        <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
        <Skeleton count={5} />
      </div>
    ) : (
        <>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Supprimer la recette
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Êtes-vous sûr de vouloir désactiver votre compte ? La recette sera 
                            définitivement supprimée de nos serveurs pour toujours. Cette action ne peut être annulée.
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                    >
                        Annuler
                    </button>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
            
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {recipeData?.warning_user?.length > 0 &&
                <div className="rounded-md mb-5 bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Il y a {recipeData?.warning_user?.length} articles a surveiller</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul role="list" className="list-disc space-y-1 pl-5">
                                    
                                {recipeData?.warning_user.map((warning_user,index) => (
                                    <li key={index}>{warning_user}</li>       
                                ))}
                                {/* <li>Léo n'aime pas : concoMbre</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>}
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Invoice summary */}
                <div className="lg:col-start-3 lg:row-end-1">
                    <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                        <dl className="pb-6 flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                                <dt className="text-sm font-semibold leading-6 text-gray-900">
                                    {recipeData?.title}
                                </dt>
                                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{category?.find(item => item.id === recipeData?.category_id)?.label}</dd>
                            </div>
                            {recipeData?.difficulty &&
                                <div className="flex-none self-end px-6 pt-4">
                                    <dt className="sr-only">Status</dt>
                                    <dd className={`rounded-md bg-${difficulty?.find(item => item.id === recipeData.difficulty)?.color}-50 px-2 py-1 text-xs font-medium text-${difficulty?.find(item => item.id === recipeData.difficulty)?.color}-600 ring-1 ring-inset ring-${difficulty?.find(item => item.id === recipeData.difficulty)?.color}-600/20`}>
                                        {difficulty?.find(item => item.id === recipeData.difficulty)?.label}
                                    </dd>
                                </div>
                            }

                            {recipeData?.preparation_time !== undefined &&
                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                        <span className="sr-only">Preparation time</span>
                                        <ClockIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd className="text-sm leading-6 text-gray-500">
                                        {recipeData?.preparation_time + " min de préparation"}
                                    </dd>
                                </div>
                            }

                            {recipeData?.cooking_time !== undefined &&
                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                        <span className="sr-only">Cooking time</span>
                                        <CakeIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd className="text-sm leading-6 text-gray-500">
                                        {recipeData?.cooking_time + " min de cuisson"}
                                    </dd>
                                </div>
                            } 
                            <div className="col-span-full items-center mt-5">
                                <img
                                    className="mx-auto flex-none rounded-lg object-cover w-4/5"
                                    src="../../images/avatar_family.svg"
                                    alt="MyHome"
                                />
                            </div>
                        </dl>
                    </div>
                    <PermissionGates permission_key='modify_recipe'>
                        <button  
                            className="rounded-md mt-5 mr-5 bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            onClick={handleModify}
                        >
                            Modifier
                        </button>
                        <button
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                            onClick={() => setOpen(true)}
                        >
                            Supprimer
                        </button>
                    </PermissionGates>
                </div>

                {/* Invoice */}
                <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">Ingrédients</h2>
                    <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div className="sm:pr-4">
                            <dt className="inline text-gray-700">Nom</dt>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:pl-4">
                            <dt className="inline text-gray-900">Quantité</dt>
                        </div>
                        
                        {recipeData?.recipe_articles && recipeData?.recipe_articles.map((recipe_article) => (
                            <>
                                <div key={recipe_article.id + "_product_name"} className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                    <dt className="font-semibold text-gray-500">{recipe_article?.product_name === null ? recipe_article?.label : recipe_article?.product_name}</dt>
                                </div>              
                                <div key={recipe_article.id + "_unit"} className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                                    <dt className="font-semibold text-gray-500">{recipe_article?.quantity + " "} {recipe_article?.unit ?? recipe_article?.unit}</dt>
                                </div> 
                            </>               
                        ))}
                    </dl>
                    <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                        <colgroup>
                            <col className="w-full" />
                        </colgroup>
                        <thead className="border-b border-gray-200 text-gray-900">
                            <tr>
                                <th scope="col" className="px-0 py-3 font-semibold">
                                    Étapes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {recipeData?.recipe_steps && recipeData?.recipe_steps.map((recipe_step) => (
                            <tr key={recipe_step?.id} className="border-b border-gray-100">
                                <td className="max-w-0 px-0 py-5 align-top">
                                    <div className="break-words whitespace-normal font-medium text-gray-500">{recipe_step?.text}</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )}
    </>
    );
};

export default RecipeItem;