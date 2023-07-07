import Container from "../../components/container";
import MoreStories from "../../components/en/more-stories";
import Layout from "../../components/en/layout";
import { getAllPosts } from "../../lib/api";
import Head from "next/head";
import Post from "../../interfaces/post";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import ServicesGrid from "../../components/en/ServicesGrid";
import Image from "next/image";
import ContactForm from "../../components/en/contactform";

type Props = {
  allPosts: Post[];
};
export default function Index({ allPosts }: Props) {
  SwiperCore.use([Autoplay]);

  const filteredPosts = allPosts
    .filter((post) => post.lang === "en")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentPosts = allPosts
    .filter((post) => {
      const postCategories = post.cat.split(";");
      return postCategories.some((category) => category.includes("Current"));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = new Set<string>();
  const postsByCategory: { [category: string]: Post } = {};

  categories.add("Current");

  filteredPosts.forEach((post) => {
    const postCategories = post.cat.split(";");
    postCategories.forEach((category) => {
      if (
        !categories.has(category) &&
        !Object.values(postsByCategory).includes(post)
      ) {
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
          <meta
            name="description"
            content="We are a specialized institution in tax consultancy, tax litigation, investment, incentives, and government support."
          />
        </Head>
        <div className="flex flex-col md:flex-row w-full top-[96px] z-10 md:fixed gap-[800px] md:h-[450px]">
          <div className="w-full h-[450px]">
            <Swiper
              className="bg-white w-full h-full"
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/1.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex mt-auto pb-6 w-[80%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold text-white text-2xl xl:text-4xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Learn
                    </h3>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl ml-12 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      CORPORATE
                    </h3>
                    <h3 className="font-bold ml-32 bg-red-600 px-2 pb-2 text-white text-2xl xl:text-4xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Management
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/2.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex w-[80%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold text-white text-3xl mr-8 xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3 mt-8">
                      EXPLORE
                    </h3>
                    <h3 className="font-bold bg-orange-500 ml-24 px-2 pb-2 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      the Advantages
                    </h3>
                    <h3 className="font-bold text-white ml-36 text-3xl xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      of Growth
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/3.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex mb-auto pt-6 w-[80%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold text-white text-2xl xl:text-4xl mr-40 ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      Reach
                    </h3>
                    <h3 className="font-bold bg-red-600 px-2 pb-2 text-white mr-24 text-2xl xl:text-4xl ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Beyond
                    </h3>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl ml-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      BORDERS
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/4.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex mb-auto w-[80%] h-[100%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold text-white mt-auto text-2xl mr-auto xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      Stay Informed On
                    </h3>
                    <h3 className="font-bold bg-orange-500 mr-auto px-2 ml-12 pb-2 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-1">
                      Investment
                    </h3>
                    <h3 className="font-bold text-white text-3xl ml-20 mr-auto xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      INCENTIVES
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/5.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex mb-auto pt-6 w-[81%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold bg-red-600 px-2 pb-2 text-white mt-8 text-2xl xl:text-4xl mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)]">
                      Don't Miss
                    </h3>
                    <h3 className="font-bold text-white text-2xl xl:text-4xl ml-8 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-2">
                      Tax
                    </h3>
                    <h3 className="font-bold text-white text-3xl xl:text-5xl ml-16 mr-auto [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      BENEFITS
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[450px] flex flex-col items-center justify-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    loading="eager"
                    src="/assets/homepage/6.jpg"
                    className="-z-10"
                    alt={""}
                  />
                  <div className="flex mb-auto pt-6 w-[80%] h-[100%] flex-col items-center justify-center flex-end text-white">
                    <h3 className="font-bold text-white mt-auto text-2xl xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mb-3">
                      Benefit from
                    </h3>
                    <h3 className="font-bold bg-orange-500 px-2 pb-2 ml-16 text-white text-2xl xl:text-4xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-1">
                      Professional
                    </h3>
                    <h3 className="font-bold text-white text-3xl ml-28 xl:text-5xl [text-shadow:_3px_3px_3px_rgb(0_0_0_/_80%)] mt-3">
                      SOLUTIONS
                    </h3>
                  </div>
                  <h3 className="font-light text-opacity-80 text-white text-md xl:text-2xl ml-auto mt-auto mb-6 mr-6">
                    TAX | AUDIT | LEGAL | ADVISORY
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="z-20 bg-white relative md:mt-[450px]">
          <div className="border-t-8 border-t-white h-[82px] bg-gradient-to-b from-slate-300 to-slate-100 w-full flex items-start md:items-center">
            <Link
              href={`/en/blog?category=Current`}
              passHref
              className="font-bold md:text-xl mb-auto md:mb-[0] pl-2 md:pl-6"
            >
              CURRENT:
            </Link>
            <Swiper
              className="w-[90%] mt-[2px]"
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {Array.from(currentPosts).map((post) => (
                <SwiperSlide key={post.slug}>
                  <Link
                    href={`/en/posts/${encodeURIComponent(post.slug)}`}
                    passHref
                    className="font-bold text-sm md:text-lg"
                  >
                    <p>{post.title}</p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Container>
            <div className="flex pb-6 flex-col justify-center items-center">
              <h2 className="mb-6 pt-6 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
                Our services
              </h2>
              <ServicesGrid />
            </div>
            <h2 className="text-5xl justify-center w-full flex font-bold">
              Headlines
            </h2>
            <div
              id="yazılar"
              className="pt-2 ism:pt-2 items-center justify-center"
            >
              <div className="flex flex-wrap mt-4 mb-4 flex-center justify-center">
                <Link className="my-2" href={`/en/blog`} passHref>
                  <p
                    className={`text-white text-sm ism:text-md mx-3 bg-gray-700 hover:bg-white hover:text-black border border-black font-bold py-3 px-10 lg:px-8 transitions-colors duration-200`}
                  >
                    All
                  </p>
                </Link>
                {Array.from(categories).map((category) => (
                  <Link
                    className="my-2"
                    key={category}
                    href={`/en/blog?category=${encodeURIComponent(category)}`}
                    passHref
                  >
                    <p
                      className={`text-white text-sm ism:text-md mx-3 bg-gray-700 hover:bg-white hover:text-black border border-black font-bold py-3 px-10 lg:px-8 transitions-colors duration-200`}
                    >
                      {category}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {showPosts.length > 0 && <MoreStories posts={showPosts} />}
              <Link
                href="/en/blog"
                className="text-sm ism:text-md mx-3 bg-gray-700 hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-10 lg:px-8 duration-200 transition-colors mb-6"
              >
                More posts
              </Link>
            </div>
            <ContactForm />
          </Container>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "lang",
    "cat",
    "sector",
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
