import {useCallback, useEffect, useState} from "react";
import dishRepository from "../repository/dishRepository.js";
import * as response from "react-router";

const initialState = {
    dishes: [],
    loading: true,
};

const useDishes = () => {
    const [state, setState] = useState(initialState);


    const fetchDishes = useCallback(()=>{
        setState({
            dishes: [],
            loading: false,
        });
        dishRepository
            .findAll()
            .then((response) => {
                setState({
                    dishes: response.data,
                    loading: false,
                });
            })
            .catch((error)=> {console.log(error)})
    }, []);


    const onAdd = useCallback((data)=>{
        dishRepository
            .add(data)
            .then(()=> fetchDishes())
            .catch((error)=> {console.log(error)})
    },[fetchDishes]);

    const onEdit = useCallback((id,data)=>{
        dishRepository
            .edit(id, data)
            .then(()=> fetchDishes())
            .catch((error)=> {console.log(error)})
    },[fetchDishes]);

    // TODO: Implement this.
    const onDelete =useCallback((id)=>{
            dishRepository
                .delete(id)
                .then(()=> fetchDishes())
                .catch((error)=> {console.log(error)})
    },[fetchDishes]);

    useEffect(() => {
       fetchDishes();
    }, [fetchDishes]);

    return {...state, onAdd, onEdit, onDelete};
};

export default useDishes;