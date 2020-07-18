import React ,{Component} from "react"
import {View,Text} from 'react-native'
import {Card} from "react-native-elements"
import { DISHES } from "../shared/dishes"

function RendeerDish(props){
    const dish=props.dish;
    console.log(dish);
    if(dish!=null){
return(
        <Card
            featuredTitle={dish.name}
            image={require("./images/uthappizza.png/")}
        >
            <Text style={{margin:10, fontSize:40,color:"#000"}}>
                {dish.description}
            </Text>
        </Card>)
    }else{
        return (
            <View></View>
        )
    }   

}
class DishDetail extends Component{
    constructor(props){
        super(props);
       this.state={
            dishes:DISHES,
           
        }
       
    };
    static navigationOptions = {
        title: 'DishDetail'
    };
    render(){
        const dishId=this.props.navigation.getParam("dishid","");
        console.log(dishId)
    return(<RendeerDish dish={this.state.dishes[+dishId]} />);
    }
}
export default DishDetail;