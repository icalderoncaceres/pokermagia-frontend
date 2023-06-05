
import { useState, useEffect } from 'react';
import { IUser, ROLES } from '../../services/users/UserService.model';
import { IRecharge } from '../../services/recharges/Recharges.model';
import { create, index } from '../../services/recharges/RechargeService';
import { index as indexPlayers } from '../../services/players/PlayerService';
import { index as indexUsers } from '../../services/users/UserService';
import useUser from '../../hooks/useUser';
import { NavLink } from 'react-router-dom';


function Recharges() {
    const user = useUser();
    const initialData: IRecharge = {
        id: '',
        date: '',
        amount: 0,
        player: -1,
        reason: '',
        asker: user.id,
        approver: user.id,
        state: ''
    }

    const [list, setList] = useState<IRecharge[]>([]);
    const [players, setPlayers] = useState<IUser[]>([]);
    const [admin, setAdmin] = useState<IUser[]>([]);
    const [teachers, setTeachers] = useState<IUser[]>([]);
    const [data, setData] = useState<IRecharge>(initialData);

    const [updatedRefreshList, setUpdateRefreshList] = useState<boolean>(true);
    const [filterList, setFilterList] = useState<{ state: string; player: any; }>({
        state: "",
        player: ""
    });

    const onSave = () => {
        // const response = confirm("Esta seguro de registrar esta recgarga?");
        // if (response) {
        (async () => {
            try {
                const response = await create({ recharge: data });
                if (response.status === 200) {
                    data.player = +data.player;
                    setList(list =>[data, ...list]);
                    setUpdateRefreshList(value => !value);
                    setData(initialData);
                }
            } catch (error) {
                console.log('Error');
            }
        })();
    }

    const onChange = (e: any) => {
        const newData = {
            ...data,
            [e.target.id]: e.target.value
        }
        setData(newData);
    }

    const validate = (): boolean => {
        return data.amount > 0 && data.date !== '' && data.player > -1 && data.reason !== '';
    }

    useEffect(() => {
        (async () => {
            try {
                /*
                const response = await index({});
                if (response.status === 200 && response.list) {
                    setList(response.list);
                }
                */

                const responsePlayer = await indexPlayers({});
                if (responsePlayer.status === 200 && responsePlayer.players) {
                    setPlayers(responsePlayer.players);
                }

                const responseAdmin = await indexUsers({filter: {role: ROLES.ADMIN}});
                if (responseAdmin.status === 200 && responseAdmin.list) {
                    setAdmin(responseAdmin.list);
                }

                const responseTeacher = await indexUsers({filter: {role: ROLES.TEACHER}});
                if (responseTeacher.status === 200 && responseTeacher.list) {
                    setTeachers(responseTeacher.list);
                }
            } catch (error) {
                console.log('Error al traer las recargas', error);
            }
        })();
    }, []);

    useEffect(() => {
        try {
            (async () => {
                const response = await index({});
                if (response.status === 200 && response.list) {
                    setList(response.list);
                    console.log(response.list);
                    
                }
            })();
        } catch (error) {
            console.log('Error al traer las recargas / Actualizar recargas', error);
        }
    }, [updatedRefreshList]);

    useEffect(() => {
        setData(curr => ({ ...curr, asker: user.id, approver: user.id }));
    }, [user]);

    const selectPlayers = <div className="mb-3">
        <select className="form-control" id="player" placeholder="Seleccione" onChange={e => onChange(e)}>
            <option value="-1">Seleccione un jugador</option>
            {
                players.map((player: IUser) => {
                    return (
                        <option value={player.id} key={player.id}>{player.name} {player.last_name}</option>
                    )
                })
            }
        </select>
    </div>

    //FILTROS
    const selectPlayerFilter = <div className="mb-3">
    <select className="form-control" id="player" name="player" placeholder="Seleccione" value={filterList.player} onChange={(e => onHandleSelect(e))}>
        <option value="">Seleccione un jugador</option>
        {
            players.map((player: IUser) => {
                return (
                    <option value={player.id} key={player.id}>{player.name} {player.last_name}</option>
                )
            })
        }
    </select>
    </div>;

    const onHandleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        
        setFilterList({
            ...filterList,
            [e.target.name]: e.target.value
        })
    };

    const doFilter = (recharge: IRecharge): boolean => {
        return (filterList.state === ""  || (filterList.state === recharge.state)) && 
            (filterList.player === "" || (filterList.player == recharge.player))
    }

    const doColours = (state: string): string => {
        return (
            state === "APROBADO" ? "text-primary" 
          : state === "PENDIENTE" ? "text-warning"
          : "text-danger"
          )
    }

    return (<>
        <div className="row mr-1 ml-1">

            <div className="col-md-2">
                <div className="mb-3">
                    <input type="date" className="form-control" id="date" placeholder="Fecha de recarga" value={data.date} onChange={e => onChange(e)} />
                </div>
            </div>
            <div className="col-md-3">
                {selectPlayers}
            </div>
            <div className="col-md-2">
                <div className="mb-3">
                    <input type="number" className="form-control" id="amount" placeholder="Monto de recarga" value={data.amount} onChange={e => onChange(e)} />
                </div>
            </div>
            <div className="col-md-4">
                <div className="mb-3">
                    <input type="text" className="form-control" id="reason" placeholder="Motivo de la recarga" value={data.reason} onChange={e => onChange(e)} />
                </div>
            </div>
            <div className="col-md-1">
                <div className="mb-1">
                    <button className="btn btn-primary" onClick={() => onSave()} disabled={!validate()}>Guardar</button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Jugador</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Razon</th>
                            <th scope="col">Solicitado por</th>
                            <th scope="col">Aprobado por</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{selectPlayerFilter}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <select className="form-control" name="state" placeholder="Seleccione el estado" value={filterList.state} onChange={onHandleSelect}>
                                    <option value={""}>Todos</option>
                                    <option value={"PENDIENTE"}>Pendientes</option>
                                    <option value={"APROBADO"}>Aprobados</option>
                                    <option value={"RECHAZADO"}>Rechazados</option>
                                </select>
                            </td>
                        </tr>
                        {
                            list
                            .filter((filterItem: IRecharge) => doFilter(filterItem))
                            .map((item: IRecharge, index: number) => {
                                const player = players.find((p: IUser) => p.id === item.player);
                                const approver = admin.find((a: IUser) => a.id == item.approver);
                                let asker;
                                if (item.asker === item.approver) {
                                    asker = approver;
                                } else {
                                    asker = teachers.find((t: IUser) => t.id == item.asker);
                                }
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.date}</td>
                                        <td>{player ? player.name + ' ' + player.last_name : ''}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.reason}</td>
                                        <td>{asker ? asker.name + ' ' + asker.last_name : ''}</td>
                                        <td>{approver ? approver.name + ' ' + approver.last_name : ''}</td>
                                        <td><NavLink className={() => doColours(item.state)} to={`edit/${item.id}/${player ? player.name + ' ' + player.last_name : ''}/${asker ? asker.name + ' ' + asker.last_name : ''}/${approver ? approver.name + ' ' + approver.last_name : ''}`}>{item.state}</NavLink></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}

export default Recharges;