import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);
    let result = [priceOptions[0], priceOptions[1]];

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    // console.log(priceOptions);

    const handleAddtoCart = async () => {
        await dispatch({
            type: "ADD",
            id: props._id,
            name: props.name,
            price: finalPrice,
            qty: qty, size: size
        })

        console.log(data);

    };
    let finalPrice = qty * options[size];

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className='container w-100'></div>
                        <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select >
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {result.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                        <hr>
                        </hr>
                        <div className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
