const queries = {
    addNewBlog: `
    INSERT INTO blogs(
        name, 
        author, 
        domain
    )
    VALUES($1, $2, $3)
    RETURNING *
    `,

    getAllBlogs: `
    SELECT * FROM blogs
    `,

    getOneBlog: `
    SELECT 
        name, 
        author,
        domain,
        created_at,
        updated_at
    FROM blogs
    WHERE id = $1
    `,

    updateOneBlog: `
    UPDATE blogs
    SET 
        name = $1, 
        author = $2, 
        domain = $3,
        updated_at = now()
    WHERE id = $4
    RETURNING *
    `,

    deleteOneBlog: `
    DELETE FROM blogs
    WHERE id = $1
    `
}

module.exports = queries