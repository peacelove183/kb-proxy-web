import MockCatalog from './mock_catalog'

export default {
  name: 'mock_index',
  data: () => ({}),
  methods: {},
  render(h) {
    return h('div', {}, [h(MockCatalog)])
  }
}
