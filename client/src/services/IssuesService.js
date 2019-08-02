import Api from '@/services/Api'

export default {
  fetchIssues () {
    return Api().get('issues')
  },

  addIssue (params) {
    return Api().post('issues', params)
  },

  updateIssue (params) {
    return Api().put('issues/' + params.id, params)
  },

  getIssue (params) {
    return Api().get('issue/' + params.id)
  },

  deleteIssue (id) {
    return Api().delete('issues/' + id)
  }
}
