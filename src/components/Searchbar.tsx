import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, {useState, useEffect} from 'react';
import { ArticleSearch, useManyArticleSearch } from '../api/ArticleWarning';

const Searchbar = ():JSX.Element => {
    const [textInput, setTextInput] = useState("")
    const [compteur, setCompteur] = useState(1)
    const [styleResult, setStyleResult] = useState("none");
    const [resultSearch, setResultSearch] = useState<ArticleSearch[]>([]);

    const go_search = false
    let dataSearch : any
    useEffect(() => {
        if(go_search) {
            //dataSearch = useManyArticleSearch(textInput).data
        }
    }, [go_search])

    const handleSearchbar = (e : any)  => {
        setCompteur(compteur+1)
        setTextInput(e.target.value)
        if(compteur >= 2){
            search()
            setStyleResult("block")
            //useMany
            setCompteur(0)
        }
        if(textInput.length === 0){
            setCompteur(0)
            setStyleResult("none")
        }
    }

    
    const search = () => {
        setResultSearch(dataSearch?.data)
    }

    return (
        <div className="flex items-start  w-full max-w-screen-xl mx-auto">
            <div className="flex justify-center w-full py-10">
                <div className="w-full relative ">
                    <div className="flex items-center bg-gray-200 rounded-md">
                        <div className="pl-2">
                            <MagnifyingGlassIcon className='text-gray-500  w-6 h-6 mr-2' />
                        </div>
                        <input
                            className="w-full block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                            id="search"
                            value={textInput}
                            onChange={handleSearchbar} 
                            type="text" 
                            placeholder="Rechercher un aliment" />
                    </div>
                    <div className="absolute w-full bg-white shadow-md rounded-lg px-3 py-2 mb-4"
                            style={{display: styleResult}}>
                        {(resultSearch !== undefined || resultSearch?.length > 0) && resultSearch.map((result) => (
                            <div key={result.id} className="py-3 text-sm">
                                <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                    <div className="flex-grow font-medium px-2">{result.product_name}</div>
                                    <div className="text-sm font-normal text-gray-500 tracking-wide">Ajouter</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;