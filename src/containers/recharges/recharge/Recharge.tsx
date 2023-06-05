
import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import { IRecharge } from '../../../services/recharges/Recharges.model';
import { get, approved } from '../../../services/recharges/RechargeService';
import userUser from '../../../hooks/useUser';

function Recharge() {
    const {id,player,asker,approver} = useParams();
    const initialState: IRecharge = {
        id: id || -1,
        date: '',
        player: -1,
        asker: -1,
        approver: -1,
        reason: '',
        state: '',
        amount: 0
    }
    const [data, setData] = useState<IRecharge>(initialState);
    const [message, setMessage] = useState<string>("");
    const user = userUser();
    const doApproved = async () => {
        try {
            const id = typeof data.id === "string" ? +data.id : data.id;
            const response = await approved({id, approver:  user.id, playerId: data.player, amount: data.amount} );
            if (response.status === 200) {
                setMessage("La recarga ha sido procesada exitosamente, a aprtir de ahora se vera reflejada en la contabilidad");
                setData({
                    ...data,
                    state: 'APROBADA'
                });
            } else {
                setMessage("Se presentó un error al guardar, por favor intentelo de nuevo");
            }
        } catch (error) {
            setMessage("Se presentó un error al guardar, por favor intentelo de nuevo");
        }
    }

    useEffect(() => {
        (async() => {
            try {
                const response = await get({id: id ? +id : -1});
                if (response.status === 200 && response.data){
                    setData(response.data);
                }
            } catch (error) {
                console.log('Bad response:', error);
            }
        })();
    }, []);

    let btn;
    if (data.state === 'PENDIENTE') {
        btn = <button className="btn btn-lg btn-primary" onClick={() => doApproved()}>Aprobar</button>
    }
    let alert;
    if (message) {
        alert = <div className="alert alert-primary" role="alert">
            {message}
        </div>
    }
    return (
        <div className="ml-2">
            <div className="row">
                <div className="col-4">
                    <h1>Recarga #</h1> 
                </div>
                <div className="col-8">
                    <h1>
                        <span className="badge bg-primary text-light">{data.id}</span>
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Fecha de la solicitud</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{data.date}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Quien la solicitó</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{asker}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Quien la confirmó</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{approver}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Motivo de la solicitud</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{data.reason}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Estado de la recarga</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{data.state}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Monto de la recarga</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{data.amount}</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h1>Jugador</h1>
                </div>
                <div className="col-8">
                    <h1><span className="badge bg-primary text-light">{player}</span></h1>
                </div>
            </div>
            <hr />
            <div className="d-grid gap-2">
                {btn}
            </div>
            <hr/>
            {alert}
            
        </div>
    )
}

export default Recharge;