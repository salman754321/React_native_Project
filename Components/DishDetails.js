import React ,{Component} from "react"
import {View,Text} from 'react-native'
import {Card} from "react-native-elements"
import { DISHES } from "../shared/dishes"
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
    console.log(dishes)
  }

function RendeerDish(props){
    const dish=props.dish;
    console.log(dish);
    if(dish!=null){
return(
        <Card
            featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}
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
    
    static navigationOptions = {
        title: 'DishDetail'
    };
    render(){
        const dishId=this.props.navigation.getParam("dishid","");
      console.table(this.props.dishes.dishes[+dishId]);
    return(<RendeerDish dish={this.props.dishes.dishes[+dishId]} />);
    }
}
export default connect(mapStateToProps)(DishDetail);