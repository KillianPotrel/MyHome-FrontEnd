import React, {useState} from 'react';
import { ArticleShopping, usePutArticleShopping } from '../api/Article';

type ShoppingQuantityInputProps = {
    shopping_id: number, 
    article_shopping: ArticleShopping
}

const ShoppingQuantityInput = ({shopping_id, article_shopping} :ShoppingQuantityInputProps) : JSX.Element => {
    const putArticleShopping = usePutArticleShopping(shopping_id)
    
    const [quantity, setQuantity] = useState(article_shopping.quantity);
    const handleQuantityBlur = (event: React.FocusEvent<HTMLInputElement>, article: ArticleShopping) => {
        const updatedArticle: ArticleShopping = { ...article, quantity: quantity };
        putArticleShopping.mutate(updatedArticle);
      };
    const handleChange = (e : any) => {
        setQuantity(parseFloat(e.target.value))
    };
    return (
        <input
            type="number"
            name={"quantity_" + article_shopping.article_id}
            id={"quantity_" + article_shopping.article_id}
            value={quantity.toString()}
            onBlur={(event) => handleQuantityBlur(event, article_shopping)}
            onChange={handleChange}
            className="block text-center w-32 mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
            />
    );
};

export default ShoppingQuantityInput;