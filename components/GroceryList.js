import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Modal, KeyboardAvoidingView, TextInput} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import GroceryListModal from "../components/GroceryListModal";

export default class GroceryList extends Component {

    state={
        showListVisible : false

    };
        toggleListModal() {
            this.setState({showListVisible: !this.state.showListVisible})
        }

    render () {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

    return (
    <View>

        <Modal animationType = "slide" 
        visible = {this.state.showListVisible} 
        onRequestClose ={() => this.toggleListModal()}>
        
            <GroceryListModal list={list} 
            closeModal ={() => this.toggleListModal()} 
            updateList={this.props.updateList} />

        </Modal>
        <TouchableOpacity style = {styles.listContainer} onPress= {() => this.toggleListModal()}>
            <Text style ={styles.listTitle} numberofLine={1}>
                {list.listname} 
            </Text>
            <Text style ={styles.listTitle} numberofLine={1}>
                {list.budget} 
            </Text>



        </TouchableOpacity>
    </View>

    );

}

};

const styles = StyleSheet.create({
    listContainer:{
        padding:10,
        marginTop:16,
        borderColor: "#149F98",
        borderWidth: 1,
        borderStyle:"dashed",
        borderRadius:10,
        width:300,
        justifyContent:"center",
        alignItems:'center'
    },
listTitle:{
    fontSize: 20,
    fontWeight: "500",
    marginBottom:10,
    }
})
