import React, { useEffect} from 'react';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { Recipe, useManyRecipeByFamily, usePostRecipe } from '../api/Recipe';
import { useNavigate } from 'react-router';
import { errorToast, successToast } from '../services/toastify.service';

const RecipeBook = () => {
    let navigate = useNavigate();
    const { data : dataRecipe } = useManyRecipeByFamily()
    const recipeData : Recipe[] = dataRecipe?.data
    const postRecipe = usePostRecipe()

    useEffect(() => {

        if (postRecipe.isSuccess) {
            console.log(postRecipe)
            successToast("Recette créée avec succès");
            navigate("/family/recipe/"+postRecipe.data.data);
        } else if (postRecipe.isError) {
            errorToast("Erreur lors de la création de la famille");
          if(postRecipe.failureReason.response.status === 403)
            errorToast("Erreur de saisie");
        }
      }, [postRecipe,navigate]);

    //TODO : Replace with API difficulty when available
    const difficulty = [
        "Facile",
        "Moyen",
        "Difficile",
        "Expert",
        "Avancé",
    ]

    //TODO : Replace with API difficulty when available
    const category = [
        "Entrée",
        "Plat",
        "Dessert"
    ]

    const handleSubmit = () => {
        postRecipe.mutate()
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="bg-white py-12 flex justify-center flex-col">
                
                <div className="flex items-center gap-x-6 px-4 py-4 sm:px-8">
                    <button 
                        type='button'
                        onClick={handleSubmit}
                        className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            Nouvelle recette
                    </button>
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
                                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {difficulty[recipe.difficulty - 1]}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="flex-shrink-0 text-sm font-medium text-gray-900">{category[recipe.category_id - 1]}</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <a
                                                onClick={() => navigate('/family/recipe/' + recipe.id)}
                                                className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            >
                                                <CursorArrowRaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Ouvrir
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : 
                    <p className="text-center mt-4 text-lg leading-8 text-gray-600">Aucune recette dans votre famille</p>
                    }
                    
            </div>
        </div>
    );
};

export default RecipeBook;