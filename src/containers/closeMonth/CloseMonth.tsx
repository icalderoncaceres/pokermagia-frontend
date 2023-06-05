
import React, { useState, useEffect } from 'react';
import { getConsolidate, closeMonth } from '../../services/sumary/SumaryService';
import { IConsolidate } from '../../services/sumary/SumaryService.model';
import { NavLink } from 'react-router-dom';

function CloseMonth() {

    const [list, setList] = useState<IConsolidate[]>([]);
    const [step, setStep] = useState<number>(1);

    const calculate = () => {
        const updatedList = list.map((item: IConsolidate) => {
            return {
                ...item,
                newRollstart: Math.random() * 10000
            }
        });
        setList(updatedList);
        setStep(2);
    }

    const close = async () => {
        try {
            const response = await closeMonth();
            if (response.status === 200) {
                alert("Se ha cerrado");
                setStep(3);
            }
        } catch (error) {
            console.log('Error');
            setStep(4);
        }
    }

    const rewriteRollstart = (player: IConsolidate) => {
        if (step !== 2) {
            alert("Despues de cerrar el mes no se puede modificar el rollStart");
            return;
        }
        const newValue = prompt("Sobreescribir rollstart");
        if (newValue) {
            const newList = [...list];
            const obj = newList.find((p: IConsolidate) => p.id === player.id);
            if (obj) {
                obj.newRollstart = +newValue;
                setList(newList);
            }
        }
    }

    const confirmClose = () => {
        setStep(3);
    }

    const cancel = () => {
        setStep(2);
    }

    const limits = ["","NL2","NL5","NL10","NL25","NL50","NL100","NL5/10","NL10/25","NL25/50"];

    useEffect(() => {
        (async () => {
            try {
                const response = await getConsolidate();
                if (response.status === 200 && response.players) {
                    setList(response.players);
                }
            } catch (error) {
                console.log(error);
            }

        })();
    }, []);

    let closeButton: any;
    let calculateButton: any;
    let confirmButtons: any;
    if (step === 2) {
        closeButton = <button className='btn-danger btn-icon-split ml-3'>
            <span className="icon text-white-50">
                <i className="fas fa-flag"></i>
            </span>
            <span className="text" onClick={() => confirmClose()}>Cerrar el mes (asegusere por favor)</span>
        </button>
    }
    if (step === 3) {
        confirmButtons = <>
            <div className="mt-1 text-center">
            <h4>Esta seguro(a) de cerrar el mes?</h4>
            <button className="btn btn-success" onClick={() => close()}>Si</button>
            <button className="btn btn-danger ml-2" onClick={() => cancel()}>No</button>
            </div>
        </>
    }
    if (step === 4) {
        closeButton = <span className='alert alert-success ml-3'>El cierre del mes ya fue realizado, debe esperar el fin del próximo mes para volver a realizar este proceso</span>;
    }
    if (step < 3) {
        calculateButton = <button className={step === 1 ? 'btn-primary btn-icon-split ml-3' : 'btn-success btn-icon-split ml-3'}>
            <span className="icon text-white-50">
                <i className="fas fa-flag"></i>
            </span>
            <span className="text" onClick={() => calculate()}>{step === 1 ? 'Calcular rollstart' : 'Volver a calcular'}</span>
        </button>;
    }

    return (
        <React.Fragment>
            <div className="ml-3">
                <h1 className="h3 mb-2 text-gray-800">JUGADORES</h1>
                <p className="mb-4">Lista de jugadores de POKERMAGIA, presione calcular, verifique los valores, realice manualmente los cambios deseados y finalmente presione el boton Cerrar Mes.</p>
            </div>
            {calculateButton}
            {closeButton}
            {confirmButtons}
            <hr />
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Jugadores</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Jugador</th>
                                    <th>Sala</th>
                                    <th>Límite</th>
                                    <th>Rollstart</th>
                                    <th>Recargas</th>
                                    <th>Banca</th>
                                    <th>Manos</th>
                                    <th>Saldo</th>
                                    <th>Rollstart</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list.map((player: IConsolidate, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{player.playerName}</td>
                                                <td>{player.room}</td>
                                                <td>{limits[+player.level]}</td>
                                                <td>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 }).format(player.rollStart)}</td>
                                                <td>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 }).format(player.recharges)}</td>
                                                <td>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 }).format(player.bank)}</td>
                                                <td>{player.hands}</td>
                                                <td>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 8 }).format(player.balance)}</td>
                                                <td>{player.newRollstart || 0}</td>
                                                <td>
                                                    <button className="btn btn-success btn-circle" onClick={() => rewriteRollstart(player)}>
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <NavLink to={`consolidate/${player.playerId}`} className="btn btn-primary btn-circle ml-1">
                                                        <i className="fas fa-check"></i>
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CloseMonth;