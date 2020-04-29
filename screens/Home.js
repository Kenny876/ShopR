import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Modal} from 'react-native';
import {Header} from 'native-base';
import * as firebase from "firebase";
import Data from '../Data';
import AddListModal from "../components/AddListModal";
import { FlatList } from 'react-native-gesture-handler';
import GroceryList from "../components/GroceryList";
import Icon from 'react-native-vector-icons/Ionicons';
import Fire from '../Fire';

Icon.loadFont();

export default class Home extends Component {
    state = {
        email: "",
        displayName:"",
        addTodoVisible:false,
        lists: Data
        

        
    };

    toggleAddTodoModal() {
        this.setState({addTodoVisible: !this.state.addTodoVisible})
    }

    renderList = list => {
        return <GroceryList list = {list} updateList={this.updateList}/>
    }

    addList = list => {
        this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length+1, todos:[] }] });
    }

    updateList = list => {
        this.setState({
            lists: this.state.lists.map(item => {
                return item.id ===list.id ? list : item;
            })
        });
    };

    addRow= () =>{
        alert("clicked");
    }

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser;

        this.setState({email, displayName})
}

    

    render() {
        return(
            <View style = {styles.container}>

                <Modal 
                animationType = "slide" 
                visible ={this.state.addTodoVisible} 
                onRequestClose = {() => this.toggleAddTodoModal()}>

                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList= {this.addList}/>
                </Modal>
                <Text style= {styles.greeting }> Hi {this.state.displayName} !</Text>
                
                <View style = {styles.header}>
                <Text style = {styles.shoppingList}>  Shopping Lists</Text>
                </View>
                <TouchableOpacity style={styles.add} onPress= {() => this.toggleAddTodoModal()}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>

                
                <View >
                    <FlatList 
                    data = {this.state.lists} 
                    keyExtractor ={item => item.listname}
                    renderItem={({item}) => this.renderList(item)}
                            />
                        
                        </View>  
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    greeting: {
        marginTop: 50,
        fontSize: 28,
        fontWeight: '600',
        paddingBottom:10
    },
    shoppingList: {
        paddingTop: 10,
        fontSize: 28,
        fontWeight:"600",
        justifyContent: 'center',
        alignItems:"center"
    },
    header: {
        borderBottomWidth:18,
        width:440,
        justifyContent: 'center',
        alignItems:"center",
        borderBottomColor:'#149F98'       
    
    },
    add: {
        position:'absolute',
        width:50,
        height:50,
        backgroundColor: 'blue',
        borderRadius:30,
        bottom:10,
        right:20,
        alignItems:'center',
        justifyContent: 'center'
        
    },
    addText: {
        color:'white',
        fontSize:30,
        fontWeight:'700'
    }


});