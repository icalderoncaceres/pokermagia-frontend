
import Home from '../containers/home/Home';
import RegisterPartyPoker from '../containers/registerPartyPoker/RegisterPartypoker';
import RegisterGGPoker from '../containers/registerGGPoker/RegisterGGpoker';
import RegisterPICHARA from '../containers/registerPICHARA/RegisterPICHARA';
import Player from '../containers/player/Player';
import { Routes, Route } from "react-router-dom";
import PlayerRouter from './Player';
import Add from '../components/player/add/Add';
import Recharges from '../containers/recharges/Recharges';
import Recharge from '../containers/recharges/recharge/Recharge';
import CloseMonth from '../containers/closeMonth/CloseMonth';
import Configuration from '../containers/configuration/Configuration';
import Accounting from '../containers/accounting/Accounting';
import Alerts from '../containers/alerts/Alerts';
import Consolidate from '../containers/closeMonth/consolidate/Consolidate';

function MainRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registerPartyPoker" element={<RegisterPartyPoker />}></Route>
            <Route path="/registerGGPoker" element={<RegisterGGPoker />}></Route>
            <Route path="/registerPICHARA" element={<RegisterPICHARA />}></Route>
            <Route path="/player" element={<Player></Player>}></Route>
            <Route path="/player/add" element={<Add></Add>}></Route>
            <Route path="/player/edit/:id" element={<Add></Add>}></Route>
            <Route path="/recharges" element={<Recharges></Recharges>}></Route>
            <Route path="/recharges/edit/:id/:player/:asker/:approver" element={<Recharge></Recharge>}></Route>
            <Route path="/closeMonth" element={<CloseMonth></CloseMonth>}></Route>
            <Route path="/configuration" element={<Configuration></Configuration>}></Route>
            <Route path="/accounting" element={<Accounting></Accounting>}></Route>
            <Route path="/alerts" element={<Alerts></Alerts>}></Route>
            <Route path="/closeMonth/consolidate/:playerId" element={<Consolidate></Consolidate>}></Route>
        </Routes>
    );
}

export default MainRouter;