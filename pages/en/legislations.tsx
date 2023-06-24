import Container from '../../components/container'
import ContactForm from '../../components/en/contactform'
import Layout from '../../components/en/layout'
import Head from 'next/head'
import { getAllPosts } from '../../lib/api'
import Post from '../../interfaces/post'
import MoreStories from '../../components/en/more-stories'
import Link from 'next/link'

type Props = {
  allPosts: Post[]
}


export default function Legislations({ allPosts }: Props) {
  const filteredPosts = allPosts
    .filter((post) => post.lang === 'en' && post.serv.includes('Company Law Legislation Consultancy'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let showPosts = filteredPosts.slice(0,4);
  return (
    <>
      <Head>
        <title>Company Law Legislation Consultancy - GroupMFH</title>
        <meta name="description" content="MFH Group: We assist with seamless changes in commercial enterprises and companies, complying with Turkish Commercial Code No. 6102 and tax legislation." />
      </Head>
      <Layout>
        <Container>
          <section className="flex-col flex items-center md:justify-between pt-6 pb-6">
            <h2 className="mb-6 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
              Company Law Legislation Consultancy
            </h2>
            <h4 className="text-left text-md text-justify md:pl-8">
              Pursuant to the Turkish Commercial Code No. 6102 and the secondary legislation issued in relation to this Code, necessary services are provided for the change of type of commercial enterprises and companies, mergers or divisions of companies in accordance with the tax legislation.</h4></section>
          
              <div className='flex flex-col justify-center items-center'>
              {showPosts.length > 0 && <MoreStories posts={showPosts} /> }
              {showPosts.length > 0 && <Link href="/en/blog" className="text-sm ism:text-md mx-3 bg-gray-700 hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-10 lg:px-8 duration-200 transition-colors mb-6">
                More posts
              </Link> }              
            </div>
          <ContactForm />
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'lang',
    'cat',
    'serv',
    'sector',
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};