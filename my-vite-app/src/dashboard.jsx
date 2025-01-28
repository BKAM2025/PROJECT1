import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SignUp from './componet/singUpAdmin';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
                <SignUp />
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
