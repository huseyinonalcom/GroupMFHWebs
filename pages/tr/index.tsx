import Container from '../../components/container'
import MoreStories from '../../components/tr/more-stories'
import Layout from '../../components/tr/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Post from '../../interfaces/post'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper'
import ServicesGrid from '../../components/tr/ServicesGrid'
import Image from 'next/image'
import ContactForm from '../../components/tr/contactform'

type Props = {
  allPosts: Post[]
}
export default function Index({ allPosts }: Props) {

  SwiperCore.use([Autoplay]);

  const filteredPosts = allPosts
  .filter((post) => post.lang === 'tr')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const categories = new Set<string>();
const postsByCategory: { [category: string]: Post } = {};

filteredPosts.forEach((post) => {
  const postCategories = post.cat.split(';');
  postCategories.forEach((category) => {
    if (!categories.has(category) && !Object.values(postsByCategory).includes(post)) {
      categories.add(category);
      postsByCategory[category] = post;
    }
  });
});

let showPosts = Object.values(postsByCategory);

// Check if the number of posts is uneven
if (filteredPosts.length % 2 !== 0) {
  let latestPost = null;
  filteredPosts.forEach((post) => {
    if (
      !Object.values(postsByCategory).includes(post) &&
      !showPosts.includes(post) &&
      latestPost === null
    ) {
      latestPost = post;
    }
  });
  if (latestPost) {
    showPosts.push(latestPost);
  }
}

// Ensure that showPosts contains an even number of posts
if (showPosts.length % 2 !== 0) {
  let latestPost = null;
  filteredPosts.forEach((post) => {
    if (
      !Object.values(postsByCategory).includes(post) &&
      !showPosts.includes(post) &&
      post !== latestPost
    ) {
      latestPost = post;
    }
  });
  if (latestPost) {
    showPosts.push(latestPost);
  }
}
  return (
    <>
      <Layout>
        <Head>
          <title>GroupMFH</title>
          <meta name="description" content="Vergi danışmanlığı, vergi davaları, yatırım, teşvik ve devlet desteği gibi konularda uzmanlaşmış bir kurumuz." />
        </Head>
        <div className='flex flex-col md:flex-row w-full top-[96px] z-10 md:fixed g-[800px] md:h-[450px]'>
          <div className='w-full h-[450px]'>
            <Swiper className='bg-white w-full h-full'
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/1.jpg' className='-z-10' alt={''} />
                  <div className='flex mt-auto pb-6 w-[80%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      KURUMSAL
                    </h3>
                    <h3 className="font-bold ml-12 bg-red-600 px-2 pb-2 text-white text-2xl xl:text-4xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      yönetimle
                    </h3>
                    <h3 className="font-bold text-white text-2xl xl:text-4xl ml-32 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      tanışın
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/2.jpg' className='-z-10' alt={''} />
                  <div className='flex w-[80%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3 mt-8">
                      Büyümenin
                    </h3>
                    <h3 className="font-bold bg-orange-500 ml-12 px-2 pb-2 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      avantajlarını
                    </h3>
                    <h3 className="font-bold text-white text-3xl ml-32 xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      KEŞFEDİN
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/3.jpg' className='-z-10' alt={''} />
                  <div className='flex mb-auto pt-6 w-[80%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl mr-16 ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      SINIRLARIN
                    </h3>
                    <h3 className="font-bold bg-red-600 px-2 pb-2 text-white mr-8 text-2xl xl:text-4xl ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      ötesine
                    </h3>
                    <h3 className="font-bold text-white text-2xl xl:text-4xl ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      uzanın
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/4.jpg' className='-z-10' alt={''} />
                  <div className='flex mb-auto w-[80%] h-[100%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold bg-orange-500 mt-auto mr-auto px-2 pb-2 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Yatırım
                    </h3>
                    <h3 className="font-bold text-white text-3xl ml-6 mr-auto xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      TEŞVİKLERİNDEN
                    </h3>
                    <h3 className="font-bold text-white text-2xl ml-20 mr-auto xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      Haberdar olun
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/5.jpg' className='-z-10' alt={''} />
                  <div className='flex mb-auto pt-6 w-[81%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold text-white text-2xl xl:text-4xl mt-8 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-2">
                      Vergisel
                    </h3>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl ml-8 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      AVANTAJLARI
                    </h3>
                    <h3 className="font-bold bg-red-600 px-2 pb-2 text-white ml-16 text-2xl xl:text-4xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      kaçırmayın
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[450px] flex flex-col items-center justify-center'>
                  <Image fill style={{ objectFit: "cover" }} priority loading='eager' src='/assets/homepage/6.jpg' className='-z-10' alt={''} />
                  <div className='flex mb-auto pt-6 w-[80%] h-[100%] flex-col items-center justify-center flex-end text-white'>
                    <h3 className="font-bold bg-orange-500 mt-auto px-2 pb-2 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Profesyonel
                    </h3>
                    <h3 className="font-bold text-white text-3xl ml-24 xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      CÖZÜMLERDEN
                    </h3>
                    <h3 className="font-bold text-white text-2xl ml-28 xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3 mb-3">
                      yararlanın
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    VERGİ | DENETİM | HUKUK | DANIŞMANLIK
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
            <div id='services-section'></div>
          </div>
        </div>
        <div className='z-20 relative md:mt-[450px]'>
          <Container>
            <div className='flex pb-6 flex-col justify-center items-center'>
              <h2 className="mb-2 pt-6 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
                Hizmetlerimiz
              </h2>
              <ServicesGrid />
            </div>
            <h2 className="mb-2 text-5xl justify-center w-full flex font-bold">
          Bülten
        </h2><div className='flex flex-wrap mt-4 mb-4 flex-center justify-center'>
          {Array.from(categories).map((category) => (
                <Link
                  key={category}
                  href={`/tr/blog?category=${encodeURIComponent(category)}`}
                  passHref
                >
                  <p
                    className={` text-white text-sm ism:text-md mx-3 bg-black hover:bg-white hover:text-black border border-black font-bold py-3 px-10 lg:px-8 duration-200 mb-6}`}
                  >
                    {category}
                  </p>
                </Link>
              ))}</div>
            <div className='flex flex-col justify-center items-center'>
              {showPosts.length > 0 && <MoreStories posts={showPosts} />}
              <Link href="/tr/blog" className="text-sm ism:text-md mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-10 lg:px-8 duration-200 transition-colors mb-6">
                Daha fazla yazı
              </Link>
            </div>
            <ContactForm />
          </Container>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'lang',
    'cat',
    'sector',
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