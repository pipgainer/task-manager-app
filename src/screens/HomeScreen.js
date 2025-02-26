import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getTasks, deleteTask } from "../api/taskApi";
import { AuthContext } from "../context/AuthContext";
import { AntDesign, Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", fetchTasks);
        return unsubscribe;
    }, [navigation]);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (taskId) => {
        Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        await deleteTask(taskId);
                        fetchTasks(); // Refresh the list
                    } catch (error) {
                        console.error("Error deleting task:", error.response?.data || error.message);
                    }
                },
                style: "destructive",
            },
        ]);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTasks(); // Re-fetch tasks
        setRefreshing(false);
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskContainer}>
            <View style={styles.taskTextContainer}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskDate}>Created on: {new Date(item.createdAt).toDateString()}</Text>
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => navigation.navigate("TaskDetail", { task: item, edit: "true" })} style={styles.iconButton}>
                    <Feather name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.iconButton}>
                    <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id}
                renderItem={renderTask}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("TaskDetail", { edit: "false" })}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    taskDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 3,
    },
    taskDate: {
        fontSize: 12,
        color: "#888",
        marginTop: 5,
    },
    taskActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 10,
        padding: 5,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
    floatingButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#007BFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
});

export default HomeScreen;
