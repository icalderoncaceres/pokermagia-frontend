
import { useState, useEffect } from 'react';
import Card from '../card/Card';
import { Chart } from '../chart/Chart';

import { getSumary } from '../../services/sumary/SumaryService';
import { formatoMexico } from '../../helpers/FormatThousand';

function Sumary() {
    interface ISumary {
        rollStart: number
        hands: number
        balance: number
        players: number
        bank: number
        recharges: number
    }
    const initialState: ISumary = {
        rollStart: 0,
        hands: 0,
        balance: 0,
        players: 0,
        bank: 0,
        recharges: 0
    }

    const [data, setData] = useState<ISumary>(initialState)
    useEffect(() => {
        (async() => {
            try {
                const response = await getSumary();
                if (response.status === 200 && response.data) {
                    console.log(response.data)
                    setData(response.data);
                } 
            } catch (error) {
                console.log('Error al consultar la información');
                setData(initialState);
            }
        })();
    }, []);

      
    return (
        <>
            <div className="row">

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Jugadores'} amount={data.players}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Rollstart'} amount={formatoMexico(data.rollStart)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Recargas'} amount={formatoMexico(data.recharges)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Banca'} amount={formatoMexico(data.bank)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Manos'} amount={data.hands}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Saldo'} amount={formatoMexico(data.balance)} currency='USD'></Card>
                </div>                
            </div>

            <div className="row">
                <div className="col-sm-10 offset-md-1">
                        <Chart Enero={0} Febrero={0} Marzo={0} Abril={0} Mayo={data.balance} Junio={0} Julio={0} Agosto={0} Septiembre={0} Octubre={0} Noviembre={0} Diciembre={0}></Chart>
                </div>
            </div>
        </>
    )
}

export default Sumary;