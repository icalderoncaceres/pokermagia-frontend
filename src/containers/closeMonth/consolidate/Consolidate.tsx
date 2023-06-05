
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IUser } from "../../../services/users/UserService.model";
import { get } from '../../../services/players/PlayerService';
import { save } from '../../../services/registers/RegisterService';
import CurrencyInput from "react-currency-input-field";

function Consolidate() {
    const { playerId } = useParams();
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();
    const initialState = {
        bank: 0,
        hands: 0,
        comodin: 0,
        day: 31,
        month: 4
    }

    const [data, setData] = useState<any>(initialState);
    const [failed, setFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

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
                    images: [],
                    userId: user ? user.id : -1,
                    room: user ? user.room : ''
                });
                if (response.status === 200) {
                    navigate(-1);
                }
            } catch (error) {
                setFailed(true);
                setSuccess(false);
            }
        })();
    }

    useEffect(() => {
        (async () => {
            if (playerId) {
                try {
                    const response = await get({ id: +playerId });
                    if (response.status === 200 && response.player) {
                        setUser(response.player);
                    }
                } catch (error) {
                    console.log('Error');
                }
            }
        })();
    });

    return (
        <div className="col-lg-5">
            <div className="p-1">
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
                                placeholder="Bank"
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
                            <label>FBuffet</label>
                            <CurrencyInput
                                decimalSeparator=','
                                groupSeparator='.'
                                className="form-control form-control-user"
                                id="comodin"
                                name='comodin'
                                placeholder="FBuffet"
                                allowDecimals={true}
                                value={data.comodin}
                                step={1}
                                allowNegativeValue={false}
                                onValueChange={(value, name) => handleChangeValue(value!, name!)}
                            />
                        </div>
                    </div>
                    <hr />
                    <a className="btn btn-primary btn-user btn-block" onClick={e => onSave(e)}>
                        Guardar
                    </a>
                </form>
            </div>
        </div>

    );
}

export default Consolidate;