import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getTypes, addPokemon } from "../../actions";
import './create.css';
import { Link } from "react-router-dom";

export default function Create() {

    let dispatch = useDispatch();
    let types = useSelector((state) => state.types);
    let success = false;
    const [input, setInput] = useState({

        name: null,
        image: null,
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        types: []

    })

    const [errors, setErrors] = useState({
        name: '',
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: "",
    });


    function validate(input) {
        let errors = {};
        console.log(input)

        if (!input.name) {
            errors.name = 'Name is required.';
        } else if (!/^.{0,15}$/.test(input.name)) {
            errors.name = 'Name is too long.';
        }

        if (input.hp) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.hp)) {
                errors.hp = 'HP must be number bigger than 0.';
            }
        }

        if (input.attack) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.attack)) {
                errors.attack = 'Attack must be number bigger than 0.';
            }
        }

        if (input.defense) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.defense)) {
                errors.defense = 'Defense must be number bigger than 0.';
            }
        }

        if (input.speed) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.speed)) {
                errors.speed = 'Speed must be number bigger than 0.';
            }
        }

        if (input.weight) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.weight)) {
                errors.weight = 'Weight must be number bigger than 0.';
            }
        }

        if (input.height) {
            if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/gm.test(input.height)) {
                errors.height = 'Height must be number bigger than 0.';
            }
        }


        return errors;
    }

    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

    }


    function handleSubmit(e) {

        e.preventDefault();
        dispatch(addPokemon(input));
        console.log(input);
        setInput({
            name: null,
            image: null,
            hp: null,
            attack: null,
            defense: null,
            speed: null,
            height: null,
            weight: null,
            types: [],
        })

        alert("Pokemon Creado!")
    }

    function handleSelect(e) {
        e.preventDefault();
        setInput({

            ...input,
            types: [...input.types, e.target.value]

        })

        console.log(input.types)

    }

    function handleClose(type) {
        setInput({

            ...input,
            types: input.types.filter(t => t !== type)

        })
    }


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    return (
        <div className='background'>

            <div className='container'>

                <Link to='/home'>
                    <button className="btn-back">BACK</button>
                </Link>

                <div className="create">Create Your Pokemon!</div>

                <form className="form" onSubmit={handleSubmit}>

                    <div>
                        <label className="label">Name:</label>
                        <input type="text" name="name" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.name ? <p className="red">{errors.name}</p> : null}
                    </div>

                    <div>
                        <label className="label">Image:</label>
                        <input type="text" name="image" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.image ? <p className="red">{errors.image}</p> : null}
                    </div>
                    <div>
                        <label className="label">HP:</label>
                        <input type="text" name="hp" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.hp ? <p className="red">{errors.hp}</p> : null}
                    </div>
                    <div>
                        <label className="label">Attack:</label>
                        <input type="text" name="attack" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.attack ? <p className="red">{errors.attack}</p> : null}
                    </div>
                    <div>
                        <label className="label">Defense:</label>
                        <input type="text" name="defense" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.defense ? <p className="red">{errors.defense}</p> : null}
                    </div>

                    <div>
                        <label className="label">Speed:</label>
                        <input type="text" name="speed" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.speed ? <p className="red">{errors.speed}</p> : null}
                    </div>
                    <div>
                        <label className="label">Weight:</label>
                        <input type="text" name="weight" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.weight ? <p className="red">{errors.weight}</p> : null}
                    </div>
                    <div>
                        <label className="label">Height:</label>
                        <input type="text" name="height" className="black" onChange={(e) => { handleChange(e) }} />
                        {errors.height ? <p className="red">{errors.height}</p> : null}
                    </div>

                    <div>
                    <label className="label">Types:</label>

                        <select className="select" onChange={(e) => { handleSelect(e) }}>
                            {
                                types.map(t => {
                                    return (
                                        <option value={t.name} key={t.name}>{t.name}</option>
                                    )
                                })
                            }
                        </select>

                        <div>
                            {
                                input.types.map(t =>
                                    <div key={t.name}>
                                        <p className="option">{t}</p>
                                        <button className="btn-close" onClick={() => handleClose(t)} >X</button>

                                    </div>

                                )
                            }
                        </div>
                    </div>
                    <button className='btn-create-pokemon' type="Submit">CREATE</button>
                </form>


            </div>

        </div>
    )

}