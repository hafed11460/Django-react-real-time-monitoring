import Chart from "react-apexcharts";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
const SwitchVerCard = ({ sw }) => {
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

            <Card class="h-100">
                <Card.Body class="card-body">
                    <Chart className="border-bottom"
                        options={data.optionsRadial}
                        series={data.seriesRadial}
                        type="radialBar"
                        width={width}
                    />
                    <div className="col-md-12">
                        <h6 className="font-extrabold mb-0">{sw.name}</h6>
                        <h6 className="font-extrabold mb-0">{sw.ip_address}</h6>
                        <h6 className="text-muted font-semibold">
                            {environment.created_at && (environment.created_at).substr(0, 10)} - {environment.created_at && (environment.created_at).substr(11, 8)}
                        </h6>
                    </div>
                </Card.Body>
                <Card.Footer>
                <Button onClick={handlerHistory} className="btn btn-sm btn-info" >Detail</Button>
                </Card.Footer>
            </Card>
    )
}

export default SwitchVerCard;