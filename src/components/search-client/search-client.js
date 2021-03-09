import React from "react";
import "./search-client.scss"
import { useForm } from "react-hook-form";

const SearchClient = props => {
    const { searchHandler } = props
    const { register, handleSubmit, setValue, errors } = useForm();

    const onChange= (e) => {
        let inputKey = e.target.name
        if (inputKey === "genderF" || inputKey === "genderM"){
            inputKey = "sex"
        }
        console.log('key', inputKey)
        setValue(inputKey, e.target.value);
        handleSubmit((data) => searchHandler(data, inputKey))();
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
                                <input onChange={ event => onChange(event) } name={"genderM"} type="checkbox" ref={register} className="filled-in male"/>
                                <span>Мужской</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input onChange={ event => onChange(event) } name={"genderF"} type="checkbox" ref={register} className="filled-in female"/>
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