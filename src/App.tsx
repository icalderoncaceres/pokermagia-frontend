
import {useState, useEffect} from 'react';

import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import UserContext from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { autoLogin } from './services/users/UserService';
import { IAutoLoginUserResponse } from './services/users/UserService.model';

function App() {
    let page;
    const initialState = {
        id: -1,
        name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
        avatar: '',
        room: ''
    };
    const [userData, setUserData] = useState(initialState);
    if (localStorage.getItem('user') && localStorage.getItem('token') && userData.id >= 0) {
        page = <UserContext.Provider value={userData}> <Main></Main></UserContext.Provider>;
    } else {
        page = <Login></Login>;
    }

    useEffect(() => {
        (async () => {
            try {                
                const response: IAutoLoginUserResponse = await autoLogin({token: localStorage.getItem('token') || '', email: localStorage.getItem('user') || ''});
                if (response.status === 200 && response.data) {
                    const userData2 = {
                        id: response.data.user ? response.data.user.id : -1,
                        name: response.data.user ? response.data.user.name : '',
                        last_name: response.data.user ? response.data.user.last_name : '',
                        email: response.data.user ? response.data.user.email : '',
                        password: response.data.user ? response.data.user.password : '',
                        role: response.data.user ? response.data.user.role : '',
                        avatar: response.data.user ? response.data.user.avatar : '',
                        room: response.data.user ? response.data.user.room : ''
                    }
                    setUserData(userData2);
                }
            } catch (error) {
                console.log("Error"); 
            }
        })();
    }, []);

    return (
        <BrowserRouter>
            {page}
        </BrowserRouter>
    );
}

export default App;
