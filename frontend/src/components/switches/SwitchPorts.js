
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { FaRetweet, FaSave } from 'react-icons/fa'
import PortSecurityModel from './PortSecurityModel'
import PowerPort from './PowerPort'
import { Accordion, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetSwitchsListQuery } from '../../features/switchs/switchAPI'
import { WS_URL } from '../../features/baseUrl';
import { useSelector } from 'react-redux';
import AppContext from 'context/Context';
import { preFfix, suffix } from 'value';

function SwitchsPorts() {
  const {
    config: { isHide },
    setConfig
  } = useContext(AppContext)
  // console.log('render SwtchPorts Component')
  const { token } = useSelector((state) => state.auth)
  const { sid } = useParams()
  const navigate = useNavigate()
  const limitPort = 28
  const [isLoadData, setisLoadData] = useState(false)
  // const [delay, setDelay] = useState(3)
  // const [validDelay, setValidDelay] = useState(120)
  const [switchPorts, setSwitchPorts] = useState([])
  const [switchInfo, setSwitchInfo] = useState(null)
  const [switchPortsSecurity, setSwitchPortsSecurity] = useState([])
  const [socketUrl, setSocketUrl] = useState(`${WS_URL}/switchs/ports/`);

  const { data: switchs } = useGetSwitchsListQuery()

  const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
    queryParams: {
      token: token ? token : ""
    },
    onOpen: () => {
      console.log('Connected!')
    },
    onClose: () => {
      console.log('Reconnecting Websocket ')
      setSocketUrl(null)
      setTimeout(function () {
        setSocketUrl(`${WS_URL}/switchs/ports/`)
      }, 1000);
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data)
      switch (data.type) {
        case 'switch_ports_data':
          console.log(data)
          if (data.message.ports !== null) {
            setSwitchPorts(data.message.ports)
            console.log('complete fetch data security and ports ')
          }
          if (data.message.ports_security != null) {
            setSwitchPortsSecurity(data.message.ports_security)
          }
          setSwitchInfo(data.message.switch)
          setisLoadData(false)
          break;

        case 'shutdown_single_port':
          const portState = data.port_state
          const newState = switchPorts.map((port) => {
            if (port.interface === portState.interface) {
              return portState
            }
            return port;
          })

          if (portState.status === 'administratively') {
            toast.error(`Power Off Port ${portState.interface}`, {})
          } else {
            toast.success(`Power On Port ${portState.interface}`, {})
          }
          setSwitchPorts(newState)
          break;

        case 'success_save_config':
          toast.success('Success Save Config!');
          setisLoadData(false)
          break;
        default:
          console.error(' Unknow Message Type')
          break;
      }
    }
  })

  const handleSelectSwitch = (e) => {
    console.log(' render useEffect handleSelectSwitch')
    console.log('sid :', sid, 'id', e.target.value)
    navigate(`/switchs/${e.target.value}/ports/`)
  }


  const isActivePortSecurity = useCallback((port) => {

    let state = switchPortsSecurity.find((o) => {
      if (o.interface === port) {
        return true; // stop searching
      }
      return false
    })
    return state
  })

  const handleShutdownPort = useCallback((port, state) => {
    console.log(`Shutdown ${port} - ${state}`)
    sendJsonMessage({
      'type': 'shutdown_single_port',
      'switch_id': sid,
      'port': port,
      'state': state,
    })
  })

  const saveConfig = () => {
    // console.log(' render useEffect saveConfig ')
    setisLoadData(true)
    sendJsonMessage({
      'type': 'save_config',
      'switch_id': sid,
    })
  }

  const handleReloadSwitchPortsData = () => {
    // console.log(' render useEffect handleReloadSwitchPortsData ')
    setisLoadData(true)
    sendJsonMessage({
      'type': 'get_switch_ports_data',
      'message': 'switch_ports_data',
      'switch_id': sid
    })
  }

  useEffect(() => {
    // console.log(' render useEffect sid ')
    setisLoadData(true)
    sendJsonMessage({
      'type': 'get_switch_ports_data',
      'message': 'switch_ports_data',
      'switch_id': sid
    })
  }, [sid]);


  // useEffect(() => {
  //   console.log(' render useEffect validDelay ')
  //   const interval = setInterval(() => {
  //     setisLoadData(true)
  //     sendJsonMessage({
  //       'type': 'get_switch_ports_data',
  //       'message': 'switch_ports_data',
  //       'switch_id': sid
  //     })
  //   }, validDelay * 1000);
  //   return () => clearInterval(interval);
  // }, [validDelay]);



  // use this function to split switch
  const handlSwitchPort = () => {
    // console.log(' render handlSwitchPort')
    let portList = []
    let sw_length = switchPorts.length / 28
    let index = 0
    for (let i = 0; i < sw_length; i++) {
      let ports = []
      for (let j = 0; j < limitPort; j++) {
        ports.push(switchPorts[index])
        index += 1
      }
      portList.push(ports)
    }
    return portList
  }
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  return (
    <Row>
      <Row className=''>
        <Col sm={6} >
          {
            switchInfo &&
            <>
              <h5>{switchInfo.name}</h5>
              <h5>
                {
                  isHide ? <>{preFfix} {suffix} </> : switchInfo.ip_address
                }

              </h5>
            </>
          }
        </Col>
        <Col sm={6} >
          <div className='d-flex flex-row justify-content-end p-3 '>

            <div className="form-group">
              <select onChange={handleSelectSwitch} className="choices form-select">
                {
                  switchs && switchs.map((sw) => (
                    <option key={sw.id} value={sw.id}>{sw.id} - {sw.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="mb-2">
              <button
                onClick={saveConfig}
                disabled={isLoadData}
                className="btn icon icon-left btn-success mx-1"
                type="button">
                <span> <FaSave />  Save Config </span>
              </button>
              <button
                onClick={handleReloadSwitchPortsData}
                disabled={isLoadData}
                className="btn icon icon-left btn-primary" type="button">
                <span> <FaRetweet />  Fetch Data </span>
              </button>
              {isLoadData &&
                <span className="btn  btn-outline-warning mx-1 border-0" >
                  <span className="spinner-grow text-warning" role="status" aria-hidden="true"></span>
                </span>
              }
            </div>
          </div>
        </Col>
      </Row>


      <Accordion defaultActiveKey={0} className=' p-0 '>
        {handlSwitchPort().map((ports, id) => (
          <Accordion.Item eventKey={id} key={id} className='border-bottom'>
            <Accordion.Header color={'primary'}>Switch N° {id + 1}</Accordion.Header>
            <Accordion.Body>
              <Row>
                {ports.map((port, idx) => (
                  <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2 col-xxl-1 col-md-3 ">
                    <div className="card ">
                      <div className="card-body px-3 py-1 pb-3">
                        <h6 className="font-extrabold mb-0">{port.name} {port.interface}</h6>
                      </div>
                      <div className="card-footer p-1 px-2">
                        <div className="btn-group  mb-2 border-0" role="group" aria-label="Basic example">

                          <PowerPort
                            port={port.interface}
                            status={port.status}
                            handleShutdownPort={handleShutdownPort}
                          />
                          <PortSecurityModel
                            switch_id={sid}
                            status={isActivePortSecurity(port.interface)}
                            port={port.interface}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Row>
  )
}

export default React.memo(SwitchsPorts)