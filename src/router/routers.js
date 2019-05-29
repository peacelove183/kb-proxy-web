import left from '../layouts/left-menu'
import header from '../layouts/header-menu'
import footer from '../layouts/footer-menu'

export default [
  {
    path: '',
    component: () => import('../layouts/index'),
    children: [
      {
        path: '/',
        components: {
          left, header, footer,
          page: () => import('../pages/proxy/index')
        }
      },
      {
        path: '/index',
        components: {
          left, header, footer,
          page: () => import('../pages/proxy/index')
        }
      },
      {
        path: '/repeater',
        components: {
          left, header, footer,
          page: () => import('../pages/repeater/index')
        }
      },
      {
        path: '/mock',
        components: {
          left, header, footer,
          page: () => import('../pages/mock/index')
        }
      },
      {
        path: '/mock_detail',
        components: {
          left, header, footer,
          page: () => import('../pages/mock/mock_detail')
        }
      },
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('../pages/user/login')
  // },
]
