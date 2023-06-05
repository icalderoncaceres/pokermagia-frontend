
import { useState, useEffect } from 'react';
import { getAlerts, markOn } from '../../services/alerts/AlertService';
import useUser from '../../hooks/useUser';

interface IAlert {
    id: number
    message: string
    state: boolean
}

function Alerts() {

    const [list, setList] = useState<IAlert[]>([]);

    const user = useUser();

    const markAlert = async (alerta: IAlert) => {
        try {
            const response = await markOn({id: alerta.id});
            if (response.status === 200) {
                const newList = [...list];
                const obj = newList.find((a: IAlert) => a.id === alerta.id);
                if (obj) {
                    obj.state = true;
                    setList(newList);
                }
            }
        } catch (error) {
            console.log('Error actualizando');
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getAlerts({userId: user.id});
                if (response.status === 200 && response.alerts) {
                    setList(response.alerts)
                }
            } catch (error) {
                console.log('Error');
            }
        })();
    }, []);

    return (<>
        <h1 className="text-center">Sistema de Alertas</h1>
        <table className="table">
            <thead className="table-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mensaje</th>
                    <th scope="col">Marcarlo como visto</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.filter((alerta: IAlert) => !alerta.state)
                    .map((alerta: IAlert, index: number) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><div dangerouslySetInnerHTML={{__html: alerta.message}}></div></td>
                            <td>
                                <button className="btn btn-primary" onClick={() => markAlert(alerta)}>
                                    Marcar como visto
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </>
    )

}

export default Alerts;