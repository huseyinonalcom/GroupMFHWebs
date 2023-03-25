import Container from '../../components/container'
import MoreStories from '../../components/tr/more-stories'
import Layout from '../../components/tr/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Post from '../../interfaces/post'

type Props = {
  allPosts: Post[]
}

export default function Blog({ allPosts }: Props) {
  const morePosts = []
  
  allPosts.forEach((post)=>{console.log(post),post.lang === 'tr' ? morePosts.push(post) : null})

  return (
    <>
      <Layout>
        <Head>
          <title>GroupMFH</title>
        </Head>
        <Container>
          <div id='yazılar' className='pt-10 ism:pt-12'></div>
          <div>
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'lang',
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
