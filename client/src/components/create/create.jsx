import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getTypes, addPokemon } from "../../actions";

export default function Create() {

    let dispatch = useDispatch();
    //let types = useSelector((state) => state.types);
    let types = [];

    const [input, setInput] = useState({

        name: "",
        //hp: "", 
        // attack: "",
        // defense: "",
        // speed: "",
        // height: "",
        // weight: "",
        // types: [],
    })

    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value,


        })

    }

    const ejemplo = {
        name: "PIKA",
        hp: "10",
        attack: "10",
        defense: "34",
        speed: "8",
        height: "78",
        weight: "234",
        types: ["fire", "poison"]
    }

    function handleSubmit(e) {

        e.preventDefault();

        console.log(ejemplo);
        console.log(input);

        dispatch(addPokemon(input));
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: [],
        })
    }



    useEffect(() => {
        dispatch(getTypes());
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div>Create Your Pokemon!</div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={(e) => { handleChange(e) }} />
            </div>
            <div>
                <label>HP:</label>
                <input type="text" name="hp" />
            </div>
            <div>
                <label>Speed:</label>
                <input type="text" name="speed" />
            </div>
            <div>
                <label>Weight:</label>
                <input type="text" name="weight" />
            </div>

            <div>
                <select>
                    {
                        types.map(t => {
                            return (
                                <option key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>


                {
                    types.map(t => {
                        return (
                            <div key={t.id}>
                                <p>{t.name}</p>
                                <button>X</button>
                            </div>
                        )
                    })
                }
            </div>
            <button type="Submit">CREATE POKEMON</button>
        </form>
    )

}