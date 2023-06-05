
import {useState, useEffect} from 'react';
import {sendAlerts} from '../../services/sumary/SumaryService';
import {getConfig, updateConfig} from '../../services/config/ConfigService';
import {IConfig} from '../../services/config/ConfigService.model';

function Configuration() {

    const onSendAlerts = async () => {
        try {
            await sendAlerts();
            setAlert('Operación realizada con éxito');
        } catch (error) {
            setAlert('Se produjo un error');
        }
    }

    const onChange = (e: any) => {
        const newConfig = {
            ...config,
            [e.target.id]: +e.target.value
        };
        setConfig(newConfig);
    }

    const onUpdate = () => {
        (async() => {
            try {
                const response = await updateConfig({config});
                if (response.status === 200) {
                    setAlert("Información actualizada exitosamente")
                }
            } catch (error) {
                setAlert('Se produjo un error');
            }
        })();
    }

    const [alert, setAlert] = useState<string>('');
    const [config,setConfig] = useState<IConfig>({
        id: 0,
        nl2: 0,
        nl5: 0,
        nl10: 0,
        nl25: 0,
        nl50: 0,
        nl100: 0,
        nl1025: 0,
        nl510: 0,
        nl2550: 0
    });
    let message: any;
    if (alert) {
        message = <div className="alert alert-primary" role="alert">
        {alert}
      </div>
    }

    useEffect(() => {
        (async() => {
            try {
                const response = await getConfig();
                if (response.status === 200 && response.config) {
                    setConfig(response.config);
                } else {
                    setAlert('Error consultando datos');
                }
            } catch (error) {
                setAlert('Error consultando datos');
            }
        })();
    }, []);
    return (<div className="ml-5">
        <h1>Configuración</h1>
        <hr/>
        <h1>Limites</h1>
        <div className="row">
            <div className="mb-3">
                <label className="form-label">NL2:</label>
                <input className="form-control" placeholder="NL2" value={config?.nl2} id="nl2" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL5:</label>
                <input className="form-control" placeholder="NL5" value={config?.nl5} id="nl5" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL10</label>
                <input className="form-control" placeholder="NL10" value={config?.nl10} id="nl10" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL25</label>
                <input className="form-control" placeholder="NL25" value={config?.nl25} id="nl25" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL50</label>
                <input className="form-control" placeholder="NL50" value={config?.nl50} id="nl50" onChange={onChange} max={100}></input>
            </div>
        </div>
        <div className="row">
            <div className="mb-3">
                <label className="form-label">NL100</label>
                <input className="form-control" placeholder="NL100" value={config?.nl100} id="nl100" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL5/10</label>
                <input className="form-control" placeholder="NL5/10" value={config?.nl510} id="nl510" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL10/25</label>
                <input className="form-control" placeholder="NL10/25" value={config?.nl1025} id="nl1025" onChange={onChange} max={100}></input>
            </div>
            <div className="mb-3 ml-2">
                <label className="form-label">NL25/50</label>
                <input className="form-control" placeholder="NL25/50" value={config?.nl2550} id="nl2550" onChange={onChange} max={100}></input>
            </div>
        </div>
        <hr/>
        <div className="text-center">
            <button className="btn btn-success mr-3" onClick ={() => onUpdate()} >Actualizar</button>
            <button className="btn btn-primary" onClick={() => onSendAlerts()}>Enviar notificaciones</button>
        </div>
        <hr/>
        {message}
    </div>
    );
}

export default Configuration;