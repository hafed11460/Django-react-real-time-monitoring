import { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useLoadBackupMutation } from 'features/tools/toolsApi'
import JsZip from 'jszip';
import FileSaver from 'file-saver';
import { axiosBaseQuery } from 'features/axiosBaseQuery';
import { BASE_URL } from 'features/baseUrl';
const Backup = () => {
    // const [isLoading , setIsLoading] = useState(false)
    const [loadBackup, { data, isSuccess, isLoading }] = useLoadBackupMutation()
    // const backupHandler = async (e) =>{
    //     setIsLoading(true)
    //     e.preventDefault()
    //     await axios.get('http://localhost:8000/switchs/backup/')
    //     .then ((res) => {
    //         const url = window.URL.createObjectURL(new Blob([res.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'Backup.zip');
    //         document.body.appendChild(link);
    //         link.click();
    //         setIsLoading(false)
    //     })
    // }



    const exportZip = blobs => {
        const zip = JsZip();
        blobs.forEach((blob, i) => {
          zip.file(`file-${i}.csv`, blob);
        });
        zip.generateAsync({type: 'blob'}).then(zipFile => {
          const currentDate = new Date().getTime();
          const fileName = `combined-${currentDate}.zip`;
          return FileSaver.saveAs(zipFile, fileName);
        });
      }

    useEffect(() => {
        if (isSuccess ) {
            const blob = new Blob([data],{type:'application/zip'})
            exportZip(blob)
            // var zip = new JsZip();
            // zip.file("Hello.txt", "Hello world\n");
            // zip.generateAsync({type:"blob"}).then(function (blob) {
            //     const url = window.URL.createObjectURL(new Blob([data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'album.zip');
            // document.body.appendChild(link);
            // link.click();// 1) generate the zip file
            //     // saveAs(blob, "hello.zip");                          // 2) trigger the download
            // });
            // const blob = new Blob([data],{type:'application/zip'})
            // const url = window.URL.createObjectURL(blob);
            // // const url = window.URL.createObjectURL(new Blob([data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'album.zip');
            // document.body.appendChild(link);
            // link.click();
        }
    }, [data])

    return (
        <Row>
            <Col className="col-md-6 col-12">
                <Card className="card">
                    <Card.Header className="card-header">
                        <h5>Spinner-in-button</h5>
                    </Card.Header>
                    <Card.Body className="card-body">
                        <div className="mb-2">
                            <span onClick={() => loadBackup()} className="btn btn-primary" type="button" disabled="">
                                {
                                    isLoading &&
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                }
                                Loading
                            </span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Backup;