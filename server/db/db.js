const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库的命名空间名
const className = 'todo'

// 创建的是一个axios实例，所以可以在下面使用
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 创建一个错误方法
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

// 声明一个方法，处理请求结果
const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  // 因为每个请求都要发送一个签名，一个指定的http头的格式
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  // 包含所有api请求的方法
  return {
    // 获取所有的todo列表
    async getAllTodos () {
      return handleRequest(
        await request.get(`/${className}`, {
          headers: getHeaders()
        })
      )
    },

    // 添加一个todo
    async addTodo (todo) {
      return handleRequest(
        await request.post(
          `/${className}`,
          todo,
          { headers: getHeaders() }
        )
      )
    },

    // 更新todo
    async updateTodo (id, todo) {
      return handleRequest(
        await request.put(
          `/${className}/${id}`,
          todo,
          { headers: getHeaders() }
        )
      )
    }
  }
}
