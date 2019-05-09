import JsonEditor from '../../plugins/jsoneditor/VueJsoneditor'

export default {
  name: 'comp_response_json',
  data: () => ({
    response: null
  }),
  methods: {
    render_json_response(h) {
      return h(JsonEditor, {
        props: {
          plus: false,
          options: {
            mode: "code",
          },
          height: '490px',
          value: this.response
        }
      })
    },
    refresh_response(v) {
      this.response = v || null
    },
  },
  render(h) {
    return h('div', {
      staticClass:'q-pb-md'
    }, [
      this.render_json_response(h)
    ])
  },
}
