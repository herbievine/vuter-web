import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PostNotFound from '@/components/errors/PostNotFound'
import DefaultWrapper from '@/components/layout/DefaultWrapper'
import Navigation from '@/components/modules/Navigation'
import {
  useFindOneBySlugQuery,
  useIncrementViewMutation,
} from '@/generated/graphql'
import withApollo from '@/lib/withApollo'
import gfm from 'remark-gfm'
import ImageRenderer from '@/components/markdown/ImageRenderer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactMarkdown from 'react-markdown'

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  dayjs.extend(relativeTime)
  const router = useRouter()
  const { data, loading } = useFindOneBySlugQuery({
    variables: { slug: router.query.slug as string },
  })
  const [incrementViews] = useIncrementViewMutation()

  useEffect(() => {
    if (!loading && data?.posts[0]?.id) {
      incrementViews({
        variables: {
          id: data.posts[0].id,
          views: data.posts[0].views ?? 0 + 1,
        },
      })
    }
  }, [loading])

  return (
    <>
      <Navigation />
      <DefaultWrapper>
        {!loading && data?.posts[0] ? (
          <div className="w-full flex flex-col justify-start items-start">
            <h1 className="text-4xl font-extrabold">{data.posts[0].title}</h1>
            <span className="mt-3 text-xs font-medium">
              Written by {data.posts[0].user.displayName}{' '}
              {dayjs().to(dayjs(data.posts[0].created_at))}
            </span>
            <article className="w-full mt-4 text-justify">
              <ReactMarkdown
                components={{
                  img: ({ node }) => <ImageRenderer node={node} />,
                }}
                remarkPlugins={[gfm]}
                className="default"
              >
                {data.posts[0].content}
              </ReactMarkdown>
            </article>
          </div>
        ) : (
          <PostNotFound />
        )}
      </DefaultWrapper>
    </>
  )
}

// export const getServerSideProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common', 'index'])),
//   },
// })

export default withApollo({ ssr: true })(Post)
