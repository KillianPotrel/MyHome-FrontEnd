import React, { useEffect} from 'react';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { Recipe, useManyRecipeByFamily, usePostRecipe } from '../api/Recipe';
import { useNavigate } from 'react-router';
import { Difficulty, useManyDifficulty } from '../api/Difficulty';
import { Category, useManyCategory } from '../api/Category';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PermissionGates from '../_utils/PermissionGates';

const RecipeBook = () : JSX.Element => {
    let navigate = useNavigate();
    const { data : dataRecipe, isLoading : isLoadingRecipe } = useManyRecipeByFamily()
    const recipeData : Recipe[] = dataRecipe?.data

    const { data : dataDifficulty, isLoading : isLaodingDifficulty } = useManyDifficulty()
    const difficulty : Difficulty[] = dataDifficulty?.data
    
    const { data : dataCategory, isLoading : isLoadingCategory } = useManyCategory()
    const category : Category[] = dataCategory?.data

    const postRecipe = usePostRecipe()

    useEffect(() => {
        if (postRecipe.isSuccess) {
            navigate("/family/recipe/edit/"+postRecipe.data.data);
        }
      }, [postRecipe,navigate]);

    const handleSubmit = () => {
        postRecipe.mutate()
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">            
            {isLoadingRecipe || isLaodingDifficulty || isLoadingCategory ? (
              <div className='mt-10'>
                <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
                <Skeleton count={5} />
              </div>
            ) : (
                <>
            <div className="py-12 flex justify-center flex-col">
                
                <div className="flex items-center gap-x-6 px-4 py-4 sm:px-8">
                    <PermissionGates permission_key='modify_recipe'>
                        <button 
                            type='button'
                            onClick={handleSubmit}
                            className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                                Nouvelle recette
                        </button>
                    </PermissionGates>
                </div>
                { recipeData !== undefined && recipeData.length > 0 
                    ?
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
                        {recipeData.map((recipe) => (
                            <li key={recipe.id} className="col-span-2 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                <div className="flex w-full items-center justify-between space-x-6 p-6">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">{recipe.title}</h3>
                                        <div className="flex items-center space-x-1">
                                            <p className="mt-1 text-sm text-gray-500">{recipe.preparation_time} minutes</p>
                                            {difficulty?.find(item => item.id === recipe.difficulty)?.id === 1 && 
                                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`}>
                                                    {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                                </span>
                                            }
                                            {difficulty?.find(item => item.id === recipe.difficulty)?.id === 2 && 
                                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20`}>
                                                    {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                                </span>
                                            }
                                            {difficulty?.find(item => item.id === recipe.difficulty)?.id === 3 && 
                                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20`}>
                                                    {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                                </span>
                                            }
                                            {difficulty?.find(item => item.id === recipe.difficulty)?.id === 4 && 
                                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20`}>
                                                    {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                                </span>
                                            }
                                            {difficulty?.find(item => item.id === recipe.difficulty)?.id === 5 && 
                                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-purple-50 px-1.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20`}>
                                                    {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                                </span>
                                            }
                                            {/* <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-${difficulty?.find(item => item.id === recipe.difficulty)?.color}-50 px-1.5 py-0.5 text-xs font-medium text-${difficulty?.find(item => item.id === recipe.difficulty)?.color}-700 ring-1 ring-inset ring-${difficulty?.find(item => item.id === recipe.difficulty)?.color}-600/20`}>
                                                {difficulty?.find(item => item.id === recipe.difficulty)?.label}
                                            </span> */}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="flex-shrink-0 text-sm font-medium text-gray-900">{category?.find(item => item.id === recipe.category_id)?.label}</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <Link to={'/family/recipe/' + recipe.id}
                                                className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                                <CursorArrowRaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Ouvrir
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : 
                        <p className="text-center mt-4 text-lg leading-8 text-gray-600">Vous n'avez pas encore de recettes</p>
                    }
                    
            </div>
            </>)}
        </div>
    );
};

export default RecipeBook;