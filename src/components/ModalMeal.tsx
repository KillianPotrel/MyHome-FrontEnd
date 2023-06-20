import { Dialog, Transition } from '@headlessui/react';
import { LockClosedIcon, PencilSquareIcon, TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { RecipeMealParams, Meal, useDeleteRecipeMeal, useOneMeal, usePutRegenerateRecipeMeal } from '../api/Meal';
import { Category, useManyCategory } from '../api/Category';
import SearchBar from './SearchbarRecipe/SearchBar';
import { SearchResultsList } from './SearchbarRecipe/SearchResultsList';
import { Recipe } from '../api/Recipe';
import { useNavigate } from 'react-router-dom';
import { useGenerateArticleByMeal, useGenerateArticleByRecipe } from '../api/ShoppingList';

type ModalMealProps = {
    meal_id: number
}

const ModalMeal = ({meal_id} : ModalMealProps) => {
    let navigate = useNavigate();
    const [results, setResults] = useState<Recipe[]>([]);
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const { data : dataCategory } = useManyCategory()
    const category : Category[] = dataCategory?.data

    useEffect(() => {
        if(meal_id !== undefined) setOpen(true)
    },[meal_id])

    const { data: dateMeal } = useOneMeal(meal_id)
    const meal : Meal = dateMeal?.data

    const regenerateRecipeMeal = usePutRegenerateRecipeMeal(meal_id)
    const generateArticleByRecipe = useGenerateArticleByRecipe()
    const generateArticleByMeal = useGenerateArticleByMeal()

    const handleRegenerate = (recipe_id : number, is_custom : number) => {
        const param : RecipeMealParams = {
            recipe_id,
            is_custom,
        }
        regenerateRecipeMeal.mutate(param)
    }

    const deleteRecipeMeal = useDeleteRecipeMeal(meal_id)

    const handleDelete = (recipe_id : number, is_custom : number) => {
        const param : RecipeMealParams = {
            recipe_id,
            is_custom,
        }
        deleteRecipeMeal.mutate(param)
    }

    const handleGenerateRecipe = (recipe_id : number) => {
        generateArticleByRecipe.mutate(recipe_id)
    }

    const handleGenerateMeal = () => {
        generateArticleByMeal.mutate(meal_id)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-10" 
                initialFocus={cancelButtonRef} 
                onClose={() => {
                    setOpen(false)
                }}>
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                        <div>
                            <div className="flex justify-between">
                                <button type="button" 
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon  className="h-6 w-6" aria-hidden="true"/>
                                </button>
                                <button 
                                    type='button'
                                    onClick={() => handleGenerateMeal()}
                                    className="rounded-md bg-amber-600 mx-3 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                    >
                                        Générer menu
                                </button>
                            </div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                <PencilSquareIcon className="h-6 w-6 text-amber-600" aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Gérer le menu du {meal?.day} {meal?.is_lunch === 0 ? " soir" : " midi"}
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Ajouter, modifier des recettes pour ce repas.
                            </p>
                            </div>
                        </div>
                        
                        <div className="relative search-bar-container">
                            <SearchBar setResults={setResults} />
                            {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} meal_id={meal_id} />}
                        </div>

                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="-mx-4 mt-8 sm:-mx-0">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Recette
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Catégory
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {(meal?.recipes !== undefined && meal?.recipes?.length > 0) &&
                                        meal?.recipes.map((recipe, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className='cursor-pointer' 
                                                        onClick={() => handleDelete(recipe.id, 0)}
                                                        >
                                                        <TrashIcon className='text-gray-500  w-6 h-6 mr-2'/>
                                                    </span>
                                                </td>
                                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                    {recipe.title}
                                                </td>
                                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                    {category?.find(item => item.id === recipe.category_id)?.label}
                                                </td>
                                                
                                                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button 
                                                        type='button'
                                                        onClick={() => handleGenerateRecipe(recipe.id)}
                                                        className="rounded-md bg-amber-600 mx-3 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                        >
                                                            Ajouter à la liste de course
                                                    </button>
                                                    <button 
                                                        type='button'
                                                        onClick={() => navigate('/family/recipe/'+recipe.id)}
                                                        className="rounded-md bg-amber-600 mx-3 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                        >
                                                            Recette
                                                    </button>
                                                    {!regenerateRecipeMeal.isLoading ?
                                                        <button 
                                                            type='button'
                                                            onClick={() => handleRegenerate(recipe.id, 0)}
                                                            className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                            >
                                                                Regénérer aléatoirement
                                                        </button>
                                                    : 
                                                        <button 
                                                            type='button'
                                                            className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                            disabled>
                                                                Regénérer aléatoirement
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {(meal?.recipes_custom !== undefined && meal?.recipes_custom?.length > 0) &&
                                        meal?.recipes_custom.map((recipe, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className='cursor-pointer' 
                                                        onClick={() => handleDelete(recipe.id, 1)}
                                                        >
                                                        <TrashIcon className='text-gray-500  w-6 h-6 mr-2'/>
                                                    </span>
                                                </td>
                                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                    {recipe.title}
                                                </td>
                                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm  text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                </td>
                                                
                                                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    {!regenerateRecipeMeal.isLoading ?
                                                        <button 
                                                            type='button'
                                                            onClick={() => handleRegenerate(recipe.id, 1)}
                                                            className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                            >
                                                                Regénérer aléatoirement
                                                        </button>
                                                    : 
                                                        <button 
                                                            type='button'
                                                            className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                                            disabled>
                                                                Regénérer aléatoirement
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Fermer
                        </button>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalMeal;