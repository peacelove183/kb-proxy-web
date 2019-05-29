import Editor from '../../plugins/editor/vue-editor/vue-editor'
import PpSection from "../../components/elements/pp_section";
import HistoryCatalog from './comp_history_catalog'
import {required} from 'vuelidate/lib/validators'
import {
  ajax_get_mock_proxy_interface,
  ajax_add_mock_proxy_interface,
  ajax_update_mock_proxy_interface_by_id,
  ajax_delete_mock_proxy_interface_by_id
} from '../../api/mock/mock_proxy_interface_api'
import {MethodOptions} from "../../utils/request_dictionary";
import ResponseHeadersTable from './comp_response_headers_table'
import {header_arr_to_map, header_map_to_arr} from '../../utils/data_format_utils'
import store from "../../store";

export default {
  name: 'mock_detail',
  data: () => ({
    mock_detail: null,
    new_create: false,
    edit: false,
    model: {
      name: null,
      description: null,
      method: 'GET'
    }
  }),
  validations: {
    model: {
      name: {required},
    },
  },
  computed: {
    Mock_id() {
      if (this.$route.path === '/mock_detail') {
        if (this.$route.query.id) {
          this.edit = false
          this.new_create = false
          return this.$route.query.id
        } else {
          this.model = {
            name: null,
            description: null,
            method: 'GET'
          }
          this.edit = true
          this.new_create = true
        }
        return null
      }
      return null
    },
    from_proxy_to_mock() {
      if (this.$route.path == "/mock_detail")
        return (new Date()).getTime() >= this.$route.query.timestamp && (new Date()).getTime() - this.$route.query.timestamp <= 1 * 60 * 1000
      return false
    },
  },
  watch: {
    Mock_id: {
      immediate: true,
      handler: function (nv, ov) {
        nv && nv !== null && this.refresh_detail(nv)
      }
    },
    from_proxy_to_mock: {
      immediate: true,
      handler: function (nv, ov) {
        if (nv) {
          setTimeout(this.from_proxy_add, 300)
        }
      }
    }
  },
  methods: {
    render_header(h) {
      return h('div', {
        staticClass: 'q-mb-md bg-grey-3 q-pa-sm row no-wrap items-center text-left pp-border-4'
      }, [
        h('div', {
          staticClass: 'q-mr-sm'
        }, [
          h('q-icon', {
            props: {
              name: 'vpn_lock',
              color: 'primary',
              size: '50px'
            }
          })
        ]),
        h('div', {
          staticClass: 'col-grow'
        }, [h('div', {
          staticClass: 'font-16 text-weight-bold'
        }, [
          this.edit ? h('q-input', {
            staticClass: 'pp-input-focus font-16',
            'class': {
              'pp-border-red': this.$v.model.name.$error
            },
            style: {
              width: '300px'
            },
            props: {
              hideUnderline: true,
              placeholder: '请输入Mock名称',
              value: this.model.name,
            },
            on: {
              input: (v) => {
                this.model.name = v
              }
            }
          }) : h('span', [this.model.name || '请输入Mock名称'])
        ]),
          h('div', {
            staticClass: 'font-13',
            style: {
              marginTop: '3px',
              width: '900px',
              overflow: 'hidden',
              display: '-webkit-box',
              webkitLineClamp: 2,
              webkitBoxOrient: 'vertical'
            }
          }, [
            this.edit ? h('q-input', {
              staticClass: 'pp-input-focus font-13',
              style: {
                paddingLeft: '4px'
              },
              props: {
                type: 'textarea',
                hideUnderline: true,
                maxHeight: 20,
                rows: 2,
                placeholder: '请输入描述',
                value: this.model.description,
              },
              on: {
                input: (v) => this.model.description = v
              }
            }) : h('span', [this.model.description || '请输入描述'])
          ])]),
        h('div', {}, [
          !this.new_create ? h('q-btn', {
            staticClass: 'pp-search-button no-shadow q-mr-sm',
            props: {
              label: '编辑',
              color: this.edit ? 'teal-2' : 'secondary'
            },
            on: {
              click: () => this.edit = !this.edit
            }
          }) : null,
          h('q-btn', {
            staticClass: 'pp-search-button no-shadow q-mr-sm',
            props: {
              label: '保存',
              color: 'primary'
            },
            on: {
              click: () => {
                this.save_Mock()
              }
            }
          }),
          !this.new_create ? h('q-btn', {
            staticClass: 'pp-search-button no-shadow q-mr-sm',
            props: {
              label: '删除',
              color: 'negative'
            },
            on: {
              click: () => this.delete_Mock()
            }
          }) : null,
        ])
      ])
    },
    render_request_url(h) {
      return h('div', {
        staticClass: 'row items-center flex q-mb-md'
      }, [
        h('q-select', {
          staticClass: 'pp-search-input no-shadow',
          style: {
            width: '100px',
            marginRight: '3px'
          },
          props: {
            value: this.model.method,
            options: MethodOptions,
            hideUnderline: true,
            disable: !this.edit,
            color: 'grey-1',
            invertedLight: true,
          },
          on: {
            input: (v) => {
              this.model.method = v
            }
          }
        }),
        h('q-input', {
          staticClass: 'pp-search-input col-grow no-shadow',
          props: {
            value: this.model.url,
            hideUnderline: true,
            color: 'grey-1',
            invertedLight: true,
            placeholder: '请输入请求URL',
            disable: !this.edit
          },
          on: {
            input: (v) => this.model.url = v
          }
        }),
      ])
    },
    render_left_detail(h) {
      return h('div', {}, [
        h('div', {
          staticClass: 'row col-12'
        }, [
          h('div', {
            staticClass: 'col-12'
          }, [
            this.render_response_headers(h),
          ]),
        ]),
        this.render_base_info(h),
        this.render_history_catalog(h)
      ])
    },
    render_base_info(h) {
      return h(PpSection, {
        staticClass: 'font-13 text-dark q-mb-md',
        props: {label: '时间信息', collapse: false}
      }, [this.render_base_info_detail(h)])
    },
    render_history_catalog(h) {
      return h(PpSection, {
        staticClass: 'font-13 text-dark',
        props: {label: 'Mock记录', collapse: false}
      }, [h(HistoryCatalog, {
        ref: 'HistoryCatalog'
      })])
    },
    render_response_headers(h) {
      return h(PpSection, {
        staticClass: 'font-13 text-dark q-mb-md',
        props: {label: '响应头', collapse: false}
      }, [h(ResponseHeadersTable, {
        ref: 'ResponseHeadersTable',
        style: {
          height: '350px'
        },
        props: {
          default_headers: header_map_to_arr(this.model.headers) || [],
          disable: !this.edit
        },
        on: {
          input: (v) => {
            this.model.headers = JSON.stringify(header_arr_to_map(v))
          }
        }
      })])
    },
    render_right_detail(h) {
      return h(PpSection, {
        staticClass: 'font-13 text-dark',
        props: {label: '响应结果', collapse: false}
      }, [h(Editor, {
        props: {
          disable: !this.edit,
          value: this.model.response,
          width: '100%',
          toolbar: true,
          height: '633px'
        },
        on: {
          input: (v) => this.model.response = v
        }
      })])
    },
    render_base_info_detail(h) {
      return h('div', {staticClass: 'row no-wrap'}, [
        h('div', {staticClass: 'col-6'}, [
          this.render_tr(h, '创建时间：', this.model.create_time),

        ]),
        h('div', {staticClass: 'col-6'}, [
          this.render_tr(h, '更新时间：', this.model.update_time),
        ])
      ])
    },
    render_tr(h, key, value, value_cls = 'q-pa-xs text-tertiary') {
      return h('tr', null, [
        h('td', {
          staticClass: 'q-pa-xs',
          style: {
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }
        }, key),
        value
          ? h('td', {
            staticClass: value_cls,
          }, [value])
          : h('td', {
            staticClass: value_cls,
          }, '--')
      ])
    },
    refresh_detail(id) {
      ajax_get_mock_proxy_interface(id).then(d => {
        if (d.status === 1) {
          d.data && (this.model = d.data)
          this.model.headers && this.$refs.ResponseHeadersTable.refresh_table(header_map_to_arr(this.model.headers))
          this.model.id && this.$refs.HistoryCatalog.refresh_catalog(this.model.id)
        }
      }).catch(e => {
        this.$q.err('获取MOCK信息异常')
      })
    },
    save_Mock() {
      this.$v.model.name.$touch();
      if (!this.$v.model.name.$error) {
        if (this.model.id) {
          ajax_update_mock_proxy_interface_by_id(this.model.id, this.model).then(d => {
            d.status === 1 && this.$q.ok('保存成功！')
          }).catch(e => this.$q.err('保存失败！'))
        } else {
          ajax_add_mock_proxy_interface(this.model).then(d => {
            d.status === 1 && this.$q.ok('保存成功！')
            this.$router.push({path: '/mock_detail', query: {id: d.data}})
          }).catch(e => this.$q.err('保存失败！'))
        }
      }
    },
    delete_Mock() {
      ajax_delete_mock_proxy_interface_by_id(this.model.id).then(d => {
        if (d.status === 1) {
          this.$q.ok('删除成功！')
          this.$router.push({path: '/mock'})
        } else {
          this.$q.err('删除失败！')
        }
      }).catch(e => this.$q.err('删除失败！'))
    },
    from_proxy_add() {
      this.model.url = store.state.mock.url
      this.model.method = store.state.mock.method
      this.model.headers = JSON.stringify(header_arr_to_map(store.state.mock.headers))
      store.state.mock.headers && this.$refs.ResponseHeadersTable.refresh_table(store.state.mock.headers)
      this.model.response = store.state.mock.response
      this.model.code = store.state.mock.code
      this.model.id = null
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'q-pl-md q-pr-md q-pt-md'
    }, [
      this.render_header(h),
      this.render_request_url(h),
      h('div', {
        staticClass: 'row col-12'
      }, [
        h('div', {
          staticClass: 'col-8 q-pr-md'
        }, [this.render_left_detail(h)]),
        h('div', {
          staticClass: 'col-4'
        }, [this.render_right_detail(h)])
      ])])
  }
}
