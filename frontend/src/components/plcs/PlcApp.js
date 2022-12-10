import AppContext from "context/Context";
import { useGetPlcsQuery } from "features/plc/plcApi";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { FaLayerGroup, FaPen, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CreatePlc from "./CreatePlc";


const PlcContext = createContext({
    plcs: []
})

function usePlcsSource() {
    const { data, isLoading, isSuccess } = useGetPlcsQuery()
    const [{ plcs, search }, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setPlcs':
                return { ...state, plcs: action.payload }
            case 'setSearch':
                return { ...state, search: action.payload }
        }
    }, {
        plcs: [],
        search: ''
    })

    useEffect(() => {
        if (data) {
            dispatch({
                type: 'setPlcs',
                payload: data
            })
        } else {
            dispatch({
                type: 'setPlcs',
                payload: []
            })
        }
    }, [data])

    const filterPlcs = useMemo(() => {
        return plcs.filter((plc) => plc.ip_v4.includes(search))
    }, [plcs, search])

    const sortedPlcs = useMemo(() => [...filterPlcs].sort((a, b) => a.ip_v4.localeCompare(b.ip_v4)))

    const setSearch = useCallback((search) => {
        dispatch({
            type: 'setSearch',
            payload: search
        })
    }, [])
    return { plcs: sortedPlcs, search, setSearch }
}


function usePLC() {
    return useContext(PlcContext)
}

const SearchBox = () => {
    const { search, setSearch } = usePLC()
    return (

        <Form.Group className="mb-4 ">
            <Form.Control
                size="lg"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ..." />
        </Form.Group>
    )
}

const PlcCard = ({ plc }) => {
    const {
        config: { isHide },
        setConfig
    } = useContext(AppContext)

    return (
        <>
            <Col xs={6} md={4} key={plc.id}>
                <Card>
                    <Card.Body>
                        <div className="d-flex flex-column justify-content-between ">
                            <Link to={`/plcs/${plc.id}/`} className="  ">
                                <div className="d-flex justify-content-between ">
                                    <div className="me-2 p-2">
                                        <FaLayerGroup size={50} color={'orange'} />
                                    </div>
                                    <div>
                                        <h5>{plc.ip_v4}</h5>

                                    </div>
                                </div>
                            </Link>
                            <div className="d-flex flex-row justify-content-end mt-3 ">
                                <Button size="sm" className="me-2 " variant="info"> <FaPen/> </Button>
                                <Button size="sm" variant="danger"> <FaTrashAlt/> </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}


const PlcsList = () => {
    const { plcs } = usePLC()
    return (
        <div className="page-content">
            <div className="d-flex flex-row justify-content-between">
                <SearchBox />
                <CreatePlc/>
            </div>
            <Row>
                {plcs && plcs.map((plc) => (<PlcCard plc={plc} key={plc.id}/>))}
            </Row>
        </div >

    )
}

const PlcApp = () => {
    return (
        <PlcContext.Provider value={usePlcsSource()}>
            <PlcsList />
        </PlcContext.Provider>
    )
}

export default PlcApp;