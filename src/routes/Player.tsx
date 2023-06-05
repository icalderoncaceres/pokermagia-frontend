
import List from '../components/player/list/List';
import Add from '../components/player/add/Add';
import { Routes, Route } from "react-router-dom";

function PlayerRouter() {
    return (
        <Routes>
            <Route path="/" element={<List></List>}></Route>
            <Route path="/add" element={<Add></Add>}></Route>
        </Routes>
    )
}

export default PlayerRouter;