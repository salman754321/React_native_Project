import React ,{Component} from "react"
import {View,Text,ScrollView,FlatList, Modal,StyleSheet ,Button,Alert,PanResponder} from 'react-native'

import { Card, Icon,Rating,Input  } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreater';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
    
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
})

handleViewRef=ref=>this.view=ref
const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
        return true;
    else
        return false;
        
}
const recognizeCommentDrag = ({ dx }) => {
    if (dx > 200) return true; // Left to right
    return false;
  };



  function RenderDish(props) {

    const dish = props.dish;
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)){
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
                } else if (recognizeCommentDrag(gestureState)) {
                    props.openCommentForm();
                  }
            return true;
        }
    })
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
 
                    <Icon
                   
                        raised
                        reverse
                        name = { props.favorite ? 'heart' : 'heart-o' }
                        type = 'font-awesome'
                        color = '#f50'
                        onPress = {() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                         <Icon
                         
                        raised
                        reverse
                        name =  "edit"
                        type = 'font-awesome'
                        color = '#f50'
                        onPress = {() => props.openCommentForm()}
                        />
                        </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key = {index} style = {{margin: 10}}>
                <Text style = {{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Text style = {{fontSize: 12}}>
                    {item.rating} Stars
                </Text>
                <Text style = {{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title = "Comments">
            <FlatList
                data = { comments }
                renderItem = { renderCommentItem }
                keyExtractor = { item => item.id.toString()}
                />
        </Card>
        </Animatable.View>
    );
}
class DishDetail extends Component{
    
    static navigationOptions = {
        title: 'DishDetail'
    };
    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: false,
            rating: 3,
            author: '',
            comment: '',
        };
        this.openCommentForm=this.openCommentForm.bind(this);
    }

    resetCommentForm(){
        this.setState({
            showCommentForm: false,
            rating: 3,
            author: '',
            comment: '',
        });
    }

    handleComment(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetCommentForm();
    }

    openCommentForm(){
        this.setState({showCommentForm: true})
    }

    setRating(rating) {
        this.setState({rating})
    }

    setAuthor(author) {
        this.setState({author})
    }

    setComment(comment) {
        this.setState({comment})
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }


    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                     favorite={this.props.favorites.some(el => el === dishId)}
                    onPress = {() => this.markFavorite(dishId)}
                    openCommentForm={() => this.openCommentForm()}
                    />
              
           <Modal
           animationType={'slide'}
                    transparent={false}
                    visible={this.state.showCommentForm}
                    onDismiss={() => {this.resetCommentForm()}}
                    onRequestClose={() => {this.resetCommentForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add Your Comment</Text>
                        <Rating 
                            minValue={1}
                            startingValue={3}
                            fractions={0}
                            showRating={true}
                            onFinishRating={(rating) => this.setRating(rating)}
                        />
                        <Input 
                            placeholder="Author"
                            leftIcon={
                                <Icon 
                                    name='user'
                                    type='font-awesome'
                                />
                            }
                            onChangeText={(author) => this.setAuthor(author)}
                        />
                        <Input 
                            placeholder="Comment"
                            leftIcon={
                                <Icon 
                                    name='comment'
                                    type='font-awesome'
                                />
                            }
                            onChangeText={(comment) => this.setComment(comment)}
                        />                        
                        <Button
                            onPress={() => {this.handleComment(dishId)}}
                            color='#512DA8'
                            title='SUBMIT'
                        />
                        <Button
                            onPress={() => {this.resetCommentForm()}}
                            color='#6c757d'
                            title='CANCEL'
                        />
                    </View>
           </Modal>
           <RenderComments
            comments = {this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
             />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
   
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color:  'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);