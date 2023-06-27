import React, {useState, useEffect} from 'react';
import { ArticleParams, ArticleRecipe, ArticleSearch, useDeleteArticleRecipe } from '../api/Article';
import { RecipeStep } from '../api/RecipeStep';
import { TrashIcon } from '@heroicons/react/24/outline';
import SearchBar from './Searchbar/SearchBar';
import { SearchResultsList } from './Searchbar/SearchResultsList';
import PermissionGates from '../_utils/PermissionGates';

type RecipeArticleEditProps = {
    recipe_id: number,
    articles_recipe : ArticleRecipe[],
    handleStateChange: any,
}

const RecipeArticleEdit = ({recipe_id, articles_recipe, handleStateChange} : RecipeArticleEditProps) => {
    const [results, setResults] = useState<ArticleSearch[]>([]);
    const [articlesRecipe, setArticlesRecipe] = useState<ArticleRecipe[]>([])
    const [articleDelete, setArticleDelete] = useState<ArticleRecipe>()

    useEffect(() => {    
        setArticlesRecipe(articles_recipe);
    }, [articles_recipe])
    
    const params : ArticleParams = {
        entity_id: recipe_id,
        article_recipe: articleDelete
    }

    const deleteArticleRecipe = useDeleteArticleRecipe(params)

    const handleDeleteArticle = (article: ArticleRecipe) => {
        setArticleDelete(article)
        deleteArticleRecipe.mutate()
        setArticlesRecipe(prevArticles => prevArticles.filter((r) => r.id !== article.id));
      
        handleStateChange(articlesRecipe)
        // articles_recipe = articles_recipe.filter((r) => r.id !== article.id); // Update the state here
    }
    
    const handleChange = (index : number, e : any) => {
        const splited_target = (e.target.name).split('_')
        const id_recipe_target : number = splited_target[splited_target.length - 1]
        let property = e.target.name.replace("_"+id_recipe_target,"")
        const articles = articlesRecipe.slice();
        if(property === "quantity") {
            articles[index] = {
                ...articles[index],
                quantity: e.target.value
              };
        } else if(property === "unit"){
            articles[index] = {
                ...articles[index],
                unit: e.target.value
              };
        }
        setArticlesRecipe(articles)
        handleStateChange(articles)
    }

    return (
    <>
        <h2 className="text-base font-semibold leading-6 text-gray-900">Ingrédients</h2>
                        
        <PermissionGates permission_key='modify_recipe'>
            <div className="relative search-bar-container mt-2">
                <SearchBar setResults={setResults} />
                {results && results.length > 0 && <SearchResultsList handleFrom='ArticleRecipe' results={results} setResults={setResults} entity_id={recipe_id} />}
            </div>
        </PermissionGates>
        <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-4">
            <div className="sm:pr-4 col-span-2">
                <dt className="inline text-gray-700">Nom</dt>
            </div>
            <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-900">Quantité</dt>
            </div>
            <div className="mt-2 sm:mt-0 sm:pl-4">
            </div>
            
            {articlesRecipe && articlesRecipe.map((recipe_article : ArticleRecipe, index : number) => (
                <>
                    {/* {recipe_article.product_name}
                    {recipe_article.label} */}
                    <div key={"label_" + recipe_article.id} className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4 col-span-2">
                        <dt className="font-semibold text-gray-500">{recipe_article?.product_name === null ? recipe_article?.label : recipe_article?.product_name}</dt>
                    </div>      
                    <div key={"quantity_" + recipe_article.id} className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                        <div className='flex direction-row'>

                        <input
                            type="number"
                            name={"quantity_"+recipe_article.article_id}
                            id={"quantity_"+recipe_article.article_id}
                            value={recipe_article.quantity}
                            onChange={(event) => handleChange(index, event)}
                            className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                            />
                        <select
                            id={"unit_"+recipe_article.article_id}
                            name={"unit_"+recipe_article.article_id}
                            value={recipe_article.unit}
                            onChange={(event) => handleChange(index, event)}
                            className="relative block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        >
                            <option>Cuillère à soupe</option>
                            <option>Cuillère à café</option>
                            <option>Once</option>
                            <option>Livre</option>
                            <option>Gramme</option>
                            <option>Kilogramme</option>
                            <option>Pincée</option>
                            <option>Brin</option>
                        </select>
                        </div>
                    </div>          
                    <div key={"delete_" + recipe_article.id} className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                        <span className='cursor-pointer' 
                        onClick={() => handleDeleteArticle(recipe_article)}
                        >
                            <TrashIcon className='text-gray-500  w-6 h-6 mr-2'/>
                        </span>
                    </div>   
                </>            
            ))}
        </dl>
    </>
    );
};

export default RecipeArticleEdit;