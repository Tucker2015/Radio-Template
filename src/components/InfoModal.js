import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Icon } from "react-native-elements";

const ModalView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  

  return (
      <>
      <View>
          <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon name="info" type="feather" color="#000" size={25}/>
      </TouchableOpacity>
      </View>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>PCR Radio App</Text>
            <Text style={styles.modalText}>Created By Kevin Tucker</Text>
            <Image
          style={styles.tinyLogo}
          source={require('../assets/beta.png')}
        />

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Khand-Regular"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Khand-Regular"
  },
  icon: {
      
  }
});

export default ModalView;
