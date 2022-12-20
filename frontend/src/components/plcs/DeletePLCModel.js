import { useDeletePlcMutation, useGetPlcsQuery } from 'features/plc/plcApi';
import React, { useEffect, useState } from 'react'
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Modal,
    InputGroup,
    FormControl
    // InputGroup,
    // FormControl
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DeletePLCModel = ({plc_id}) => {
    const [deletePlc, { data, isLoading, isSuccess, isError }] = useDeletePlcMutation()
    const [show, setShow] = useState(false);

    const handleDeletePlc = (values) => {
        deletePlc({id:plc_id})
    };


    useEffect(() => {
        if (isSuccess) {
            setShow(false)
            toast.error('Plc Deleted Successfully')
        }
    }, [isSuccess, data])

    return (
        <div>
            <Button size="sm" className="me-2 " variant="danger" onClick={() => setShow(!show)} >
                <FaTrashAlt /> Delete
            </Button>

            <Modal
                show={show}
                size="md"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton className='bg-danger'>
                    <Modal.Title>
                        Delete PLC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure to delete this record
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant='secondary'>Close</Button>
                    <Button onClick={handleDeletePlc} size='sm'  variant='danger'>Accept</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeletePLCModel
