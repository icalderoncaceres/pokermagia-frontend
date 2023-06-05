
import {useEffect, useState} from 'react';
import {create, get, update} from '../../../services/players/PlayerService';
import {ROLES} from '../../../services/users/UserService.model';
import {useParams} from 'react-router-dom';
import Select from 'react-select';

function Add() {

    interface IPlayer {
        id?: number,
        name: string,
        last_name: string,
        email: string,
        password: string,
        password2: string,
        phone: string,
        level: string,
        notes: string,
        country: string,
        room: string,
        currency: 'USD' | 'EUR',
        role: ROLES,
    }
    const {id} = useParams();
    const initialState: IPlayer = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        level: '',
        notes: '',
        country: '',
        room: '',
        currency: 'USD',
        role: ROLES.PLAYER,
    }
    const [data, setData] = useState<IPlayer>(initialState);
    const [message, setMessage] = useState<{clase: string, message: string}>({clase: '', message: ''});

    const onChangeData = (e: any) => {
        const newData = {
            ...data,
            [e.target.id]: e.target.value
        }
        setData(newData);
    }

    const onChangeSelectCurrency = (e: any) => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(newData);
    }

    const onSave = async () => {
        if (!data.name || !data.last_name || !data.country || !data.email || !data.level || !data.password || !data.room || !data.currency ) {
            setMessage({clase: 'alert alert-danger', message: 'Falta información necesaria para registrar al jugador'});
            return;
        }
        try {
            let response;
            if (!id) {
                response = await create({player: data});
            } else {
                response = await update({id: +id, player: data});
            }
            if (response && response.status === 200) {
                if (id) {
                    setMessage({clase: 'alert alert-primary', message: "Jugador actualizado con exito!"});
                } else {
                    setData(initialState);
                    setMessage({clase: 'alert alert-primary', message: "Nuevo jugador registrado con exito!"});
                }
            }
        } catch (error) {
            setMessage({clase: "alert alert-danger", message: "Se produjo un error y no se guardo el jugador correctamente!"});
        }
    }

    let alertMessage;
    if (message.message) {
        alertMessage = <div className={message.clase + " ml-3 mt-3"} role="alert">
            {message.message}
        </div>;
    }

    const roomsOptions = [
        {
            value: "-1", label: "Seleccione sala(s)"
        },
        {
            value: "PARTYPOKER", label: "PARTYPOKER"
        },
        {
            value: "GGPOKER", label: "GGPOKER"
        },
        {
            value: "FABIANPICHARA", label: "FABIAN PICHARA"
        },
        {
            value: "ALL", label: "Todas"
        }
    ];

    const levelsOptions = [
        { value: "-1", label: "Seleccione el limite"},
        { value: "1", label: "NL2" },
        { value: "2", label: "NL5" },
        { value: "3", label: "NL10"},
        { value: "4", label: "NL25"},
        { value: "5", label: "NL50"},
        { value: "6", label: "NL100"},
        { value: "7", label: "NL5/10"},
        { value: "8", label: "NL10/25"},
        { value: "9", label: "NL25/50"},
    ]

    const onChangeSelectData = (value: string, field: string) => {
        const newData = {
            ...data,
            [field]: value
        }
        setData(newData);
    }

    useEffect(() => {
        if (id) {
            (async() => {
                try {
                    const response = await get({id: +id});
                    if (response.status === 200 && response.player) {
                        setData({ ...response.player, password2: response.player.password, currency: 'EUR' });
                        setMessage({clase: 'alert alert-primary', message: `Editar al usuario  ${response.player.name} ${response.player.last_name}`  })
                    }
                } catch (error) {
                    setMessage({clase: "alert alert-danger", message: "No se pudo obtener información del jugador!"});        
                }
            })();
        }        
    },[]);

    return (
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block">
                        {alertMessage}
                    </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">{!id ? 'Registrar un Jugador' : `Actualizar al jugador ${data.name} ${data.last_name}`}</h1>
                            </div>
                            <form className="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" className="form-control form-control-user" id="name"
                                            placeholder="Nombre" value={data.name} onChange={onChangeData} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-user" id="last_name"
                                            placeholder="Apellido" value={data.last_name} onChange={onChangeData} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                        <Select 
                                            placeholder='Seleccione sala...'
                                            options={roomsOptions}
                                            onChange={(option: any) => onChangeSelectData(option.value, 'room') }
                                            defaultValue={roomsOptions.find((item: any) => item.value === data.room)}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Select 
                                            placeholder='Seleccione limite...'
                                            options={levelsOptions}
                                            onChange={(option: any) => onChangeSelectData(option.value, 'level') }
                                            defaultValue={levelsOptions.find((item: any) => item.value === data.level)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="email" className="form-control form-control-user" id="email"
                                            placeholder="Correo electrónico" value={data.email} onChange={onChangeData} />
                                    </div>
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="email" className="form-control form-control-user" id="country"
                                            placeholder="País" value={data.country} onChange={onChangeData} />                                        
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="password" placeholder="Contraseña" value={data.password} onChange={onChangeData} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="password2" placeholder="Repetir contraseña" value={data.password2} onChange={onChangeData} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" className="form-control form-control-user"
                                            id="phone" placeholder="Telefono" value={data.phone} onChange={onChangeData} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-user"
                                            id="notes" placeholder="Observaciones" value={data.notes} onChange={onChangeData} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" value='USD' onChange={onChangeSelectCurrency} type="radio" name="currency" checked={ data.currency === 'USD' }/>
                                        <label className="form-check-label" htmlFor="currency">
                                            ($) USD
                                        </label>
                                    </div>
                                    </div>
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" value='EUR' onChange={onChangeSelectCurrency} type="radio" name="currency" checked={ data.currency === 'EUR' }/>
                                        <label className="form-check-label" htmlFor="currency">
                                            (Є) EUR 
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-primary btn-user btn-block" onClick={() => onSave()}>
                                    {!id ? 'Guardar' : 'Actualizar' }
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;