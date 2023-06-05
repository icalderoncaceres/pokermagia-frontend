
import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { index } from '../../../services/players/PlayerService';
import Table  from '../table/Table';

function List() {

    interface IPlayer {
        id?: number | string
        name: string
        last_name: string
        email: string
        room: string
        level: string
        phone: string
        country: string
        notes: string
        state: string
    }

    const [list,setList] = useState<IPlayer[]>([]);

    useEffect(() => {
        (async() => {
            try {                
                const response = await index({});
                if (response.status === 200 && response.players) {
                    setList(response.players);
                }
            } catch (error) {
                console.log(error);
            }

        })();
    }, []);
    return (
        <React.Fragment>
            <div className='ml-3'>
                <h1 className="h3 mb-2 text-gray-800">JUGADORES</h1>
                <p className="mb-4">Lista de jugadores de POKERMAGIA, AQUÍ PODRA VER TODOS LOS JUGADORES ADEMAS DE EDITARLES SUS DATOS, DARLE DE BAJA, DESACTIVARLOS TEMPORALMENTE ADEMAS DE AGREGAR NUEVOS JUGADORES.</p>
            </div>
            <NavLink to={"/player/add"} className="btn btn-primary btn-icon-split ml-3">
                <span className="icon text-white-50">
                    <i className="fas fa-flag"></i>
                </span>
                <span className="text">Nuevo Jugador</span>
            </NavLink>
            <hr />
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Jugadores</h6>
                </div>
                <div className="card-body">
                    <Table list={list}></Table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default List;