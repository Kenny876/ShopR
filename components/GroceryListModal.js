import React, { Component } from "react";
import {View, Text, StyleSheet,SafeAreaView,TouchableOpacity,FlatList,KeyboardAvoidingView,TextInput,Keyboard,Animated} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import { Colors } from "react-native/Libraries/NewAppScreen";

Icon.loadFont();

export default class GroceryListModal extends Component {
    state ={
        newTodo: ""
    };

    toggleTodoCompleted = index => {
        let list =this.props.list
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    addTodo = ()=> {
        let list = this.props.list
        list.todos.push({title: this.state.newTodo, completed: false})

        this.props.updateList(list)
        this.setState ({newTodo: ""}); 

        Keyboard.dismiss();
    }

    deleteTodo = index => {
        let list = this.props.list
        list.todos.splice(index, 1)

        this.props.updateList(list);
    }



    renderTodo = (todo, index)=> {
        return (
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
            <View style= {styles.groceryContainer}>
                <TouchableOpacity onPress={()=> this.toggleTodoCompleted(index)}>
                    <Icon 
                    name ={todo.completed ? "ios-square" : "ios-square-outline"}
                     size={24} 
                     color = "#808080" 
                     style={{width:32}}
                     />
                </TouchableOpacity>

                <Text style ={[styles.items,
                {textDecorationLine: todo.completed ? "line-through" : "none",
                color: todo.completed ? "grey" :"black" }
                ]}  >
                {todo.title}
                 </Text>
            </View>
            </Swipeable>
        );
    };

        rightActions = (dragX,index) => {
            const scale = dragX.interpolate ({
                inputRange: [-100,-20,0],
                outputRange: [1,0.9,0],
                extrapolate: "clamp"
            })

            const opacity = dragX.interpolate ({
                inputRange: [-100,0],
                outputRange: [1,0.9],
                extrapolate: "clamp"
            })


            return (
                <TouchableOpacity onPress= {()=> this.deleteTodo (index)}>
                    <Animated.View style ={styles.deleteButton}>
                       <Animated.Text style = {{color: "white", fontWeight: "800", transform:[{scale}] }}>
                       Delete
                       </Animated.Text>
                            
                    </Animated.View>
                </TouchableOpacity>
            );
        };
    // 
    render () {
            const list = this.props.list
            const itemCount = list.todos.length;
            const completedCount = list.todos.filter(todo => todo.completed).length;



        return (
            <KeyboardAvoidingView style ={{flex : 1}} behavior="padding"> 
            <SafeAreaView style = {styles.container}>
                <TouchableOpacity style = {{ position: "absolute", top:64,right :32, zIndex:10}} 
                onPress={this.props.closeModal}>
               <Icon name="ios-close" size={30} color="black" />
                
                </TouchableOpacity>

                <View style={[styles.section, styles.header]}>
                    <View>
                    <Text style ={styles.title} >{list.listname}</Text>
                    <Text style ={styles.itemCount}>
                        {completedCount} of {itemCount} Items
                    </Text>
                </View>
                </View>

                

                <View style = {[styles.section, {flex: 3}]}>
                    <FlatList 
                    data={list.todos}
                    renderItem={({item,index}) => this.renderTodo(item , index)}
                    keyExtractor={item => item.title} 
                    contentContainerStyle ={{paddingHorizontal:32, paddingVertical:64}}
                    showsVerticalScrollIndicator={false}/>
                </View>
            <View style ={[styles.section, styles.footer]} >
                <TextInput style={styles.input} 
                onChangeText= {text => this.setState ({newTodo: text})} 
                value={this.state.newTodo} 
                placeholder="Enter Name of Item"
                keyboardS/>

                <TouchableOpacity style={styles.addGrocery} onPress={() => this.addTodo()}>
                    <Text style={styles.addButton}>Add</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
        );

    }
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center"
    },
    section: {
        alignSelf: 'stretch'
    },
    header:{
        justifyContent: "flex-end",
        marginLeft:64,
        borderBottomWidth:3,
        borderBottomColor:'#CC2D6F',
        paddingTop: 16
    },
    title: {
        fontSize:28,
        fontWeight:'700',
    },
    itemCount:{
        marginTop: 4,
        marginBottom: 16,
        color: "grey",
        fontWeight:"600"
    },
     footer: {
         paddingHorizontal: 32,
         flexDirection: "row",
         alignItems: "center",
         paddingVertical: 16
     },
     input: {
         flex:1,
         height:48,
         borderWidth: StyleSheet.hairlineWidth,
         borderRadius: 6,
         marginRight: 8,
         paddingHorizontal: 8,
         borderColor: "#CC2D6F"
     },
     addGrocery : {
         borderRadius: 4,
         padding:16,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: "#CC2D6F"
     },
     addButton :{
         fontWeight:"700",
         color: "white"
     },
     groceryContainer: {
         paddingVertical: 16,
         flexDirection:"row",
         alignItems: "center",
         paddingLeft: 32
     },
     close: {
        fontSize: 18,
        fontWeight: "700"
    },
    items: {
        color:'black',
        fontWeight:'600'
    },
    deleteButton:{
        flex:1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    deleteText:{
        
       
    }
    
});