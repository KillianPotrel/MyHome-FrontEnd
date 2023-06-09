import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { ArticleSearch, ArticleWarning } from "../../api/ArticleWarning";

type SearchResultsListProps = {
  results : ArticleSearch[],
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
}

export const SearchResultsList = ({ results, setResults } : SearchResultsListProps):JSX.Element => {
  return (
    <div className="absolute z-10 results-list">
      {results.map((result, id) => {
        const articl_warning : ArticleWarning = {
          article_id: result.id,
          label: result.product_name,
          is_custom: result.is_custom,
        }
        return <SearchResult result={articl_warning} setResults={setResults} key={id} />;
      })}
    </div>
  );
};