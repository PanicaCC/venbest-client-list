import React from "react";
import "./client-list.scss"

const ClientList = props => {

    const { clients } = props
    return (
        <ul className="clients collection">
            <li className="clients__header collection-header">
                <span><b>Имя</b></span>
                <span><b>Фамилия</b></span>
                <span><b>Возраст</b></span>
                <span><b>Пол</b></span>
            </li>
            {
                clients.map((item, index) => {
                    const {name, lastname, age, sex} = item
                        return (
                            <li key={index} className={"clients__item collection-item"}>
                                <span>{name}</span>
                                <span>{lastname}</span>
                                <span>{age}</span>
                                <span>{(sex === "m") ? "М" : "Ж"}</span>
                            </li>
                        )
                })
            }

        </ul>
    )
}
export  default ClientList