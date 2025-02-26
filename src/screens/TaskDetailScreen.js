import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { updateTask, deleteTask, createTask } from "../api/taskApi";

const TaskDetailScreen = ({ route, navigation }) => {
    const { task, edit } = route.params;
    const [title, setTitle] = useState(task?.title ?? "");
    const [description, setDescription] = useState(task?.description ?? "");

    const updateTaskAlert = async () => {
        Alert.alert(
            "Confirm Update",
            "Are you sure you want to update this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update",
                    onPress: async () => {
                        try {
                            await updateTask(task._id, title, description)
                            navigation.goBack();
                        } catch (error) {
                            console.error("Update Task Error", error.response?.data || error.message);
                        }
                    },
                },
            ]
        );
    };

    const addTask = async () => {
        try {
            const createTaskApi = await createTask(title, description);
            navigation.goBack();
        } catch (error) {
            console.error("Add Task Error", error.response?.data || error.message);
        }
    };

    const deleteTaskAlert = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteTask(task._id);
                            await navigation.goBack();
                        } catch (error) {
                            console.error("Delete Task Error", error.response?.data || error.message);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput placeholder="Enter Task Title" value={title} onChangeText={setTitle} style={styles.input} />

            <Text style={styles.label}>Description:</Text>
            <TextInput placeholder="Enter Task Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />

            {edit == "false" && <TouchableOpacity style={styles.updateButton} onPress={addTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>}

            {edit == "true" && <TouchableOpacity style={styles.updateButton} onPress={updateTaskAlert}>
                <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>}

            {edit == "true" && <TouchableOpacity style={styles.deleteButton} onPress={deleteTaskAlert}>
                <Text style={styles.buttonText}>Delete Task</Text>
            </TouchableOpacity>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        marginTop: 5,
    },
    updateButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TaskDetailScreen;
