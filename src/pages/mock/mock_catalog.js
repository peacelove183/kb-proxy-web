import {ajax_mock_proxy_interface_search} from "../../api/mock/mock_proxy_interface_api";
import CatalogBase from '../../components/elements/MixinCatalogBase'
import LazyInput from '../../components/elements/ComponentLazyInput'
import router from '../../router'
import {MethodEnums} from '../../utils/request_dictionary'

export default {
  name: 'mock_catalog',
  mixins: [CatalogBase],
  data: () => ({
    mock_list: [],
    kw: null,
    table_columns: [
      {
        name: 'name', align: 'left', field: 'name', label: '名称',
        renderData: {style: {maxWidth: '200px', width: '200px'}, staticClass: 'text-tertiary'},
        render: (h, props) => h('div', {
          staticClass: 'text-primary text-weight-bold ellipsis',
        }, [h('span', {
          staticClass: 'cursor-pointer ellipsis',
          on: {
            click: () => {
              router.push({path: '/mock_detail', query: {id: props.row.id}})
            }
          }
        }, [props.value])])
      },
      {
        name: 'url', align: 'left', field: 'url', label: '链接',
        renderData: {style: {maxWidth: '400px', width: '400px'}, staticClass: 'text-tertiary'},
        render: (h, props) => h('div', {
          staticClass: 'text-tertiary ellipsis',
          style: {
            width: '100%'
          },
          attrs: {
            title: props.value
          }
        }, [
          h('span', [props.value])
        ])
      },
      {
        name: 'method', align: 'left', field: 'method', label: '请求方式',
        renderData: {style: {maxWidth: '50px', width: '100px'}, staticClass: 'text-tertiary'},
        render: (h, props) => h('span', {
          staticClass: 'text-weight-bold text-' + MethodEnums[props.value].color
        }, [props.value])
      },
      {
        name: 'description', align: 'left', field: 'description', label: '描述',
        renderData: {style: {maxWidth: '300px', width: '300px'}, staticClass: 'text-tertiary ellipsis'},
        render: (h, props) => props.value || '--'
      },
      {
        name: 'create_time', align: 'left', field: 'create_time', label: '创建时间',
        renderData: {style: {maxWidth: '50px', width: '100px'}, staticClass: 'text-tertiary'},
        render: (h, props) => props.value || '--'
      },
    ]
  }),
  methods: {
    render_tools(h) {
      return h('div', {
        staticClass: 'row no-wrap'
      }, [
        h(LazyInput, {
            props: {
              placeholder: '请输入名称/URL链接'
            },
            staticClass: 'pp-search-input q-mr-md',
            style: {
              width: '300px'
            },
            on: {
              input: (v) => {
                this.kw = v
                this.request()
              }
            }
          }
        ),
        h('q-btn', {
          staticClass: 'pp-search-button no-shadow',
          props: {
            label: '新增',
            color: 'primary'
          },
          on: {
            click: () => {
              this.$router.push({path: '/mock_detail'})
            }
          }
        })
      ])
    },
    request() {
      ajax_mock_proxy_interface_search(this.kw, this.page, this.size)
        .then(d => {
          this.rows = d.data.data || [];
          this.rowsNumber = d.data.count;
        })
        .catch(() => this.$q.err('获取记录异常'));
    },
    __render_bottom_row_scope_slot(h, scope) {
      if (!this.rowsNumber) {

      } else
        this.render_bottom_row_scope_slot(h, scope)
    },
  },
  mounted() {
    this.refresh();
  },
  render(h) {
    return h('div', {
      staticClass: 'q-pa-md'
    }, [
      this.render_tools(h)
      , h('q-table', {
        staticClass: 'shadow-0 overflow-hidden' + this.table_class,
        props: {
          dense: false,
          separator: 'horizontal',
          color: 'primary',
          data: this.rows,
          columns: this.table_columns,
          rowKey: 'id',
          pagination: this.pagination_ctl,
          rowsPerPageOptions: [10, 20, 50],
          noDataLabel: '无数据',
          rowsPerPageLabel: this.rowsPerPageLabel,
        },
        scopedSlots: this.__render_scope_slot(h),
        on: {request: this.__request}
      })])
  }
}