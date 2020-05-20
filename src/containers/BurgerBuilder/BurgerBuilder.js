import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 1.29,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((partial_sum, num) => {
            return partial_sum + num;
        }, 0);
        // console.log("Hellothere",sum>0, sum)

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
       
        if (this.state.ingredients[type] > 0){
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
        } 
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelhandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You Continue!');
    };


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCancel={this.purchaseCancelhandler}
                        purchaseContinue={this.purchaseContinueHandler} 
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;