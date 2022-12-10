import { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WS_URL } from '../../features/baseUrl'

export const Footer = () => {
    const heigth = '250px'
    const {token} = useSelector((state)=>state.auth)
    const [open, setOpen] = useState(false)
    const [logList, setLogList] = useState([])
    const [socketUrl, setSocketUrl] = useState(`${WS_URL}/switchs/errors/`);
    const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
        queryParams: {
            token: token ? token : ""
          },
        onOpen: () => {
            console.log('Port security Connected ')
        },
        onClose: () => {
            console.log('Reconnecting Websocket ')
            setSocketUrl(null)
            // setTimeout(function() {
            //     setSocketUrl(`${WS_URL}/switchs/errors/`)
            // }, 1000);

        },
        // reconnectInterval:()=>{
        //         console.log('reconnect websocket')
        // },
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            switch (data.type) {
                case `event_logs`:
                    setLogList(logList => [...logList, data.log])
                    console.log(data)
                    break;
                default:
                    console.error(' Unknow Message Type')
                    break;
            }
        }
    })
    function formatMessageTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString().slice(0, 5);
      }
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    return (
        <>
            <footer className='mb-0 p-0 fixed-bottom overflow-auto border-top'   >
                <div className="col">
                    <div className="card mb-0">
                        <div className="card-header p-0 ">
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-row-reverse'>
                                    <span className='badge bg-success'>{connectionStatus}</span>
                                    <span className='btn btn-danger' onClick={()=>setLogList([])}>Clear</span>
                                </div>

                                <div className='d-flex flex-row-reverse'>
                                    <span
                                        className='btn-sm'
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        {open ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}
                                    </span>
                                </div>
                            </div>
                            <Collapse className="card-content overflow-auto " in={open} style={{ height: heigth, maxHeight: heigth,minHeight:heigth }}>
                                <ul className="list-group">
                                    {logList.map((l,idx) => (
                                            <li className="list-group-item list-group-item-action" key={idx}>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <small className="mb-1 text-white">{l.message}</small>
                                                    <small> {formatMessageTimestamp(l.date)}</small>
                                                </div>
                                                {/* <small className="mb-1">
                                                    {l.message}
                                                </small> */}
                                            </li>
                                    ))}
                                </ul>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}