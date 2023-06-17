
import { useState, useEffect } from 'react';
import Card from '../card/Card';
import { Chart } from '../chart/Chart';

import { getSumary } from '../../services/sumary/SumaryService';
import { formatoMexico } from '../../helpers/FormatThousand';

function Sumary() {
    interface ISumary {
        rollStart: {
            dolar: number,
            euro: number
        }
        hands: number
        balance: {
            dolar: number,
            euro: number
        }
        players: {
            partyPoker: number,
            ggPoker: number,
            fabianPichara: number
        }
        bank: {
            dolar: number,
            euro: number
        }
        recharges: {
            dolar: number,
            euro: number
        }
    }
    const initialState: ISumary = {
        rollStart: {
            dolar: 0,
            euro: 0
        },
        hands: 0,
        balance: {
            dolar: 0,
            euro: 0
        },
        players: {
            partyPoker: 0,
            ggPoker: 0,
            fabianPichara: 0
        },
        bank: {
            dolar: 0,
            euro: 0
        },
        recharges: {
            dolar: 0,
            euro: 0
        }
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
                    <Card title={'Jugadores Party'} amount={data.players.partyPoker} link={'player/PARTYPOKER'}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Jugadores GG'} amount={data.players.ggPoker} link={'player/GGPOKER'}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Jugadores Fabian'} amount={data.players.fabianPichara} link={'player/FABIANPICHARA'}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Rollstart'} amount={formatoMexico(data.rollStart.dolar)} amount2={formatoMexico(data.rollStart.euro)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Recargas'} amount={formatoMexico(data.recharges.dolar)} amount2={formatoMexico(data.recharges.euro)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Banca'} amount={formatoMexico(data.bank.dolar)} amount2={formatoMexico(data.bank.euro)} currency='USD'></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Manos'} amount={data.hands}></Card>
                </div>

                <div className="col-xl-2 col-md-6 mb-4">
                    <Card title={'Saldo'} amount={formatoMexico(data.balance.dolar)} amount2={formatoMexico(data.bank.euro)} currency='USD'></Card>
                </div>                
            </div>

            <div className="row">
                <div className="col-sm-10 offset-md-1">
                        <Chart Enero={0} Febrero={0} Marzo={0} Abril={0} Mayo={data.balance.dolar} Junio={0} Julio={0} Agosto={0} Septiembre={0} Octubre={0} Noviembre={0} Diciembre={0}></Chart>
                </div>
            </div>
        </>
    )
}

export default Sumary;