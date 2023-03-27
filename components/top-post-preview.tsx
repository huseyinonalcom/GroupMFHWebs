import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
}


const TopPostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) => {

  const { asPath } = useRouter()

  return (
    <div className='h-[350px] flex flex-col items-center justify-center' style={{
      backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}>
      <div className='flex flex-col items-center justify-center bg-white bg-opacity-75'>
      <h3 className="text-3xl mb-3 leading-loose w-[80%]">
        <Link
          as={`${asPath.substring(0,3)}/posts/${slug}`}
          href={`${asPath.substring(0,3)}/posts/[slug]`}
          className="hover:underline">
          {title}
        </Link>
      </h3>
      <Link
          as={`${asPath.substring(0,3)}/posts/${slug}`}
          href={`${asPath.substring(0,3)}/posts/[slug]`}
          className="text-lg leading-relaxed mb-4 w-[80%]">{excerpt}</Link>
    </div>
    </div>
  )
}

export default TopPostPreview
