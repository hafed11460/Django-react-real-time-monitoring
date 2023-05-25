import { Card, Col, Row } from 'react-bootstrap';
const Dashboard = () => {
    const data = []
    return (
        <div className="page-content">
            <Row className="row">
                <Col className="col-12 col-lg-12">
                    <Row className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3  g-4">
                        {
                            data && data.map((sw) => (
                                <Col key={sw.id}>
                                    <h5>Plc Component</h5>
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