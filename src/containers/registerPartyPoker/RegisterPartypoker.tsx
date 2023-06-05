
import { useCallback, useState } from 'react';
import Calendar from '../../components/calendar/Calendar';
import Gallery from '../../components/gallery/Gallery';
import { get, save, getMonthly, saveMonthly } from '../../services/registers/RegisterService';
import userUser from '../../hooks/useUser';
import CurrencyInput from 'react-currency-input-field';

function RegisterPartyPoker() {
    const initialState = {
        bank: 0,
        hands: 0,
        comodin: 0,
        day: new Date().getDate(),
        month: 4
    }
    const initialMonthlyData = [
        { week: 1, comodin: 0 }, { week: 2, comodin: 0 }, { week: 3, comodin: 0 }, { week: 4, comodin: 0 }, { week: 5, comodin: 0 }, { week: 6, comodin: 0 }
    ];
    const [images, setImages] = useState<any[]>([]);
    const [data, setData] = useState<any>(initialState);
    const [failed, setFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [monthlyData, setMonthlyData] = useState<{ week: number, comodin: number }[]>(initialMonthlyData);
    let list: any[] = [];

    const cb = useCallback((event: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', (ev) => {
            if (ev.target && ev.target.result) {
                setImages([...images, { id: new Date().getTime(), b64: ev.target.result }]);
            }
        });
        reader.readAsDataURL(event.target.files[0]);
    }, [images]);

    const handleDelete = useCallback((event: any) => {
        const newImages = images.filter((img: { id: string, b64: string }) => img.id != event.target.id);
        setImages(newImages);
    }, [images]);

    const user = userUser();

    const loadDataFromServer = async (day: number, month: number) => {
        let response = await get({ userId: user.id, room: 'partypoker', day, month });
        if (response.data) {
            setData({
                bank: response.data.bank,
                hands: response.data.hands,
                comodin: response.data.comodin,
                day,
                month,
            });
            const newImagesList: { id: string, b64: string }[] = [];
            if (response.data.image1) {
                newImagesList.push({ id: 'nid-' + Math.floor(Math.random() * 1000000), b64: response.data.image1 });
            }
            if (response.data.image2) {
                newImagesList.push({ id: 'nid-' + Math.floor(Math.random() * 1000000), b64: response.data.image2 });
            }
            if (response.data.image3) {
                newImagesList.push({ id: 'nid-' + Math.floor(Math.random() * 1000000), b64: response.data.image3 });
            }
            if (response.data.image4) {
                newImagesList.push({ id: 'nid-' + Math.floor(Math.random() * 1000000), b64: response.data.image4 });
            }
            if (response.data.image5) {
                newImagesList.push({ id: 'nid-' + Math.floor(Math.random() * 1000000), b64: response.data.image5 });
            }
            const newListElement = {
                day,
                month,
                bank: response.data.bank,
                hands: response.data.hands,
                comodin: response.data.comodin
            }
            list = [...list, newListElement];
            setImages(newImagesList);
        }
    }

    const loadMonthlyDataFromServer = async (month: number) => {
        let response = await getMonthly({ userId: user.id, month, room: 'partypoker' });
        if (response.status === 201) {
            setMonthlyData(initialMonthlyData);
        } else if (response.data) {
            const newMonthlyData: { week: number, comodin: number }[] = [
                { week: 1, comodin: response.data.week1 },
                { week: 2, comodin: response.data.week2 },
                { week: 3, comodin: response.data.week3 },
                { week: 4, comodin: response.data.week4 },
                { week: 5, comodin: response.data.week5 },
                { week: 6, comodin: response.data.week6 }
            ];
            setMonthlyData(newMonthlyData);
        }
    }

    const handleSelect = useCallback((day: number, month: number) => {
        if (day === -1 || month === -1) {
            setData({ bank: 0, hands: 0, comodin: 0 });
            if (month >= 0) {
                loadMonthlyDataFromServer(month);
            }
            return;
        }

        loadDataFromServer(day, month);
        setFailed(false);
        setSuccess(false);
    }, []);

    const handleChangeComodin = useCallback((week: number, value: number) => {
        const newMonthlyData = [...monthlyData];
        monthlyData[week - 1].comodin = value;
        setMonthlyData(newMonthlyData);
    }, []);

    const handleChangeValue = (value: string, name: string) => {
        let newValue = value;
        var regexp = /^\d+(\,\d{1,2})?$/;
        if (value?.includes(",") && regexp.test(value)) {
            newValue = value.replace(",", ".");
            return setData({
                ...data,
                [name]: parseFloat(newValue) || 0
            });
        }
        return setData({
            ...data,
            [name]: newValue || 0
        });
    }

    const handleSave = useCallback((month: number) => {
        (async () => {
            try {
                const response = await saveMonthly({ userId: user.id, room: 'partypoker', month, data: monthlyData });
                if (response.status === 200) {
                    setSuccess(true);
                    setFailed(false);
                }
            } catch (error) {
                setFailed(true);
                setSuccess(false);
            }
        })();
    }, []);

    const onSave = (e: any) => {
        e.preventDefault();
        if (data.bank === 0 || data.hands === 0 || data.comodin === 0) {
            setFailed(true);
            setSuccess(false);
            return;
        }
        (async () => {
            try {
                const response = await save({
                    data,
                    images,
                    userId: user.id,
                    room: 'partypoker'
                });
                if (response.status === 200) {
                    let obj = list.find((reg: any) => reg.day == data.day && reg.month == data.month);
                    if (obj) {
                        obj = { ...data };
                    }
                    setSuccess(true);
                    setFailed(false);
                }
            } catch (error) {
                setFailed(true);
                setSuccess(false);
            }
        })();
    }

    let alert: any;
    if (failed) {
        alert = <div className="alert alert-danger text-center" role="alert">No es posible guardar sin la información completa, recuerde colocar al menos una imágen</div>
    }

    if (success) {
        alert = <div className="alert alert-success text-center" role="alert">Registro guardado con exito!</div>
    }

    return (
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-7 d-none d-lg-block">
                        <Calendar
                            extraColumns={["$C"]}
                            handleSelect={() => handleSelect}
                            monthlyData={monthlyData}
                            handleChangeComodin={handleChangeComodin}
                            handleSave={handleSave}
                        />
                    </div>
                    <div className="col-lg-5">
                        <div className="pt-1">
                            <div className="text-center">
                                <div className="alert alert-success text-center" role="alert">Recuerde colocar la coma como separador decimal</div>
                            </div>
                            <hr />
                            <form className="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label>Banca</label>
                                        <CurrencyInput
                                            decimalSeparator=','
                                            groupSeparator='.'
                                            step={1}
                                            allowNegativeValue={false}
                                            className="form-control form-control-user"
                                            id="bank"
                                            name='bank'
                                            placeholder="Bank Party"
                                            allowDecimals={true}
                                            value={data.bank}
                                            onValueChange={(value, name) => handleChangeValue(value!, name!)}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Número de manos</label>
                                        <CurrencyInput
                                            className="form-control form-control-user"
                                            id="hands"
                                            name='hands'
                                            placeholder="Número de Manos"
                                            allowDecimals={false}
                                            disableGroupSeparators={true}
                                            step={1}
                                            allowNegativeValue={false}
                                            maxLength={5}
                                            value={data.hands}
                                            onValueChange={(value, name) => handleChangeValue(value!, name!)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label>Puntos</label>
                                        <CurrencyInput
                                            decimalSeparator=','
                                            groupSeparator='.'
                                            className="form-control form-control-user"
                                            id="comodin"
                                            name='comodin'
                                            placeholder="Puntos"
                                            allowDecimals={true}
                                            value={data.comodin}
                                            step={1}
                                            allowNegativeValue={false}
                                            onValueChange={(value, name) => handleChangeValue(value!, name!)}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <button className="btn btn-primary btn-user btn-block" onClick={e => onSave(e)}>
                                    Guardar
                                </button>
                            </form>
                            <hr />
                            <Gallery images={images} cb={() => cb} handleDelete={() => handleDelete}></Gallery>
                        </div>
                        {alert}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPartyPoker;