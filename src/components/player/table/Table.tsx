import { NavLink } from "react-router-dom";

interface IProps {
    list: IPlayer[]
    rollStartColum?: boolean
}

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
    rollStart?: number
    state: string
}

function Table(props: IProps) {
    let rollStartColum;
    if (props.rollStartColum) {
        rollStartColum = <th>Rollstart</th>
    }

    const changeRollstart = (player: IPlayer) => {
        alert(player.name);
    }

    const limits = ["","NL2","NL5","NL10","NL25","NL50","NL100","NL5/10","NL10/25","NL25/50"];
    return (
        <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Email</th>
                        <th>Sala</th>
                        <th>Limite</th>
                        <th>Telefono</th>
                        <th>País</th>
                        {rollStartColum}
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.list.map((player: IPlayer, index: number) => {
                            let rollStartRow;
                            let actionBtn;
                            if (props.rollStartColum) {
                                rollStartRow = <td>{player.rollStart}</td>;
                                actionBtn = <button className="btn btn-success btn-circle" onClick={() => changeRollstart(player)}>
                                    <i className="fas fa-check"></i>
                                </button>
                            } else {
                                actionBtn = <NavLink to={`/player/edit/${player.id}`} className="btn btn-success btn-circle">
                                    <i className="fas fa-check"></i>
                                </NavLink>
                            }
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{player.name} {player.last_name}</td>
                                    <td>{player.email}</td>
                                    <td>{player.room}</td>
                                    <td>{limits[+player.level]}</td>
                                    <td>{player.phone}</td>
                                    <td>{player.country.substring(0, 3)}</td>
                                    {rollStartRow}
                                    <td className={player.state === 'ACTIVO' ? "text-primary" : "text-danger"}>{player.state}</td>
                                    <td>
                                        {actionBtn}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;