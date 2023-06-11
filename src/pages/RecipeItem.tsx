import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router'
import { Recipe, useOneRecipeById } from '../api/Recipe';
import { CakeIcon, ClockIcon } from '@heroicons/react/24/outline';


const RecipeItem = () => {
    const { id } = useParams();
    console.log(id)
    const { data : dataRecipe } = useOneRecipeById(parseInt(id))
    const recipeData : Recipe = dataRecipe?.data

    console.log(recipeData)

    return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
                <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                    <dl className="pb-6 flex flex-wrap">
                        <div className="flex-auto pl-6 pt-6">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                                {recipeData?.title}
                            </dt>
                            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{recipeData?.category_id}</dd>
                        </div>
                        {recipeData?.difficulty &&
                            <div className="flex-none self-end px-6 pt-4">
                                <dt className="sr-only">Status</dt>
                                
                                <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                    {recipeData.difficulty}
                                </dd>
                            </div>
                        }
                        {recipeData?.preparation_time &&
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt className="flex-none">
                                    <span className="sr-only">Preparation time</span>
                                    <ClockIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd className="text-sm leading-6 text-gray-500">
                                    {recipeData.preparation_time + " min de préparation"}
                                </dd>
                            </div>
                        }
                        {recipeData?.cooking_time &&
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt className="flex-none">
                                    <span className="sr-only">Cooking time</span>
                                    <CakeIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd className="text-sm leading-6 text-gray-500">
                                    {recipeData.cooking_time + " min de cuisson"}
                                </dd>
                            </div>
                        }
                        <div className="col-span-full items-center">
                            <img
                                className="mx-auto flex-none rounded-lg object-cover w-4/5"
                                src="../../images/avatar_family.svg"
                                alt="MyHome"
                            />
                        </div>
                    </dl>
                </div>
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
                        <div key={recipe_article.id} className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                            <dt className="font-semibold text-gray-500">{recipe_article?.article_id}</dt>
                        </div>              
                    ))}
                    {recipeData?.recipe_articles && recipeData?.recipe_articles.map((recipe_article) => (
                        <div key={recipe_article.id} className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                            <dt className="font-semibold text-gray-500">{recipe_article?.quantity} gr</dt>
                        </div>                
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
    );
};

export default RecipeItem;