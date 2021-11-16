const { createReport, getAllIncidents, getUserIncident } = require("../services")

const createIncidentReport = async(req, res) => {
    try {
        const report = await createReport(req)

        res.status(201).json({
            status: 'success',
            message: 'Incident report created successfully',
            data: report
        })
    }
    catch (err) {
        next(err)
    }
}

const fetchAllIncidents = async(req, res) => {
    try {
        const incidentReports = await getAllIncidents()

        res.status(200).json({
            status: 'success',
            message: 'Incident reports fetched successfully',
            data: incidentReports
        })
    }
    catch (err) {
        next(err)
    }
}

const fetchUserIncidents = async(req, res) => {
    try {
        const { id } = req
        const userIncidentReports = await getUserIncident(id)

        res.status(200).json({
            status: 'success',
            message: 'Incident reports fetched successfully',
            data: userIncidentReports
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createIncidentReport,
    fetchAllIncidents,
    fetchUserIncidents
}