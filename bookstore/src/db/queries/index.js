const queries = {
    addUser: `
        INSERT INTO users(
            first_name, 
            last_name,
            email,
            password,
            role
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,

    getUser: `
        SELECT *
        FROM users
        WHERE email=$1
    `,

    addBook: `
        INSERT INTO books(
            title,
            author,
            created_by
        )
        VALUES($1, $2, $3)
        RETURNING *
    `,

    updateBook: `
        UPDATE books
        SET
        title = $1,
        author = $2,
        updated_at = NOW(),
        updated_by = $3
        WHERE id = $4
        RETURNING *
    `,

    getBook: `
        SELECT *
        FROM books
        WHERE id = $1
    `,

    getBooks: `
        SELECT * 
        FROM books
    `,

    addUserBook: `
        INSERT INTO user_catalogue(
            user_id,
            book_id
        )
        VALUES($1, $2)
        RETURNING *
    `,

    getUserBooks: `
        SELECT *
        FROM user_catalogue
        LEFT JOIN books
        ON user_catalogue.book_id = books.id
        WHERE user_catalogue.user_id = $1
    `,

    getUserBookById: `
        SELECT *
        FROM user_catalogue
        WHERE user_id = $1 AND book_id = $2
    `,

    deleteUserBookById: `
        DELETE FROM user_catalogue
        WHERE user_id = $1 AND book_id = $2
        RETURNING *
    `
}

module.exports = queries