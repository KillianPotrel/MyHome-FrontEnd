import React from "react";
import "./SearchResult.css";
import { ArticleRecipe, ArticleParams, ArticleSearch, ArticleWarning, usePostArticleRecipe, usePostArticleWarning, usePostArticleShopping, ArticleShopping } from "../../api/Article";

type SearchResultProps = {
  handleFrom : string,
  result : any,
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
  entity_id?: number
}
export const SearchResult = ({ handleFrom, result, setResults, entity_id } : SearchResultProps) => {
  const postArticleWarning = usePostArticleWarning()
  const paramsRecipe : ArticleParams = {
    entity_id : entity_id,
    article_recipe: result
  }
  const postArticleRecipe = usePostArticleRecipe(paramsRecipe)

  const paramsShopping : ArticleParams = {
    entity_id : entity_id,
    article_shopping: result
  }
  const postArticleShopping = usePostArticleShopping(paramsShopping)

  const handleSubmit = () => {
    if(handleFrom === "ArticleWarning"){
      postArticleWarning.mutate(result)
    } else if (handleFrom === "ArticleRecipe") {
      postArticleRecipe.mutate()
    } else if(handleFrom === "ArticleShopping") {
      postArticleShopping.mutate()
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