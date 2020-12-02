import React, { useState } from 'react';
import { useUserDataLayer } from '../../contexts/userContext';
import { Table, Button, Form } from 'react-bootstrap';
import { BsFillTrashFill, BsInfoCircleFill } from "react-icons/bs";
import capitalize from 'capitalize'
import './Table.scss';
import { getStringFromObject } from '../../utils'

const UserTable = () => {
    const [{ users }, dispatch] = useUserDataLayer();

    const [pageNumber, setPageNumber] = useState(parseInt(localStorage.getItem('pageNumber')) || 0);
    const [perPage, setPerPage] = useState(parseInt(localStorage.getItem('perPage')) || 10);

    const changePerPage = (e) => {
        setPerPage(parseInt(e.target.value));
        localStorage.setItem('perPage', e.target.value);
        if (pageNumber !== 0) {
            setPageNumber(0);
            localStorage.setItem('pageNumber', 0);
        }
    }

    const deleteUser = (id) => {
        dispatch({
            type: 'DELETE_USER',
            payload: {
                id: id
            }
        });
    }

    const movePages = (e) => {
        if (e.target.name === 'next') {
            setPageNumber(prev => {
                localStorage.setItem('pageNumber', parseInt(prev) + 1);
                return prev + 1;
            });

        } else {
            setPageNumber(prev => {
                localStorage.setItem('pageNumber', parseInt(prev) - 1);
                return prev - 1;
            });
        }
    }

    return (
        <div className="app__tableContainer">
            { users.length > 0 && (
                <>
                    <Form.Group controlId="userTable.paginationControl">
                        <Form.Label>No of Entries</Form.Label>
                        <Form.Control as="select" value={perPage} onChange={changePerPage}>
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </Form.Control>
                    </Form.Group>
                    <Table striped bordered hover size="sm" className="app__userTable">
                        <thead>
                            <tr>
                                {Object.keys(users[0]).map((name, index) => index !== 0 ? <th key={name}>{capitalize(name)}</th> : null)}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.slice((pageNumber * perPage),(pageNumber * perPage) + perPage).map(user => {
                                    return <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{getStringFromObject(user.address)}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                        <td>{user.company.name}</td>
                                        <td>
                                            {
                                                <div className="action__container">
                                                    <Button variant="primary" size="sm"><a href={`/${user.id}`}><BsInfoCircleFill /></a></Button>
                                                    <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}><BsFillTrashFill /></Button>
                                                </div>
                                            }
                                        </td>

                                    </tr>
                                })}
                        </tbody>
                    </Table>
                    <div className="pagination__actions" onClick={movePages}>
                        <Button variant="primary" name="prev" size="sm" disabled={pageNumber === 0}>{'<'}</Button>
                        <Button variant="primary" name="next" size="sm" disabled={(pageNumber * perPage + perPage) >= users.length}>{'>'}</Button>
                    </div>
                </>)
            }
        </div>

    )
}

export default UserTable
