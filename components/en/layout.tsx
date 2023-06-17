import Footer from './footer'
import Header from './header'
import Meta from '../meta'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="bg-white pb-6">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
