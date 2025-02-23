/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type StartupTypeCard = Omit<Startup, "author"> & {author? : Author}

const StartupCard = ({post} : {post: StartupTypeCard}) => {

const {_createdAt, views, author, title, category, _id, image, description} = post
  return (
    <li className='startup-card group'>
        {/* 1st part of startup card */}
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-5 text-primary' />
                <span className='text-16-medium'>{views}</span>
            </div>
        </div>

        {/* 2nd part of startup card */}
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className='text-26-semibold'>
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            src={author?.image!}
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
        </div>

        {/* container for startup desc */}
        <Link href={`/startup/${_id}`}>
            <p className='startup-card_desc'>
                {description}
            </p>
            <img src={image} alt="placeholder" className="startup-card_img" />
        </Link>

        {/* footer of card */}
        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className='text-16-medium'>{category}</p>
            </Link>
            <button className='startup-card_btn'>
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </button>
        </div>
    </li>
  )
};
export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );

export default StartupCard