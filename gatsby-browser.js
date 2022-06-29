import "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const shouldUpdateScroll  = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  window.scrollTo({top:0, left: 0, behavior: 'instant'})
  return false
}

export {shouldUpdateScroll}
 
