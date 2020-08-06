import React,{Component} from "react"
import { View , Platform } from 'react-native';
import Menu from "./MenuComponent"
import DishDetail from "./DishDetails"
import Home from "./Home"
import Contact from "./ContactComponent"
import About from "./AboutComponent"
import { Icon } from 'react-native-elements';
import { createStackNavigator , createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreater'; 
import { SafeAreaView } from 'react-native-safe-area-view';
import Reservation from "./ReservationComponent"


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu ,
      navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon name='menu' size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()}
          />
      }) },
    DishDetail: { screen: DishDetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);
const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  })
});
const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff" ,
      headerLeft: <Icon name="menu" size={24}
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } />    
  
    })
});
const ConatctNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  ,
      headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />    
    })

});

const AboutNavigator = createStackNavigator({
    About: { screen: About }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  ,
      headerLeft: <Icon name="menu" size={24}
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } />    
  })

});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Contact:{
        screen: ConatctNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      },
    },
    About:{
        screen: AboutNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      },
    },
 Reservation: { 
  screen: ReservationNavigator,
  navigationOptions: {
    title: 'Reserve Table',
    drawerLabel: 'Reserve Table',
    drawerIcon: ({ tintColor, focused }) => (
      <Icon
        name='cutlery'
        type='font-awesome'            
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ),
  }
}
}, {
  drawerBackgroundColor: '#D1C4E9'
});


class Main extends Component{

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    console.log(this.props.fetchLeaders());
  }
  
    render(){
    
      
  
        return(

          <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
         
                <MainNavigator />
           </View>
        
          
        )
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);