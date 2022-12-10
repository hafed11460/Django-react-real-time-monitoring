import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
const PlcDetail = () => {

  const [percentage, setPercentage] = useState(66)
  const [range, setRange] = useState(100)
  const handleRange = (e) => {
    setPercentage(e.target.value)
  }
  return (
    <Row className='row-cols-1 row-cols-md-6 g-5'>
      <Col>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={5}
        />
        <input value={percentage} onChange={handleRange}
          type="range" class="form-range" id="customRange1"></input>
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
          type="range" class="form-range" id="customRange1"></input>
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
          type="range" class="form-range" id="customRange1"></input>
      </Col>
      <Col>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={5}
        />
        <input value={percentage} onChange={handleRange}
          type="range" class="form-range" id="customRange1"></input>
      </Col>
    </Row>

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
