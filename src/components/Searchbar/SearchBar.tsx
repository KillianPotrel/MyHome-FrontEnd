import React, { useEffect, useState } from "react";

import "./SearchBar.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArticleSearch, useManyArticleSearch } from "../../api/ArticleWarning";
import { URL_API } from "../../services/key";
import axios from "axios";
import { accountService } from "../../services/account.service";

type SearchBarProps = {
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
}

const SearchBar = ({ setResults } :  SearchBarProps) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData(input)
  }, [input])

  const fetchData = (value : string) => {
    if(value.length > 0){
      axios.get(URL_API + "getArticleBySearch", { params: { 
        token: accountService.getToken(),
        search: value,
      }}).then((res) => {
        if(res.data.length === 0){
          const article : ArticleSearch = {
            product_name: input
          }
          setResults([article])
        } else {
          setResults(res.data)
        }
      })
    } else {
      setResults([])
    }

    // fetch(URL_API + "getArticleBySearch", params : { })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     const results = json.filter((user) => {
    //       return (
    //         value &&
    //         user &&
    //         user.name &&
    //         user.name.toLowerCase().includes(value)
    //       );
    //     });
    //     setResults(results);
    //   });
  };
  
  const handleChange = (value : string) => {
    setInput(value);
    //fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <MagnifyingGlassIcon className='text-gray-500  w-6 h-6 mr-2' />
      <input
        className="input-searchbar"
        placeholder="Rechercher un article..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;