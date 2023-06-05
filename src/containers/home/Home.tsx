
import Sumary from "../../components/home/Sumary";
import Instructions from "../../components/home/Instructions";
import useUser from '../../hooks/useUser';
import { ROLES } from "../../services/users/UserService.model";

function Home() {
    const user = useUser();
    let element;
    if (user.role === ROLES.PLAYER) {
        element = <Instructions></Instructions>;
    } else {
        element = <Sumary></Sumary>  
    }

    
    return (       
        <div className="container-fluid">
            {element}
        </div>
    );
}

export default Home;