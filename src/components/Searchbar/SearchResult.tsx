import React from "react";
import "./SearchResult.css";
import { ArticleRecipe, ArticleParams, ArticleSearch, ArticleWarning, usePostArticleRecipe, usePostArticleWarning } from "../../api/Article";

type SearchResultProps = {
  handleFrom : string,
  result : any,
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
  recipe_id?: number
}
export const SearchResult = ({ handleFrom, result, setResults, recipe_id } : SearchResultProps) => {
  const postArticleWarning = usePostArticleWarning()

  const params : ArticleParams = {
    recipe_id,
    article_recipe: result
  }
  const postArticleRecipe = usePostArticleRecipe(params)

  const handleSubmit = () => {
    if(handleFrom === "ArticleWarning"){
      postArticleWarning.mutate(result)
    } else if (handleFrom === "ArticleRecipe") {
      postArticleRecipe.mutate()
    }
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