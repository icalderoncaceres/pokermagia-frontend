
interface IProps {
    week: number
    range: number[]
    day: number
    handleSelectDay: any
    comodin: number
    handleChangeComodin: any
}

function Row(props: IProps) {
    
    return (
        <tr>
            <th scope="row">{props.week}</th>
            {
                props.range.map((n: number, index: number) => {
                    if (n === props.day) {
                        return (<td key={`${n}_${index}`}><button onClick={props.handleSelectDay} value={n} className="btn btn-primary"> {n > 0 ? n : ''}</button></td>)
                    }
                    return (<td key={`${n}_${index}`}><button onClick={props.handleSelectDay} value={n} className="btn btn-default"> {n > 0 ? n : ''}</button></td>)
                })
            }
            <td><input  type="number" style={{width: "60px"}} value={props.comodin} onChange={e => props.handleChangeComodin(props.week, +e.target.value)}></input></td>
        </tr>
    );
}

export default Row;