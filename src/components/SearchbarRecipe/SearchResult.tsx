import React from "react";
import "./SearchResult.css";
import { ArticleSearch, } from "../../api/Article";
import { RecipeMealParams, usePostRecipeMeal } from "../../api/Meal";
import { Recipe } from "../../api/Recipe";

type SearchResultProps = {
  result : any,
  setResults : React.Dispatch<React.SetStateAction<Recipe[]>>
  meal_id?: number
}
export const SearchResult = ({ result, setResults, meal_id } : SearchResultProps) => {
  // const params : ArticleParams = {
  //   meal_id,
  //   article_recipe: result
  // }
  const postRecipeMeal = usePostRecipeMeal(meal_id)

  const handleSubmit = () => {
    const params : RecipeMealParams = {
      meal_id,
      recipe_id : result.recipe_id,
      is_custom: result.is_custom,
      label: result.label
    }
    postRecipeMeal.mutate(params)
    setResults([])
  }

  return (
    <div
      className="search-result"
      onClick={handleSubmit}
    >
      {result.product_name || result.label}
    </div>
  );
};