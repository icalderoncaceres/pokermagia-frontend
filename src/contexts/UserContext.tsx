
import { createContext } from 'react';

const UserContext = createContext({
    id: 0,
    name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
    avatar: 'null',
    room: ''
});

export default UserContext;
