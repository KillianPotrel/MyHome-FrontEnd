import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Recipe, useOneRecipeById, usePutRecipe } from '../api/Recipe';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import { errorToast, successToast } from '../services/toastify.service';
import { ArticleRecipe, ArticleParams, ArticleSearch, useDeleteArticleRecipe } from '../api/Article';
import { RecipeStep } from '../api/RecipeStep';
import { Difficulty, useManyDifficulty } from '../api/Difficulty';
import { Category, useManyCategory } from '../api/Category';
import RecipeArticleEdit from '../components/RecipeArticleEdit';


const RecipeItemEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([])
    // const [articlesRecipe, setArticlesRecipe] = useState<ArticleRecipe[]>([])
    // const [articleDelete, setArticleDelete] = useState<ArticleRecipe>()
    
    const [recipe, setRecipe] = useState<Recipe>()
    
    const { data : dataRecipe } = useOneRecipeById(parseInt(id))
    const recipeData : Recipe = dataRecipe?.data
    // console.log(recipeData)

    const { data : dataDifficulty } = useManyDifficulty()
    const difficultyData : Difficulty[] = dataDifficulty?.data
    
    const { data : dataCategory } = useManyCategory()
    const categoryData : Category[] = dataCategory?.data


    const putRecipe = usePutRecipe()

    useEffect(() => {    
        setRecipeSteps(recipeData?.recipe_steps);
        // setArticlesRecipe(recipe?.recipe_articles);
        setRecipe(recipeData)
    }, [recipeData])

    // useEffect(() => {    
    //     setArticlesRecipe(recipe?.recipe_articles);
    // }, [putRecipe]);

    useEffect(() => {
        if (putRecipe.isSuccess) {
          successToast("Modification de la recette réussi");
          navigate("/family/recipes");
        } else if (putRecipe.isError) {
          errorToast("Erreur lors de la modification de la recette");
        }
      }, [putRecipe, navigate]);

    const handleAddRecipeStep = () => {
        setRecipeSteps([...recipeSteps, {
            recipe_id: parseInt(id), 
            text: "",
            order: recipeSteps.length
        }]);
    };

    const handleRemoveRecipeStep = (index : number) => {
        let newRecipeSteps = [...recipeSteps];
        newRecipeSteps.splice(index, 1);

        setRecipeSteps(newRecipeSteps);
    };
    
    const handleChange = (e : any) => {
        let tempRecipe : Recipe = recipe

        if(e.target.name.includes("quantity_") || e.target.name.includes("unit_")){
            const splited_target = (e.target.name).split('_')
            const id_recipe_target : number = splited_target[splited_target.length - 1]
            let property = e.target.name.replace("_"+id_recipe_target,"")
            console.log(property)
            console.log(id_recipe_target)
            tempRecipe = {...tempRecipe, [property]: e.target.value}
        } else {
            tempRecipe = { ...tempRecipe, [e.target.name]: e.target.value };
        }
        setRecipe(tempRecipe)
    }

    const handleChangeStep = (index : number, event : any) => {
        const newRecipeSteps = [...recipeSteps];
        newRecipeSteps[index] = {
            recipe_id: parseInt(id),
            text: event.target.value,
            order: index 
        }
        setRecipeSteps(newRecipeSteps);

        let tempRecipe : Recipe = recipe
        tempRecipe = {...tempRecipe, ["recipe_steps"]: newRecipeSteps}
        setRecipe(tempRecipe)
    };

    const handleChildStateChange = (articles_recipe : ArticleRecipe[]) => {
        let tempRecipe : Recipe = recipe
        tempRecipe = {...tempRecipe, ["recipe_articles"]: articles_recipe}
        setRecipe(tempRecipe)
      };

    const handleSubmit = () => {
        console.log(recipe)
        const tempRecipe = {...recipe, ["id"]: parseInt(id)}
        if(tempRecipe.title === undefined || tempRecipe.category_id === undefined || tempRecipe.difficulty === undefined || tempRecipe.preparation_time === undefined || tempRecipe.cooking_time === undefined){
                errorToast("Un des champs n'est pas correctement renseigné")
                console.log(tempRecipe.title)
                console.log(tempRecipe.category_id)
                console.log(tempRecipe.difficulty)
                console.log(tempRecipe.preparation_time)
                console.log(tempRecipe.cooking_time)
                return
            }
            console.log(tempRecipe)
        putRecipe.mutate(tempRecipe)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Invoice summary */}
                <div className="lg:col-start-3 lg:row-end-1">
                    <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                        <dl className="pb-6 flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                                <div>
                                    <label htmlFor="title">
                                        Titre
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={recipe?.title}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category_id">
                                        Catégorie
                                    </label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={recipe?.category_id}
                                        onChange={handleChange}
                                        autoComplete="category_id"
                                        className="relative mt-2 block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value={undefined}></option>
                                        {categoryData && categoryData.map(category => (
                                            <option key={category.id} value={category.id}>{category.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
                                <div>
                                    <label htmlFor="difficulty">
                                        Difficulté
                                    </label>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        value={recipe?.difficulty}
                                        onChange={handleChange}
                                        autoComplete="difficulty"
                                        className="relative mt-2 block rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value={undefined}></option>
                                        {difficultyData && difficultyData.map(difficulty => (
                                            <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className='flex direction-row'>

                                <div className="mt-4 flex flex-none gap-x-4 pl-6 pr-2">
                                    <div className="mt-2 w-4/5">
                                        <label htmlFor="preparation_time">
                                            Temps préparation
                                        </label>
                                        <input
                                        type="number"
                                        name="preparation_time"
                                        id="preparation_time"
                                        value={recipe?.preparation_time}
                                        onChange={handleChange}
                                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-none gap-x-4 ">
                                    <div className="mt-2 w-4/5">
                                        <label htmlFor="cooking_time">
                                            Temps cuisson
                                        </label>
                                        <input
                                        type="number"
                                        name="cooking_time"
                                        id="cooking_time"
                                        value={recipe?.cooking_time}
                                        onChange={handleChange}
                                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-none gap-x-4 px-6">
                                <div>
                                    <input type='file' 
                                        id='image'
                                        name='image' 
                                        value={recipe?.image}
                                        className='file:cursor-pointer file:rounded-md file:border-none file:mt-5 file:bg-amber-600 file:px-3.5 file:py-2.5 file:text-sm file:font-semibold file:text-white file:shadow-sm file:hover:bg-amber-500 file:focus-visible:outline file:focus-visible:outline-2 file:focus-visible:outline-offset-2 file:focus-visible:outline-amber-600' 
                                        onChange={handleChange}
                                    />
                                    <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>
                        </dl>
                    </div>

                    <button  
                        className="rounded-md mt-5 mr-5 bg-amber-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={handleSubmit}
                    >
                        Sauvegarder
                    </button>
                </div>

                {/* Invoice */}
                <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                    
                    <RecipeArticleEdit 
                        recipe_id={parseInt(id)} 
                        articles_recipe={recipeData?.recipe_articles} 
                        handleStateChange={handleChildStateChange} />
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
                        {recipeSteps && recipeSteps.map((recipe_step, index) => (
                            <tr key={recipe_step?.id} className="border-b border-gray-100">
                                <td className="max-w-0 mr-5 px-0 py-5 align-top">
                                    <textarea
                                        rows={4}
                                        name={"recipe_steps_" + index}
                                        id={"recipe_steps_" + index}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                        onChange={(event) => handleChangeStep(index, event)}
                                        value={recipe_step?.text}
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                        onClick={() => handleRemoveRecipeStep(index)}
                                    >
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    
                    <div className="flex justify-center mt-5">
                        <button
                            type="button"
                            className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            onClick={handleAddRecipeStep}
                        >
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeItemEdit;