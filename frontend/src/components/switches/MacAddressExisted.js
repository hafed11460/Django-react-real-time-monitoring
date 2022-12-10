import AppContext from "context/Context";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { suffix } from "value";

const MacAddressExisted = ({ handleRemoveMacAddress, macAddress }) => {
    const {
        config: { isHide },
        setConfig
    } = useContext(AppContext)
    return (
        <div className="table-responsive">
            <h6> Mac Address Existed  </h6>
            <table className="table ">
                <thead>
                    <tr>
                        <th>Interface</th>
                        <th>Mac Address</th>
                        <th>Vlan</th>
                        <th>Type</th>
                        <th>device</th>
                        <th>type</th>
                        <th>serial_number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        macAddress.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.port}</td>
                                <td className="text-bold-500">
                                    {
                                        (isHide && item.mac_address) ? <>{(item.mac_address).substr(0, 11)} {suffix} </> : item.mac_address
                                    }
                                </td>
                                <td className="text-bold-500">{item.vlan}</td>
                                <td className="text-bold-500">{item.type}</td>
                                <td className="text-bold-500">
                                    {
                                        (isHide && item.device_code)  ? <>{(item.device_code).substr(0, 8)} {suffix} </> : item.device_code
                                    }
                                </td>
                                <td className="text-bold-500">{item.device_type}</td>
                                <td className="text-bold-500">
                                    {
                                        (isHide && item.device_serial) ? <>{(item.device_serial).substr(0, 6)} {suffix} </> : item.device_serial
                                    }
                                    </td>
                                <td className="text-bold-500">
                                    <div onClick={() => handleRemoveMacAddress(item)} className='buttons'>
                                        <span className='btn btn-sm  btn-danger'>
                                            <FaTrash />
                                        </span>
                                    </div>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MacAddressExisted;