import React from 'react';

type ModalMealProps = {
    meal_id: number
}

const ModalMeal = ({meal_id} : ModalMealProps) => {
    console.log("C'est la modal de " + meal_id)
    return (
        <div>
            
        </div>
    );
};

export default ModalMeal;