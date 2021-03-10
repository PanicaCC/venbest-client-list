import React from "react";
import "./search-client.scss"
import { useForm } from "react-hook-form";

const SearchClient = props => {
    const { clearGender, searchHandler } = props
    const { register, handleSubmit, setValue, errors, getValues } = useForm();

    const onChange= (e) => {
        let inputKey = e.target.name
        setValue(inputKey, e.target.value);
        handleSubmit((data) => searchHandler(data, inputKey))();
    }

    const onChecked = (e) => {
        const name = getValues('name')
        const lastname = getValues('lastname')
        const age = getValues('age')
        const data = {name: name, lastname: lastname, age: age}
        if (e.target.name === "genderM") {
            data["genderM"] = e.target.checked
        }
        if (e.target.name === "genderF") {
            data["genderF"] = e.target.checked
        }
        if(!e.target.checked){
            clearGender(data, e.target.name)
        }
        searchHandler(data, e.target.name);
    }

    return (
        <div className={"search"}>
            <div className="row">
                <h5>Поиск клиента</h5>
                <form  className="col s12 search__form">
                    <div className="search__form--main">
                        <div className="search__form--input input-field col s4">
                                Имя
                                <input onChange={ event => onChange(event) } name={"name"} ref={register} className="validate" />
                        </div>
                        <div className="input-field search__form--input col s4">
                                Фамилия
                                <input onChange={ event => onChange(event) } name={"lastname"} ref={register} />
                        </div>
                        <div className="input-field search__form--input col s4">
                                Возраст
                            <input onChange={ event => onChange(event) } name="age" type="number" ref={register({ min: 18, max: 99, validate: value => value >= 18 || value <= 99 })} />
                            {errors.age && <p>Введити возраст от 18 до 99</p>}
                        </div>
                    </div>
                    <div className={"search__form--gender"}>
                        <p>Пол</p>
                        <p>
                            <label>
                                <input onChange={ event => onChecked(event) } name={"genderM"} type="checkbox" className="filled-in male"/>
                                <span>Мужской</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input onChange={ event => onChecked(event) } name={"genderF"} type="checkbox" className="filled-in female"/>
                                <span>Жеский</span>
                            </label>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default SearchClient