import { WS_URL } from 'features/baseUrl';
import { useGetPlcQuery } from 'features/plc/plcApi';
import { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { RiRadioButtonLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { iconSize } from 'value';
import LineChart from './LineChart';


const Tag = ({ tag }) => {
  return (
    <tr>

    </tr>
  )
}
const PlcDetail = () => {
  const { pid } = useParams();
  const { data, isFetching } = useGetPlcQuery(pid)
  const [series, setSeries] = useState([])
  const [percentage, setPercentage] = useState(66)
  const [range, setRange] = useState(100)
  const [socketUrl, setSocketUrl] = useState(`${WS_URL}/plcs/`);

  const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
    queryParams: {
      token: '' //token ? token : ""
    },
    onOpen: () => {
      console.log('Connected!')
    },
    onClose: () => {
      console.log('Reconnecting Websocket ')
      setSocketUrl(null)
      setTimeout(function () {
        setSocketUrl(`${WS_URL}/plcs/`)
      }, 1000);
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data)
      switch (data.type) {
        case 'send_plc_data':
          setPercentage(data.value)

          setSeries((series) => {
            if (series.length > 8) {
              series.shift()
              console.log('ddd', series)
              return [...series, data.value]
            } else {

              return [...series, data.value]
            }
          })
          break;

        default:
          console.error(' Unknow Message Type')
          break;
      }
    }
  })

  const handleRange = (e) => {
    setPercentage(e.target.value)
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
      <div className='d-flex flex-row justify-content-end'>

        {connectionStatus == "Open" ?
        <>
          <RiRadioButtonLine className='text-success' size={iconSize} /> Online
        </>
        :
          <>
            <RiRadioButtonLine className='text-danger' size={iconSize} /> Offline
          </>
        }
      </div>
      <Row>
        <Col md={6}>
          <LineChart series={series} />
        </Col>
        <Col md={6}>
          <LineChart className='border' series={series} type={'bar'} />
        </Col>
      </Row>
      <Row className='row-cols-1 row-cols-md-6 g-5'>
        <Col>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
          />
          <input value={percentage} onChange={handleRange}
            type="range" className="form-range" id="customRange1"></input>
        </Col>
        <Col>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent"
            })}
          />
          <input value={percentage} onChange={handleRange}
            type="range" className="form-range" id="customRange1"></input>
        </Col>
        <Col>
          <CircularProgressbar
            value={percentage}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: "butt"
            })}
          />
          <input value={percentage} onChange={handleRange}
            type="range" className="form-range" id="customRange1"></input>
        </Col>
        <Col>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
          />
          <input value={percentage} onChange={handleRange}
            type="range" className="form-range" id="customRange1"></input>
        </Col>
      </Row>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Data Type</th>
            <th>Adress Start Byte</th>
            <th>Adress Start bit</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.tags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.data_type}</td>
                <td>{tag.address_start_byte}</td>
                <td>{tag.address_start_bit}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}
function Example(props) {
  return (
    <div style={{ marginBottom: 80 }} className='border'>
      <hr style={{ border: "2px solid #ddd" }} />
      <div style={{ marginTop: 30, display: "flex" }}>
        <div style={{ width: "20%", paddingRight: 30 }}>{props.children}</div>
        <div style={{ width: "70%" }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
export default PlcDetail
