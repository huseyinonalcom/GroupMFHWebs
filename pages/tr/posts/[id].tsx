import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../../components/container";
import PostBody from "../../../components/post-body";
import PostHeader from "../../../components/post-header";
import { getArticleByID, getAllArticles } from "../../../lib/api";
import PostTitle from "../../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../../lib/markdownToHtml";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import DateFormatter from "../../../components/date-formatter";
import Meta from "../../../components/meta";
import Footer from "../../../components/tr/footer";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Search } from "@mui/icons-material";
import { styled, TextField } from "@mui/material";
import { Cormorant_Garamond } from "@next/font/google";
import AboutMenu from "../../../components/tr/about-menu";
import Article from "../../../interfaces/post";

type Props = {
  article: Article;
  allArticles: Article[];
};

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin-ext"],
  weight: "500",
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
});

export default function Post({ article, allArticles }: Props) {
  const router = useRouter();
  const title = article.data.attributes.title;
  const cat = article.data.attributes.category;
  const { asPath } = router;

  const handleWrongLocale = () => {
    router.push(
      "/" + article.data.attributes.locale + "/posts/" + article.data.id
    );
  };

  useEffect(() => {
    if (article.data.attributes.locale != asPath.substring(1, 3)) {
      handleWrongLocale();
    }
  });
  
  // Sort and filter the posts
  const sortedPosts = allArticles.filter(
    (postM) => postM.data.id !== article.data.id
  );

  // Get the posts with matching category
  const matchingCatPosts = sortedPosts.filter((postM) =>
    postM.data.attributes.category.includes(cat)
  );

  // Get the remaining posts
  const remainingPosts = sortedPosts.filter(
    (postM) => !postM.data.attributes.category.includes(cat)
  );

  // Combine the matching cat posts and remaining posts (up to 4 posts)
  let morePosts: Article[] = [];

  // Add matching cat posts (up to 1 post)
  if (matchingCatPosts.length > 0) {
    morePosts = morePosts.concat(matchingCatPosts.slice(0, 1));
  }

  // Add remaining posts (up to 4 posts)
  morePosts = morePosts.concat(remainingPosts.slice(0, 4 - morePosts.length));

  if (!router.isFallback && !article.data.id) {
    return <ErrorPage statusCode={404} />;
  }

  const handleScrollToServices = () => {
    if (asPath !== "/tr") {
      router.push("/tr");
    } else {
      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search query here, e.g., redirect to search results page
    router.push(`/tr/blog?search=${searchQuery}`);
  };

  return (
    <>
      <Meta />
      <Head>
        <title>GroupMFH - {article.data.attributes.title}</title>
        
        <meta
          name="keywords"
          content={"" + article.data.attributes.keywords + ""}
        />
        <meta name="language" content="TR"/>
        <meta name="description" content={""+article.data.attributes.excerpt+""} />
        <meta name="subject" content={""+article.data.attributes.title+""} />
        <meta name="revised" content={"" + article.data.attributes.date + ""} />
        <link rel="canonical" href={"https://groupmfh.com/tr/posts/" + article.data.id} />
      </Head>
      <div className="bg-white">
        <Popover className="z-50 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-100 sticky top-0 flex items-center px-4 md:px-8 py-2 h-24 z-10">
          <Link href="/tr/">
            <Image
              src={"/assets/header/logo.png"}
              priority
              loading="eager"
              alt={"MFH Group Logo"}
              width={200}
              height={120}
            />
          </Link>
          <div className="grow flex flex-row">
            <div className="hidden ml-4 mr-2 lg:flex font-bold items-center justify-start gap-2 lg:gap-6">
              <AboutMenu />
              <button
                className="hover:bg-black hover:text-white text-xl pt-1 pb-1 pl-2 pr-2 mt-3 duration-1000"
                onClick={handleScrollToServices}
              >
                <p className={cormorantGaramond.className}>Hizmetlerimiz</p>
              </button>
              <Link
                className="hover:bg-black whitespace-nowrap hover:text-white text-xl pt-1 pb-1 pl-2 pr-2 mt-3 duration-1000"
                href="/tr/global"
              >
                <p className={cormorantGaramond.className}>Küresel Ağımız</p>
              </Link>

              <Link
                className="hover:bg-black hover:text-white text-xl pt-1 pb-1 pl-2 pr-2 mt-3 duration-1000"
                href="/tr/blog"
              >
                <p className={cormorantGaramond.className}>Bülten</p>
              </Link>
              <Link
                className="hover:bg-black hover:text-white text-xl pt-1 pb-1 pl-2 pr-2 mt-3 duration-1000"
                href="/tr/contact"
              >
                <p className={cormorantGaramond.className}>İletişim</p>
              </Link>
            </div>
            <div className="hidden ml-[auto] lg:flex font-bold items-center justify-end gap-2 md:gap-8">
              <form onSubmit={handleSearchSubmit} className="flex">
                <CssTextField
                  id="standard-search"
                  label="Arama"
                  type="search"
                  className="mb-4"
                  variant="standard"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="p-2">
                  <Search className="h-6 w-6" />
                </button>
              </form>
              <Link
                className="flex flex-row"
                href={
                  "/en/posts/" +
                  article.data.attributes.localizations.data.at(0).id
                }
              >
                <img
                  alt="Flag of the United Kingdom"
                  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                  className="h-10 w-10 mr-1"
                />
              </Link>
              <Link href={"/tr/contact"} aria-label="İletişim">
                <Phone />
              </Link>
            </div>
          </div>
          <div className="flex grow items-center justify-end lg:hidden">
            <Link
              className="px-2 mt-4 mb-4 text-3xl"
              href={
                "/en/posts/" +
                article.data.attributes.localizations.data.at(0).id
              }
            >
              <img
                alt="Flag of the United Kingdom"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                className="h-10 w-10 mr-1"
              />
            </Link>
            <Popover.Button className="inline-flex items-center justify-center p-2 text-black hover:bg-black hover:text-white">
              <span className="sr-only">Menüyü aç</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <Popover.Panel className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
              <div className="bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-500">
                <div className="flex items-center justify-between">
                  <Link className="font-bold ml-5 mt-3 text-5xl" href="/tr/">
                    <Image
                      src={"/assets/header/logo.png"}
                      priority
                      loading="eager"
                      alt={"MFH Group Logo"}
                      width={200}
                      height={120}
                    ></Image>
                  </Link>
                  <Popover.Button className="mr-3 inline-flex items-center justify-center p-2 text-black hover:bg-black hover:text-white">
                    <span className="sr-only">Menüyü kapat</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <nav className="grid border-none ml-3 font-bold">
                  <AboutMenu />
                  <button
                    className="hover:bg-black hover:text-white text-xl lg:text-2xl pt-1 pb-1 pl-2 pr-2 mt-2 duration-1000 mr-auto"
                    onClick={handleScrollToServices}
                  >
                    <p className={cormorantGaramond.className}>Hizmetlerimiz</p>
                  </button>
                  <Link
                    className="focus:outline-none focus:underline px-2 mt-4 text-xl lg:text-2xl mb-4"
                    href="/tr/global"
                  >
                    <p className={cormorantGaramond.className}>
                      Küresel Ağımız
                    </p>
                  </Link>

                  <Link
                    className="focus:outline-none focus:underline px-2 mt-4 text-xl lg:text-2xl mb-4"
                    href="/tr/blog"
                  >
                    <p className={cormorantGaramond.className}>Bülten</p>
                  </Link>
                  <Link
                    className="focus:outline-none focus:underline px-2 text-xl lg:text-2xl mb-4"
                    href="/tr/contact"
                  >
                    <p className={cormorantGaramond.className}>İletişim</p>
                  </Link>
                </nav>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <Container>
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row">
            <div>
              {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
              ) : (
                <>
                  <article className="pb-16 flex flex-col text-justify justify-center items-center">
                    <Head>
                      <title>{title}</title>
                      <meta
                        property="og:image"
                        content={
                          "https://api.groupmfh.com" +
                          article.data.attributes.coverImage.data.attributes.url
                        }
                      />
                    </Head>
                    <PostHeader
                      title={article.data.attributes.title}
                      coverImageUrl={
                        article.data.attributes.coverImage.data.attributes.url
                      }
                      date={article.data.attributes.date.toString()}
                    />
                    <PostBody
                      content={article.data.attributes.content}
                      date={article.data.attributes.date.toString()}
                    />
                  </article>
                </>
              )}
            </div>

            <div className="flex flex-col justify-center items-start md:ml-20 pt-10">
              <h2 className="text-2xl md:text-3xl font-bold mx-auto">
                Son yazılar
              </h2>
              <Card className="w-[300px] md:w-[400px] mt-10 mb-10 max-h-[500px]">
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    "https://api.groupmfh.com" +
                    morePosts[0].data.attributes.coverImage.data.attributes.url
                  }
                  title="image for the most recent post"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="font-bold text-lg"
                  >
                    {morePosts[0].data.attributes.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-black text-justify max-h-[110px]"
                  >
                    {morePosts[0].data.attributes.excerpt}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ mt: "auto" }}
                  className="flex flex-row items-center justify-between mt-auto"
                >
                  <Link
                    className="hover:bg-black hover:text-white text-2xl pt-1 pb-1 pl-2 pr-2 mt-1 mb-3 duration-1000"
                    href={"/tr/posts/" + morePosts[0].data.id}
                  >
                    Devamını oku
                  </Link>
                  <DateFormatter
                    dateString={morePosts[0].data.attributes.date.toString()}
                  />
                </CardActions>
              </Card>
              <Card className="w-[300px] md:w-[400px] mt-10 mb-10 max-h-[500px]">
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    "https://api.groupmfh.com" +
                    morePosts[1].data.attributes.coverImage.data.attributes.url
                  }
                  title="image for the 2nd most recent post"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="font-bold text-lg"
                  >
                    {morePosts[1].data.attributes.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-black text-justify max-h-[110px]"
                  >
                    {morePosts[1].data.attributes.excerpt}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ mt: "auto" }}
                  className="flex flex-row items-center justify-between mt-auto"
                >
                  <Link
                    className="hover:bg-black hover:text-white text-2xl pt-1 pb-1 pl-2 pr-2 mt-1 mb-3 duration-1000"
                    href={"/tr/posts/" + morePosts[1].data.id}
                  >
                    Devamını oku
                  </Link>
                  <DateFormatter
                    dateString={morePosts[0].data.attributes.date.toString()}
                  />
                </CardActions>
              </Card>
              <Card className="w-[300px] md:w-[400px] mt-10 mb-10 max-h-[500px]">
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    "https://api.groupmfh.com" +
                    morePosts[2].data.attributes.coverImage.data.attributes.url
                  }
                  title="image for the 3rd most recent post"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-lg font-bold"
                  >
                    {morePosts[2].data.attributes.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-black text-justify max-h-[110px]"
                  >
                    {morePosts[2].data.attributes.excerpt}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ mt: "auto" }}
                  className="flex flex-row items-center justify-between mt-auto"
                >
                  <Link
                    className="hover:bg-black hover:text-white text-2xl pt-1 pb-1 pl-2 pr-2 mt-1 mb-3 duration-1000"
                    href={"/tr/posts/" + morePosts[2].data.id}
                  >
                    Devamını oku
                  </Link>
                  <DateFormatter
                    dateString={morePosts[0].data.attributes.date.toString()}
                  />
                </CardActions>
              </Card>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const allArticles = await getAllArticles("tr", 20);
  const article: Article = await getArticleByID(params.id);
  article.data.attributes.content = await markdownToHtml(
    article.data.attributes.content || ""
  );

  return {
    props: {
      allArticles,
      article,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const articles = await getAllArticles("tr", 5000);

  return {
    paths: articles.map((article) => {
      return {
        params: {
          id: String(article.data.id),
        },
      };
    }),
    fallback: "blocking",
  };
}
