import Axios from "axios"
import React, { useEffect, useState } from "react"
import { AntoherComponent } from "@absolutePath/AnotherComponent"

declare global {
    interface Window {
        _env: {
            [key: string]: string;
        };
    }
}

export const MyCompentToTest = () => {

    const [name, setName] = useState('not fetched yet')

    useEffect(() => {

        Axios
            .get(`${window._env.REACT_APP_MY_URL_FROM_ENV}/user-name/23`)
            .then(res => {
                setName(res.data.name)
            })

    }, [])

    return (
        <>
            <div> youre name shall come here {name}</div>
            <AntoherComponent/>
        </>
    )
}