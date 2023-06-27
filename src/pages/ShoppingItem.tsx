import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingList, useOneListById } from '../api/ShoppingList';
import { ArticleSearch, ArticleShopping, useCheckArticleShopping, useDeleteArticleShopping, usePutArticleShopping } from '../api/Article';
import SearchBar from '../components/Searchbar/SearchBar';
import { SearchResultsList } from '../components/Searchbar/SearchResultsList';
import ShoppingQuantityInput from '../components/ShoppingQuantityInput';
import Skeleton from 'react-loading-skeleton';
import PermissionGates from '../_utils/PermissionGates';

const ShoppingItem = () : JSX.Element => {
    const { id } = useParams();
    const [results, setResults] = useState<ArticleSearch[]>([]);

    const { data : dataShopping, isLoading : isLoadingShopping } = useOneListById(parseInt(id))
    const shopping : ShoppingList = dataShopping?.data

    const checkArticleShopping = useCheckArticleShopping(parseInt(id))

    const deleteArticleShopping = useDeleteArticleShopping(parseInt(id))
    
    const handleChange = (article : ArticleShopping) => {
        checkArticleShopping.mutate(article)
    }
    // const handleQuantityBlur = (event: React.FocusEvent<HTMLInputElement>, article: ArticleShopping) => {
    //     const updatedArticle: ArticleShopping = { ...article, quantity: quantity };
    //     putArticleShopping.mutate(updatedArticle);
    //   };

    const handleDelete = (article : ArticleShopping) => {
        deleteArticleShopping.mutate(article)
    }
    return (
        <div className="mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
            {isLoadingShopping ? (
              <div className='mt-10'>
                <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
                <Skeleton count={5} />
              </div>
            ) : (
                <>
                    <h3 className='my-5'>{shopping?.archived_at === null ? "Liste courante" : "Liste archivée du " + shopping?.archived_at}</h3>
                    
                    <PermissionGates permission_key='modify_shopping'>
                        <div className="relative search-bar-container mb-7">
                            <SearchBar setResults={setResults} />
                            {results && results.length > 0 && <SearchResultsList handleFrom='ArticleShopping' results={results} setResults={setResults} entity_id={shopping.id} />}
                        </div>
                    </PermissionGates>
                    <ul>
                        {shopping?.shopping_articles.length > 0 ? 
                            shopping?.shopping_articles.map((article_shopping, index) => (
                                <li key={article_shopping.id} className="flex flex-col mb-2">
                                    <div className={shopping.archived_at === null ? `w-full flex flex-row justify-around items-center` : `w-full flex justify-start` }> 
                                        <PermissionGates permission_key='modify_shopping'>
                                            {shopping.archived_at === null &&
                                                <input 
                                                    type="checkbox" 
                                                    className="mr-2 form-checkbox text-amber-600  focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:border-gray-400"
                                                    checked={ article_shopping.checked_at === null ? false : true }
                                                    onChange={() => handleChange(article_shopping)}
                                                    />
                                            }     
                                        </PermissionGates>

                                        <PermissionGates permission_key='modify_shopping'>
                                            <ShoppingQuantityInput shopping_id={parseInt(id)} article_shopping={article_shopping} />
                                        </PermissionGates>
                                        <PermissionGates permission_key='modify_shopping' inversed={true}>
                                            <p>{article_shopping.quantity}</p>
                                        </PermissionGates>
                                        <span className={`text-gray-800 ${article_shopping.checked_at !== null ? "line-through" : ""}`}>{article_shopping?.label}</span>
                                        {article_shopping.is_generate === 1 &&
                                            <span className="mx-5 inline-flex items-center rounded-md bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                Généré
                                            </span>
                                        }
                                        {shopping.archived_at === null &&
                                        
                                            <PermissionGates permission_key='modify_shopping'>
                                                <button 
                                                    className="ml-auto text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(article_shopping)}
                                                    >Supprimer</button>
                                            </PermissionGates>
                                        }
                                    </div>
                                    <div className="w-full border-t border-gray-300 my-3" />
                                </li>    
                            ))
                        : 
                            <h3 className='w-full flex justify-center'>Pas d'articles dans cette liste de course</h3>
                        }
                    </ul>
                </>)}
        </div>
    );
};

export default ShoppingItem;