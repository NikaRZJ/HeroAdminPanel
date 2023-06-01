// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [element, setElement] = useState("");

    const [createHero, { isLoading }] = useCreateHeroMutation();

    // const { filters } = useSelector((state) => state.filters);

    const filters = selectAll(store.getState());

    const dispatch = useDispatch();

    const { request } = useHttp();

    const onAdd = (e) => {
        const newHero = { id: uuid(), name, description, element };

        createHero(newHero).unwrap();

        setName("");
        setDescription("");
        setElement("");
    };

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option>Я владею элементом...</option>
                    {filters.map((item) =>
                        item.name !== "all" ? (
                            <option key={item.name} value={item.name}>
                                {item.label}
                            </option>
                        ) : null
                    )}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                    e.preventDefault();
                    onAdd(e);
                }}>
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
