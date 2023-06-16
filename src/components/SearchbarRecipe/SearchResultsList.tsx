import React from "react";
import "./SearchResultsList.css";
import { ArticleSearch, ArticleWarning } from "../../api/Article";
import { SearchResult } from "./SearchResult";
import { Recipe } from "../../api/Recipe";

type SearchResultsListProps = {
  results : Recipe[],
  setResults : React.Dispatch<React.SetStateAction<Recipe[]>>
  meal_id: number
}

export const SearchResultsList = ({ results, setResults, meal_id } : SearchResultsListProps):JSX.Element => {
  return (
    <div className="absolute z-10 results-list">
      {results.map((result, id) => {
        const recipe : any = {
          recipe_id: result.id,
          label: result.title,
          is_custom: result.is_custom,
        }
        return <SearchResult result={recipe} setResults={setResults} meal_id={meal_id} key={id} />;
      })}
    </div>
  );
};