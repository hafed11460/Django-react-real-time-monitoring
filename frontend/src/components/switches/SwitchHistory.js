import AppContext from "context/Context";
import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation, useParams } from "react-router-dom";
import { preFfix, suffix } from "value";
import { useSwitchEnvironmentHistoryMutation, useSwitchEnvironmentHistoryQuery } from "../../features/switchs/switchAPI";


const SwitchHistory = () => {
    const {
        config: { isHide },
        setConfig
    } = useContext(AppContext)
    const { sid } = useParams();
    const { state } = useLocation()
    const [temp, setTemp] = useState([])
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10))
    const [switchEnvironmentHistory, { data: temps, isSuccess }] = useSwitchEnvironmentHistoryMutation({ id: sid })

    useEffect(() => {
        switchEnvironmentHistory({ id: sid, date: date })
    }, [date])

    useEffect(() => {
        let d = []
        if (temps) {
            for (let i = 0; i < temps.length; i++) {
                d.push(temps[i].temp)
            }
        }
        setTemp(d)
    }, [temps])
    const data = {
        series: [{
            name: 'series1',
            data: temp
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            // xaxis: {
            //     type: 'datetime',
            //     categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            // },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    }

    const nextDay = () => {
        if (date != null) {
            let newdate = new Date(date);
            newdate.setDate(newdate.getDate() + 1);
            setDate(newdate.toISOString().substr(0, 10))
        }
    }
    const prevDay = () => {
        if (date != null) {
            let newdate = new Date(date);
            newdate.setDate(newdate.getDate() - 1);
            setDate(newdate.toISOString().substr(0, 10))
        }
    }

    const onChangeDate = e => {
        console.log(e.target.value)
        const newDate = new Date(e.target.value).toISOString().substr(0, 10)
        setDate(newDate);
        console.log(newDate); //value picked from date picker
    };
    return (

        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{state && state.name}</h4>
                    <h5>
                        {
                            isHide ? <>{preFfix} {suffix} </> : state.ip_address
                        }
                    </h5>
                    <h4 className="card-title">Temperature History</h4>
                </div>
                <div className="card-body">
                    <ReactApexChart options={data.options} series={data.series} type="area" height={350} />
                </div>
                <div className="card-footer">
                    <div className=" d-flex flex-row p-1  justify-content-between">
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <span onClick={prevDay} type="button" className="btn btn-outline-warning">prev</span>
                            <input onChange={onChangeDate} type="date" value={date} className=" btn  btn-outline-success" />
                            <span onClick={nextDay} type="button" className="btn btn-outline-warning">next</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwitchHistory;