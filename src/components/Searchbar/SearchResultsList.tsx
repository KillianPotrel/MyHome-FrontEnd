import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { ArticleSearch, ArticleWarning } from "../../api/Article";

type SearchResultsListProps = {
  handleFrom: string,
  results : ArticleSearch[],
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
  recipe_id?: number
}

export const SearchResultsList = ({ handleFrom, results, setResults, recipe_id } : SearchResultsListProps):JSX.Element => {
  return (
    <div className="absolute z-10 results-list">
      {results.map((result, id) => {
        const article_warning : any = {
          article_id: result.id,
          label: result.product_name,
          is_custom: result.is_custom,
        }
        return <SearchResult handleFrom={handleFrom} result={article_warning} setResults={setResults} recipe_id={recipe_id} key={id} />;
      })}
    </div>
  );
};