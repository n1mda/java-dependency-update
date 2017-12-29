import request from 'superagent'

const API_URL = 'http://search.maven.org'

const search = async (group, artifact) => {
    const response = await request
        .get(`${API_URL}/solrsearch/select`)
        .query({
            q: `${group} ${artifact}`,
            rows: 1,
            wt: 'json',
        })

    if (response.body.response.docs.length === 0) {
        return null
    }

    return response.body.response.docs[0]
}

export { search as default }
