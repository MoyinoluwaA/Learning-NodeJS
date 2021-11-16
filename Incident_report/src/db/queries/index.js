const queries = {
    addUser: `
        INSERT INTO users(
            first_name, 
            last_name,
            username,
            email,
            password
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,

    getUser: `
        SELECT *
        FROM users
        WHERE email=$1
    `,

    addIncidentReport: `
        INSERT INTO incident_report(
            client_id, 
            incident_description,
            city,
            country,
            weather_report
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,

    getIncidents: `
        SELECT *
        FROM incident_report
    `,

    getUserIncidents: `
        SELECT * 
        FROM incident_report
        WHERE client_id=$1
    `,

    updatePassword: `
        UPDATE users
        SET 
        password = $1,
        updated_at = NOW()
        WHERE user_id = $2
        RETURNING *
    `
}

module.exports = queries