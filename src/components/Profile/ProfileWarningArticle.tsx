import React, { useState } from 'react';
import Switch from '../Switch';
import SearchBar from '../Searchbar/SearchBar';
import { SearchResultsList } from '../Searchbar/SearchResultsList';
import { ArticleSearch, ArticleWarning, useDeleteArticleWarning, useManyArticleWarning, usePutArticleWarning } from '../../api/ArticleWarning';
import { TrashIcon } from '@heroicons/react/24/outline';

const ProfileWarningArticle = ():JSX.Element => {
    const [results, setResults] = useState<ArticleSearch[]>([]);
    const { data: dataWarning } = useManyArticleWarning()
    const articlesWarning : ArticleWarning[] = dataWarning?.data

    const deleteArticleWarning = useDeleteArticleWarning()
    const updateArticleWarning = usePutArticleWarning()

    const handleDelete = (article: ArticleWarning) => {
        deleteArticleWarning.mutate(article)
    }

    const handleUpdate = (article: ArticleWarning) => {
      updateArticleWarning.mutate(article)
    }
    

    return (
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">Aliment à surveiller</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Informez les autres utilisateurs des articles que vous n'aimez pas ou de ceux auxquels vous êtes allergiques.
          </p>
        </div>

        <div className="col-start-2 col-span-2">          
          <div className="relative search-bar-container">
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} />}
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Nom de l'aliment (ou article)
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        <div className='text-base font-semibold leading-7 text-black'>
                          </div>N'aime pas ou allergique
                        <div className='mt-1 text-xs leading-6 text-gray-400'>(Coché pour allergique et non coché pour n'aime pas)</div>
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(articlesWarning && articlesWarning?.length > 0) && articlesWarning.map((article) => (
                      <tr key={article.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {article.label}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                          <Switch 
                            id={article.id} 
                            category="article" 
                            isChecked={ article.is_allergic === 0 ? false : true } 
                            handleClick={() => {
                              handleUpdate(article)
                            }} />
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                          <span className='cursor-pointer' onClick={() => handleDelete(article)}>
                            <TrashIcon className='text-gray-500  w-6 h-6 mr-2'/>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
};

export default ProfileWarningArticle;