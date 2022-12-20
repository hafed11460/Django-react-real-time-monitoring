import http from '../http-common'

class PlcDataService {
    getPlcs() {
        return http.get('/plcs/')
    }
    createPlc(data) {
        return http.post('/plcs/', data)
    }
    deletePlc(plcId) {
        return http.delete(`/plcs/${plcId}/`)
    }
    updatePlc(plc) {
        return http.put(`/plcs/${plc.get('id')}/`, plc)
    }
}
export default new PlcDataService();
