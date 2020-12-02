import React, { useState, useEffect } from 'react';
import './UserView.scss';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getStringFromObject } from '../../utils';
import { getUserWithID } from '../../service/user'

const UserView = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    const fetchUser = async () => {
        await fetch(getUserWithID.replace('<user_id>', id))
            .then(response => response.json())
            .then(userDetails => {
                console.log(userDetails)
                setUser(userDetails);
            })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="userDetails__container">
            <Table striped bordered hover size="sm" className="details__table">
                <tbody>
                    {
                        user && Object.keys(user).map(key => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td><strong>{typeof user[key] === 'object' ? getStringFromObject(user[key]) : user[key]}</strong></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UserView
