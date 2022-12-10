
import React, { memo, useEffect, useState } from 'react';
import {Button , Modal} from 'react-bootstrap';
import { FaLock, FaPlusCircle, FaRetweet, FaTrash, FaUnlock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WS_URL } from '../../features/baseUrl';
import MacAddressConnected from './MacAddressConnected';
import MacAddressExisted from './MacAddressExisted';


const PortSecurityModel = memo(({status,switch_id, port  }) => {
    // console.log(`render PortSecurityModel ${port}`)
    const {token} = useSelector((state)=>state.auth)
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [macAddress, setMacAddress] = useState([])
    const [macAddressConnected, setMacAddressConnected] = useState([])
    const [portSecurityState, setPortSecurityState] = useState(status)
    const [socketUrl, setSocketUrl] = useState(`${WS_URL}/switchs/port-security/`);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setPortSecurityState(status)
    })

    const { readyState, sendJsonMessage } = useWebSocket(show ? socketUrl : null, {
        queryParams: {
            token: token ? token : ""
          },
        onOpen: () => {
            console.log('Port security Connected ')
        },
        onClose: () => {
            console.log('Reconnecting Websocket ')
            setSocketUrl(null)
            setTimeout(function () {
                setSocketUrl(`${WS_URL}/switchs/port-security/`)
            }, 1000);
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            switch (data.type) {
                case `port_security_mac_address_data_${port}`:
                    console.log(data)
                    setMacAddress(data.list_mac_address)
                    setMacAddressConnected(data.list_mac_address_connected)
                    setPortSecurityState(data.port_security_state)
                    setIsLoading(false)
                    break;
                case `port_security_state_data_${port}`:
                    setPortSecurityState(data.port_security_state)
                    setIsLoading(false)
                    break;
                case `handle_port_security_state_${port}`:
                    console.log('handle_port_security_state_',data)
                    setPortSecurityState(data.port_security_state)
                    setIsLoading(false)
                    break;
                case 'success_handle_port_security':
                    console.log(data)
                    setIsLoading(false)
                    setTimeout(() => {
                        reloadPortSecurityData()

                    }, 3000)
                    break;
                default:
                    console.error(' Unknow Message Type')
                    break;
            }
        }
    })


    useEffect(() => {
        if (show) {
            reloadPortSecurityData()
        }
    }, [show]);


    const handleAddMacAddress = (mac) => {
        setIsLoading(true)
        sendJsonMessage({
            'type': `handle_port_add_mac_address`,
            'switch_id': switch_id,
            'port': `${mac.port}`,
            'mac_address': `${mac.mac_address}`,
            'max': `${macAddress.length + 1}`,
        })
    }

    const handleRemoveMacAddress = (mac) => {
        setIsLoading(true)
        sendJsonMessage({
            'type': `handle_port_remove_mac_address`,
            'switch_id': switch_id,
            'port': `${mac.port}`,
            'mac_address': `${mac.mac_address}`,
            'max': `${macAddress.length - 1}`,
        })
    }
    const handlePortSecurityState = () => {
        setIsLoading(true)
        sendJsonMessage({
            'type': `handle_port_security_state_${port}`,
            'switch_id': switch_id,
            'port': `${port}`,
            'state': !portSecurityState
        })
    }

    const reloadPortSecurityData = () => {
        setIsLoading(true)
        sendJsonMessage({
            'type': `port_security_mac_address_data_${port}`,
            'switch_id': switch_id,
            'port': `${port}`,
        })
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <>
            <span className={`btn ${ portSecurityState ? 'btn-warning' : 'btn-light'} `} onClick={handleShow}>
                { portSecurityState ? <FaLock /> : <FaUnlock />  }
            </span>
            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                centered
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Port Security [ {port}]
                        {connectionStatus}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buttons d-flex flex-row-reverse">
                        {isLoading &&
                            <span className="btn icon icon-left btn-warning mx-1" >
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                        }
                        <Button
                            onClick={reloadPortSecurityData}
                            disabled={isLoading}
                            className="btn icon icon-left btn-primary" type="button">
                            <span> <FaRetweet />  Reload Data </span>
                        </Button>

                        <Button
                            disabled={isLoading}
                            onClick={handlePortSecurityState}
                            className={`btn ${portSecurityState ? 'btn-success' : ' btn-primary'}`}>
                            <span> {portSecurityState ? 'Disable' : 'Enable'}</span>
                        </Button>
                    </div>
                    <MacAddressExisted
                        handleRemoveMacAddress={handleRemoveMacAddress}
                        macAddress={macAddress}
                    />
                    <MacAddressConnected
                        handleAddMacAddress={handleAddMacAddress}
                        macAddressConnected={macAddressConnected}
                        macAddress={macAddress}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
})

export default PortSecurityModel;