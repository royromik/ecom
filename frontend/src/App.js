import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ProductScreen from "./Screens/ProductScreen";

function App() {
  return (
    <Router>
        <Header />
        <Container>
          <main className="py-3">
            <Routes>
              <Route path="/" Component={HomeScreen} />
              <Route path="/login" Component={LoginScreen}/>  
              <Route path="/register" Component={RegisterScreen}/>
              <Route path="/profile" Component={ProfileScreen}/>
              <Route path="/product/:id" Component={ProductScreen}/>
            </Routes>
          </main>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;
