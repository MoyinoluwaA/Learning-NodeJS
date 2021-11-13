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
    `
}

module.exports = queries