import React from 'react';

interface IProp {
    images: {id: string, b64: string}[],
    cb: any,
    handleDelete: any
}

function Gallery(props: IProp) {
    return (
        <React.Fragment>
            <div className="row">
                {
                    props.images.map((img: {id: string, b64: string}, index: number) => {
                    return (<div key={index} className="col-lg-3">
                                <img src={img.b64} className="img-thumbnail" alt="..." />
                                <span 
                                    className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                                    onClick={props.handleDelete()} id={img.id}>
                                </span>
                            </div>)
                    })
                }
            </div>
            <div className="row mt-3">
                Cargar imágen
                <input 
                    type="file" 
                    className="btn btn-success btn-user btn-block" 
                    onChange={props.cb()} 
                    accept="image/png, image/gif, image/jpeg">
                </input>
            </div>
        </React.Fragment>
    );
}

export default Gallery;