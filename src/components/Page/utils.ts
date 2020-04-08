import { useEffect } from 'react'
import { useLocation } from '@reach/router'

import { handleFrontRedirect } from '../../utils/shared/redirects'
import { allImagesLoadedInContainer } from '../../utils/front/images'
import { scrollIntoLayout } from '../../utils/front/scroll'

import styles from './styles.module.css'

export const useAnchorNavigation = (): void => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const node = document.querySelector(location.hash)

      if (node) {
        const contentRoot = document.getElementById('layoutContent')

        if (contentRoot) {
          allImagesLoadedInContainer(contentRoot).then(() =>
            scrollIntoLayout(node)
          )
        }
      }
    } else {
      document.documentElement.scrollTop = 0
    }
  }, [location.href])
}

export const useRedirects = (): void => {
  const location = useLocation()

  useEffect(() => {
    handleFrontRedirect(location.host, location.pathname)
  }, [location.href])
}

export const useSmoothScroll = (enable: boolean): void => {
  useEffect(() => {
    const method = enable ? 'add' : 'remove'

    document.body.classList[method](styles.smoothScrolling)
  }, [enable])
}
