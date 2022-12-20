import { useAddPlcMutation, useUpdatePlcMutation } from 'features/plc/plcApi';
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
import { FaPen, FaPlusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify'

const EditPlc = ({plc}) => {
    const [updatePlc, { data, isLoading, isSuccess, isError }] = useUpdatePlcMutation()
    const [show, setShow] = useState(false);
    const initState = {
        id:plc.id,
        ip_v4: plc.ip_v4,
        rack: plc.rack,
        slot: plc.slot,
    };

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = React.useState(initState);

    const onSubmit = (values) => {
        updatePlc(values)
        toast.success(`PLC Updated Successfully`, {})
    };

    const onError = (error) => {
        console.log("ERROR:::", error);
    };

    useEffect(() => {
        if (isSuccess) {
            setShow(false)
        }
    }, [isSuccess, data])

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        // reValidateMode: "onChange",
        defaultValues: initialValues
    });

    // const x = JSON.stringify(data);
    // const y = JSON.stringify(listShow);

    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            console.log(">>", value, name, type);
            // {1: '1', 2: '9'} '2' 'change'
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <div>
            <Button onClick={() => setShow(!show)} size="sm" className="me-2 " variant="info">
                <FaPen /> Edit
            </Button>

            <Modal
                show={show}
                size="md"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit PLC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit, onError)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>IP Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="10.10.10.10"
                                {...register("ip_v4", { required: "Correo es obligatorio" })}
                            />
                            {errors.ip_v4 && (
                                <Form.Text className="text-danger">
                                    {errors.ip_v4.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Rack</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="rack"
                                {...register("rack", { required: "Contraseña es obligatoria" })}
                            />
                            {errors.rack && (
                                <Form.Text className="text-danger">
                                    {errors.rack.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Slot</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Slot"
                                {...register("slot", { required: "Confirmar contraseña es obligatorio" })}
                            />
                            {errors.slot && (
                                <Form.Text className="text-danger">
                                    {errors.slot.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditPlc
