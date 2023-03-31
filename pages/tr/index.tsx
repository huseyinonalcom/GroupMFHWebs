import Container from '../../components/container'
import MoreStories from '../../components/tr/more-stories'
import Layout from '../../components/tr/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Post from '../../interfaces/post'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TopPostPreview from '../../components/top-post-preview'
import SwiperCore, { Autoplay } from 'swiper';
import Services from '../../components/tr/services'

type Props = {
  allPosts: Post[]
}
export default function Index({ allPosts }: Props) {

  SwiperCore.use([Autoplay]);

  const morePosts = []
  const topPosts = []

  allPosts.forEach((post)=>{post.lang === 'tr' ? morePosts.push(post) : null})
  morePosts.forEach((post)=>{post.cat === 'Gündem' ? topPosts.push(post) : null})

  const showPosts = morePosts.slice(0, 4)
  const showTopPosts = topPosts.slice(0, 4)
  
  return (
    <>
      <Layout>
        <Head>
          <title>GroupMFH</title>
        </Head>
        <div className='fixed h-[400px] ism:h-[450px] w-screen -z-30'>
          <Image src='/assets/homepage/WallStreet.jpg' priority loading='eager' className='bg-right -z-30' fill={true} style={{ objectFit: "cover", objectPosition: "right" }} alt={'Wall Street'} />
          <p className='[text-shadow:_0_2px_0_rgb(0_0_0_/_80%)] text-2xl ism:text-3xl md:text-4xl text-white fixed font-bold mt-16 ism:mt-24 2xl:mt-40 ml-6 ism:ml-8 md:ml-60 -z-20 mx-auto'>Hedef, başarının ilk adımıdır.</p>
          <p className='[text-shadow:_0_2px_0_rgb(0_0_0_/_80%)] text-lg md:text-2xl text-white fixed font-bold mt-28 ism:mt-36 2xl:mt-56 ml-6 ism:ml-8 md:ml-60 -z-20 mx-auto'>
            Alanlarında uzman kişilerden oluşan ekibimiz,<br />
            iş hayatınızda attığınız her adımda size rehber ve destek olmaya hazır.<br />
            Bilinçli ticari kararlar alıp geleceğinizi inşa ederken yolunuzdan emin olun.</p>
        </div>
        <div className='h-[400px] ism:h-[450px] -z-40'></div>
        <Swiper className='pb-4 bg-white w-[100%]'
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}>
          <SwiperSlide><TopPostPreview title={showTopPosts.at(0).title} coverImage={showTopPosts.at(0).coverImage} date={showTopPosts.at(0).date} excerpt={showTopPosts.at(0).excerpt} slug={showTopPosts.at(0).slug} /></SwiperSlide>
          <SwiperSlide><TopPostPreview title={showTopPosts.at(1).title} coverImage={showTopPosts.at(1).coverImage} date={showTopPosts.at(1).date} excerpt={showTopPosts.at(1).excerpt} slug={showTopPosts.at(1).slug} /></SwiperSlide>
          <SwiperSlide><TopPostPreview title={showTopPosts.at(2).title} coverImage={showTopPosts.at(2).coverImage} date={showTopPosts.at(2).date} excerpt={showTopPosts.at(2).excerpt} slug={showTopPosts.at(2).slug} /></SwiperSlide>
          {/*<SwiperSlide><TopPostPreview title={showTopPosts.at(3).title} coverImage={showTopPosts.at(3).coverImage} date={showTopPosts.at(3).date} excerpt={showTopPosts.at(3).excerpt} slug={showTopPosts.at(3).slug} /></SwiperSlide>*/}
        </Swiper>
        <Container>
          <div className='flex pb-6 flex-col justify-center items-center'>
            <h2 className="mb-2 pt-6 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
              Hizmetlerimiz
            </h2>
            <Services />
          </div>
          <div className='flex flex-col justify-center items-center'>
            {showPosts.length > 0 && <MoreStories posts={showPosts} />}
            <Link href="/en/blog" className="text-sm ism:text-md mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-10 lg:px-8 duration-200 transition-colors mb-6">
              Daha fazla yazı
            </Link>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'lang',
    'cat',
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