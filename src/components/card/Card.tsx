
interface IProps {
    title: string
    amount: number | string
    currency?: 'USD' | 'EUR'
}


function Card(props: IProps) {

    const selectSymbol = (currency = 'USD') => {
        return currency === "USD" ? "$"
            : currency === "EUR" ? '€'
                : '$'
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
                                        { selectSymbol('EUR') } {props.amount}
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;