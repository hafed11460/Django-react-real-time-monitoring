import AppContext from "context/Context";
import { useContext } from "react";
import Chart from "react-apexcharts";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { preFfix, suffix } from "value";
const SwitchHorCard = ({ sw }) => {
    const { config: { isHide } } = useContext(AppContext)
    const navigate = useNavigate()
    const { environment } = sw
    const getColor = (temp) => {
        if (temp > 60) {
            return '#A52A2A'
        } else if (temp > 50) {
            return '#FFA500'
        }
        return '#32CD32'
    }

    const handlerHistory = () => {
        navigate(`/switchs/${sw.id}/detail`, { state: { id: sw.id, name: sw.name, ip_address: sw.ip_address } })
    }

    const width = 250
    const data = {

        optionsRadial: {
            colors: [getColor(environment.temp)],
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: "60%",
                        background: "#fff",
                        position: "front",
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    track: {
                        background: "#fff",
                        strokeWidth: "67%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.35
                        }
                    },

                    dataLabels: {
                        showOn: "always",
                        name: {
                            offsetY: -20,
                            show: true,
                            color: "#888",
                            fontSize: "13px"
                        },
                        value: {
                            formatter: function (val) {
                                return val;
                            },
                            color: "#444",
                            fontSize: "40px",
                            show: true
                        }
                    }
                }
            },
            // fill: {
            //     type: "gradient",
            //     gradient: {
            //         shade: "dark",
            //         type: "horizontal",
            //         shadeIntensity: 0.5,
            //         gradientToColors: ["#ABE5A1"],
            //         inverseColors: true,
            //         opacityFrom: 1,
            //         opacityTo: 1,
            //         stops: [0, 100]
            //     }
            // },
            stroke: {
                lineCap: "round"
            },
            labels: ["Percent"]
        },
        seriesRadial: [environment.temp == null ? 0 : environment.temp],

    };

    return (
        <Card className="mb-3">
            <Row className="row g-0">
                <Col sm={12} md={6}>
                    <Chart className="p-0"
                        options={data.optionsRadial}
                        series={data.seriesRadial}
                        type="radialBar"
                        width={width}
                    />
                </Col>
                <Col sm={12} md={12} xl={6}>
                    <Card.Body>
                        <h5 className="font-extrabold ">{sw.name}</h5>
                        <h5 className="font-extrabold ">
                            {
                                isHide ? <>{preFfix} {suffix} </> : sw.ip_address
                            }
                        </h5>
                        <span className="text-muted font-semibold d-block">
                            {environment.created_at && (environment.created_at).substr(0, 10)}
                        </span>
                        <span className="text-muted font-semibold">
                            {environment.created_at && (environment.created_at).substr(11, 8)}
                        </span> <br/>
                        <Button onClick={handlerHistory} className="btn btn-sm btn-primary mt-2" > Detail </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default SwitchHorCard;