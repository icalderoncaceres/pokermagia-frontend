import { NavLink } from "react-router-dom"

interface IProps {
    title: string
    amount: number | string
    amount2?: number | string 
    currency?: 'USD' | 'EUR'
    link?: string
}


function Card(props: IProps) {

    const selectSymbol = (currency = 'USD') => {
        return currency === "USD" ? "$"
            : currency === "EUR" ? '€'
                : '$'
    }
    let go;
    if (props.link) {
        go = <NavLink to={props.link}>Ver</NavLink>
    }
    return (
        <div className="card border-left-primary shadow h-100 py-1">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            {props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                            { props.currency && selectSymbol('USD') } {props.amount}</div>

                        {
                            props.currency && (
                                <>
                                    <hr />
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        { selectSymbol('EUR') } {props.amount2 ? props.amount2 : 0}
                                    </div>
                                </>
                            )
                        }
                    {go}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;