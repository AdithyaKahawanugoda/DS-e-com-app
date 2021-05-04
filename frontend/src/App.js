import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import CustomerProfileScreen from "./screens/CustomerProfileScreen";
import SellerProfileScreen from "./screens/SellerProfileScreen";
import AdminProfileScreen from "./screens/AdminProfileScreen";

const App = () => {
  return (
    <BRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
        <Switch>
          <Route exact path="/registration" component={RegistrationScreen} />
        </Switch>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
        </Switch>
        <Switch>
          <Route exact path="/admin/login" component={AdminLoginScreen} />
        </Switch>
        <Switch>
          <Route
            exact
            path="/profile/customer"
            component={CustomerProfileScreen}
          />
        </Switch>
        <Switch>
          <Route exact path="/profile/seller" component={SellerProfileScreen} />
        </Switch>
        <Switch>
          <Route exact path="/profile/admin" component={AdminProfileScreen} />
        </Switch>
      </main>
      <Footer />
    </BRouter>
  );
};

export default App;
