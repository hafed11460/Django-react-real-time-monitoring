import SwitchHorCard from 'components/switches/SwitchHorCard';
import { Card, Col, Row } from 'react-bootstrap';
import { useSwitchsEnvironmentsListQuery } from '../../features/switchs/switchAPI';
const Dashboard = () => {
    const { data, isLoading, isError, isSuccess } = useSwitchsEnvironmentsListQuery('')
    return (
        <div className="page-content">
            <Row className="row">
                <Col className="col-12 col-lg-12">
                    <Row className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3  g-4">
                        {
                            data && data.map((sw) => (
                                <Col key={sw.id}>
                                    <SwitchHorCard sw={sw} key={sw.id} />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;