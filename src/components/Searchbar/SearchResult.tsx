import React from "react";
import "./SearchResult.css";
import { ArticleSearch, ArticleWarning, usePostArticleWarning } from "../../api/Article";

type SearchResultProps = {
  result : ArticleWarning,
  setResults : React.Dispatch<React.SetStateAction<ArticleSearch[]>>
}
export const SearchResult = ({ result, setResults } : SearchResultProps) => {
  const postArticleWarning = usePostArticleWarning()
  const handleSubmit = () => {
    postArticleWarning.mutate(result)
    setResults([])
  }

  return (
    <div
      className="search-result"
      onClick={handleSubmit}
    >
      {result.label}
    </div>
  );
};