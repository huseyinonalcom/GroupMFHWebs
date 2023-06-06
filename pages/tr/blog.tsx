import { useRouter } from 'next/router';
import Link from 'next/link';
import Container from '../../components/container';
import MoreStories from '../../components/tr/more-stories';
import Layout from '../../components/tr/layout';
import { getAllPosts } from '../../lib/api';
import Head from 'next/head';
import Post from '../../interfaces/post';

type Props = {
  allPosts: Post[];
};

export default function Blog({ allPosts }: Props) {
  const router = useRouter();
  const { query } = router;
  const selectedCategory = query.category as string;
  const searchQuery = query.search as string;

  // Filter and sort the posts by language and date
  var filteredPosts = allPosts
    .filter((post) => post.lang === 'tr')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  // Create a set of categories from the filtered posts
  const categories = new Set<string>();
  const postsByCategory: { [category: string]: Post[] } = {};
  filteredPosts.forEach((post) => {
    const postCategories = post.cat.split(';');
    postCategories.forEach((category) => {
      categories.add(category);
      if (!postsByCategory[category]) {
        postsByCategory[category] = [];
      }
      postsByCategory[category].push(post);
    });
  });

  if(searchQuery != '' && searchQuery != null) {
    filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const filteredPostsByCategory = selectedCategory
    ? postsByCategory[selectedCategory] || []
    : filteredPosts;

  return (
    <>
      <Layout>
        <Head>
          <title>GroupMFH</title>
        </Head>
        <Container>
        <h2 className="mb-2 text-5xl justify-center w-full flex font-bold">
          Bülten
        </h2>
          <div id='yazılar' className='pt-2 ism:pt-2 items-center justify-center'>
            <div className='flex flex-wrap mt-4 flex-center justify-center'>
              <Link href={`/tr/blog`} passHref>
                <p
                  className={`text-white text-sm ism:text-md mx-3 bg-black hover:bg-white hover:text-black border border-black  font-bold py-3 px-10 lg:px-8 duration-200 mb-6 ${!selectedCategory ? 'bg-gray-600 text-black' : 'bg-black'
                    }`}
                >
                  Hepsi
                </p>
              </Link>
              {Array.from(categories).map((category) => (
                <Link
                  key={category}
                  href={`/tr/blog?category=${encodeURIComponent(category)}`}
                  passHref
                >
                  <p
                    className={` text-white text-sm ism:text-md mx-3 bg-black hover:bg-white hover:text-black border border-black font-bold py-3 px-10 lg:px-8 duration-200 mb-6 ${selectedCategory === category ? 'bg-gray-600 text-black' : 'bg-black'
                      }`}
                  >
                    {category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            {filteredPostsByCategory.length > 0 ? (
              <MoreStories posts={filteredPostsByCategory} />
            ) : (
              <p>Seçtiğiniz kategoride şu an yazı bulunmamaktadır.</p>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
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
  ]);

  return {
    props: { allPosts },
  };
};
