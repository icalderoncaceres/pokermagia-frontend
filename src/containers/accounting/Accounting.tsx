
import React, { useState, useEffect } from 'react';
import { getConsolidate } from '../../services/sumary/SumaryService';
import { IConsolidate } from '../../services/sumary/SumaryService.model';
import { exportExcel } from '../../helpers/Excelexport';
import { columnsOptions } from './columns';
import Select from 'react-select';
import { formatoMexico } from '../../helpers/FormatThousand';

function Accounting() {
    interface IResults {
        rollStart: number,
        recharges: number,
        bank: number,
        hands: number,
        comodin: number,
        balance: number,
        profitPlayer: number,
        profitPokermagia: number,
    }
    const initialResults: { PARTYPOKER: IResults, GGPOKER: IResults, FABIANPICHARA: IResults } = {
        PARTYPOKER: {
            rollStart: 0,
            recharges: 0,
            bank: 0,
            hands: 0,
            comodin: 0,
            balance: 0,
            profitPlayer: 0,
            profitPokermagia: 0,
        },
        GGPOKER: {
            rollStart: 0,
            recharges: 0,
            bank: 0,
            hands: 0,
            comodin: 0,
            balance: 0,
            profitPlayer: 0,
            profitPokermagia: 0,
        },
        FABIANPICHARA: {
            rollStart: 0,
            recharges: 0,
            bank: 0,
            hands: 0,
            comodin: 0,
            balance: 0,
            profitPlayer: 0,
            profitPokermagia: 0,
        },
    }

    const levelsOptions = [
        { value: "-1", label: "Seleccione el limite" },
        { value: "1", label: "NL2", "porcentajes": { "PARTYPOKER": 10, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "2", label: "NL5", "porcentajes": { "PARTYPOKER": 20, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "3", label: "NL10", "porcentajes": { "PARTYPOKER": 30, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "4", label: "NL25", "porcentajes": { "PARTYPOKER": 35, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "5", label: "NL50", "porcentajes": { "PARTYPOKER": 40, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "6", label: "NL100", "porcentajes": { "PARTYPOKER": 45, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "7", label: "NL5/10", "porcentajes": { "PARTYPOKER": 50, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "8", label: "NL10/25", "porcentajes": { "PARTYPOKER": 55, "GGPOKER": 20, "FABIANPICHARA": 30 } },
        { value: "9", label: "NL25/50", "porcentajes": { "PARTYPOKER": 60, "GGPOKER": 20, "FABIANPICHARA": 30 } },
    ]

    const [level, setLevel] = useState<string>();
    const [rowSelect, setRowSelect] = useState<any>({});
    const [levelState, setLevelState] = useState<boolean>(false);

    const [list, setList] = useState<IConsolidate[]>([]);
    const [room, setRoom] = useState<string>("PARTYPOKER");
    const [results, setResults] = useState<{ PARTYPOKER: IResults, GGPOKER: IResults, FABIANPICHARA: IResults }>(initialResults);

    const selectRow = (r: any, level: string, index: number) => {
        r = {
            ...r,
            index
        }
        setRowSelect(r);
        setLevel(level);
    }

    const calculateBalance = (item: IConsolidate, index: number): { clase: string, balance: number, profitPlayer: number, profitPokermagia: number } => {
        const balance = item.bank - (item.rollStart + item.recharges + item.comodin);
        let porcentaje = 0;
        const obj = levelsOptions.find((l: any) => l.value == item.level);
        if (obj && obj.porcentajes) {
            if (room === 'PARTYPOKER') {
                porcentaje = obj.porcentajes.PARTYPOKER;
            } else if (room === 'GGPOKER') {
                porcentaje = obj.porcentajes.GGPOKER;
            } else {
                porcentaje = obj.porcentajes.FABIANPICHARA;
            }
        }
        const profitPlayer = balance > 0 ? balance * porcentaje / 100 : 0;
        const profitPokermagia = balance - profitPlayer;
        let clase = '';
        if (index == rowSelect.index) {
            clase = 'table-primary';
        } else {
            clase = balance <= 0 ? 'table-danger' : 'table-success';
        }
        return {
            clase,
            balance,
            profitPlayer,
            profitPokermagia
        }
    }
    const reduceResults = (values: IConsolidate[]) => {
        const obj = {
            PARTYPOKER: {
                rollStart: 0,
                recharges: 0,
                bank: 0,
                hands: 0,
                comodin: 0,
                balance: 0,
                profitPlayer: 0,
                profitPokermagia: 0,
            },
            GGPOKER: {
                rollStart: 0,
                recharges: 0,
                bank: 0,
                hands: 0,
                comodin: 0,
                balance: 0,
                profitPlayer: 0,
                profitPokermagia: 0,
            },
            FABIANPICHARA: {
                rollStart: 0,
                recharges: 0,
                bank: 0,
                hands: 0,
                comodin: 0,
                balance: 0,
                profitPlayer: 0,
                profitPokermagia: 0,
            }
        }
        values.forEach((item: any) => {
            if (item.room === "PARTYPOKER") {
                obj.PARTYPOKER.rollStart = obj.PARTYPOKER.rollStart + item.rollStart;
                obj.PARTYPOKER.recharges = obj.PARTYPOKER.recharges + item.recharges;
                obj.PARTYPOKER.bank = obj.PARTYPOKER.bank + item.bank;
                obj.PARTYPOKER.hands = obj.PARTYPOKER.hands + item.hands;
                obj.PARTYPOKER.comodin = obj.PARTYPOKER.comodin + item.comodin;
                obj.PARTYPOKER.balance = obj.PARTYPOKER.balance + item.balance;
                obj.PARTYPOKER.profitPlayer = obj.PARTYPOKER.profitPlayer + item.profitPlayer;
                obj.PARTYPOKER.profitPokermagia = obj.PARTYPOKER.profitPlayer + item.profitPlayer;
            } else if (item.room === "GGPOKER") {
                obj.GGPOKER.rollStart = obj.GGPOKER.rollStart + item.rollStart;
                obj.GGPOKER.recharges = obj.GGPOKER.recharges + item.recharges;
                obj.GGPOKER.bank = obj.GGPOKER.bank + item.bank;
                obj.GGPOKER.hands = obj.GGPOKER.hands + item.hands;
                obj.GGPOKER.comodin = obj.GGPOKER.comodin + item.comodin;
                obj.GGPOKER.balance = obj.GGPOKER.balance + item.balance;
                obj.GGPOKER.profitPlayer = obj.GGPOKER.profitPlayer + item.profitPlayer;
                obj.GGPOKER.profitPokermagia = obj.GGPOKER.profitPlayer + item.profitPlayer;
            } else {
                obj.FABIANPICHARA.rollStart = obj.FABIANPICHARA.rollStart + item.rollStart;
                obj.FABIANPICHARA.recharges = obj.FABIANPICHARA.recharges + item.recharges;
                obj.FABIANPICHARA.bank = obj.FABIANPICHARA.bank + item.bank;
                obj.FABIANPICHARA.hands = obj.FABIANPICHARA.hands + item.hands;
                obj.FABIANPICHARA.comodin = obj.FABIANPICHARA.comodin + item.comodin;
                obj.FABIANPICHARA.balance = obj.FABIANPICHARA.balance + item.balance;
                obj.FABIANPICHARA.profitPlayer = obj.FABIANPICHARA.profitPlayer + item.profitPlayer;
                obj.FABIANPICHARA.profitPokermagia = obj.FABIANPICHARA.profitPlayer + item.profitPlayer;
            }
        });
        setResults(obj);
    }

    const onExport = async () => {
        const fileName = `CONTABILIDAD_MAYO_2023_${new Date().getTime()}`;
        try {
            await exportExcel({ excelData: list, fileName });
        } catch (error) {
            console.log('Error');
        }
    }

    const onChangeSelectData = (value: string, field: string) => {
        setLevelState(value != rowSelect.level);
        setLevel(value);
    }

    const changeRoom = (room: string) => {
        setRoom(room);
        setRowSelect(-1);
        setLevel("");
        setLevelState(false);
    }
    const onUpdateLevel = () => {
        const updatedRow = {
            ...rowSelect,
            level: level
        }

        setRowSelect(updatedRow);
        setLevelState(false);
        const newList = [...list];
        const obj = newList.find((item: IConsolidate) => item.playerId === updatedRow.playerId);
        if (obj) {
            obj.level = level || '';
            setList(newList);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getConsolidate();
                if (response.status === 200 && response.players) {
                    setList(response.players);
                    reduceResults(response.players);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    let result: IResults;
    if (room === "PARTYPOKER") {
        result = results.PARTYPOKER;
    } else if (room === "GGPOKER") {
        result = results.GGPOKER;
    } else {
        result = results.FABIANPICHARA;
    }
    let selectLevel: any;
    if (level) {
        let porcentaje = 0;
        const obj = levelsOptions.find((l: any) => l.value == level);
        if (obj && obj.porcentajes) {
            if (room === "PARTYPOKER") {
                porcentaje = obj.porcentajes.PARTYPOKER;
            } else if (room === 'GGPOKER') {
                porcentaje = obj.porcentajes.GGPOKER;
            } else {
                porcentaje = obj.porcentajes.FABIANPICHARA;
            }
        }
        if (!levelState) {
            selectLevel = <div className="row">
                <div className="col-4">
                    <Select
                        placeholder='Seleccione limite...'
                        options={levelsOptions}
                        onChange={(option: any) => onChangeSelectData(option.value, 'level')}
                        value={levelsOptions.find((item: any) => item.value == level)}
                    />
                </div>
                <div className="col-8">
                    {porcentaje}% 
                </div>
            </div>
        } else {
            selectLevel = <div className="row">
                <div className="col-4">
                    <Select
                        placeholder='Seleccione limite...'
                        options={levelsOptions}
                        onChange={(option: any) => onChangeSelectData(option.value, 'level')}
                        value={levelsOptions.find((item: any) => item.value == level)}
                    />
                </div>
                <div className="col-2">
                    {porcentaje}%
                </div>
                <div className="col-6">
                    <button className="btn btn-sm btn-primary" onClick={onUpdateLevel}>Actualizar</button>
                </div>
            </div>

        }
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="md-6 ml-4">
                    <h1 className="h3 mb-2 text-gray-800">HOJA DE CONTABILIDAD</h1>
                </div>
                <div className="md-6 text-right ml-5">
                    <button className="btn btn-primary btn-icon-split" onClick={() => onExport()}>
                        <span className="icon text-white-50">
                            <i className="fas fa-flag"></i>
                        </span>
                        <span className="text">Exportar a excel</span>
                    </button>
                </div>
            </div>

            <hr />
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    {selectLevel}
                    <hr />
                    <h6 className="m-0 font-weight-bold text-primary">Seleccione la sala / Sala seleccionada: {room}</h6>
                </div>
                <nav className="nav nav-pills nav-fill ml-3">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button className={`nav-link ${room === 'PARTYPOKER' ? 'active' : ''}`} onClick={() => changeRoom("PARTYPOKER")}>Partypoker</button>
                        </li>
                        <li className="nav-item ml-3">
                            <button className={`nav-link ${room === 'GGPOKER' ? 'active' : ''}`} onClick={() => changeRoom("GGPOKER")}>GGPoker</button>
                        </li>
                        <li className="nav-item ml-3">
                            <button className={`nav-link ${room === 'FABIANPICHARA' ? 'active' : ''}`} onClick={() => changeRoom("FABIANPICHARA")}>Fabian Pichara</button>
                        </li>
                    </ul>
                </nav>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Jugador</th>
                                    <th>RollStart</th>
                                    <th>Recargas</th>
                                    <th>Banca</th>
                                    <th>Manos</th>
                                    <th>{room === 'PARTYPOKER' ? '$C' : 'FBuffet'}</th>
                                    <th>Saldo</th>
                                    <th>$ Jugador</th>
                                    <th>$ Pokermagia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.filter((item: IConsolidate, index: number) => item.room === room)
                                    .map((item: any, index: number) => {
                                        const { clase, balance, profitPlayer, profitPokermagia } = calculateBalance(item, index);
                                        const level = levelsOptions.find((level: any) => +level.value === item.level);
                                        return (
                                            <tr className={clase} key={index} onClick={() => selectRow(item, item.level, index)}>
                                                <td>{index + 1}</td>
                                                <td>{item.playerName} ({level?.label})</td>
                                                <td className="text-right">{formatoMexico(item.rollStart)}</td>
                                                <td className="text-right">{item.recharges}</td>
                                                <td className="text-right">{formatoMexico(item.bank)}</td>
                                                <td className="text-right">{item.hands}</td>
                                                <td className="text-right">{formatoMexico(item.comodin)}</td>
                                                <td className="text-right">{formatoMexico(balance)}</td>
                                                <td className="text-right">{formatoMexico(profitPlayer)}</td>
                                                <td className="text-right">{formatoMexico(profitPokermagia)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td className="table-dark text-right"></td>
                                    <td className="table-dark text-right"></td>
                                    <td className="table-dark text-right">{result.rollStart}</td>
                                    <td className="table-dark text-right">{result.recharges}</td>
                                    <td className="table-dark text-right">{result.bank}</td>
                                    <td className="table-dark text-right">{result.hands}</td>
                                    <td className="table-dark text-right">{result.comodin}</td>
                                    <td className="table-dark text-right">{result.balance}</td>
                                    <td className="table-dark text-right">{result.profitPlayer}</td>
                                    <td className="table-dark text-right">{result.profitPokermagia}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Accounting;