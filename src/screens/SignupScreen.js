import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { signup } from "../api/authApi"; // Import API function
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setLoading(true);
        setError("");

        try {
            await signup(name, email, password);
            navigation.navigate("Login");
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <ImageBackground style={styles.background}>
            <View style={styles.overlay}>
                <Animatable.View animation="fadeInDownBig" duration={1000} style={styles.card}>
                    <Text style={styles.title}>Create an Account</Text>

                    <Animatable.View animation="fadeIn" delay={300} style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#bbb"
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeIn" delay={500} style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#bbb"
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeIn" delay={700} style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#bbb"
                        />
                    </Animatable.View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity onPress={handleSignup} style={styles.button}>
                        <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradientButton}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.signupTextContainer}>
                        <Text style={styles.signupText}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5,
    },
    input: {
        height: 45,
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        paddingHorizontal: 15,
        color: "#333",
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    gradientButton: {
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 14,
    },
    signupTextContainer: {
        marginTop: 15,
        alignItems: "center",
    },
    signupText: {
        color: "#2575fc",
        fontWeight: "bold",
    },
});

export default SignupScreen;
