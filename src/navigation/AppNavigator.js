import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity, Text, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { AuthContext } from "../context/AuthContext";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();
const PRIMARY_COLOR = "#007AFF"; // Change this to your preferred primary color

const AppNavigator = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            {/* Set Status Bar Color */}
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />

            <NavigationContainer>
                <Stack.Navigator>
                    {user ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    title: "Task Manager",
                                    headerStyle: { backgroundColor: PRIMARY_COLOR },
                                    headerTintColor: "#fff",
                                    headerRight: () => (
                                        <TouchableOpacity onPress={logout} style={{ marginRight: 15, flexDirection: "row", alignItems: "center" }}>
                                            <Ionicons name="log-out-outline" size={24} color="white" />
                                            <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}>Logout</Text>
                                        </TouchableOpacity>
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name="TaskDetail"
                                component={TaskDetailScreen}
                                options={{
                                    title: "Task Details",
                                    headerStyle: { backgroundColor: PRIMARY_COLOR },
                                    headerTintColor: "#fff",
                                    headerRight: () => (
                                        <TouchableOpacity onPress={logout} style={{ marginRight: 15, flexDirection: "row", alignItems: "center" }}>
                                            <Ionicons name="log-out-outline" size={24} color="white" />
                                            <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}>Logout</Text>
                                        </TouchableOpacity>
                                    ),
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default AppNavigator;
